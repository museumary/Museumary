import React from 'react';
import { Link, Redirect } from 'react-router-dom';

class Search extends React.Component {
    constructor() {
        super();
        this.state={
            items:[],
            activePage: 1,
            search_value: "",
            redirect: false
        };
    }

    onInputKeyPress(event) {
        switch (event.keyCode) {
            case 13:
                console.log(this.state.search_value);
                this.setState({redirect: true})
                event.preventDefault();
                break;
        }
    }

    textChange(event) {
        this.setState({search_value: event.target.value});
    }

    render() {
        if(this.state.redirect) {
            return <Redirect to={{
                pathname: '/results',
                state: { search: this.state.search_value }
            }} />;
        }
        else {
            return (
                <div className="SearchBox">
                    <div className="container">
                        <input
                            type="text"
                            name="name"
                            onChange={this.textChange.bind(this)}
                            onKeyDown={this.onInputKeyPress.bind(this)}
                        />
                    </div>
                </div>
            );
        }
    }
}

export default Search;
