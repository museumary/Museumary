import React from 'react';
import { Link } from 'react-router-dom';
import Search from './Search';

const Header = () => {
    return (
        <div className="Header">
            <nav className="navbar navbar-inverse navbar-static-top">
                <div className="container">
                    <HeaderIcon />
                    {/* Search bar in Navbar */}
                    <form class="navbar-form navbar-left">
                        <Search />
                    </form>
                    <HeaderModelLinks />
                </div>
            </nav>
        </div>
    );
};

/* Link to Home and title of site */
const HeaderIcon = () => {
    return (
        <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="/">Museumary</a>
        </div>
    );
}

/* Links to model pages */
const HeaderModelLinks = () => {
    return (
        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav navbar-right">
                <li><Link to="/artists" activeClassName="active">Artists</Link></li>
                <li><Link to="/works" activeClassName="active">Works</Link></li>
                <li><Link to="/types" activeClassName="active">Types</Link></li>
                <li><Link to="/venues" activeClassName="active">Venues</Link></li>
                <li><Link to="/about" activeClassName="active">About</Link></li>
            </ul>
        </div>
    );
};

export default Header;
