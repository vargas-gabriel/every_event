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
        hashtags: "#YOLO, #HASHTAG, #FTW",
    }

    componentDidMount = () => {
        const activePhaseId = Number(this.props.history.location.pathname.split('/')[2]);
        //const activeEventId = Number(this.props.store.tempPhase.event_id);
        //this.props.dispatch({type: 'GET_USER_EVENT'});
        //this.props.dispatch({type: 'GET_TEMP_PHASE', payload: activephaseId});
        //this.props.dispatch({type: 'GET_TEMP_EVENT', payload: activeEventId});
        //this.props.dispatch({type: 'FETCH_PHASE'});
        this.findActivePhase();
    }

    findActiveEvent = () => {
        const activeEventId = this.props.store.tempPhase.event_id;
        console.log('activeEventId', activeEventId);
        this.props.dispatch({type: 'GET_TEMP_EVENT', payload: activeEventId});
    }
    findActivePhase=()=>{
        const activePhaseId = Number(this.props.history.location.pathname.split('/')[2]);
        this.props.dispatch({type: 'GET_TEMP_PHASE', payload: activePhaseId});
        this.findActiveEvent(); // we want this to happen after GET_TEMP_PHASE is done


        // const activePhaseId = Number(this.props.history.location.pathname.split('/')[2]);
        // const tempPhase = this.props.store.phase;
        // console.log('activePhaseId', activePhaseId);
        // console.log('tempPhase',tempPhase);
        // if(this.props.store.tempPhase.id === undefined){
        //     console.log('tempPhase is 0');
        //     for(let i=0; i<tempPhase.length; i++){
        //         console.log('in for id', tempPhase[i].id);
        //         console.log('activePhaseId', activePhaseId);
        //         if(activePhaseId === tempPhase[i].id){
        //             console.log('match!');
        //             let eventToTempPhase = tempPhase[i];
        //             console.log('eventToTempPhase', eventToTempPhase);
        //             this.props.dispatch({
        //                 type: 'SET_TEMP_PHASE',
        //                 payload: eventToTempPhase,
        //             });
        //         }
        //     }
        // }
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
        //console.log('state is:', this.state);
        //console.log('this.props.store.phase:', this.props.store.phase);
        const includedPhases = this.props.store.phase.filter(phase => phase.event_id === this.props.store.tempPhase.event_id);
        //console.log('includedPhases', includedPhases);
        const selectedPhase = includedPhases.filter(selected => selected.event_id === this.props.store.tempPhase.id)
        //console.log('selectedPhase is', selectedPhase );
        //this.findActiveEvent();
        if(this.props.store.tempPhase.event_id === undefined){
            console.log('this.props.store.tempPhase.event_id', this.props.store.tempPhase.event_id);
            //this.findActiveEvent()
        }
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
        const phase = this.props.store.tempPhase[0];
        return (  
            <div id="editEventDiv">


                {/* <h1 className="centered">Event Name Here</h1> */}
                {/* <h1 className="centered">{this.props.store.temp.name}</h1> */}
                {this.props.store.tempPhase.name === undefined ?
                    <></>:
                    <h2 className="centered">Editing Phase: {phase.name}  </h2>
                }
                <div className="centered">
                    <label htmlFor='campaignStart'>
                        Phase Start
                        {this.props.store.tempPhase.start_date === undefined ?
                            <></> :
                            <input
                                type='date'
                                name='campaignStart'
                                required
                                defaultValue={this.props.store.tempPhase.start_date.split('T', 1)[0]}
                                onChange={(event) => this.handleChange(event, "start_date")}
                            />
                        }
                    </label>

                    <label htmlFor='campaignEnd'>
                        Phase End
                        {this.props.store.tempPhase.end_date === undefined ?
                            <></> :
                            <input
                                type='date'
                                name='campaignEnd'
                                required
                                defaultValue={this.props.store.tempPhase.end_date.split('T', 1)[0]}
                                onChange={(event) => this.handleChange(event, "end_date")}
                            />
                        }
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
                                // value={selectedPhase[0].name}
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