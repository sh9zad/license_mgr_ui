import logger from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import { IState, reducer } from '../reducers'
import { ProductAction } from '../actions/products';

const store = createStore<IState, ProductAction, any, any>(reducer, applyMiddleware(logger));

export default store