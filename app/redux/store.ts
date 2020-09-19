import { createStore as reduxCreateStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './rootReducer';
import { State, ThunkExtraArgs } from '../types';

export default function createStore({ initState, thunkExtraArgument }: any) {
  return reduxCreateStore(reducers, initState, applyMiddleware(thunk.withExtraArgument(thunkExtraArgument)));
}
