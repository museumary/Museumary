/*
    Static HomePage -- has a big carousel and twitter feeds
*/

import React from 'react';
import CarouselInstance from './CarouselInstance';
import Twitter from './Twitter';

const Home = () => {
  	return (
        <div className="Home">
            <CarouselInstance />
            <div className="Home-banner"/>
            <Twitter />
        </div>
    );
};

export default Home;
