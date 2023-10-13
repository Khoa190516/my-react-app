import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify'
import { updateProfile, uploadImages } from "../../services/apis";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'

export const EditProfileModal = (profile) => {

    const [isLoading, setIsLoading] = useState(false);

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [imgUrl, setImgUrl] = useState("");

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const [errorMessages] = useState({});

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
        if (name === null || name === undefined || name === "") {
            toast.error("Please fill up name")
            return false;
        }
        if (phone === null || phone === undefined || phone === "") {
            toast.error("Please fill up phone")
            return false;
        }
        return true;
    }

    const editProfile = async (e) => {
        e.preventDefault();

        var isValidate = validateForm();
        if (isValidate === false) return;

        var avatarImgUrl = "";
        setIsLoading(true);

        if (selectedFile === null || selectedFile === undefined) {
            //Get current image
            avatarImgUrl = imgUrl;
        } else {
            //Get new images
            const formData = new FormData();
            formData.append('files', selectedFile, selectedFile.name);

            const data = await uploadImages(formData)
            if (data === undefined) {
                toast.error("Upload image got error");
                setIsLoading(false);
                return;
            }

            data.forEach(element => {
                avatarImgUrl = element
            });
        }

        var newProfile = {
            fullName: name,
            phone: phone,
            imageUrl: avatarImgUrl
        }

        var token = localStorage.getItem('token');

        if (token === null || token === undefined || token === "") {
            toast.error("Error not login yet, please login to create post");
            return;
        }

        const isUpdated = await updateProfile(newProfile, token)

        if (isUpdated === true) {
            toast.success("Profile updated");
            setIsLoading(false);
            window.location.reload();
        } else {
            toast.error("Update profile failed");
            setIsLoading(false);
        }
    }

    useEffect(() => {
        setName(profile.name)
        setPhone(profile.phone)
        setImgUrl(profile.imageURL)
    }, [profile])

    return (
        <>
            <Button className='open-create-btn' variant="primary" onClick={handleShow}>
                <FontAwesomeIcon icon={faPenToSquare} color="white" /> Edit Profile
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label>Full Name </label>
                    <input className='input-form form-control' type="text" name="title" value={name} onChange={event => setName(event.target.value)} required />
                    {renderErrorMessage("email")}<br />

                    <label>Phone </label>
                    <textarea className='input-form contact-form form-control' name="contact" value={phone} onChange={event => setPhone(event.target.value)} required />
                    {renderErrorMessage("email")}<br />

                    <label>Avatar</label><br />
                    <input className='form-group' type="file" name="image" id="image-create" onChange={(e) => fileSelectedHandler(e)} /><br /><br />
                    <img className='img-preview' src={imgUrl} alt="preview" srcSet="" />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={(e) => editProfile(e)}>
                        {isLoading === true ? <span><FontAwesomeIcon icon={faPenToSquare} color="white" /> Saving..</span> :
                            <span><FontAwesomeIcon icon={faPenToSquare} color="white" /> Save</span>}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}