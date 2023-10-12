import React, { useEffect, useState } from "react"
import { toast } from 'react-toastify'
import { ACCOUNT_CONTROLLER, BASE_HEROKU_URL, PROFILE } from "../services/apis";
import { Loading } from "../components/global/loading";
import '../style/profile/profile.css';
import Avatar from 'react-avatar';
import defaultAvatar from '../assets/defaultAvatar.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { Button } from "react-bootstrap";


export const Profile = () => {

    const [isLogin, setIsLogin] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [profile, setProfile] = useState({
        email: "",
        name: "",
        imageURL: "",
    });

    const profileUrl = BASE_HEROKU_URL + ACCOUNT_CONTROLLER + PROFILE;

    async function getProfile() {
        var token = localStorage.getItem('token');
        setIsLoading(true);
        var res = await fetch(profileUrl, {
            headers: {
                "Authorization": "Bearer " + token,
            }
        });
        if (res.status === 200) {
            var data = await res.json();
            console.log(data);
            var profileRaw = data;
            setProfile(profileRaw);
            console.log("Fetch profile: " + profileRaw);
        } else {
            console.log("Get profile failed")
        }
        setIsLoading(false);
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token === null || token === "" || token === undefined) {
            setIsLogin(false);
        } else {
            setIsLogin(true);
            getProfile();
        }
        console.log("Profile State: " + profile);
    }, [])

    return (
        <div className="profile-page">
            {
                isLogin === false ?
                    (
                        <div>Please login to view profile</div>
                    ) :
                    (
                        <>
                            {
                                isLoading === true ? <Loading></Loading> :
                                    <div className="profile-card">
                                        <div className="profile-avatar"><Avatar round size='150' name="Avatar"
                                            src={profile.imageURL === "" || profile.imageURL === null || profile.imageURL === undefined ? defaultAvatar : profile.imageURL} /></div>
                                        <div className="profile-name">{profile.name}</div>
                                        <div className="profile-email"><FontAwesomeIcon icon={faEnvelope} /> {profile.email}</div>
                                        <div className="edit-btn">
                                            <Button variant="primary">Edit</Button>
                                        </div>
                                    </div>
                            }
                        </>
                    )
            }
        </div>
    )
}