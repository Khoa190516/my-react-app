import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { gapi } from 'gapi-script';
import { useEffect } from "react";
import '../style/auth/login.css';
import { signIn } from '../services/apis';
import { Loading } from '../components/global/loading';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import jwtDecode from "jwt-decode";
import { SignUpPopUpModal } from '../components/account/signUpPopUpModal';
import { ApiContext } from "../store/ApiContext";

const Login = () => {

    const [isEmailSend, setIsEmailSend] = useState(false);
    const [emailInput, setEmailInput] = useState("");
    const [otpInput, setOtpInput] = useState("");
    const [otp, setOtp] = useState("");
    const [tokenReceive, setTokenReceive] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const clientId = '45994015539-spvfn9tog7ma54lfi44ov9jm84s5jbq0.apps.googleusercontent.com';
    const SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";
    const navigate = useNavigate();

    const { login } = useContext(ApiContext)

    const onSuccess = async (res) => {
        var decoded = jwtDecode(res.credential);
        setIsGoogleLoading(true);
        var data = await signIn(decoded.email);
        if (data !== undefined) {
            localStorage.setItem('token', data.token);
            login()
            navigate('/')
        } else {
            toast.error("Log in failed")
        }
        setIsGoogleLoading(false)
    }

    const onFailure = (res) => {
        setIsGoogleLoading(false);
        setIsLoading(false);
        return;
    }

    const loginByOTP = async (e) => {
        e.preventDefault()
        setIsLoading(true);
        var data = await signIn(emailInput, true)
        if (data === undefined) {
            setIsLoading(false);
            return;
        };
        setOtp(data.otp);
        toast.info(data.otp);
        setTokenReceive(data.token);
        setIsEmailSend(true);
        setIsLoading(false);
    }

    function checkOTP(e) {
        e.preventDefault();
        if (otpInput === undefined || otpInput === "" || otpInput === null) return;
        if (otpInput.trim().toLowerCase() === otp.trim().toLowerCase()) {
            toast.success("Log in success")
            setIsLoading(false);
            localStorage.setItem('token', tokenReceive);
            login()
            navigate('/')
        } else {
            toast.error("OTP is not correct");
            return;
        }
    }

    useEffect(() => {
        function start() {
            gapi.client.init({
                clientId: clientId,
                scope: SCOPES
            })
        };
        gapi.load('client:auth2', start);

        function checkToken() {
            var token = localStorage.getItem('token')
            if (token !== null && token !== undefined && token !== "") {
                login()
                navigate('/')
            }
        }
        checkToken()
    }, []);

    return (
        <div className="login-page-body">
            <div className="login-card-container">
                <ToastContainer></ToastContainer>
                <div className="login-card">
                    <div className="login-title">{isLoading === true || isGoogleLoading === true ? "Processing.." : "Sign in"}</div>
                    {
                        isGoogleLoading === true ? <Loading /> :
                            (
                                <div className="login-container">
                                    <div className="login-form google-login-form">
                                        <GoogleOAuthProvider clientId={clientId}>
                                            <GoogleLogin
                                                onSuccess={(credentialResponse) => onSuccess(credentialResponse)}
                                                onError={onFailure}
                                            />
                                        </GoogleOAuthProvider>
                                    </div>
                                    <div className="form login-form api-login-form">
                                        <form onSubmit={(e) => loginByOTP(e)}>
                                            <div className="input-login-container">
                                                <label>Email</label>
                                                <input type="email" placeholder="email" className="form-input" name="email" value={emailInput} onChange={event => setEmailInput(event.target.value)} required />

                                                {
                                                    isLoading === true ? <input type="submit" value="Sending Code..." className="btn-submit" disabled /> :
                                                        <input type="submit" value="Send Code" className="btn-submit" />
                                                }
                                            </div>
                                        </form>
                                        {
                                            isEmailSend === true ? (
                                                <div>
                                                    <form onSubmit={(e) => checkOTP(e)}>
                                                        <div className="input-login-container">
                                                            <label>OTP </label>
                                                            <input type="text" placeholder="otp" className="otp-input" name="otp" value={otpInput} onChange={event => setOtpInput(event.target.value)} required />
                                                            {
                                                                isLoading === true ? <input type="submit" value="Logging in..." className="btn-submit" disabled /> :
                                                                    <input type="submit" value="Login" className="btn-submit" />
                                                            }
                                                        </div>
                                                    </form>
                                                </div>
                                            ) : null
                                        }
                                    </div>
                                </div>
                            )
                    }
                    {
                        isLoading === true || isGoogleLoading === true ? null :
                            <div className="sign-up-container">
                                <div className="sign-up-title">Don't have account ? </div>
                                <SignUpPopUpModal />
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Login