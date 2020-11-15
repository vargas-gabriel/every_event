import React, {Component} from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';


class EditPhase extends Component {

    state = {
        event_id: this.props.store.tempPhase,
        name: "selected post name",
        start_date: "",
        end_date: "",
        phasee_id: "",
        send_date: "",
        send_time: "",
        post_text:  "THIS TEXT IS CURRENTLY IN LOCAL STATE",
        image: "",
        hashtags: "#YOLO, #HASHTAG, #FTW"
    }


    seperateDateTime=()=>{
        console.log(this.state.send_date);
    }
    navHome=()=>{
        this.props.history.push('/user');
    }
    
    handleChange = (event, propertyName) => {
        this.setState({
            ...this.state,
            [ propertyName ]: event.target.value
        })
    }

    savePhaseDuration=()=>{
        console.log('clicked save phase duration');
    }


    newPost=()=>{
        console.log('clicked new post');
    }
    deletePost=()=>{
        console.log('clicked delete post');
    }
    loadPost=()=>{
        console.log('clicked load post');
    }
    savePost=()=>{
        console.log('clicked save post');
    }

    addHashtags=()=>{
        console.log('adding:', this.state.hashtags);
        this.setState({
            ...this.state,
            post_text: this.state.post_text + ' ' + this.state.hashtags
        })
    }
    saveHashtags=()=>{
        console.log('clicked save hashtags with:', this.state.hashtags);
    }

    uploadImage=()=>{
        console.log('clicked upload post image');
    }
    render(){
        // console.log('recentCard state:',this.state);
        console.log('state is', this.state);
        // console.log('user is:', this.props.store.user);
        console.log('EditEvent props:', this.props);
        return (  
            <div id="editEventDiv">
                {/* <h1 className="centered">Event Name Here</h1> */}
                <h1 className="centered">{this.props.store.temp.name}</h1>

                <h2 className="centered">Edit Phase (Title Here)</h2>
                <div className="centered">
                    <label htmlFor='campaignStart'>
                        Phase Start
                        <input
                            type='date'
                            name='campaignStart'
                            required
                            // value={this.state.campaignStart.split('T', 1)[0]}
                            onChange={(event) => this.handleChange(event, "start_date")}
                        />
                    </label>

                    <label htmlFor='campaignEnd'>
                        Phase End
                        <input
                            type='date'
                            name='campaignEnd'
                            required
                            // value={this.state.campaignEnd.split('T', 1)[0]}
                            onChange={(event) => this.handleChange(event, "end_date")}
                        />
                    </label> 
                </div>
                <br/>
                <button className="centeredImage" onClick={()=>this.savePhaseDuration()}>Save(necessary?)</button>
                <hr/>

                <div id="eventPromotionDuration" className="rounded">
                    
                    <div >
                        <div className="centered">
                            <label htmlFor='postText'>
                            Post Name:
                            <input
                                type='text'
                                name='postText'
                                value={this.state.name}
                                placeholder='this.state.tempPhase.name'
                                // value={this.state.postText}
                                // required
                                onChange={(event)=>this.handleChange(event, "name")}
                            />
                            </label>
                        </div>
                        <br/>
                        <textarea className="centeredImage" onChange={(event)=>this.handleChange(event, 'post_text')} value={this.state.post_text} rows="10" cols="60"></textarea>
                        <p className="centered">Character Counter: {this.state.post_text.length}</p>
                        <button id="centeredButton" onClick={()=>this.addHashtags()}>Add Hashtags</button><br/>
                        <button id="centeredButton" onClick={()=>this.uploadImage()}>Upload Post Image</button>

                    </div>
                    <hr/>
                    {/* <div id='postDateDiv'>
                        <label htmlFor='postDate'>
                            Post Date<br/>
                            <input
                            type='date'
                            name='postDate'
                            required
                            // value={this.state.campaignEnd.split('T', 1)[0]}
                            // onChange={(event) => this.handleChange(event, "campaignEnd")}
                        />
                        </label> 
                    </div> */}

                    <div>
                            <h6 className="centered">Post Scheduling</h6>
                            <input
                                className="centeredImage"
                                type='datetime-local'
                                name='postTime'
                                required
                                // value={this.state.campaignEnd.split('T', 1)[0]}
                                onChange={(event) => this.handleChange(event, "send_date")}
                            />
                        <br/>                            
                        <hr/>
                        <button className="centeredImage" onClick={()=>this.savePost()}>Save Post</button><br/><br/>
                    </div>
                 
                </div>

                <div id="eventSocial" className="rounded">
                    <h4 className="centered">Posts</h4>
                    <div>
                        <table  id="postTable">
                            <tbody>
                            <tr>
                                <td>
                                <h4 className='' onClick={()=>this.loadPost()}>post title</h4>
                                </td>
                                <td>
                                <button onClick={()=>this.deletePost()}>Delete Post</button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        
                    </div>
                    <br/>
                    <button className="centeredImage" onClick={()=>this.newPost()}>New Post</button><br/><br/>
                </div>

               


                <div id="eventHashtags" className="rounded">
                    <h4 className="centered">Event Hashtags</h4>
                    <textarea 
                        className="centeredImage" 
                        rows="4" 
                        cols="35"
                        defaultValue={this.state.hashtags} 
                        onChange={(event) => this.handleChange(event, "hashtags")}>
                    </textarea>
                    <p className="centered">Hashtags Character Counter {this.state.hashtags.length}</p>
                    <br/><br/>
                    <button className="centeredImage" onClick={()=>this.saveHashtags()}>Save Hashtags</button><br/><br/>
                </div>


                {/* <button onClick={this.navHome}>Home</button> */}
            </div>
        );
    }
}

const mapStateToProps = (reduxStore) => ({
  reduxStore
})

export default connect(mapStoreToProps)(EditPhase);