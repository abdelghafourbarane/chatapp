import { userTypes } from "./user.types";

export const INITIAL_STATE = {
  user: null,
  loading: false,
  error: null,
};

export const UserReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userTypes.SIGN_IN_START:
      return {
        ...state,
        loading: true,
      };
    case userTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };

    case userTypes.SIGN_IN_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case userTypes.SIGN_OUT_SUCCESS: {
      return {
        ...state,
        user: null,
      };
    }
    case userTypes.CHANGE_USERNAME: {
      return {
        ...state,
        user: { ...state.user, username: action.payload },
      };
    }
    default:
      return state;
  }
};
