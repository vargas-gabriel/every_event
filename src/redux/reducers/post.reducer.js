const postReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_POST':
        return action.payload;
      case 'UNSET_POST':
        return {};
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default postReducer;
  