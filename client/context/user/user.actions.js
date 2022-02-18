import { userTypes } from "./user.types";

export const signInSuccess = (payload) => {
  return {
    type: userTypes.SIGN_IN_SUCCESS,
    payload: payload,
  };
};

export const signInFailure = (payload) => {
  return {
    type: userTypes.SIGN_IN_FAILURE,
    payload: payload,
  };
};

export const signInStart = () => {
  return {
    type: userTypes.SIGN_IN_START,
  };
};

export const signOutSuccess = () => {
  return {
    type: userTypes.SIGN_OUT_SUCCESS,
  };
};

export const changeUsernameSuccess = (username) => {
  return {
    type: userTypes.CHANGE_USERNAME,
    payload: username,
  };
};
