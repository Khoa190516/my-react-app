import { NavLink } from "react-router-dom"
import '../style/navbar.css'
import { useEffect, useState } from "react"

export const Navbar = () => {

    const [isLogin, setIsLogin] = useState(false);

    var className = 'link';

    function LogOut() {
        localStorage.removeItem('token');
        window.location.reload();
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token === null) {
            setIsLogin(false);
        } else {
            setIsLogin(true);
        }
    })

    return (
        <div className="navbar">
            <div className="links">
                <NavLink className={({ isActive }) => isActive? "active link": "link"} to="/">Home</NavLink>
                <NavLink className={({ isActive }) => isActive? "active link": "link"} to="/my-post">My Post</NavLink>
                {
                    isLogin === true ?
                        (
                            <button className="logout-btn" onClick={() => LogOut()}>Log out</button>    
                        ) :
                        (
                            <NavLink className={({ isActive }) => isActive? "active link": "link"} to="/login">Login</NavLink>
                        )
                }
            </div>
        </div>
    )
}

