import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import '../../style/my-post/popUpEditModal.css';
import { useEffect, useState } from 'react';
import { BASE_HEROKU_URL, DELETE, POST_CONTROLLER, UPDATE, UPLOAD_IMG } from '../../services/apis';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export const PopUpEditModal = (post) => {

    const [errorMessages] = useState({});
    const [title, setTitle] = useState("");
    const [des, setDes] = useState("");
    const [contact, setContact] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [imgUrl, setImgUrl] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const uploadImageUrl = BASE_HEROKU_URL + POST_CONTROLLER + UPLOAD_IMG;
    const editPostUrl = BASE_HEROKU_URL + POST_CONTROLLER + UPDATE;
    const deletePostUrl = BASE_HEROKU_URL + POST_CONTROLLER + DELETE;

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

    function validateForm() {
        if (title === null || title === undefined || title === "") {
            toast.error("Please fill up title")
            return false;
        }

        if (contact === null || contact === undefined || contact === "") {
            toast.error("Please fill up contact")
            return false;
        }

        if (des === null || des === undefined || des === "") {
            toast.error("Please fill up description")
            return false;
        }
        return true;
    }

    const editPost = async (e) => {
        e.preventDefault();

        var isValidate = validateForm();
        if (isValidate === false) return;

        var postImages = [];

        if (selectedFile === null || selectedFile === undefined) {
            //Get current image
            var image = {
                imageBase64: imgUrl
            }
            postImages.push(image)
        } else {
            //Get new images
            const formData = new FormData();
            formData.append('files', selectedFile, selectedFile.name);
            setIsLoading(true);
            const res = await fetch(uploadImageUrl, {
                method: 'POST',
                body: formData,
            });

            const data = await res.json();
            console.log(data);

            data.forEach(element => {
                var image = {
                    imageBase64: element
                }
                postImages.push(image)
            });
        }

        var newPost = {
            id: post.id,
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

        const resCreate = await fetch(editPostUrl, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(newPost)
        })

        if (resCreate.status !== 200) {
            toast.error("Edit post failed");
            return;
        }

        const dataCreate = await resCreate.json();
        console.log(dataCreate);
        setIsLoading(false);
        toast.success("Post Updated !!");
        window.location.reload();
    }

    const deletePost = async (e) => {
        e.preventDefault();

        var token = localStorage.getItem('token');

        if (token === null || token === undefined || token === "") {
            toast.error("Error not login yet, please login to create post");
            return;
        }

        token = "Bearer " + token;

        const deletePost = {
            id: post.id,
        };
        setIsDeleting(true);
        const resCreate = await fetch(deletePostUrl, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(deletePost)
        })

        if (resCreate.status !== 200) {
            toast.error("Delete post failed");
            return;
        }

        const dataCreate = await resCreate.json();
        console.log(dataCreate);
        setIsDeleting(false);
        toast.success("Post Delete !!");
        window.location.reload();
    }

    useEffect(() => {
        console.log("Check: " + post.title)
        setTitle(post.title)
        setContact(post.contact)
        setDes(post.description)
        setImgUrl(post.postImages[0].imageBase64)
    }, [post])

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <div className='trigger-container'>
                <Button className='open-create-btn' variant="primary" onClick={handleShow}>
                    Edit Post
                </Button>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Post</Modal.Title>
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
                    {
                        isDeleting === true || isLoading === true ? (
                            <Button variant="danger" onClick={(e) => deletePost(e)} disabled>
                                {isDeleting === true ? <span>Deleting..</span> : <span>Delete</span>}
                            </Button>
                        ) : (
                            <Button variant="danger" onClick={(e) => deletePost(e)}>
                                {isDeleting === true ? <span>Deleting..</span> : <span>Delete</span>}
                            </Button>
                        )
                    }
                    {
                        isLoading === true || isDeleting === true ? (
                            <Button variant="primary" onClick={(e) => editPost(e)} disabled>
                                {isLoading === true ? <span>Saving..</span> : <span>Save</span>}
                            </Button>
                        ) : (
                            <Button variant="primary" onClick={(e) => editPost(e)}>
                                {isLoading === true ? <span>Saving..</span> : <span>Save</span>}
                            </Button>
                        )
                    }
                </Modal.Footer>
            </Modal>
        </>
    );
}