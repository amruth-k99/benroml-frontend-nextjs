import { actionTypes } from "../store/types";

export const storeUserData = (data) => (dispatch) => {
  dispatch({
    type: actionTypes.SET_USERNAME,
    payload: data,
  });
};

export const storeAuthData = (data) => (dispatch) => {
  dispatch({
    type: actionTypes.SET_AUTH_DATA,
    payload: data,
  });
};

export const storWorkouts = (data) => (dispatch) => {
  dispatch({
    type: actionTypes.SET_WORKOUTS,
    payload: data,
  });
};

export const storeNotifications = (data) => (dispatch) => {
  dispatch({
    type: actionTypes.SET_NOTIFICATIONS,
    payload: data,
  });
};

export const storeBankAccounts = (data) => (dispatch) => {
  dispatch({
    type: actionTypes.SET_BANK_ACCOUNTS,
    payload: data,
  });
};

export const setTodaysWorkout = (data) => (dispatch) => {
  dispatch({
    type: actionTypes.SET_TODAYS_WORKOUT,
    payload: data,
  });
};
export const setPages = (data) => (dispatch) => {
  //set seen to that specific notification
  dispatch({
    type: actionTypes.SET_PAGES,
    payload: data,
  });
};
export const clearData = () => (dispatch) => {
  dispatch({
    type: actionTypes.CLEAR_DATA,
  });
};
