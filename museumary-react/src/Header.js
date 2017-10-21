import React from 'react';

const Header = () => {
  return (
          <div className="Header">
            <nav className="navbar navbar-inverse navbar-static-top">
              <div className="container">
                <div className="navbar-header">
                  <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                  </button>
                  <a className="navbar-brand" href="/">Museumary</a>
                </div>
                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                  <ul className="nav navbar-nav navbar-right">
                    <li><a href="/artists">Artists</a></li>
                    <li><a href="/works">Works</a></li>
                    <li><a href="/venues">Venues</a></li>
                    <li><a href="/types">Art Types</a></li>
                    <li><a href="/about">About</a></li>
                  </ul>
                </div>
              </div>
            </nav>
          </div>
         );
};

export default Header;
