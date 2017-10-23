import React from 'react';
import { Switch, Route } from 'react-router-dom'

const About = () => {
  return (<div className="About">
            <div class="page-header">
              <h1>Culture. Just a click away.</h1>
              <p>Here at Museumary (a working title), we are dedicated to building and maintaining an internet database of art.<br/>Familiarize yourself with art from around the world. Our database gives you access to a large assortment of artistic pieces.<br/> Feel free to browse our collection.</p>
              <br/>
            </div>
            <div class="container">
              <h1><strong>Members of Team <br/> Museumary</strong></h1>
              <div class="row">
                <div class="col-md-6">
                  <h2>Kenny Le</h2>
                  <img src="../images/kenny_profile.jpg" class="img-rounded" alt="Kenny" width="256" height="256" />
                  <p>Hello, Kenny here! I am a Computer Science major at UT and I am graduating this year. I really appreciate the group leader.</p>
                  <p><strong>Responsibilities:</strong><br/> With the backend team, worked on setting up our domain. Focused on quality assurance to maintain a well constructed website.</p>
                  <p><strong>No. of Commits:</strong> 8<br/><strong>No. of Issues:</strong> 3<br/><strong>No. of Tests:</strong> 0</p>
                </div>
                <div class="col-md-6">
                  <h2>Josh Morris</h2>
                  <img src="../images/josh_profile.jpg" class="img-rounded" alt="Josh" width="256" height="256" />
                  <p>4th year Computer Science major at the University of Texas at Austin. I enjoy Mexican food, being active, and playing Rocket League.</p>
                  <p><strong>Responsibilities:</strong><br/> Worked on creating the database and structuring it to JSON format. Worked with the backend team.</p>
                  <p><strong>No. of Commits:</strong> 4<br/><strong>No. of Issues:</strong> 2<br/><strong>No. of Tests:</strong> 0</p>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <h2>Kelly Nguyen</h2>
                  <img src="../images/kelly_profile.jpg" class="img-rounded" alt="Kelly" width="256" height="256" />
                  <p>3rd year Computer Science major at UT. I am 20 years old and I have 3 cats. There names are Poncho, Magpie, Pigeon.</p>
                  <p><strong>Responsibilities:</strong><br/> Designed our apiary.io. Used Flask and other tools for backend work.</p>
                  <p><strong>No. of Commits:</strong> 11<br/><strong>No. of Issues:</strong> 7<br/><strong>No. of Tests:</strong> 0</p>
                </div>
                <div class="col-md-6">
                  <h2>Trenton Strahan</h2>
                  <img src="../images/trenton_profile.jpg" class="img-rounded" alt="Trenton" width="256" height="256" />
                  <p>A 4th year Computer Science major at UT with a minor in RTF. Very excited for Software Engineering this semester. Big sports fan. Houston sports for life!</p>
                  <p><strong>Responsibilities:</strong><br/> Designed and built the home page and the about page. Coordinated with team as teh group leader.</p>
                  <p><strong>No. of Commits:</strong> 11<br/><strong>No. of Issues:</strong> 1<br/><strong>No. of Tests:</strong> 0</p>
                </div>
              </div>
              <div class="row">
                <div class="col-md-3"></div>
                <div class="col-md-6">
                  <h2>Max West</h2>
                  <img src="../images/max_profile.jpg" class="img-rounded" alt="Max" width="256" height="256" />
                  <p>This is my 4th year as a Computer Science major at UT. After graduation I am moving to Seattle to work for Amazon Publishing. I like long walks on the beach and Ruby on Rails.</p>
                  <p><strong>Responsibility:</strong> "insert here"</p>
                  <p><strong>No. of Commits:</strong>  "insert here"<br/><strong>No. of Issues:</strong> "insert here"<br/><strong>No. of Tests:</strong> "insert here"</p>
                </div>
                <div class="col-md-3"></div>
              </div>
            </div>
          </div>);
};

export default About;
