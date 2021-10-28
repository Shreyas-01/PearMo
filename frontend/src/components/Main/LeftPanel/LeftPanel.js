import './LeftPanel.css';
import React, { useState } from 'react';
import { Link } from "react-router-dom";

const Login = () => {
    const LinkClass = [
        ["active", "", "", ""],
        ["", "active", "", ""],
        ["", "", "active", ""],
        ["", "", "", "active"]
    ];
    const [idx, setIdx] = useState(0);
    return (
        <div className="left-panel">
            <Link onClick={() => setIdx(0)} className={LinkClass[idx][0]} style={{margin: 0, padding: "10px 15px"}} to="/main/feed">Feed</Link>
            <Link onClick={() => setIdx(1)} className={LinkClass[idx][1]} style={{margin: 0, padding: "10px 15px"}} to="/main/creators">Creators</Link>
            <Link onClick={() => setIdx(2)} className={LinkClass[idx][2]} style={{margin: 0, padding: "10px 15px"}} to="/main/sponsors">Sponsors</Link>
            <Link onClick={() => setIdx(3)} className={LinkClass[idx][3]} style={{margin: 0, padding: "10px 15px"}} to="/main/freelancing">Freelance Marketplace</Link>
        </div>
    );
}

export default Login;