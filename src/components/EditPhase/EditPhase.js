import React, {Component} from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';


class EditPhase extends Component {

    state = {
        event_id: this.props.store.tempPhase,
        name: "",
        start_date: "",
        end_date: "",
        phasee_id: "",
        send_date: "",
        send_time: "",
        post_text:  "",
        image: "",
  
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
        console.log('clicked add hashtags');
    }
    saveHashtags=()=>{
        console.log('clicked save hashtags');
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
                
                <h1></h1>
                <h2>Phase Title Here</h2>
                
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
                <br/>
                <button onClick={()=>this.savePhaseDuration()}>Save</button>
            

                <div id="eventPromotionDuration">
                    
                    <div>
                        <label htmlFor='postText'>
                        Post Name:
                        <input
                            type='text'
                            name='postText'
                            placeholder='this.state.tempPhase.name'
                            // value={this.state.postText}
                            // required
                            onChange={(event)=>this.handleChange(event, "name")}
                        />
                        </label>
                        <br/>
                        <textarea onChange={(event)=>this.handleChange(event, 'post_text')}defaultValue="temphase" rows="10" cols="60"></textarea><br/>
                        <button onClick={()=>this.addHashtags()}>Add Hashtags</button><br/>
                        <button onClick={()=>this.uploadImage()}>Upload Post Image</button>

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
                        <label htmlFor='postTime'>
                            Post Scheduling<br/>
                            <input
                                type='datetime-local'
                                name='postTime'
                                required
                                // value={this.state.campaignEnd.split('T', 1)[0]}
                                onChange={(event) => this.handleChange(event, "send_date")}
                            />
                        </label> <br/>
                        <button onClick={()=>this.savePost()}>Save Post</button><br/><br/>
                    </div>
                 
                </div>

                <div id="eventSocial">
                    <h4>Posts</h4>
                    <div>
                        <table id="outline">
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
                    <button onClick={()=>this.newPost()}>New Post</button><br/><br/>
                </div>

               


                <div id="eventHashtags">
                    <h4>Event Hashtags</h4>
                    <textarea rows="8" defaultValue= "#YOLO, #YOLO"></textarea><br/><br/>
                    <button onClick={()=>this.saveHashtags()}>Save Hashtags</button><br/><br/>
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