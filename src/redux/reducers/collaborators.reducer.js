const collaboratorsReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_COLLABORATORS':
        return action.payload;
      case 'UNSET_COLLABORATORS':
        return [];
      default:
        return state;
    }
  };
  
  // event will be on the redux state at:
  // state.event
  export default collaboratorsReducer;
  