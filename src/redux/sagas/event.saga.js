import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* createEvent(action) {
  console.log('creating event with', action);
  yield axios({
      method: 'POST',
      url: '/api/event',
      data: action.payload
  });
  yield put ({
      type: 'GET_EVENT'
  })
}

function* getEvent(){
    try {
        const config = {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        };
        console.log('config is:', config);
        const response = yield axios.get('api/event', config);

        console.log('back from GET with:', response.data);
        yield put({ type: 'SET_EVENT', payload: response.data});
    }catch (error){
        console.log('GET event request failed,', error);
    }
}

function* eventSaga() {
  yield takeLatest('CREATE_EVENT', createEvent);
  yield takeLatest('GET_EVENT', getEvent);
}

export default eventSaga;
