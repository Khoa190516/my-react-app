import NavDropdown from 'react-bootstrap/NavDropdown';
import Avatar from 'react-avatar';
import { useEffect, useState } from 'react';
import { getProfile } from '../../services/apis';
import defaultAvatar from '../../assets/defaultAvatar.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faPersonWalkingDashedLineArrowRight, faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons'

function ProfileDropdown() {

    const [isLogin, setIsLogin] = useState(false);
    const [avatarImg, setProfile] = useState("");

    function LogOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('google-pet-name');
        window.location.reload();
    }

    useEffect(() => {
        const fetchProfile = async () => {
            var data = await getProfile(token)
            if(data !== undefined){
                setProfile(data.imageURL)
            }
        }

        var token = localStorage.getItem('token');
        if (token === null || token === undefined || token === "") {
            setIsLogin(false);
        } else {
            setIsLogin(true);
            fetchProfile();
        }
    }, [])

    return (
        <NavDropdown className='avatar-dropdown' title={
            <Avatar round size='40' name="Profile"
                src={avatarImg === "" || avatarImg === null || avatarImg === undefined ? defaultAvatar : avatarImg} />
        } id="basic-nav-dropdown">
            <NavDropdown.Item href="#/profile"><FontAwesomeIcon icon={faCircleUser} color="black" /> Profile</NavDropdown.Item>
            <NavDropdown.Divider />
            <div className='sign-in-out-container'>
                {isLogin === true ? (
                    <div className='dropdown-item' onClick={(e) => LogOut(e)}><FontAwesomeIcon icon={faPersonWalkingDashedLineArrowRight} color="black" /> Log out</div>
                ) : (
                    <a className='dropdown-item' href='#/login'><FontAwesomeIcon icon={faArrowCircleLeft} color="black" /> Log in</a>
                )}
            </div>
        </NavDropdown>
    );
}

export default ProfileDropdown;