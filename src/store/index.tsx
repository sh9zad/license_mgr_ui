import logger from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import { State, reducer } from '../reducers'
import { ProductAction } from '../actions/products';

const store = createStore<State, ProductAction, any, any>(reducer, applyMiddleware(logger));

export default store