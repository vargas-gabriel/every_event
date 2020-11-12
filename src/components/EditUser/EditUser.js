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
        linkedin_account: this.props.store.user.linkedin_account,
        linkedin_oauth: this.props.store.user.linkedin_oauth
    }

   
   
    editUser=() =>{
        console.log('clicked save user changes');
        // event.preventDefault();
        this.props.dispatch({
            type: 'UPDATE_USER',
            payload: this.state
        })
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

    render(){
        // console.log('recentCard state:',this.state);
        console.log('state is', this.state);
        // console.log('user is:', this.props.store.user);
        return (
                
                <div >


                    <div id="editUserDiv">
                        <h1>Edit User</h1>
                        <hr/>
                        <form onSubmit={this.editUser}>
                            <h6 id="editInfoTag">First Name</h6>
                            <input 
                            type="text"
                            placeholder="firstName" 
                            value={this.state.firstName} 
                            onChange={(event)=>this.handleChange(event, 'firstName')}>
                            </input>
                            
                            <h6 id="editInfoTag">Last Name</h6>
                            <input 
                            type="text"
                            placeholder="lastName" 
                            value={this.state.lastName} 
                            onChange={(event)=>this.handleChange(event, 'lastName')}>
                            </input>

                            <br/>
                            <h6 id="editInfoTag">Image URL</h6>
                            <input 
                            type="text"
                            placeholder="image_url" 
                            value={this.state.img_url} 
                            onChange={(event)=>this.handleChange(event, 'img_url')}>
                            </input> 

                            <br/>
                            <h6 id="editInfoTag">Email</h6>
                            <input 
                            type="text"
                            placeholder="Email" 
                            value={this.state.email} 
                            onChange={(event)=>this.handleChange(event, 'email')}>
                            </input> 

                            {/* <br/>
                            <h6 id="editInfoTag">Password</h6>
                            <input 
                            type="text"
                            placeholder="password" 
                            value={this.state.password} 
                            onChange={(event)=>this.handleChange(event, 'password')}>
                            </input>  */}

                            <br/>
                            <button type="submit">Save Changes</button>
                        </form>
                    </div>
                    


                </div>
        );
    }
}

const mapStateToProps = (reduxStore) => ({
  reduxStore
})

export default connect(mapStoreToProps)(EditUser);

