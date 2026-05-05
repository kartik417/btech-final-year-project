import { Link } from "react-router-dom"; import "./Navbar.css";
function Navbar() {
    return (
        <nav className="navbar">
            <p className="navbar-brand">PrepWise AI</p>
            <div className="navbar-links">
                <ul className="navbar-list">
                    <li><Link to="/">Home</Link></li>
                    {/* <li><a href="#services">Our Services</a></li>
                    <li><a href="#contact">Contact</a></li> */}
                    <li>
                        <Link to="/dashboard" className="nav-btn">Dashboard</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
export default Navbar;