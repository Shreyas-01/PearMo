import './Main.css';
import React from 'react';

import NavBar from './NavBar/NavBar';
import LeftPanel from './LeftPanel/LeftPanel';
import Footer from '../Footer/Footer';
import RightPanel from './RightPanel/RightPanel';

const Main = () => {
    return (
        <div className="main">
            <h1>Main</h1>
            <NavBar />
            <LeftPanel />
            <RightPanel />
            <Footer />
        </div>
    );
}

export default Main;