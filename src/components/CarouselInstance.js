/*
    Big Carousel instance in the home page with static images
*/

import React from 'react';
import { Carousel } from 'react-bootstrap';

import Guernica from 'static/images/Guernica.jpg';
import Starry_Night from 'static/images/Starry_Night.jpg';
import American_Gothic from 'static/images/American_Gothic.jpg';
import Creation_Adam from 'static/images/Creation_of_Adam.jpg';

/* Carousel Component: to be used throughout the website */
const CarouselInstance = () => {
    return (
        <div className="CarouselInstance">
            <Carousel>
                <Carousel.Item>
                    {/* Carousel Item: takes image and caption */}
                    <img className="carousel-image" src={ Guernica } alt={"Guernica"} width="3200" height="1200"/>
                    <Carousel.Caption>
                        <h3>Guernica</h3>
                        <p>Pablo Picasso, 1937</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img className="carousel-image" src={ Starry_Night } alt={"Starry Night"} width="3200" height="1200"/>
                    <Carousel.Caption>
                        <h3>Starry Night</h3>
                        <p>Vincent Van Gogh, 1889</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img className="carousel-image" src={ American_Gothic } alt={"American Gothic"} width="3200" height="1200"/>
                    <Carousel.Caption>
                        <h3>American Gothic</h3>
                        <p>Grant Wood, 1930</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img className="carousel-image" src={ Creation_Adam } alt={"The Creation of Adam"} width="3200" height="1200"/>
                    <Carousel.Caption>
                        <h3>The Creation of Adam</h3>
                        <p>Michelangelo, 1512</p>
                    </Carousel.Caption>
                </Carousel.Item>
        </Carousel>
        </div>
    );
};

export default CarouselInstance;
