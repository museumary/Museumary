/*
    Search component embedded in the navbar
*/

import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import 'static/css/Header.css';

class Search extends Component {
    constructor() {
        super();
        this.state = {
            items: [],
            activePage: 1,
            search_value: "",
            redirect: false
        };

        this.textChange = this.textChange.bind(this)
        this.onInputKeyPress = this.onInputKeyPress.bind(this)
        this.onButtonClick = this.onButtonClick.bind(this)
    }

    /* When the enter key is pressed, redirect */
    onInputKeyPress(event) {
        switch (event.keyCode) {
            case 13:
                this.setState({ redirect: true })
                event.preventDefault();
                break;
        }
    }

    onButtonClick(event) {
        this.setState({ redirect: true })
    }

    textChange(event) {
        this.setState({ search_value: event.target.value });
    }

    render() {
        if(this.state.redirect) {
            this.setState({ redirect: false })
            return (
                <Redirect to={{
                    pathname: '/results',
                    state: { search: this.state.search_value }
                }} />
            );
        }
        else {
            return (
                <div class="input-group">
                    <input
                        type="text"
                        name="name"
                        class="form-control"
                        placeholder="Search"
                        onChange={this.textChange}
                        onKeyDown={this.onInputKeyPress}
                    />
                    <div class="input-group-btn">
                        <button class="btn btn-default" onClick={this.onButtonClick}>
                            <i class="glyphicon glyphicon-search"></i>
                        </button>
                    </div>
                </div>
            );
        }
    }
}

export default Search;
