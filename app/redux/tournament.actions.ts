import { ThunkExtraArgs, Tournament } from '../types';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

export const ACTION_ADD_FAV_TOURNAMENT = 'tournament/addFav';
export const ACTION_ADD_FAV_TOURNAMENT_RESULT = 'tournament/addFav/result';
export const ACTION_ADD_FAV_TOURNAMENT_ERROR = 'tournament/addFav/error';

export const ACTION_REMOVE_FAV_TOURNAMENT = 'tournament/removeFav';
export const ACTION_REMOVE_FAV_TOURNAMENT_RESULT = 'tournament/removeFav/result';
export const ACTION_REMOVE_FAV_TOURNAMENT_ERROR = 'tournament/removeFav/error';

export const ACTION_LIST_FAV_TOURNAMENT = 'tournament/listFav';
export const ACTION_LIST_FAV_TOURNAMENT_RESULT = 'tournament/listFav/result';
export const ACTION_LIST_FAV_TOURNAMENT_ERROR = 'tournament/listFav/error';

export function addFavoriteTournament({
  tournament,
}: {
  tournament: Tournament;
}): ThunkAction<Promise<Tournament[]>, () => any, ThunkExtraArgs, Action> {
  return function (dispatch, getState, { favoritesService }) {
    dispatch({
      type: ACTION_ADD_FAV_TOURNAMENT,
      tournament,
    });

    return favoritesService.add(tournament).then(
      (result) => {
        dispatch({
          type: ACTION_ADD_FAV_TOURNAMENT_RESULT,
          tournament,
          result,
        });
        return result;
      },
      (error) => {
        dispatch({
          type: ACTION_ADD_FAV_TOURNAMENT_ERROR,
          error,
        });
        throw error;
      },
    );
  };
}

export function removeFavoriteTournament({
  id,
}: {
  id: string;
}): ThunkAction<Promise<Tournament[]>, () => any, ThunkExtraArgs, Action> {
  return function (dispatch, getState, { favoritesService }) {
    dispatch({
      type: ACTION_REMOVE_FAV_TOURNAMENT,
      id,
    });

    return favoritesService.remove(id).then(
      (result) => {
        dispatch({
          type: ACTION_REMOVE_FAV_TOURNAMENT_RESULT,
          id,
        });
        return result;
      },
      (error) => {
        dispatch({
          type: ACTION_REMOVE_FAV_TOURNAMENT_ERROR,
          id,
          error,
        });
        throw error;
      },
    );
  };
}

export function listFavoriteTournament(): ThunkAction<Promise<Tournament[]>, () => any, ThunkExtraArgs, Action> {
  return function (dispatch, getState, { favoritesService }) {
    dispatch({
      type: ACTION_LIST_FAV_TOURNAMENT,
    });

    return favoritesService.list().then(
      (result) => {
        dispatch({
          type: ACTION_LIST_FAV_TOURNAMENT_RESULT,
          result,
        });
        return result;
      },
      (error) => {
        dispatch({
          type: ACTION_LIST_FAV_TOURNAMENT_ERROR,
          error,
        });
        throw error;
      },
    );
  };
}
