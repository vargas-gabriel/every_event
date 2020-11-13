const tempReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_TEMP':
        return {
          ...action.payload,
        }
      case 'UPDATE_ACTIVE_EVENT':
        console.log('UPDATE_ACTIVE_EVENT hit with:', action.payload);
        return {
          ...state,
          ...action.payload,
        };
      case 'UNSET_TEMP':
        return {};
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default tempReducer;
  