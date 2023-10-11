import { useState } from "react";
import { GoogleLogin } from "react-google-login";
import { useNavigate } from "react-router-dom";
import { gapi } from 'gapi-script';
import { useEffect } from "react";
import '../style/login.css';
import { ACCOUNT_CONTROLLER, BASE_HEROKU_URL, LOGIN } from '../services/apis';

export const Login = () => {

    const loginUrl = BASE_HEROKU_URL + ACCOUNT_CONTROLLER + LOGIN;
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
            alert("Login failed, email not found !!")
            return;
        } else {
            var data = await res.json();
            var result = data;
            return result;
        }
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
            window.location.reload();
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

        var token = localStorage.getItem('token');
        if (token !== null) {
            navigate('/');
        }
    });

    return (
        <div className="login-card">
            <div className="login-title">Login Page</div>
            <div className="login-container">
                <div className="login-form google-login-form">
                    <GoogleLogin
                        clientId={clientId}
                        buttonText="Google "
                        onSuccess={onSuccess}
                        onFailure={onFailure}
                        cookiePolicy="single_host_origin"
                        isSignedIn={false}
                    />
                </div>
                <div className="form login-form api-login-form">
                    <form onSubmit={(e) => login(e)}>
                        <div className="input-login-container">
                            <label>Email</label>
                            <input type="email" className="form-input" name="email" value={emailInput} onChange={event => setEmailInput(event.target.value)} required />
                            {renderErrorMessage("email")}
                            <input type="submit" value="Send Code" className="btn-submit"/>
                        </div>
                    </form><br />
                    {
                        isEmailSend === true ? (
                            <div>
                                <form onSubmit={(e)=>checkOTP(e)}>
                                    <div className="input-login-container">
                                        <label>OTP </label>
                                        <input type="text" className="otp-input" name="otp" value={otpInput} onChange={event => setOtpInput(event.target.value)} required />
                                        {renderErrorMessage("pass")}
                                        <input type="submit" value="Login" className="btn-submit"/>
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