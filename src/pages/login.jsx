import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { gapi } from 'gapi-script';
import { useEffect } from "react";
import '../style/auth/login.css';
import { ACCOUNT_CONTROLLER, BASE_HEROKU_URL, LOGIN } from '../services/apis';
import { Loading } from '../components/global/loading';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import jwtDecode  from "jwt-decode";

export const Login = () => {

    const loginUrl = BASE_HEROKU_URL + ACCOUNT_CONTROLLER + LOGIN;
    const [errorMessages] = useState({});
    const [isEmailSend, setIsEmailSend] = useState(false);
    const [emailInput, setEmailInput] = useState("");
    const [otpInput, setOtpInput] = useState("");
    const [otp, setOtp] = useState("");
    const [tokenReceive, setTokenReceive] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const navigate = useNavigate();

    const clientId = '45994015539-spvfn9tog7ma54lfi44ov9jm84s5jbq0.apps.googleusercontent.com';
    const SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";

    const onSuccess = async (res) => {
        console.log(res);
        var decoded = jwtDecode(res.credential);
        console.log(decoded);
        localStorage.setItem('google-pet-name', decoded.name);
        setIsGoogleLoading(true);
        var data = await loginSuccess(decoded.email);
        console.log(data);
        if (data === undefined) {
            setIsGoogleLoading(false);
            return;
        };
        localStorage.setItem('token', data.token);
        setIsGoogleLoading(false);
        window.location.reload();
    }

    async function loginSuccess(emailLogin) {

        try {
            var res = await fetch(loginUrl,
                {
                    method: "POST",
                    headers: {
                        'Accept': '*/*',
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    body: JSON.stringify({
                        email: emailLogin,
                    })
                }
            );
        } catch (e) {
            console.log(e.message);
        }

        if (res === undefined || res.status !== 200) {
            toast.error("Login failed, email not found !!")
            setIsLoading(false);
            return;
        } else {
            var data = await res.json();
            var result = data;
            console.log(result);
            setIsLoading(false);
            return result;
        }
    }

    const onFailure = (res) => {
        console.log(res)
        setIsGoogleLoading(false);
        setIsLoading(false);
        return;
    }

    const login = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        var data = await loginSuccess(emailInput);
        if (data === undefined) {
            setIsLoading(false);
            return;
        };
        setOtp(data.otp);
        toast(data.otp);
        setTokenReceive(data.token);
        setIsEmailSend(true);
        setIsLoading(false);
    }

    function checkOTP(e) {
        e.preventDefault();
        if (otpInput === undefined || otpInput === "") return;
        setIsLoading(true);
        if (otpInput.trim().toLowerCase() === otp.trim().toLowerCase()) {
            localStorage.setItem('token', tokenReceive);
            console.log("Token: " + tokenReceive);
            setIsLoading(false);
            window.location.reload();
        } else {
            toast.error("OTP is not correct");
            setIsLoading(false);
            return;
        }
    }

    const renderErrorMessage = (email) =>
        email === errorMessages.email && (
            <div className="error">{errorMessages.message}</div>
        );

    useEffect(() => {
        function start() {
            gapi.client.init({
                clientId: clientId,
                scope: SCOPES
            })
        };
        gapi.load('client:auth2', start);

        var token = localStorage.getItem('token');
        if (token !== null) {
            navigate('/');
        }
    });

    return (
        <div className="login-card">
            <ToastContainer />
            <div className="login-title">Login Page</div>
            {
                isGoogleLoading === true ? <Loading /> :
                    (
                        <div className="login-container">
                            <div className="login-form google-login-form">
                                {/* <GoogleLogin
                                    clientId={clientId}
                                    buttonText="Google "
                                    onSuccess={onSuccess}
                                    onFailure={onFailure}
                                    cookiePolicy="single_host_origin"
                                    isSignedIn={false}
                                /> */}

                                <GoogleOAuthProvider clientId={clientId}>
                                    <GoogleLogin
                                        onSuccess={ credentialResponse =>  onSuccess(credentialResponse)}
                                        onError = {onFailure}
                                    />
                                </GoogleOAuthProvider>
                            </div>
                            <div className="form login-form api-login-form">
                                <form onSubmit={(e) => login(e)}>
                                    <div className="input-login-container">
                                        <label>Email</label>
                                        <input type="email" className="form-input" name="email" value={emailInput} onChange={event => setEmailInput(event.target.value)} required />
                                        {renderErrorMessage("email")}
                                        {
                                            isLoading === true ? <input type="submit" value="Sending Code..." className="btn-submit" disabled /> :
                                                <input type="submit" value="Send Code" className="btn-submit" />
                                        }
                                    </div>
                                </form><br />
                                {
                                    isEmailSend === true ? (
                                        <div>
                                            <form onSubmit={(e) => checkOTP(e)}>
                                                <div className="input-login-container">
                                                    <label>OTP </label>
                                                    <input type="text" className="otp-input" name="otp" value={otpInput} onChange={event => setOtpInput(event.target.value)} required />
                                                    {renderErrorMessage("pass")}
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
        </div>
    )
}