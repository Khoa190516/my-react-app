import 'reactjs-popup/dist/index.css';
import '../../style/my-post/popUpEditModal.css';
import { useEffect, useState } from 'react';
import { updatePost, uploadImages, deletePost } from '../../services/apis';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons'

export const PopUpEditModal = (post) => {

    const [errorMessages] = useState({});
    const [title, setTitle] = useState("");
    const [des, setDes] = useState("");
    const [contact, setContact] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [imgUrl, setImgUrl] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

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
            const data = await uploadImages(formData)
            if(data === undefined){
                toast.error("Upload image got error");
                setIsLoading(false);
                return;
            }

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

        var token = localStorage.getItem('token');

        if (token === null || token === undefined || token === "") {
            toast.error("Error not login yet, please login to create post");
            return;
        }

        const isEdited = await updatePost(newPost, token);
        if(isEdited === true){
            toast.success("Post Updated");
            setIsLoading(false);
            window.location.reload();
        }else{
            toast.error("Update post failed");
            setIsLoading(false);
        }
    }

    const deletePostHandler = async (e) => {
        e.preventDefault();

        var token = localStorage.getItem('token');

        if (token === null || token === undefined || token === "") {
            toast.error("Error not login yet, please login to create post");
            return;
        }

        const deletePostModel = {
            id: post.id,
        };

        setIsDeleting(true);
        var isDeleted = await deletePost(deletePostModel, token);
        if(isDeleted === true){
            toast.success("Post deleted")
            setIsDeleting(false)
            window.location.reload()
        }else{
            toast.error("Delete post failed")
            setIsDeleting(false)
        }
    }

    useEffect(() => {
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
            <div className='trigger-edit-container'>
                <Button className='open-create-btn' variant="primary" onClick={handleShow}>
                <FontAwesomeIcon icon={faPenToSquare} color="white" /> Edit Post
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
                            <Button variant="danger" onClick={(e) => deletePostHandler(e)} disabled>
                                {isDeleting === true ? <span><FontAwesomeIcon icon={faTrash} color="white" /> Deleting..</span> : 
                                <span><FontAwesomeIcon icon={faTrash} color="white" /> Delete</span>}
                            </Button>
                        ) : (
                            <Button variant="danger" onClick={(e) => deletePostHandler(e)}>
                                {isDeleting === true ? <span><FontAwesomeIcon icon={faTrash} color="white" /> Deleting..</span> : 
                                <span><FontAwesomeIcon icon={faTrash} color="white" /> Delete</span>}
                            </Button>
                        )
                    }
                    {
                        isLoading === true || isDeleting === true ? (
                            <Button variant="success" onClick={(e) => editPost(e)} disabled>
                                {isLoading === true ? <span><FontAwesomeIcon icon={faPenToSquare} color="white" /> Saving..</span> : <span><FontAwesomeIcon icon={faPenToSquare} color="white" /> Save</span>}
                            </Button>
                        ) : (
                            <Button variant="success" onClick={(e) => editPost(e)}>
                                {isLoading === true ? <span><FontAwesomeIcon icon={faPenToSquare} color="white" /> Saving..</span> : <span><FontAwesomeIcon icon={faPenToSquare} color="white" /> Save</span>}
                            </Button>
                        )
                    }
                </Modal.Footer>
            </Modal>
        </>
    );
}