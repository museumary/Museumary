import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import style from './About.css';

import Josh from '../static/images/josh_profile.jpg';
import Kelly from '../static/images/kelly_profile.jpg';
import Kenny from '../static/images/kenny_profile.jpg';
import Trenton from '../static/images/trenton_profile.jpg';
import Max from '../static/images/max_profile.jpg';

const About = () => {
    return (
        <div className="About">
            <h1><strong>Culture<a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">.</a> Just a click away.</strong></h1>
            <div className="jumbotron"/>
            <div className="divider"/>
            <div className="page-header">
                <p>Here at Museumary, we are dedicated to building and maintaining an internet database of art.<br/>Familiarize yourself with art from around the world. Our database gives you access to a large assortment of artistic pieces.<br/> Feel free to browse our collection, or scroll down for some team information!</p>
                <br/>
            </div>
            <div className="container">
                <h1><strong>Members of Team Museumary</strong></h1>
                <div className="row">
                    <div className="col-md-6">
                        <img src={ Kenny } className="img-circle" alt="Kenny" width="256" height="256" />
                        <h2><strong>Kenny Le</strong></h2>
                        <p>Hello, Kenny here! I am a Computer Science major at UT and I am graduating this year. I really appreciate the group leader.</p>
                        <p><strong>Responsibilities:</strong><br/> With the backend team, worked on setting up our domain. Focused on quality assurance to maintain a well constructed website.</p>
                        <p><strong>No. of Commits:</strong> 18<br/><strong>No. of Issues:</strong> 9<br/><strong>No. of Tests:</strong> 2</p>
                    </div>
                    <div className="col-md-6">
                        <img src={ Josh } className="img-circle" alt="Josh" width="256" height="256" />
                        <h2><strong>Josh Morris</strong></h2>
                        <p>4th year Computer Science major at the University of Texas at Austin. I enjoy Mexican food, being active, and playing Rocket League.</p>
                        <p><strong>Responsibilities:</strong><br/> Worked on creating the database and structuring it to JSON format. Worked with the backend team.</p>
                        <p><strong>No. of Commits:</strong> 9<br/><strong>No. of Issues:</strong> 3<br/><strong>No. of Tests:</strong> 8</p>
                    </div>
            </div>
                <br/>
                <br/>
                <br/>
            <div className="row">
                <div className="col-md-6">
                    <img src={ Kelly } className="img-circle" alt="Kelly" width="256" height="256" />
                    <h2><strong>Kelly Nguyen</strong></h2>
                    <p>3rd year Computer Science major at UT. I am 20 years old and I have 3 cats. There names are Poncho, Magpie, Pigeon.</p>
                    <p><strong>Responsibilities:</strong><br/> Designed our apiary.io. Used Flask and other tools for backend work.</p>
                    <p><strong>No. of Commits:</strong> 29<br/><strong>No. of Issues:</strong> 13<br/><strong>No. of Tests:</strong> 5</p>
                </div>
                <div className="col-md-6">
                    <img src={ Trenton } className="img-circle" alt="Trenton" width="256" height="256" />
                    <h2><strong>Trenton Strahan</strong></h2>
                    <p>A 4th year Computer Science major at UT with a minor in RTF. Very excited for Software Engineering this semester. Big sports fan. Houston sports for life!</p>
                    <p><strong>Responsibilities:</strong><br/> Designed and built the home page and the about page. Coordinated with team as the group leader.</p>
                    <p><strong>No. of Commits:</strong> 32<br/><strong>No. of Issues:</strong> 3<br/><strong>No. of Tests:</strong> 0</p>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 col-md-offset-3">
                    <img src={ Max } className="img-circle" alt="Max" width="256" height="256" />
                    <h2><strong>Max West</strong></h2>
                    <p>This is my 4th year as a Computer Science major at UT. After graduation I am moving to Seattle to work for Amazon Publishing. I like long walks on the beach and Ruby on Rails.</p>
                    <p><strong>Responsibility:</strong><br/> Used React to build the front end of the website. Queried the database for information and then displayed that accordingly.</p>
                    <p><strong>No. of Commits:</strong>  25<br/><strong>No. of Issues:</strong> 4<br/><strong>No. of Tests:</strong> 0</p>
                </div>
              </div>
            </div>

            <div className="page-header"/>
            <h1>Stats</h1>
            <p><strong>Total No. of Commits:</strong> 146<br/><strong>Total No. of Issues:</strong> 31
            <br/><strong>Total No. of Tests:</strong> 15</p>
            <p><a href="http://docs.museumary.apiary.io/#"><strong>Apiary API</strong></a>
            <br/>
            <a href="https://github.com/museumary/Museumary"><strong>GitHub Repo</strong></a>
            <br/>
            <a href="https://trello.com/b/IB76HZxe/project-2-idb"><strong>Trello</strong></a>
            </p>


            <div className="page-header"/>

            <div className="container">
                <h1>Data Sources</h1>
                <div className="row">
                    <div className="col-md-4">
                        <a href="https://collection.cooperhewitt.org/api/"><p><strong>Cooper Hewitt API</strong></p></a>
                    </div>
                    <div className="col-md-4">
                        <a href="http://www.harvardartmuseums.org/collections/api"><p><strong>Harvard Art Museum API</strong></p></a>
                    </div>
                    <div className="col-md-4">
                        <a href="http://kokoelmat.fng.fi/api/v2support/docs/#/documentation"><p><strong>Finnish National Gallery API</strong></p></a>
                    </div>
                <div><p>INSERT SCRAPING INFO</p></div>
              </div>

              <br/>

              <h1>Tools Used</h1>
              <div className="row">
                  <div className="col-md-4">
                      <p><strong>Required Tools:</strong><br/>Apiary, Bootstrap, React, Flask, GitHub, Trello, PlanItPoker, and Slack</p>
                  </div>
                  <div className="col-md-4">
                      <p><strong>Additional Tools:</strong><br/>Jinja, W3Schools</p>
                  </div>
                  <div className="col-md-4">
                      <p><strong>Tools Descriptions:</strong><br/>For an in depth description of our tools used, see the below link to our technical report.</p>
                  </div>
              </div>
              <br/><br/><br/>
              <div>
                <p>To read more about the tools used, our API, and the APIs used visit our technical report <a href="https://utexas.box.com/s/vd7fp4iccgq81thvhvmh3g1gioednu68"><strong>here</strong></a> and <a href="https://utexas.box.com/s/dqdsxrdrsb72qdutnek4kgxbiz9r5qg4"><strong>UML</strong></a></p>
              </div>
          </div>
          <br/><br/><br/>
      </div>);
};

export default About;
