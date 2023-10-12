import NavDropdown from 'react-bootstrap/NavDropdown';
import Avatar from 'react-avatar';
import { useEffect, useState } from 'react';
import { ACCOUNT_CONTROLLER, BASE_HEROKU_URL, PROFILE } from '../../services/apis';
import { toast } from 'react-toastify';
import defaultAvatar from '../../assets/defaultAvatar.png'

function ProfileDropdown() {

    const [isLogin, setIsLogin] = useState(false);
    const [avatarImg, setProfile] = useState("");

    const profileUrl = BASE_HEROKU_URL + ACCOUNT_CONTROLLER + PROFILE;

    async function getProfile(token) {
        var res = await fetch(profileUrl, {
            headers: {
                "Authorization": "Bearer " + token,
            }
        });
        if (res.status === 200) {
            var data = await res.json();
            console.log(data);
            var profileRaw = data;
            setProfile(profileRaw.imageURL);
            console.log(profileRaw.imageURL);
        } else {
            toast.error("Fetch Profile Failed..")
        }
    }

    function LogOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('google-pet-name');
        window.location.reload();
    }

    useEffect(() => {
        var token = localStorage.getItem('token');
        if (token === null || token === undefined || token === "") {
            setIsLogin(false);
        } else {
            setIsLogin(true);
            getProfile(token);
        }
    }, [])

    return (
        <NavDropdown className='avatar-dropdown' title={
            <Avatar round size='40' name="Profile"
                src={avatarImg === "" || avatarImg === null || avatarImg === undefined ? defaultAvatar : avatarImg} />
        } id="basic-nav-dropdown">
            <NavDropdown.Item href="#/profile">Profile</NavDropdown.Item>
            <NavDropdown.Divider />
            <div className='sign-in-out-container'>
                {isLogin === true ? (
                    <div className='dropdown-item' onClick={(e) => LogOut(e)}>Log out</div>
                ) : (
                    <a className='dropdown-item' href='#/login'>Log in</a>
                )}
            </div>
        </NavDropdown>
    );
}

export default ProfileDropdown;