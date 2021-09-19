import './Main.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import NavBar from '../../components/NavBar/NavBar';
import LeftPanel from '../../components/LeftPanel/LeftPanel';
import Footer from '../../components/Footer/Footer';
import RightPanel from '../../components/RightPanel/RightPanel';

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