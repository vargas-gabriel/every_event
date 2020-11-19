const otherUsersReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_OTHER_USERS':
        return action.payload;
      case 'UNSET_OTHER_USERS':
        return [];
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default otherUsersReducer;
  