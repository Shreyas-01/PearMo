import './NotFound.css';
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="not-found">
            <h1>This page cannot be found</h1>
            <Link to="/">
                Back to homepage...
            </Link>
        </div>
    );
}

export default NotFound;