import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchPhase() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get('/api/phase', config);

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'SET_PHASE', payload: response.data });
  } catch (error) {
    console.log('phase get request failed', error);
  }
}

function* updatePhase(action) {
  console.log('in updatePhase', action.payload.id);
  yield axios ({
    method: 'PUT',
    url: `/api/phase/${action.payload.id}`,
    data: action.payload
}) 
  yield put ({
    type: 'FETCH_PHASE'
  })
}

function* getTempPhase(action){
  console.log('in getTempPhase', action);
}


function* phaseSaga() {
  yield takeLatest('FETCH_PHASE', fetchPhase);
  yield takeLatest('UPDATE_PHASE', updatePhase);
  yield takeLatest('GET_TEMP_PHASE', getTempPhase)
}

export default phaseSaga;
