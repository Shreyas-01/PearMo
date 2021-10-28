import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Creators from './Togglers/Creators/Creators';
import Feed from './Togglers/Feed/Feed';
import Sponsors from './Togglers/Sponsors/Sponsors';
import FreelanceMp from './Togglers/FreelanceMp/FreelanceMp';

const  RightPanel = () => {
    return (
        <div>
            <Switch>
                <Route path="/main/sponsors" component={Sponsors} />
                <Route path="/main/creators" component={Creators} />
                <Route path="/main/freelancing" component={FreelanceMp} />
                <Route path="/main/feed" component={Feed} />
            </Switch>
        </div>
    );
}

export default RightPanel;