import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import '../style/popUpCreateModal.css';
import { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export const PopUpCreateModal = () => {

    const [errorMessages, setErrorMessages] = useState({});
    const [title, setTitle] = useState("");
    const [des, setDes] = useState("");
    const [contact, setContact] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [imgUrl, setImgUrl] = useState("");

    const uploadImageUrl = "https://localhost:7217/api/Posts/upload-images";
    const createPostUrl = "https://localhost:7217/api/Posts/insert";

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

    const createPost = async (e) => {
        e.preventDefault();

        if(selectedFile===null||selectedFile===undefined) {
            alert("Please pick a image");
            return;
        }

        const formData = new FormData();
        formData.append('files', selectedFile, selectedFile.name);
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
            alert("Error not login yet, please login to create post");
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
            alert("Create post failed");
            return;
        }

        const dataCreate = await resCreate.json();
        console.log(dataCreate);
        alert("Post created !!");
        window.location.reload();
    }

    return (
        <Popup modal trigger={<div className='trigger-container'><button className='open-popup-button'>Create</button></div>}>
            <div className="modal">
                <div className="header"> Create Post </div>
                <div className="content">
                    <form onSubmit={(e) => createPost(e)}>
                        <div className="input-container">
                            <label>Title </label>
                            <input type="text" name="title" value={title} onChange={event => setTitle(event.target.value)} required />
                            {renderErrorMessage("email")}<br />

                            <label>Contact </label>
                            <textarea rows={4} name="contact" value={contact} onChange={event => setContact(event.target.value)} required />
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
                            <input type="submit" />
                        </div>
                    </form>
                </div>
            </div>
        </Popup>
    );
}