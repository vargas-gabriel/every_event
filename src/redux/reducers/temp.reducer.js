const tempReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_TEMP':
        return action.payload;
      case 'UNSET_TEMP':
        return {};
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default tempReducer;
  