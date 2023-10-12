import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import '../../style/my-post/popUpCreateModal.css';
import { useState } from 'react';
import { BASE_HEROKU_URL, INSERT, POST_CONTROLLER, UPLOAD_IMG } from '../../services/apis';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export const PopUpCreateModal = () => {

    const [errorMessages] = useState({});
    const [title, setTitle] = useState("");
    const [des, setDes] = useState("");
    const [contact, setContact] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [imgUrl, setImgUrl] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const uploadImageUrl = BASE_HEROKU_URL + POST_CONTROLLER + UPLOAD_IMG;
    const createPostUrl = BASE_HEROKU_URL + POST_CONTROLLER + INSERT;

    const renderErrorMessage = (email) =>
        email === errorMessages.email && (
            <div className="error">{errorMessages.message}</div>
        );

    const fileSelectedHandler = (e) => {
        var imageSelected = e.target.files[0];
        setSelectedFile(imageSelected)
        const objectUrl = URL.createObjectURL(imageSelected);
        setImgUrl(objectUrl);
    }


    function validateForm(){
        if(title===null || title===undefined||title===""){
            toast.error("Please fill up title")
            return false;
        }

        if(contact===null || contact===undefined||contact===""){
            toast.error("Please fill up contact")
            return false;
        }

        if(des===null || des===undefined||des===""){
            toast.error("Please fill up description")
            return false;
        }
        return true;
    }

    const createPost = async (e) => {
        e.preventDefault();

        var isValidate = validateForm();
        if(isValidate === false) return;

        if (selectedFile === null || selectedFile === undefined) {
            toast.error("Please pick a image");
            return;
        }

        const formData = new FormData();
        formData.append('files', selectedFile, selectedFile.name);
        setIsLoading(true);
        const res = await fetch(uploadImageUrl, {
            method: 'POST',
            body: formData,
        });

        const data = await res.json();
        console.log(data);

        var postImages = [];

        data.forEach(element => {
            var image = {
                imageBase64: element
            }
            postImages.push(image)
        });

        var newPost = {
            title: title,
            description: des,
            contact: contact,
            postImages: postImages
        };

        console.log(newPost);

        var token = localStorage.getItem('token');

        if (token === null || token === undefined || token === "") {
            toast.error("Error not login yet, please login to create post");
            return;
        }

        token = "Bearer " + token;

        const resCreate = await fetch(createPostUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(newPost)
        })

        if (resCreate.status !== 200) {
            toast.error("Create post failed");
            return;
        }

        const dataCreate = await resCreate.json();
        console.log(dataCreate);
        setIsLoading(false);
        toast.success("Post created !!");
        window.location.reload();
    }

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <div className='trigger-container'>
                <Button className='open-create-btn' variant="primary" onClick={handleShow}>
                    Create
                </Button>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label>Title </label>
                    <input className='input-form form-control' type="text" name="title" value={title} onChange={event => setTitle(event.target.value)} required />
                    {renderErrorMessage("email")}<br />

                    <label>Contact </label>
                    <textarea className='input-form contact-form form-control' name="contact" value={contact} onChange={event => setContact(event.target.value)} required />
                    {renderErrorMessage("email")}<br />

                    <label>Description </label>
                    <CKEditor
                        editor={ClassicEditor}
                        data={des}
                        onChange={(e, editor) => {
                            const data = editor.getData();
                            setDes(data);
                        }}
                    /><br />

                    <label>Image</label><br />
                    <input className='form-group' type="file" name="image" id="image-create" onChange={(e) => fileSelectedHandler(e)} /><br /><br />
                    <img className='img-preview' src={imgUrl} alt="preview" srcSet="" />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={(e) => createPost(e)}>
                        {isLoading === true ? <span>Saving..</span> : <span>Save</span>}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}