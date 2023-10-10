import { useState } from "react";
import { GoogleLogin } from "react-google-login";
import { useNavigate } from "react-router-dom";
import { gapi } from 'gapi-script';
import { useEffect } from "react";
import '../style/login.css';

export const Login = () => {

    const loginUrl = "https://localhost:7217/api/AuthUser/login";
    const [errorMessages, setErrorMessages] = useState({});
    const [isEmailSend, setIsEmailSend] = useState(false);
    const [emailInput, setEmailInput] = useState("");
    const [otpInput, setOtpInput] = useState("");
    const [otp, setOtp] = useState("");
    const [tokenReceive, setTokenReceive] = useState("");
    const navigate = useNavigate();

    const clientId = '45994015539-spvfn9tog7ma54lfi44ov9jm84s5jbq0.apps.googleusercontent.com';
    const SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";

    const onSuccess = async (res) => {
        console.log(res);
        var data = await loginSuccess(res.profileObj.email);
        console.log(data);
        if (data === undefined) return;
        localStorage.setItem('token', data.token);
        navigate('/');
    }

    async function loginSuccess(emailLogin) {
        var res = await fetch(loginUrl,
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: emailLogin,
                })
            }
        );

        if (res.status === 500) {
            alert("Login failed, email not found !!")
            return;
        }

        var data = await res.json();
        var result = data;
        return result;
    }

    const onFailure = (res) => {
        console.log(res)
    }

    const login = async (e) => {
        e.preventDefault();
        var data = await loginSuccess(emailInput);
        if (data === undefined) return;
        setOtp(data.otp);
        alert(data.otp);
        setTokenReceive(data.token);
        setIsEmailSend(true);
    }

    function checkOTP(e) {
        e.preventDefault();
        if (otpInput === undefined || otpInput === "") return;

        if (otpInput.trim().toLowerCase() === otp.trim().toLowerCase()) {
            alert("Login success");
            localStorage.setItem('token', tokenReceive);
            console.log(tokenReceive);
            navigate('/');
        } else {
            alert("OTP is not correct");
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
    });

    return (
        <div className="login-card">
            <div className="login-container">
                <div>
                    <GoogleLogin
                        clientId={clientId}
                        buttonText="Google"
                        onSuccess={onSuccess}
                        onFailure={onFailure}
                        cookiePolicy="single_host_origin"
                        isSignedIn={false}
                    />
                </div>
                <div className="form">
                    <form onSubmit={(e) => login(e)}>
                        <div className="input-container">
                            <label>Email </label>
                            <input type="email" name="email" value={emailInput} onChange={event => setEmailInput(event.target.value)} required />
                            {renderErrorMessage("email")}
                        </div>
                        <div className="button-container">
                            <input type="submit" />
                        </div>
                    </form><br />
                    {
                        isEmailSend === true ? (
                            <div>
                                <form>
                                    <div className="input-container">
                                        <label>OTP </label>
                                        <input type="text" name="otp" value={otpInput} onChange={event => setOtpInput(event.target.value)} required />
                                        {renderErrorMessage("pass")}
                                    </div>
                                    <div>
                                        <button type="submit" onClick={(e) => checkOTP(e)} >Login</button>
                                    </div>
                                </form>
                            </div>
                        ) : null
                    }
                </div>
            </div>
        </div>
    )
}