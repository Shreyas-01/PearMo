import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { useState } from 'react';

import NotFound from './pages/NotFound/NotFound';
import JoinUs from './pages/JoinUs/JoinUs';
import HomePage from './pages/HomePage/HomePage';
import Main from './pages/Main/Main';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';

export const UserDataContext = React.createContext();

function App() {
    const {User, setUser} = useState({});

    return (
        <UserDataContext.Provider value={User}>
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