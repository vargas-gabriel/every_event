const userEventReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_USER_EVENTS':
        return action.payload;
      case 'UNSET_USER_EVENTS':
        return {};
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default userEventReducer;
  