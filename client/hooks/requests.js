import axios from "axios";

const API_URI = "http://localhost:8000";

export const useLoginRequest = async (username, password) => {
  axios
    .post(`${API_URI}/login`, {
      username,
      password,
    })
    .then((response) => console.log(response.data));
};

export const useRegisterRequest = async (username, email, password) => {
  axios
    .post(`${API_URI}/register`, {
      username,
      email,
      password,
    })
    .then((response) => console.log(response.data));
};
