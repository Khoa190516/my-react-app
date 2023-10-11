import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import '../../style/my-post/popUpEditModal.css';
import { useEffect, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { BASE_HEROKU_URL, DELETE, INSERT, POST_CONTROLLER, UPDATE, UPLOAD_IMG } from '../../services/apis';

export const PopUpEditModal = (post) => {

    const [errorMessages, setErrorMessages] = useState({});
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

    const editPost = async (e) => {
        e.preventDefault();

        if (selectedFile === null || selectedFile === undefined) {
            alert("Please pick a new image");
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
            id: post.id,
            title: title,
            description: des,
            contact: contact,
            postImages: postImages
        };

        console.log(newPost);

        var token = localStorage.getItem('token');

        if (token === null || token === undefined || token === "") {
            alert("Error not login yet, please login to create post");
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
            alert("Edit post failed");
            return;
        }

        const dataCreate = await resCreate.json();
        console.log(dataCreate);
        setIsLoading(false);
        alert("Post Updated !!");
        window.location.reload();
    }

    const deletePost = async (e) => {
        e.preventDefault();

        var token = localStorage.getItem('token');

        if (token === null || token === undefined || token === "") {
            alert("Error not login yet, please login to create post");
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
            alert("Delete post failed");
            return;
        }

        const dataCreate = await resCreate.json();
        console.log(dataCreate);
        setIsDeleting(false);
        alert("Post Delete !!");
        window.location.reload();
    }

    useEffect(() => {
        console.log("Check: " + post.title)
        setTitle(post.title)
        setContact(post.contact)
        setDes(post.description)
        setImgUrl(post.postImages[0].imageBase64)
    }, [post])

    return (
        <Popup modal trigger={<div className='trigger-container'><button className='open-popup-button'>Edit</button></div>}>
            <div className="modal">
                <div className="header"> Edit Post </div>
                <div className="content">
                    <form onSubmit={(e) => editPost(e)}>
                        <div className="input-container">
                            <label>Title </label>
                            <input className='input-form' type="text" name="title" value={title} onChange={event => setTitle(event.target.value)} required />
                            {renderErrorMessage("email")}<br />

                            <label>Contact </label>
                            <textarea className='input-form' rows={4} name="contact" value={contact} onChange={event => setContact(event.target.value)} required />
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

                            <label>Image</label>
                            <input type="file" name="image" id="image-create" onChange={(e) => fileSelectedHandler(e)} /><br />
                            <img className='img-preview' src={imgUrl} alt="preview" srcSet="" />
                        </div>
                        <div className="button-container">
                            {
                                isDeleting === true || isLoading === true ?
                                    (<input className='btn-delete' type="button" value={isDeleting === true ? "Deleting..." : "Delete"} onClick={(e) => deletePost(e)} disabled />) :
                                    (<input className='btn-delete' type="button" value={isDeleting === true ? "Deleting..." : "Delete"} onClick={(e) => deletePost(e)} />)
                            }
                            {
                                isLoading === true || isDeleting === true ?
                                    (<input className='btn-save' type="submit" value={isLoading === true ? "Saving..." : "Save"} disabled />) :
                                    (<input className='btn-save' type="submit" value={isLoading === true ? "Saving..." : "Save"} />)
                            }
                        </div>
                    </form>
                </div>
            </div>
        </Popup>
    );
}