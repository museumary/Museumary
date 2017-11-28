
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from 'components/Home';

import {
    ArtistPage,
    TypePage,
    VenuePage,
    WorkPage
} from 'components/Models/SinglePages'

// import Artist from './components/Artist';
// import Work from './components/Work';
// import Type from './components/Type';
// import Venue from './components/Venue';
import About from 'components/About';

import SearchResults from 'components/SearchResults';

import {
    FullWorks,
    FullArtists,
    FullTypes,
    FullVenues
} from 'components/Models/FullPages'

const Main = () => {
    return (
        <div className='Main'>
            <Switch>
                <Route exact path='/' component={Home}/>

                <Route exact path='/artists/:number' component={ArtistPage} />
                <Route exact path='/works/:number' component={WorkPage} />
                <Route exact path='/types/:number' component={TypePage} />
                <Route exact path='/venues/:number' component={VenuePage} />

                <Route path='/artists' component={FullArtists} />
                <Route path='/works' component={FullWorks} />
                <Route path='/types' component={FullTypes} />
                <Route path='/venues' component={FullVenues} />

                <Route path='/about' component={About}/>
                <Route path='/results' component={SearchResults}/>
            </Switch>
        </div>
    );
};

export default Main;
