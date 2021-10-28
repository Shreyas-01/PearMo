import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { useState } from 'react';

import NotFound from './components/NotFound/NotFound';
import JoinUs from './components/JoinUs/JoinUs';
import HomePage from './components/HomePage/HomePage';
import Main from './components/Main/Main';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import Account from './components/Account/Account';
import Profile from './components/Profile/Profile';
import ProfileSettings from './components/Profile/ProfileSettings/ProfileSettings';

export const UserDataContext = React.createContext();

function App() {
    const [userData, setUserData] = useState({});
    return (
        <UserDataContext.Provider value = {{userData, setUserData}}>
            <Router>
                <Switch>
                    <Route exact path="/"  component={HomePage} />
                    <Route exact path="/login"  component={Login} />
                    <Route exact path="/signup"  component={SignUp} />
                    <Route exact path="/joinus"  component={JoinUs} />
                    <Route path="/main"  component={Main} />
                    <Route exact path="/account/:userId"  component={Account} />
                    <Route exact path="/profile"  component={Profile} />
                    <Route exact path="/profilesettings"  component={ProfileSettings} />
                    <Route path="*"  component={NotFound} />
                </Switch>
            </Router>
        </UserDataContext.Provider>
    );
}

export default App;