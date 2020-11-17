import React, {Component} from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import axios from 'axios';


class EditPhase extends Component {

    state = {
        event_id: this.props.store.tempPhase,
        id: '',
        image: '',
        name: '',
        phase_id: '',
        post_text: '',
        response_id: '',
        send_date: '',
        send_time: '',
        hashtags: ''
    }

    componentDidMount = () => {
        const activePhaseId = Number(this.props.history.location.pathname.split('/')[2]);
        //const activeEventId = Number(this.props.store.tempPhase.event_id);
        //this.props.dispatch({type: 'GET_USER_EVENT'});
        //this.props.dispatch({type: 'GET_TEMP_PHASE', payload: activephaseId});
        //this.props.dispatch({type: 'GET_TEMP_EVENT', payload: activeEventId});
        //this.props.dispatch({type: 'FETCH_PHASE'});
        this.findActivePhase();
        this.getPosts();
    }



    getPosts=()=>{
        console.log('in get posts $$$$');
        this.props.dispatch({type: 'GET_RELEVENT_POSTS'})

    }
    // findActiveEvent = () => {
    //     const activeEventId = this.props.store.tempPhase.event_id;
    //     console.log('activeEventId', activeEventId);
    //     this.props.dispatch({type: 'GET_TEMP_EVENT', payload: activeEventId});
    // }
    findActivePhase=()=>{
        const activePhaseId = Number(this.props.history.location.pathname.split('/')[2]);
        this.props.dispatch({type: 'GET_TEMP_PHASE', payload: activePhaseId});
        //this.findActiveEvent();
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

    handleDateChange = (event, propertyName) => {
        this.props.dispatch({
            type: "UPDATE_ACTIVE_PHASE",
            payload: {
                [ propertyName ]: event.target.value,
            }
        });
        this.savePhaseDuration();
    }

    savePhaseDuration=()=>{
        console.log('clicked save phase duration');
        const activePhaseId = Number(this.props.history.location.pathname.split('/')[2]);
        this.props.dispatch({
            type: 'UPDATE_PHASE_CLICK',
        });
        //this.props.dispatch({type: 'GET_TEMP_PHASE', payload: activePhaseId});
    }


    newPost=()=>{
        const activePhaseId = Number(this.props.history.location.pathname.split('/')[2]);
        console.log('clicked new post with:', activePhaseId);
        this.props.dispatch({
            type: 'CREATE_POST',
            payload: activePhaseId
        })
    }
    deletePost=(action)=>{
        console.log('clicked delete post', action);
        this.props.dispatch({
            type: 'DELETE_POST',
            payload: action   
        })
    }
    loadPost=(action)=>{
        console.log('clicked load post', action);
        this.setState({
            id: action.id,
            image: action.image,
            name: action.name,
            phase_id: action.phase_id,
            post_text: action.post_text,
            response_id: action.response_id,
            send_date: action.send_date,
            send_time: action.send_time,
            //hashtags: action.hashtags
        })

    }
    savePost=()=>{
        console.log('clicked save post');
    }

    addHashtags=()=>{
        console.log('adding:', this.state.hashtags);
        console.log(this.state.post_text);
        this.setState({
            post_text: this.state.post_text + ' ' + this.props.store.tempPhase.hashtag
            
        })
    }
    saveHashtags=()=>{
        console.log('clicked save hashtags with:', this.state.hashtags);
        axios({
            method: 'PUT',
            url: '/api/hashtag',
            data: {
                hashtag: this.state.hashtags, 
                event_id: this.props.store.tempPhase.event_id
            }
        })
        this.findActivePhase()
    }

    uploadImage=()=>{
        console.log('clicked upload post image');
    }
    render(){
        console.log('state is:', this.state);
        //console.log('this.props.store.phase:', this.props.store.phase);
        //const includedPhases = this.props.store.phase.filter(phase => phase.event_id === this.props.store.tempPhase.event_id);
        //console.log('includedPhases', includedPhases);
        //const selectedPhase = includedPhases.filter(selected => selected.event_id === this.props.store.tempPhase.id)
        //console.log('selectedPhase is', selectedPhase );
        //this.findActiveEvent();
        // if(this.props.store.tempPhase.event_id === undefined){
        //     console.log('this.props.store.tempPhase.event_id', this.props.store.tempPhase.event_id);
        //     //this.findActiveEvent()
        // }
        //this.findActivePhase();

        // console.log('recentCard state:',this.state);
        //console.log('state is', this.state);
        //console.log('tempPhase is:', this.props.store.tempPhase);
        //const phaseStartDate = this.props.store.tempPhase.start_date.split('T', 1)[0]
        //const phaseEndDate = this.props.store.tempPhase.end_date.split('T', 1)[0]

        
        //console.log('phaseStartDate:',phaseStartDate);
        //console.log('phaseEndDate:', phaseEndDate);

        // console.log('user is:', this.props.store.user);
        console.log('EditEvent props:', this.props);
        console.log('this.props.store.tempPhase[0]', this.props.store.tempPhase[0]);
        const phase = this.props.store.tempPhase;
        //const niceStartDate = phase.start_date.split('T', 1)[0];
        //console.log('phase.start_date.split', phase.start_date.split('T', 1)[0]);

        const includedPosts = this.props.store.post.filter(post => post.phase_id === this.props.store.tempPhase.id)
        console.log('includedPosts:',includedPosts);
        
        // const namedIncludedPosts = includedPosts.forEach((post, index) => post.id = index + 1);
        // console.log('namedIncludedPosts', namedIncludedPosts);

        return (  
            <div id="editEventDiv">


                {phase && <h1 className="centered">{phase.event_name}</h1>}
                {/* <h1 className="centered">{this.props.store.temp.name}</h1> */}
                {phase && <h2 className="centered">Editing Phase: {phase.name} </h2>}
                <div className="centered">
                    <label htmlFor='campaignStart'>
                        Phase Start
                        {phase.start_date && 
                            <input
                                type='date'
                                name='campaignStart'
                                required
                                defaultValue={phase.start_date.split('T', 1)[0]}
                                onChange={(event) => this.handleDateChange(event, "start_date")}
                            />
                        }
                    </label>

                    <label htmlFor='campaignEnd'>
                        Phase End
                        {phase.end_date &&
                            <input
                                type='date'
                                name='campaignEnd'
                                required
                                defaultValue={phase.end_date.split('T', 1)[0]}
                                onChange={(event) => this.handleDateChange(event, "end_date")}
                            />
                        }
                    </label> 
                </div>
                                <hr/>

                <div id="eventPromotionDuration" className="rounded">
                    
                    <div >
                        <div className="centered">
                            <label htmlFor='postText'>
                            Post Name:
                            <input
                                type='text'
                                name='postText'
                                // value={selectedPhase[0].name}
                                placeholder='Select a post'
                                defaultValue={this.state.name}                                // required
                                onChange={(event)=>this.handleChange(event, "name")}
                            />
                            </label>
                        </div>
                        <br/>
                        <textarea className="centeredImage" onChange={(event)=>this.handleChange(event, 'post_text')} value={this.state.post_text} rows="10" cols="60"></textarea>
                        
                        
                        {this.state.post_text === undefined ?
                        <p className="centered">Character Counter: 0</p>
                        :
                        <p className="centered">Character Counter: {this.state.post_text.length}</p>
    }
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

                            {includedPosts.map((post) =>
                            
                            <tr key={post.id}>
                                <td>
                                <h4 className='' onClick={()=>this.loadPost(post)}>{post.name}</h4>
                                </td>
                                <td>
                                <button onClick={()=>this.deletePost(post.id)}>Delete Post</button>
                                </td>
                            </tr>
                            )}

                            
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
                        defaultValue={this.props.store.tempPhase.hashtag} 
                        onChange={(event) => this.handleChange(event, "hashtags")}>
                    </textarea>


                    {phase.hashtag === undefined ?
                    <p className="centered">Hashtags Character Counter 0</p>
                    :
                    <p className="centered">Hashtags Character Counter {phase.hashtag.length}</p>
                    }
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