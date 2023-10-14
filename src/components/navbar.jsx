import { NavLink } from "react-router-dom"
import '../style/navbar.css'
import ProfileDropdown from "./global/profileDropdown";
import { Navbar, Container } from "react-bootstrap";


export const Navibar = () => {

    return (
        <Navbar sticky="top" className="bg-dark bg-gradient">
            <Container>
                <div className="nav-items">
                    <div className="nav-links">
                        <NavLink className={({ isActive }) => isActive ? "active link" : "link "} to="/">Home</NavLink>
                        <NavLink className={({ isActive }) => isActive ? "active link my-post-link" : "link my-post-link"} to="/my-post">My Post</NavLink>
                    </div>
                </div>
                <ProfileDropdown/>
            </Container>
        </Navbar>
    )
}

