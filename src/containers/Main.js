/*
    Main Component that handles all the routing for our application
*/

import React from 'react';
import { Switch, Route } from 'react-router-dom';

/* Import Single Pages */
import {
    ArtistPage,
    TypePage,
    VenuePage,
    WorkPage
} from 'components/Models/SinglePages'

/* Import FullPages */
import {
    FullWorks,
    FullArtists,
    FullTypes,
    FullVenues
} from 'components/Models/FullPages'

import Home from 'components/Home';
import About from 'components/About';
import SearchResults from 'components/SearchResults';

const Main = () => {
    return (
        <div className='Main'>
            <Switch>
                <Route exact path='/' component={Home}/>

                { /* Route Single Pages based on exact match */ }
                <Route exact path='/artists/:number' component={ArtistPage} />
                <Route exact path='/works/:number' component={WorkPage} />
                <Route exact path='/types/:number' component={TypePage} />
                <Route exact path='/venues/:number' component={VenuePage} />

                { /* Route FullPages with search option */ }
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
