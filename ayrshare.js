import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
const SocialPost = require("social-post-api");
const social = new SocialPost("J01SCTK-D7BM7ND-G6AHAPY-8A5RW18");
class AyrShare extends Component {
	state = {
        posts: we have all our posts
	};


     SocialPost = require("social-post-api");
     social = new SocialPost("J01SCTK-D7BM7ND-G6AHAPY-8A5RW18");
    
     getPostData = () => {
        const postContent = "this is a test round FOUR! https://www.facebook.com/bythethousands/",
    
        return {
    
            post: postContent,
            shorten_links: true,
            platforms: ["linkedin"]
        };
    };
    
    run = async () => {
        const content = getPostData();
        const json = await social.post(content).catch(console.error)
        
        console.log(json);
    };
    
    run();

	render() {
        console.log('this state:', this.state);
		return (
            <div>
				
            </div>
		);
	}
}



// const mapStateToProps = (reduxStore) => ({
//     reduxStore
//   })

// export default connect(mapStoreToProps)(AyrShare);



// //export default connect(mapStoreToProps)(EditEvent);





// import React, { useState } from 'react';
// import { connect } from 'react-redux';
// import mapStoreToProps from '../../redux/mapStoreToProps';

// // Basic functional component structure for React with default state
// // value setup. When making a new component be sure to replace the
// // component name TemplateFunction with the name for the new component.
// function AyrShare(props) {
//   // Using hooks we're creating local state for a "heading" variable with
//   // a default value of 'Functional Component'
//   const [heading, setHeading] = useState('AyrShare');






  
//   return (
//     <div>
//       <h2>{heading}</h2>
//     </div>
//   );
// }

// export default connect(mapStoreToProps)(AyrShare);
