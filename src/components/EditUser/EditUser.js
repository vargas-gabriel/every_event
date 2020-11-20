import React, {Component} from 'react';
// import {connect} from 'react-redux';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';


class EditUser extends Component {

    state = {
        id: this.props.store.user.id,
        firstName: this.props.store.user.first_name,
        lastName: this.props.store.user.last_name,
        email: this.props.store.user.email,
        image: this.props.store.user.image,
        ayrshareapikey: this.props.store.user.ayrshareapikey
    }

    checkURL = (event) => {
        event.preventDefault();
        if(this.state.image.length > 1000){
            alert("Image URL is too long")
        }else{
            this.editUser();
        }
    }
   
    editUser=() =>{
        console.log('clicked save user changes');
        // event.preventDefault();
        this.props.dispatch({
            type: 'UPDATE_USER',
            payload: this.state
        })
        alert('Saved!')
        this.navHome();
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

    render(){
        // console.log('recentCard state:',this.state);
        console.log('state is', this.state);
        console.log('length', this.state.image.length);
        return (  
            <div id="editUserDiv" className="rounded">
                <h1 className="centered" id="editUserHeader">Edit User</h1>
                <hr/>
                <form onSubmit={this.checkURL}>
                    <h4 id="editInfoTag" className="centered">First Name</h4>
                    <input 
                    className="centeredImage"
                    type="text"
                    placeholder="firstName" 
                    value={this.state.firstName} 
                    onChange={(event)=>this.handleChange(event, 'firstName')}>
                    </input>
                    
                    <h4 id="editInfoTag" className="centered">Last Name</h4>
                    <input 
                    className="centeredImage"
                    type="text"
                    placeholder="lastName" 
                    value={this.state.lastName} 
                    onChange={(event)=>this.handleChange(event, 'lastName')}>
                    </input>

                    <h4 id="editInfoTag" className="centered">Image URL</h4>
                    <input 
                    className="centeredImage"
                    type="text"
                    placeholder="image_url" 
                    value={this.state.image} 
                    onChange={(event)=>this.handleChange(event, 'image')}>
                    </input> 

                    <h4 id="editInfoTag" className="centered">Email</h4>
                    <input 
                    className="centeredImage"
                    type="text"
                    placeholder="Email" 
                    value={this.state.email} 
                    onChange={(event)=>this.handleChange(event, 'email')}>
                    </input> 

                    <h4 id="editInfoTag" className="centered">Ayrshare API Key</h4>
                    <input 
                    className="centeredImage"
                    type="text"
                    placeholder="Ayrshare API Key" 
                    value={this.state.ayrshareapikey} 
                    onChange={(event)=>this.handleChange(event, 'ayrshareapikey')}>
                    </input> 

                    <br/>
                    <button type="submit" className="centeredImage">Save Changes</button>
                    <br/>
                </form>
                <button className="centeredImage" onClick={this.navHome}>Back</button>
                <br/>
            </div>
        );
    }
}

const mapStateToProps = (reduxStore) => ({
  reduxStore
})

export default connect(mapStoreToProps)(EditUser);

