import './Main.css';
import React from 'react';

import NavBar from './NavBar/NavBar';
import LeftPanel from './LeftPanel/LeftPanel';
import Footer from '../Footer/Footer';
import RightPanel from './RightPanel/RightPanel';

const Main = () => {
    return (
        <div className="main">
            <NavBar />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-3 nopadding">
                        <LeftPanel />
                    </div>
                    <div className="col-sm-9">
                        <RightPanel />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
        
    );
}

export default Main;