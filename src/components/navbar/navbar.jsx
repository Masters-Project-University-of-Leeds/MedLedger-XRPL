import './navbar.scss';

import { Link } from 'react-router-dom';

const Navbar = () => {
    // const location = useLocation();

    // useEffect(() => {
    //     // This effect will run every time the location (route) changes.
    //     // Currently, it's not doing anything, but you can add code here if you want to perform some actions when the route changes.
    // }, [location]);

    return (
        <div className="navbar">
            <Link to="/" className="logo">
                FHIR XRPL
            </Link>
            {!localStorage.getItem('token') ? (
                <div className="nav-links">
                    <Link to="/login" className="nav-link">
                        Login
                    </Link>
                </div>
            ) : (
                <div className="nav-links">
                    <Link to="/" className="nav-link" onClick={() => localStorage.removeItem('token')}>
                        Logout
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Navbar;
