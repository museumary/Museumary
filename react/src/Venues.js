import React from 'react';
import { Switch, Route } from 'react-router-dom';
import FullVenues from './FullVenues';
import Venue from './Venue';

const Venues = () => {
  return (<div className="Venues">
            <Switch>
              <Route exact path='/Venues' component={FullVenues} />
              <Route path='/Venues/:number' component={Venue} />
            </Switch>
          </div>);
};

export default Venues;
