/*
    Static About Page that shows each member of our group.
    Contains the list of tools, repos, uml, data and report links.
*/

import React from 'react';
import 'static/css/About.css';

/* Import Images */
import Josh from 'static/images/josh_profile.jpg';
import Kelly from 'static/images/kelly_profile.jpg';
import Kenny from 'static/images/kenny_profile.jpg';
import Trenton from 'static/images/trenton_profile.jpg';
import Max from 'static/images/max_profile.jpg';

const About = () => {
    return (
        <div className="About">
            {/* Page Header: Description of site, intended users, and purpose */}
            <h1><strong>Culture<a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">.</a> Just a click away.</strong></h1>
            <div className="jumbotron"/>
            <div className="divider"/>
            <div className="page-header">
                <p>Here at Museumary, we are dedicated to building and maintaining an internet database of art.<br/>Familiarize yourself with art from around the world. Our database gives you access to a large assortment of artistic pieces.<br/> Feel free to browse our collection, or scroll down for some team information!</p>
                <br/>
            </div>

            {/* Group Name and Members */}
            <div className="container">
                <h1><strong>Members of Team Museumary</strong></h1>
                <div className="row">
                    <div className="col-md-6">
                        <img src={ Kenny } className="img-circle" alt="Kenny" width="256" height="256" />
                        <h2><strong>Kenny Le</strong></h2>
                        <p>Hello, Kenny here! I am a Computer Science major at UT and I am graduating this year. I really appreciate the group leader.</p>
                        <p><strong>Responsibilities:</strong><br/> With the frontend team, worked on pagination and filtering. Focused on quality assurance to maintain a well constructed website.</p>
                        <p><strong>No. of Commits:</strong> 49<br/><strong>No. of Issues:</strong> 12<br/><strong>No. of Tests:</strong> 3</p>
                    </div>
                    <div className="col-md-6">
                        <img src={ Josh } className="img-circle" alt="Josh" width="256" height="256" />
                        <h2><strong>Josh Morris</strong></h2>
                        <p>4th year Computer Science major at the University of Texas at Austin. I enjoy Mexican food, being active, and playing Rocket League.</p>
                        <p><strong>Responsibilities:</strong><br/> Worked on creating the database and structuring it to JSON format. Worked with the backend team.</p>
                        <p><strong>No. of Commits:</strong> 10<br/><strong>No. of Issues:</strong> 6<br/><strong>No. of Tests:</strong> 30</p>
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
                    <p><strong>No. of Commits:</strong> 47<br/><strong>No. of Issues:</strong> 20<br/><strong>No. of Tests:</strong> 8</p>
                </div>
                <div className="col-md-6">
                    <img src={ Trenton } className="img-circle" alt="Trenton" width="256" height="256" />
                    <h2><strong>Trenton Strahan</strong></h2>
                    <p>A 4th year Computer Science major at UT with a minor in RTF. Very excited for Software Engineering this semester. Houston sports fan. Go 'Stros!</p>
                    <p><strong>Responsibilities:</strong><br/> Designed and built the home page and the about page. Worked as a frontend designer. Helped with pagination and model pages.</p>
                    <p><strong>No. of Commits:</strong> 42<br/><strong>No. of Issues:</strong> 7<br/><strong>No. of Tests:</strong> 0</p>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 col-md-offset-3">
                    <img src={ Max } className="img-circle" alt="Max" width="256" height="256" />
                    <h2><strong>Max West</strong></h2>
                    <p>This is my 4th year as a Computer Science major at UT. After graduation I am moving to Seattle to work for Amazon Publishing. I like long walks on the beach and Ruby on Rails.</p>
                    <p><strong>Responsibility:</strong><br/> Used React to build the front end of the website. Queried the database for information and then displayed that accordingly.</p>
                    <p><strong>No. of Commits:</strong>  38<br/><strong>No. of Issues:</strong> 7<br/><strong>No. of Tests:</strong> 5</p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="page-header"/>
            <h1>Stats</h1>
            <p><strong>Total No. of Commits:</strong> 232<br/><strong>Total No. of Issues:</strong> 52
            <br/><strong>Total No. of Tests:</strong> 46</p>
            <p><a href="http://docs.museumary.apiary.io/#"><strong>Apiary API</strong></a>
            <br/>
            <a href="https://github.com/museumary/Museumary"><strong>GitHub Repo</strong></a>
            <br/>
            <a href="https://trello.com/b/IB76HZxe/project-2-idb"><strong>Trello</strong></a>
            </p>

            <div className="page-header"/>

            <div className="container">
                {/* Data */}
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
                    <div>
                      <p>
                        In order to populate our database with with many instances of each model, we wrote various data scraping scripts to extract information from websites.
                        Each scraping script focused on pulling out data from a different museum’s website. We chose to write a unique script for each website largely because
                        the api’s for each museum differed  wildly. For more information about the process we went through to scrape our data, please refer to our technical report below.
                      </p>
                    </div>
                </div>
                <br/>

                {/* Tools */}
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
                  <p>To read more about the tools used, our API, and the APIs used visit our technical report <a href="https://utexas.box.com/s/fwnt1oocmlbve93yc60xickosb1i2crv"><strong>here</strong></a> and <a href="https://utexas.box.com/s/dqdsxrdrsb72qdutnek4kgxbiz9r5qg4"><strong>UML</strong></a></p>
                </div>
            </div>
            <br/><br/><br/>
        </div>);
};

export default About;
