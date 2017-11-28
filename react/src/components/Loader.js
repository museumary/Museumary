/*
    Loading gifs that display when the application is fetching data

    Loading is the fancy image
    LoadingText is the literal 'Loading' text
*/

import React from 'react';
import Loading from 'static/images/Loading-cropped.gif';
import LoadingText from 'static/images/LoadingText-cropped.gif';

const Loader = () => {
    return (
        <div className='container'>
            <img src={LoadingText} alt='LoadingText' width='500'/><br/>
            <img src={Loading} alt='Loading' />
        </div>
    );
}

export default Loader;