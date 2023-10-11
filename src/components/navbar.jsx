import { Link } from "react-router-dom"
import '../style/navbar.css'
import { useEffect, useState } from "react"

export const Navbar = () => {

    const [isLogin, setIsLogin] = useState(false);

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
                <Link className="link" to="/">Home</Link>
                <Link className="link" to="/my-post">My Post</Link>
                {
                    isLogin === true ?
                        (
                            <button onClick={() => LogOut()}>Log out</button>
                        ) :
                        (
                            <Link className="link" to="/login">Login</Link>
                        )
                }
            </div>
        </div>
    )
}
