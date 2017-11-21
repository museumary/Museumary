import React from 'react';
import { Switch, Route } from 'react-router-dom';
import FullVenues from './FullVenues';
import Venue from './Venue';

const Venues = () => {
    return (
        <div className="Venues">
            <Switch>
                <Route exact path='/venues/:number' component={Venue} />
                <Route path='/venues' component={FullVenues} />
            </Switch>
        </div>
    );
};

export default Venues;
