import React, { useEffect, useState } from "react"
import { toast } from 'react-toastify'
import { getProfile } from "../services/apis";
import { Loading } from "../components/global/loading";
import '../style/profile/profile.css';
import Avatar from 'react-avatar';
import defaultAvatar from '../assets/defaultAvatar.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faMobile } from '@fortawesome/free-solid-svg-icons'
import { EditProfileModal } from "../components/profile/editProfileModal";


export const Profile = () => {

    const [isLogin, setIsLogin] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [profile, setProfile] = useState({
        email: "",
        name: "",
        phone: "",
        imageURL: "",
    });

    useEffect(() => {
        const fetchProfile = async (token) => {
            var data = await getProfile(token);
            if (data !== undefined) {
                setProfile(data)
                setIsLoading(false)
            }
            else {
                toast.error("Get profile failed")
                setIsLoading(false)
            }
        }

        const token = localStorage.getItem('token');
        if (token === null || token === "" || token === undefined) {
            setIsLogin(false);
        } else {
            setIsLogin(true);
            fetchProfile(token)
        }
    }, [])

    return (
        <div className="profile-page">
            {
                isLogin === false ?
                    (
                        <div className="not-login-profile-text">Please login to view profile</div>
                    ) :
                    (
                        <>
                            {
                                isLoading === true ? <Loading></Loading> :
                                    <div className="profile-card">
                                        <div className="profile-avatar"><Avatar round size='150' name="Avatar"
                                            src={profile.imageURL === "" || profile.imageURL === null || profile.imageURL === undefined ? defaultAvatar : profile.imageURL} /></div>
                                        <div className="profile-name">{profile.name}</div>
                                        <div className="profile-contact-container">
                                            <div className="profile-email"><FontAwesomeIcon icon={faEnvelope} /> {profile.email === "" ? "N/A" : profile.email}</div>
                                            <div className="profile-phone"><FontAwesomeIcon icon={faMobile} /> {profile.phone === "" ? "N/A" : profile.phone}</div>
                                        </div>
                                        <div className="edit-btn">
                                            <EditProfileModal {...profile} />
                                        </div>
                                    </div>
                            }
                        </>
                    )
            }
        </div>
    )
}