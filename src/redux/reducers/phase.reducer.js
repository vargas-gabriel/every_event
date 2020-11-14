const phaseReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_PHASE':
        return action.payload;
      case 'UNSET_PHASE':
        return [];
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default phaseReducer;
  