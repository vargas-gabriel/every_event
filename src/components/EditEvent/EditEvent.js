import React, {Component} from 'react';
// import {connect} from 'react-redux';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import axios from 'axios';
import { put, takeLatest, select } from 'redux-saga/effects';



class EditEvent extends Component {

    state = {
        toggleEdit: false,
    }

    componentDidMount = () => {
        //console.log('mounting');
        //this.props.dispatch({type: 'GET_USER_EVENT'});


        this.props.dispatch({type: 'FETCH_PHASE'});
        this.props.dispatch({type: 'GET_OTHER_USERS'});
    
        //this.findActiveEvent();   //moved this into render()
        const activeEventId = Number(this.props.history.location.pathname.split('/')[2]);
        this.props.dispatch({type: 'GET_ACTIVE_EVENT', payload: activeEventId})
    }

    addCollaborator = (collaborator) =>{
        const event_id = this.props.store.temp.event_id;
        console.log('event id is',event_id);
        console.log('adding collaborator:', collaborator);
        this.props.dispatch({
            type: 'ADD_COLLABORATOR',
            payload: {collaborator, event_id}
        })

    }
    findActiveEvent = () => {
        if(this.props.store.userEvent.length === 0){
            console.log('no user events');
            this.props.dispatch({type: 'GET_USER_EVENT'});
        }
        
        const activeId = Number(this.props.history.location.pathname.split('/')[2]);
        const userEvents = this.props.store.userEvent;
        console.log('finding active event using id:', activeId);
        //console.log('this.props.store.userEvent', this.props.store.userEvent);
        //console.log('userEvents', userEvents);
        if(this.props.store.temp.id === undefined){
            //console.log('temp is 0');
            for(let i=0; i<userEvents.length; i++){
                console.log('in for id', userEvents[i].id);
                //console.log('activeId', activeId);
                if(activeId === userEvents[i].id){
                    //console.log('match!');
                    let eventToTemp = userEvents[i];
                    console.log('eventToTemp', eventToTemp);
                    this.props.dispatch({
                        type: 'SET_TEMP',
                        payload: eventToTemp,
                    });
                }
            }
        }
    }
   
    editEvent=() =>{
        console.log('clicked save event changes');
        // event.preventDefault();
        // this.props.dispatch({
        //     type: 'UPDATE_EVENT',
        //     payload: this.state
        // })
        //    this.navHome();
    }
    


    navHome=()=>{
        this.props.history.push('/user');
    }

    phaseNav=(phase)=>{
        const activeId = Number(this.props.history.location.pathname.split('/')[2]);
        this.props.dispatch({
			type: 'SET_TEMP_PHASE', //active phase
			payload: phase,
		});
		this.props.history.push(`/editphase/${phase.id}`)
    }
    handleChange = (event, propertyName) => {
        this.props.dispatch({
            type: 'UPDATE_ACTIVE_EVENT',
            payload: {
                [ propertyName ]: event.target.value,
            }
        })
    }

    handleDateChange = (event, propertyName) => {
        console.log('changing date:', event.target.value);
        // this.setState({
        //     ...this.state,
        //     [ propertyName ]: event.target.value
        // });
        this.props.dispatch({
            type: "UPDATE_ACTIVE_EVENT",
            payload: {
                [ propertyName ]: event.target.value,
            }
        });
        //console.log('then sending state:', this.state);
        this.saveDate();
    }

    toggleEditSocial = () => {
        //console.log('toggle triggered');
        this.setState({
            ...this.state,
            toggleEdit: !this.state.toggleEdit,
        });
    }

    saveDate = () => {
        //console.log('save date triggered');
        this.props.dispatch({
            type: "UPDATE_EVENT",
            // payload: {
            //     event: this.props.store.temp,
            //     id: this.props.store.temp.id,
            // }
        });
    }

    // checkURL = (event) => {
    //     event.preventDefault();
    //     if(this.state.image.length > 1000){
    //         alert("Image URL is too long")
    //     }else{
    //         this.saveEdit();
    //     }
    // }

    saveEdit = () => {
        //console.log('saveEdit trig');
        this.props.dispatch({
            type: "UPDATE_EVENT",
            payload: {
                event: this.props.store.temp,
                id: this.props.store.temp.id,
            }
        });
        this.setState({
            ...this.state,
            toggleEdit: !this.state.toggleEdit,
        });
    }

    render(){
        const includedPhases = this.props.store.phase.filter(phase => phase.event_id === this.props.store.temp.event_id);

        //const otherUsers = this.props.store.otherUsersReducer
        const activeEvent = this.props.store.temp;
        this.findActiveEvent();
        return (  
            <div id="editEventDiv">
                <h1 className="centered">{this.props.store.temp.name}</h1>                
                <h2 className="centered" id="phases">Phases</h2>
                <div className="centered">
                    <label htmlFor='campaignStart'>
                        Campaign Start
                        {this.props.store.temp.start_date === undefined ?
                            <></> :
                            <input
                                type='date'
                                name='campaignStart'
                                required
                                defaultValue={this.props.store.temp.start_date.split('T', 1)[0]}
                                onChange={(event) => this.handleDateChange(event, "start_date")}
                            />
                        }
                    </label>

                    <label htmlFor='campaignEnd' className="campaignEnd">
                        Campaign End
                        {this.props.store.temp.end_date === undefined ?
                            <></> :
                            <input
                                type='date'
                                name='campaignEnd'
                                required
                                defaultValue={this.props.store.temp.end_date.split('T', 1)[0]}
                                onChange={(event) => this.handleDateChange(event, "end_date")}
                            />
                        }
                    </label> 
                </div>
                <br/>
                
                <div className="centered">
                <label htmlFor="eventType">Event Type:</label>
                <select name="eventType" value={this.props.store.temp.type} 
                    id="eventType"
                    onChange={(event) => this.handleDateChange(event, "type")}>
                    {/* >Event Type */}
                    <option value="In Person">In Person</option>
                    <option value="Virtual">Virtual</option>
                    <option value="Hybrid">Hybrid</option>
                </select> 
                </div>
                <hr/>

                <div id="eventPromotionDuration" className="rounded">
                    
                    <table className="phaseTable">
                        <thead>
                            <tr>
                                {/* <th></th> */}
                                <th>Phase</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                            </tr>
                        </thead>
                        <tbody>

                        {includedPhases.map((phase) =>
                        <tr key={phase.id}>
                                {/* <td>
                                    <button>Delete</button> 
                                </td> */}
                                <td>
                                    <h4 className="hoverText"onClick={()=>this.phaseNav(phase)}>{phase.name}</h4>
                                </td>
                                <td>
                                    <label htmlFor='phaseStart'>
                                        <input
                                            type='date'
                                            name='phaseStart'
                                            required
                                            disabled
                                            defaultValue={phase.start_date.split('T', 1)[0]}
                                            //onChange={(event) => this.handleDateChange(event, "start_date")}
            
                                        />
                                    </label>
                                </td>
                                <td>
                                    <label htmlFor='phaseEnd'>
                                        <input
                                            type='date'
                                            name='phaseEnd'
                                            required
                                            disabled
                                            defaultValue={phase.end_date.split('T', 1)[0]}
                                            //onChange={(event) => this.handleDateChange(event, "end_date")}
                                        />
                                    </label>
                                </td>
                            </tr>
                        )}
                            
                        </tbody>
                    </table>
                    {/* <button className="centeredImage">New Phase</button><br/> */}
                    
                </div>

                <div id="eventSocial" className="rounded">
                    <label className="switch">
                        <input type="checkbox" 
                            checked={this.state.toggleEdit} 
                            onChange={this.toggleEditSocial}/>
                        <span className="slider round"></span>
                    </label>
                    <h4 className="centered" id="eventInfo">Event Info</h4>
                    <br/>
                    {this.state.toggleEdit === false &&
                        <>
                            {/* <img className="centeredImage"src='https://cdn.onlinewebfonts.com/svg/img_98811.png' width='100px'></img><br/> */}
                            <img className="centeredImage"src={this.props.store.temp.event_image} width='170px'></img><br/>
                            <h5 className="centered">{this.props.store.temp.name}</h5>
                            <h5 className="centered">{this.props.store.temp.acronym}</h5>
                            <h5 className="centered">{this.props.store.temp.website}</h5>
                            
                        </>
                    }
                    {this.state.toggleEdit === true &&
                        <>
                            <h5 className="editHeader">Event Image URL</h5>
                            <input className="centeredImage" onChange={(event) => this.handleChange(event, "event_image")} placeholder={this.props.store.temp.event_image}/><br/>                        
                            <h5 className="editHeader">Name</h5>
                            <input className="centeredImage" onChange={(event) => this.handleChange(event, "name")} placeholder={this.props.store.temp.name}/><br/>
                            <h5 className="editHeader">Acronym</h5>
                            <input className="centeredImage" onChange={(event) => this.handleChange(event, "acronym")} placeholder={this.props.store.temp.acronym}/><br/>
                            <h5 className="editHeader">Website</h5>
                            <input className="centeredImage" onChange={(event) => this.handleChange(event, "website")} placeholder={this.props.store.temp.website}/><br/>
                            <button className="centeredImage" onClick={this.saveEdit}>Save</button>
                        </>
                    }
                    <br/><br/>
                </div>

                <div id="eventCollaborators" className="rounded">
                    <h4 className="centered">Possible Collaborators</h4>

                    <div id="collabOutline" className="centeredImage">
                        <table className="collabTable">
                            <tbody >

                            {this.props.store.otherUsersReducer.map((otherUser) =>

                                <tr key ={otherUser.id}>
                                    <td>
                                        <h5> {otherUser.first_name}</h5>
                                    </td>
                                    <td>
                                        <button onClick={()=>this.addCollaborator(otherUser)}>Add</button>
                                        <button>Remove</button>

                                    </td>
                                </tr>
                            )}
                            
                            </tbody>
                        </table>
                       
                    </div><br/>
                    <button className="centeredImage">Add Collaborator</button><br/><br/>

                </div>


                <div id="eventCollaborators" className="rounded">
                    <h4 className="centered">Current Collaborators</h4>

                    <div id="collabOutline" className="centeredImage">
                        <table className="collabTable">
                            <tbody >

                            {this.props.store.otherUsersReducer.map((otherUser) =>

                                <tr key ={otherUser.id}>
                                    <td>
                                        <h5> {otherUser.first_name}</h5>
                                    </td>
                                    <td>
                                        <button onClick={()=>this.addCollaborator(otherUser)}>Add</button>
                                        <button>Remove</button>

                                    </td>
                                </tr>
                            )}
                            
                            </tbody>
                        </table>
                       
                    </div><br/>
                    <button className="centeredImage">Add Collaborator</button><br/><br/>

                </div>



                {/* <div id="eventHashtags" className="rounded">
                    <h4 className="centered">Event Hashtags</h4>
                    <textarea className="centeredImage" rows="8" defaultValue={this.props.store.temp.hashtag} 
                    ></textarea><br/><br/>
                    <button className="centeredImage">Save Hashtags</button><br/><br/>
                </div> */}


                {/* <button onClick={this.navHome}>Home</button> */}
            </div>
        );
    }
}

const mapStateToProps = (reduxStore) => ({
  reduxStore
})

export default connect(mapStoreToProps)(EditEvent);