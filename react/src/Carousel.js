import React from 'react';

const Carousel = () => {
  return (<div className="Carousel">
		      <div id="myCarousel" className="carousel slide" data-ride="carousel">
		        
		        <ol className="carousel-indicators">
		          <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
		          <li data-target="#myCarousel" data-slide-to="1"></li>
		          <li data-target="#myCarousel" data-slide-to="2"></li>
		        </ol>

		        
		        <div className="carousel-inner">
		          <div className="item active">
		          	<img className="carousel-image" src="../static/images/Guernica.jpg" alt="Guernica" width="3200" height="1200"></img>
		          </div>

		          <div className="item">
		          	<img className="carousel-image" src="../static/images/Starry_Night.jpg" alt="Starry Night" width="3200" height="1200"></img>
		          </div>

		          <div className="item">
		          	<img className="carousel-image" src="../static/images/American_Gothic.jpg" alt="American Gothic" width="3200" height="1200"></img>
		          </div>
		        </div>

		        
		        <a className="left carousel-control" href="#myCarousel" data-slide="prev">
		          <span className="glyphicon glyphicon-chevron-left"></span>
		          <span className="sr-only">Previous</span>
		        </a>
		        <a className="right carousel-control" href="#myCarousel" data-slide="next">
		          <span className="glyphicon glyphicon-chevron-right"></span>
		          <span className="sr-only">Next</span>
		        </a>
		      </div>
          </div>);
};

export default Carousel;
