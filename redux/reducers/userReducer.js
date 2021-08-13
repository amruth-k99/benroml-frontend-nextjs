import { actionTypes } from "../store/types";

export const initial = {
  username: null,
  token: null,
  email: null,
  workouts: null,
  user: null,
  notifications: null,
  email_verified: null,
  user_preferred_plans: "", // fon which user clicked before logging in
  active_plans: {
    fitness: false,
  },
  todays_workout: {
    workout: [],
    warmup: [],
    cooldown: [],
  },

  isLoggedIn: false,
};

const userReducer = (state = initial, action) => {
  switch (action.type) {
    //LOGIN DATA
    case actionTypes.SET_AUTH_DATA: {
      return Object.assign({}, state, {
        token: action.payload.token,
        email: action.payload.email,
        username: action.payload.username,
        isLoggedIn: action.payload.isLoggedIn,
        active_plans: action.payload.active_plans,
      });
    }

    case actionTypes.SET_TODAYS_WORKOUT: {
      return Object.assign({}, state, {
        todays_workout: action.payload,
      });
    }

    case actionTypes.SET_USERNAME: {
      return Object.assign({}, state, {
        username: action.payload,
      });
    }

    case actionTypes.SET_WORKOUTS: {
      let i = 0;

      return Object.assign({}, state, {
        workouts: action.payload,
      });
    }

    case actionTypes.SET_NOTIFICATIONS: {
      let i = 0;
      action.payload.forEach((element) => {
        if (!element.seen) {
          i += 1;
        }
      });
      return Object.assign({}, state, {
        notifications: action.payload,
        unread_notifications: i,
      });
    }

    case actionTypes.SEE_NOTIFICATIONS: {
      let i = 0;
      action.payload.forEach((element) => {
        if (!element.seen) {
          i += 1;
        }
      });
      return Object.assign({}, state, {
        notifications: action.payload,
        unread_notifications: i,
      });
    }

    case actionTypes.SET_PAGES: {
      return Object.assign({}, state, {
        all_pages: action.payload,
      });
    }

    case actionTypes.CLEAR_DATA: {
      localStorage.clear();
      return Object.assign({}, state, {
        token: null,
        email: null,
        user: null,
        cash_alerts: null,
        investment_alerts: null,
        notifications: null,
        dashboard: null,
        unread_notifications: 0,
        isLoggedIn: false,
        disabled_accounts: null,
      });
    }

    default:
      return Object.assign({}, state);
  }
};

export default userReducer;
