import React from 'react';
import Guernica from './static/images/Guernica.jpg';
import Starry_Night from './static/images/Starry_Night.jpg';
import American_Gothic from './static/images/American_Gothic.jpg';

const Carousel = () => {
  return (
  	<div className="Carousel">
      	<div id="myCarousel" className="carousel slide" data-ride="carousel">
	        <ol className="carousel-indicators">
	          <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
	          <li data-target="#myCarousel" data-slide-to="1"></li>
	          <li data-target="#myCarousel" data-slide-to="2"></li>
	        </ol>

	        <div className="carousel-inner">
	          <div className="item">
	          	<img className="carousel-image" src={ Guernica } alt={"Guernica"} width="3200" height="1200"/>
	          </div>

	          <div className="item active">
	          	<img className="carousel-image" src={ Starry_Night } alt={"Starry Night"} width="3200" height="1200"/>
	          </div>

	          <div className="item">
	          	<img className="carousel-image" src={ American_Gothic } alt={"American Gothic"} width="3200" height="1200"/>
	          </div>
	        </div>

        
	        <a className="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
	          <span className="glyphicon glyphicon-chevron-left"></span>
	          <span className="sr-only">Previous</span>
	        </a>
	        <a className="right carousel-control" href="#myCarousel" role="button" data-slide="next">
	          <span className="glyphicon glyphicon-chevron-right"></span>
	          <span className="sr-only">Next</span>
	        </a>
      	</div>
  	</div>);
};

export default Carousel;
