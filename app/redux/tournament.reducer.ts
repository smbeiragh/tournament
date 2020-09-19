import {
  ACTION_ADD_FAV_TOURNAMENT,
  ACTION_ADD_FAV_TOURNAMENT_RESULT,
  ACTION_ADD_FAV_TOURNAMENT_ERROR,
  ACTION_REMOVE_FAV_TOURNAMENT,
  ACTION_REMOVE_FAV_TOURNAMENT_RESULT,
  ACTION_REMOVE_FAV_TOURNAMENT_ERROR,
  ACTION_LIST_FAV_TOURNAMENT,
  ACTION_LIST_FAV_TOURNAMENT_RESULT,
  ACTION_LIST_FAV_TOURNAMENT_ERROR,
} from './tournament.actions';
import { TournamentState } from '../types';
import { AnyAction } from 'redux';

const initState: TournamentState = {
  favorites: {
    result: [],
    isLoading: false,
    error: null,
  },
};

const handleStates = {
  [ACTION_ADD_FAV_TOURNAMENT]: (state: TournamentState, action: AnyAction) => {
    return {
      ...state,
      favorites: {
        ...state.favorites,
        isLoading: true,
        error: null,
      },
    };
  },
  [ACTION_ADD_FAV_TOURNAMENT_RESULT]: (state: TournamentState, action: AnyAction) => {
    const added = action.result.length > state.favorites.result.length;

    return {
      ...state,
      favorites: {
        result: added ? [...state.favorites.result, action.tournament] : state.favorites.result,
        isLoading: false,
        error: null,
      },
    };
  },
  [ACTION_ADD_FAV_TOURNAMENT_ERROR]: (state: TournamentState, action: AnyAction) => {
    return {
      ...state,
      favorites: {
        ...state.favorites,
        isLoading: false,
        error: `${action.error}`,
      },
    };
  },
  [ACTION_REMOVE_FAV_TOURNAMENT]: (state: TournamentState, action: AnyAction) => {
    return {
      ...state,
      favorites: {
        ...state.favorites,
        isLoading: true,
        error: null,
      },
    };
  },
  [ACTION_REMOVE_FAV_TOURNAMENT_RESULT]: (state: TournamentState, action: AnyAction) => {
    return {
      ...state,
      favorites: {
        result: state.favorites.result.filter((item) => item.id !== action.id),
        isLoading: false,
        error: null,
      },
    };
  },
  [ACTION_REMOVE_FAV_TOURNAMENT_ERROR]: (state: TournamentState, action: AnyAction) => {
    return {
      ...state,
      favorites: {
        ...state.favorites,
        isLoading: false,
        error: `${action.error}`,
      },
    };
  },
  [ACTION_LIST_FAV_TOURNAMENT]: (state: TournamentState, action: AnyAction) => {
    return {
      ...state,
      favorites: {
        ...state.favorites,
        isLoading: true,
        error: null,
      },
    };
  },
  [ACTION_LIST_FAV_TOURNAMENT_RESULT]: (state: TournamentState, action: AnyAction) => {
    return {
      ...state,
      favorites: {
        result: action.result,
        isLoading: false,
        error: null,
      },
    };
  },
  [ACTION_LIST_FAV_TOURNAMENT_ERROR]: (state: TournamentState, action: AnyAction) => {
    return {
      ...state,
      favorites: {
        ...state.favorites,
        isLoading: false,
        error: `${action.error}`,
      },
    };
  },
};

export default function reducer(state: TournamentState = initState, action: AnyAction) {
  const actionType = action.type as keyof typeof handleStates;
  if (typeof handleStates[actionType] === 'function') {
    return handleStates[actionType](state, action);
  }
  return state;
}
