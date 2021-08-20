import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import AlbumReducer from './reducers/albumReducer';

const allReducers = combineReducers({
    albums:AlbumReducer
});

const store = createStore(allReducers, applyMiddleware(thunk));

export default store;