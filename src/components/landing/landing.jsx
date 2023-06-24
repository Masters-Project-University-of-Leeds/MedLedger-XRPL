import './landing.scss';

import { Link } from 'react-router-dom';

const Landing = () => {
    return (
        <div className="landing-page">
            <h1>Welcome to FHIR XRPL!</h1>
            <div className="button-group">
                <Link to="/login" className="button">
                    Login
                </Link>
                <Link to="/registration" className="button">
                    Register
                </Link>
            </div>
        </div>
    );
};

export default Landing;
