import { Link } from "react-router-dom"
import '../style/navbar.css'

export const Navbar = () => {
    return (
        <div className="navbar">
            <div className="links">
                <Link className="link" to="/">Home</Link>
                <Link className="link" to="/login">Login</Link>
            </div>
        </div>
    ) 
}
