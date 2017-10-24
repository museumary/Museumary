import React from 'react';
<<<<<<< HEAD
import { Switch, Route } from 'react-router-dom'
import Josh from './static/images/josh_profile.jpg';
import Kelly from './static/images/kelly_profile.jpg';
import Kenny from './static/images/kenny_profile.jpg';
import Trenton from './static/images/trenton_profile.jpg';
import Max from './static/images/max_profile.jpg';
=======
// import { Switch, Route } from 'react-router-dom'
>>>>>>> upstream/master

const About = () => {
  return (
          <div className="About">
            <div className="page-header">
              <h1>Culture. Just a click away.</h1>
              <p>Here at Museumary (a working title), we are dedicated to building and maintaining an internet database of art.<br/>Familiarize yourself with art from around the world. Our database gives you access to a large assortment of artistic pieces.<br/> Feel free to browse our collection.</p>
              <br/>
            </div>
            <div className="container">
              <h1><strong>Members of Team <br/> Museumary</strong></h1>
              <div className="row">
                <div className="col-md-6">
                  <h2>Kenny Le</h2>
                  <img src={ Kenny } className="img-rounded" alt="Kenny" width="256" height="256" />
                  <p>Hello, Kenny here! I am a Computer Science major at UT and I am graduating this year. I really appreciate the group leader.</p>
                  <p><strong>Responsibilities:</strong><br/> With the backend team, worked on setting up our domain. Focused on quality assurance to maintain a well constructed website.</p>
                  <p><strong>No. of Commits:</strong> 8<br/><strong>No. of Issues:</strong> 3<br/><strong>No. of Tests:</strong> 0</p>
                </div>
                <div className="col-md-6">
                  <h2>Josh Morris</h2>
                  <img src={ Josh } className="img-rounded" alt="Josh" width="256" height="256" />
                  <p>4th year Computer Science major at the University of Texas at Austin. I enjoy Mexican food, being active, and playing Rocket League.</p>
                  <p><strong>Responsibilities:</strong><br/> Worked on creating the database and structuring it to JSON format. Worked with the backend team.</p>
                  <p><strong>No. of Commits:</strong> 4<br/><strong>No. of Issues:</strong> 2<br/><strong>No. of Tests:</strong> 0</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <h2>Kelly Nguyen</h2>
                  <img src={ Kelly } className="img-rounded" alt="Kelly" width="256" height="256" />
                  <p>3rd year Computer Science major at UT. I am 20 years old and I have 3 cats. There names are Poncho, Magpie, Pigeon.</p>
                  <p><strong>Responsibilities:</strong><br/> Designed our apiary.io. Used Flask and other tools for backend work.</p>
                  <p><strong>No. of Commits:</strong> 11<br/><strong>No. of Issues:</strong> 7<br/><strong>No. of Tests:</strong> 0</p>
                </div>
                <div className="col-md-6">
                  <h2>Trenton Strahan</h2>
                  <img src={ Trenton } className="img-rounded" alt="Trenton" width="256" height="256" />
                  <p>A 4th year Computer Science major at UT with a minor in RTF. Very excited for Software Engineering this semester. Big sports fan. Houston sports for life!</p>
                  <p><strong>Responsibilities:</strong><br/> Designed and built the home page and the about page. Coordinated with team as teh group leader.</p>
                  <p><strong>No. of Commits:</strong> 11<br/><strong>No. of Issues:</strong> 1<br/><strong>No. of Tests:</strong> 0</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                  <h2>Max West</h2>
                  <img src={ Max } className="img-rounded" alt="Max" width="256" height="256" />
                  <p>This is my 4th year as a Computer Science major at UT. After graduation I am moving to Seattle to work for Amazon Publishing. I like long walks on the beach and Ruby on Rails.</p>
                  <p><strong>Responsibility:</strong> "insert here"</p>
                  <p><strong>No. of Commits:</strong>  "insert here"<br/><strong>No. of Issues:</strong> "insert here"<br/><strong>No. of Tests:</strong> "insert here"</p>
                </div>
                <div className="col-md-3"></div>
              </div>
            </div>
<<<<<<< HEAD

            <div className="page-header"/>

            <div className="container">
              <h1>Stats</h1>
              <div className="row">
=======
            
            <div class="page-header"></div>
            <div class="container">
              <h1>Stats</h1>
              <div class="row">
>>>>>>> upstream/master
                <p><strong>Total No. of Commits:</strong> 39<br/><strong>Total No. of Issues:</strong> 15
                  <br/><strong>Total No. of Tests:</strong> 0</p>
                <p><a href="http://docs.museumary.apiary.io/#"><strong>Apiary API</strong></a>
                  <br/>
                  <a href="https://github.com/museumary/Museumary"><strong>GitHub Repo</strong></a>
                  <br/>
                  <a href="https://trello.com/b/IB76HZxe/project-2-idb"><strong>Trello</strong></a>
                </p>
              </div>
            </div>
<<<<<<< HEAD
            
            <div className="page-header"></div>

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
=======

            <div class="page-header"></div>
            <div class="container">
              <h1>Data Sources</h1>
              <div class="row">
                <div class="col-md-4">
                  <a href="https://collection.cooperhewitt.org/api/"><p><strong>Cooper Hewitt API</strong></p></a>
                </div>
                <div class="col-md-4">
                  <a href="http://www.harvardartmuseums.org/collections/api"><p><strong>Harvard Art Museum API</strong></p></a>
                </div>
                <div class="col-md-4">
>>>>>>> upstream/master
                  <a href="http://kokoelmat.fng.fi/api/v2support/docs/#/documentation"><p><strong>Finnish National Gallery API</strong></p></a>
                </div>
                <div><p>As it is now, our sources are a being used for the database information. We have not started actually scraping the data and therefore had to manually get the information. For the future projects we will scrape the information automatically.</p></div>
              </div>

              <br/>

              <h1>Tools Used</h1>
<<<<<<< HEAD
              <div className="row">
                <div className="col-md-4">
                  <p><strong>Required Tools:</strong><br/>Apiary, Bootstrap, React, Flask, GitHub, Trello, PlanItPoker, and Slack</p>
                </div>
                <div className="col-md-4">
                  <p><strong>Additional Tools:</strong><br/>Jinja</p>
                </div>
                <div className="col-md-4">
=======
              <div class="row">
                <div class="col-md-4">
                  <p><strong>Required Tools:</strong><br/>Apiary, Bootstrap, React, Flask, GitHub, Trello, PlanItPoker, and Slack</p>
                </div>
                <div class="col-md-4">
                  <p><strong>Additional Tools:</strong><br/>Jinja</p>
                </div>
                <div class="col-md-4">
>>>>>>> upstream/master
                  <p><strong>Tools Descriptions:</strong><br/>For an in depth description of our tools used, see the below link to our technical report.</p>
                </div>
              </div>
              <br/><br/><br/>
              <div>
                <p>To read more about the tools used, our API, and the APIs used visit our technical report <a href="https://utexas.box.com/s/vd7fp4iccgq81thvhvmh3g1gioednu68"><strong>here</strong></a></p>
              </div>
            </div>
            <br/><br/><br/>
<<<<<<< HEAD
          </div>
        


          );
=======
          </div>);
>>>>>>> upstream/master
};

export default About;
