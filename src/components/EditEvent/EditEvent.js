import React, {Component} from 'react';
// import {connect} from 'react-redux';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';


class EditEvent extends Component {

    state = {
    //    defaultImage: 'https://cdn.onlinewebfonts.com/svg/img_98811.png'
        // eventName: this.props.store.temp.name,
        // eventAcronym: this.props.store.temp.acronym,
        // eventWebsite: this.props.store.temp.website,
        // eventRegistration: this.props.store.temp.registration_link,
        // eventOAuth: this.props.store.temp.linkedin_oauth,
        // campaignStart: this.props.store.temp.start_date.split('T', 1)[0],
        // campaignEnd: this.props.store.temp.end_date.split('T', 1)[0],
        // eventImg: this.props.store.temp.event_image,
        toggleEdit: false,
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
    
    handleChange = (event, propertyName) => {
        this.setState({
            ...this.state,
            [ propertyName ]: event.target.value
        })
    }

    handleDateChange = (event, propertyName) => {
        console.log('changing date:', event.target.value);
        // this.setState({
        //     ...this.state,
        //     [ propertyName ]: event.target.value
        // });
        this.props.dispatch({
            type: "UPDATE_EVENT",
            payload: {
                [propertyName]: event.target.value,
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
        console.log('save date triggered');
        // this.props.dispatch({
        //     type: "UPDATE_EVENT",
        //     payload: {
        //         event: this.state,
        //         id: this.props.store.temp.id,
        //     }
        // });
    }

    saveEdit = () => {
        console.log('saveEdit trig');
        // this.props.dispatch({
        //     type: "UPDATE_EVENT",
        //     payload: {
        //         event: this.state,
        //         id: this.props.store.temp.id,
        //     }
        // });
        this.setState({
            ...this.state,
            toggleEdit: !this.state.toggleEdit,
        });
    }

    render(){
        // console.log('recentCard state:',this.state);
        console.log('state is', this.state);
        // console.log('user is:', this.props.store.user);
        console.log('EditEvent props:', this.props);
        return (  
            <div id="editEventDiv">
                
                <h1>Edit Event</h1>
                <h2>Event Title Here</h2>
                
                <label htmlFor='campaignStart'>
                    Event Promotion Start
                    <input
                        type='date'
                        name='campaignStart'
                        required
                        value={this.props.store.temp.start_date.split('T', 1)[0]}
                        onChange={(event) => this.handleDateChange(event, "campaignStart")}
                    />
                </label>

                <label htmlFor='campaignEnd'>
                    Event Promotion End
                    <input
                        type='date'
                        name='campaignEnd'
                        required
                        value={this.props.store.temp.end_date.split('T', 1)[0]}
						onChange={(event) => this.handleDateChange(event, "campaignEnd")}
                    />
                </label> 
                <br/>
                
                <label htmlFor="eventType">Event Type:</label>
                <select name="eventType" id="eventType">Event Type
                    <option value="InPerson">In Person</option>
                    <option value="Virtual">Virtual</option>
                    <option value="Hybrid">Hybrid</option>
                </select>               
                <hr/>

                <div id="eventPromotionDuration">
                    
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Phase Title</th>
                                <th>Phase Start Date</th>
                                <th>Phase End Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <button>Delete</button> 
                                </td>
                                <td>
                                    <h4>General</h4>
                                </td>
                                <td>
                                    <label htmlFor='phaseStart'>
                                        <input
                                            type='date'
                                            name='phaseStart'
                                            required
                                        />
                                    </label>
                                </td>
                                <td>
                                    <label htmlFor='phaseEnd'>
                                        <input
                                            type='date'
                                            name='phaseEnd'
                                            required
                                        />
                                    </label>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    
                </div>

                <div id="eventSocial">
                    <h4>Event Social</h4>
                    <label className="switch">
                        <input type="checkbox" 
                            checked={this.state.toggleEdit} 
                            onChange={this.toggleEditSocial}/>
                        <span className="slider round"></span>
                    </label>
                    {this.state.toggleEdit === false &&
                        <>
                            <img src='https://cdn.onlinewebfonts.com/svg/img_98811.png' width='100px'></img><br/>
                            <h5>{this.props.store.temp.acronym}</h5>
                            <h5>{this.props.store.temp.website}</h5>
                        </>
                    }
                    {this.state.toggleEdit === true &&
                        <>
                            <input onChange={(event) => this.handleChange(event, "eventName")} placeholder={this.props.store.temp.name}/>
                            <input onChange={(event) => this.handleChange(event, "eventAcronym")} placeholder={this.props.store.temp.acronym}/>
                            <input onChange={(event) => this.handleChange(event, "eventWebsite")} placeholder={this.props.store.temp.website}/>
                            <button onClick={this.saveEdit}>Save</button>
                        </>
                    }
                    <br/><br/>
                </div>

                <div id="eventCollaborators">
                    <h4>Event Collaborators</h4>

                    <div id="collabOutline">
                        <table >
                            <tbody>
                            <tr>
                                <td>
                                    <h5> John Smith</h5>
                                </td>
                                <td>
                                    <button>Delete</button>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <h5> John Smith</h5>
                                </td>
                                <td>
                                    <button>Delete</button>
                                </td>
                            </tr><tr>
                                <td>
                                    <h5> John Smith</h5>
                                </td>
                                <td>
                                    <button>Delete</button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                       
                    </div><br/>
                    <button>Add Collaborator</button><br/><br/>

                </div>


                <div id="eventHashtags">
                    <h4>Event Hashtags</h4>
                    <textarea rows="8">#YOLO, #YOLO</textarea><br/><br/>
                    <button>Save Hashtags</button><br/><br/>
                </div>


                <button onClick={this.navHome}>Home</button>
            </div>
        );
    }
}

const mapStateToProps = (reduxStore) => ({
  reduxStore
})

export default connect(mapStoreToProps)(EditEvent);