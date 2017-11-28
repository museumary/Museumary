/*
     App component that contains the header and the routing. Root of the App.
*/

import React from 'react';
import Header from 'components/Header';
import Main from 'containers/Main';

const App = () => {
    return (
        <div className="App">
            <Header />
            <Main />
        </div>
    );
};

export default App;
