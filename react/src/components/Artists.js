import React from 'react';
import { Switch, Route } from 'react-router-dom';
import FullArtists from './FullArtists';
import Artist from './Artist';

const Artists = () => {
    return (
        <div className="Artists">
            <Switch>
                <Route exact path='/artists' component={FullArtists} />
                <Route path='/artists/:number' component={Artist} />
            </Switch>
        </div>
    );
};

export default Artists;
