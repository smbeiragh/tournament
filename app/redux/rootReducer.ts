import { combineReducers } from 'redux';
import tournamentReducer from './tournament.reducer';

export default combineReducers({
  tournament: tournamentReducer,
});
