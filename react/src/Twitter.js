import React from 'react';
import { Timeline } from 'react-twitter-widgets';

const Twitter = () => {
	return (
		<Timeline
	 		dataSource={{sourceType:"profile", screenName:"harvartmuseums"}}
	 		options={{username:"harvartmuseums", height:"635", width:"600"}}
	  	/>
	);
};
  	
export default Twitter;