import React from 'react';
import { Switch, Route } from 'react-router-dom';
import FullWorks from './FullWorks';
import Work from './Work';

const Works = () => {
  return (<div className="Works">
            <Switch>
                <Route exact path='/works' component={FullWorks} />
                <Route path='/works/:number' component={Work} />
            </Switch>
          </div>);
};

export default Works;
