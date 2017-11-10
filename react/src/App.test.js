import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import FullArtists from './components/FullArtists';
import FullTypes from './components/FullTypes';
import FullVenues from './components/FullVenues';
import FullWorks from './components/FullWorks';
import About from './components/About';

it('loads the full artists page without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<FullArtists />, div);
})

it('loads the full types page without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<FullTypes />, div);
})

it('loads the full venues page without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<FullVenues />, div);
})

it('loads the full works page without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<FullWorks />, div);
})

it('loads the about page without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<About />, div);
})
