import React from 'react';
import CarouselInstance from './components/CarouselInstance';
import Twitter from './components/Twitter';
import style from './Home.css'

const Home = () => {
  	return (
        <div className="Home">
            <CarouselInstance />
            <div className="Home-banner"/>
            <Twitter />
        </div>);
};

export default Home;
