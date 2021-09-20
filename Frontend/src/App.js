import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { useState } from 'react';

import NotFound from './Components/NotFound/NotFound';
import JoinUs from './Components/JoinUs/JoinUs';
import HomePage from './Components/HomePage/HomePage';
import Main from './Components/Main/Main';
import Login from './Components/Login/Login';
import SignUp from './Components/SignUp/SignUp';

export const UserDataContext = React.createContext();

function App() {
    const [userData, setUserData] = useState('');
    return (
        <UserDataContext.Provider value={userData}>
            <Router>
                <Switch>
                    <Route exact path="/"  component={HomePage} />
                    <Route exact path="/login"  component={Login} />
                    <Route exact path="/signup"  component={SignUp} />
                    <Route exact path="/joinus"  component={JoinUs} />
                    <Route path="/main"  component={Main} />
                    <Route path="*"  component={NotFound} />
                </Switch>
            </Router>
        </UserDataContext.Provider>
    );
}

export default App;