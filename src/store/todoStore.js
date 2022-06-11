import {combineReducers, createStore, applyMiddleware} from 'redux';
import ToDoReducer from './todoReducer';
import thunk from 'redux-thunk';

const appReducer = combineReducers({
  Todo: ToDoReducer,
});

const store = createStore(appReducer, {}, applyMiddleware(thunk));

export default store;
