import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import Artists from './Artists';
import Venues from './Venues';
import Types from './Types';
import Works from './Works';

const Main = () => {
  return (<div className='Main'>
            <Switch>
              <Route exact path='/' component={Home}/>
              <Route path='/artists' component={Artists}/>
              <Route path='/venues' component={Venues}/>
              <Route path='/types' component={Types}/>
              <Route path='/works' component={Works}/>
            </Switch>
          </div>);
};

export default Main;
