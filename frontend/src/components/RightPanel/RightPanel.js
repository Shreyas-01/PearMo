import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Creators from '../../pages/Main/Creators/Creators';
import Feed from '../../pages/Main/Feed/Feed';
import Sponsors from '../../pages/Main/Sponsors/Sponsors';
import FreelanceMp from '../../pages/Main/FreelanceMp/FreelanceMp';

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