import { useState } from "react";
import { Button } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify'
import { signUp } from "../../services/apis";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import { Loading } from '../../components/global/loading';
import jwtDecode from "jwt-decode";

export const SignUpPopUpModal = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const clientId = '45994015539-spvfn9tog7ma54lfi44ov9jm84s5jbq0.apps.googleusercontent.com';
    const [email, setEmail] = useState("");
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    function validateForm() {
        if (email === null || email === undefined || email === "") {
            toast.error("Please fill up email")
            return false;
        }
        return true;
    }

    const signUpHandler = async (e) => {
        e.preventDefault();
        var isValidate = validateForm();
        if (isValidate === false) return;

        setIsLoading(true);

        var newAccount = {
            email: email
        }

        const resCode = await signUp(newAccount)

        if (resCode === 200) {
            toast.success("Signed Up");
            setIsLoading(false);
            window.location.reload();
        } else if (resCode === 409) {
            toast.error("Email has been used, please use other email");
            setIsLoading(false);
        } else {
            toast.error("Sign up failed")
            setIsLoading(false)
        }
    }

    const onSuccess = async (res) => {
        var decoded = jwtDecode(res.credential);
        setIsGoogleLoading(true);

        var newAccount = {
            email: decoded.email,
        }

        const resCode = await signUp(newAccount)

        if (resCode === 200) {
            toast.success("Signed Up");
            setIsGoogleLoading(false);
            setTimeout(()=>{
                window.location.reload();
            })
        } else if (resCode === 409) {
            toast.error("Email has been used, please use other email");
            setIsGoogleLoading(false);
        } else {
            toast.error("Sign up failed")
            setIsGoogleLoading(false)
        }
    }

    const onFailure = (res) => {
        console.log(res)
        toast.error("Sign up failed")
        setIsGoogleLoading(false);
        setIsLoading(false);
        return;
    }

    return (
        <>
            <Button className='open-create-btn' variant="primary" onClick={handleShow}>
                <FontAwesomeIcon icon={faUserPlus} color="white" /> Sign Up
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Sign Up</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        isGoogleLoading === true ? <Loading /> :
                            <form onSubmit={(e) => signUpHandler(e)}>
                                <label>Your email </label>
                                <input placeholder="Email" type='email' className='form-input' name="email" value={email} onChange={event => setEmail(event.target.value)} required /><br />
                                <div className="sign-up-btn-container">
                                    {
                                        <Button type="submit" variant="primary" disabled={isLoading ? "disabled" : ""}>
                                            {isLoading === true ? <span><FontAwesomeIcon icon={faUserPlus} color="white" /> Signing Up..</span> :
                                                <span><FontAwesomeIcon icon={faUserPlus} color="white" /> Sign Up</span>}
                                        </Button>
                                    }
                                </div>
                            </form>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <span className="google-sign-up-text">Or sign up with Google</span>
                    {
                        isGoogleLoading === true || isLoading === true ? null :
                            <GoogleOAuthProvider clientId={clientId}>
                                <GoogleLogin
                                    onSuccess={credentialResponse => onSuccess(credentialResponse)}
                                    onError={onFailure}
                                />
                            </GoogleOAuthProvider>
                    }
                </Modal.Footer>
            </Modal>
        </>
    );
}