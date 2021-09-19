import './HomePage.css';
import { Link } from "react-router-dom";

const HomePage = () => {
    return (
        <div className="homepage">
            <h1>HomePage</h1>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
            <Link to="/joinus">Joinus</Link>
        </div>
    );
}

export default HomePage;