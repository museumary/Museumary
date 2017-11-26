import React from 'react';
import { Timeline } from 'react-twitter-widgets';

const Twitter = () => {
    /* Twitter Timeline: give twitter username and displays the twitter feed */
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <Timeline
                        {/* Twitter Username: cooperhewitt */}
                        dataSource={{sourceType:"profile", screenName:"cooperhewitt"}}
                        options={{username:"cooperhewitt", height:"635", width:"600"}}
                    />
                </div>
                <div className="col-md-6">
                    <Timeline
                        {/* Twitter Username: harvardartmuseums */}
                        dataSource={{sourceType:"profile", screenName:"harvartmuseums"}}
                        options={{username:"harvartmuseums", height:"635", width:"600"}}
                    />
                </div>
            </div>
        </div>
    );
};

export default Twitter;
