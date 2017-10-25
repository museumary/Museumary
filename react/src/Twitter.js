import React from 'react';
import { Timeline } from 'react-twitter-widgets';

const Twitter = () => {
	return (
		<div className="container">
	      	<div className="row">
	        	<div className="col-md-6">
	          		<Timeline
				 		dataSource={{sourceType:"profile", screenName:"realdonaldtrump"}}
				 		options={{username:"harvartmuseums", height:"635", width:"600"}}
		  			/>
	        	</div>
	        	<div className="col-md-6">
	          		<Timeline
				  		dataSource={{sourceType:"profile", screenName:"harvartmuseums"}}
				 		options={{username:"harvartmuseums", height:"635", width:"600"}}
		  			/>
	        	</div>
	      	</div>
	    </div>
	);
};
  	
export default Twitter;