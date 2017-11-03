import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import Artists from './components/Artists';
import Venues from './components/Venues';
import Types from './components/Types';
import Works from './components/Works';
import About from './components/About';

const Main = () => {
  return (<div className='Main'>
            <Switch>
              <Route exact path='/' component={Home}/>
              <Route path='/artists' component={Artists}/>
              <Route path='/venues' component={Venues}/>
              <Route path='/types' component={Types}/>
              <Route path='/works' component={Works}/>
              <Route path='/about' component={About}/>
            </Switch>
          </div>);
};

export default Main;
