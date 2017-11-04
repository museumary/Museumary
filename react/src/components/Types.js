import React from 'react';
import { Switch, Route } from 'react-router-dom';
import FullTypes from './FullTypes';
import Type from './Type';

const Types = () => {
  return (<div className="Types">
            <Switch>
                <Route exact path='/types' component={FullTypes} />
                <Route path='/types/:number' component={Type} />
            </Switch>
          </div>);
};

export default Types;
