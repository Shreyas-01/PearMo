import './LeftPanel.css';
import React from 'react';
import { Link } from "react-router-dom";

const Login = () => {
    return (
        <div className="left-panel">
            <Link to="/main/creators">Creator</Link>
            <Link to="/main/sponsors">Sponsor</Link>
            <Link to="/main/feed">Feed</Link>
            <Link to="/main/freelancing">Freelancing</Link>
        </div>
    );
}

export default Login;