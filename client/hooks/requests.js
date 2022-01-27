import axios from "axios";

const API_URI = "http://localhost:8000";

export const useLoginRequest = (username, password) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${API_URI}/login`, {
        username,
        password,
      })
      .then((response) => {
        window.localStorage.setItem("token", response.data.token);
        resolve(response.data.token);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const useRegisterRequest = (username, email, password) => {
  axios
    .post(`${API_URI}/register`, {
      username,
      email,
      password,
    })
    .then((response) => {
      console.log(response.data.token);
      window.localStorage.setItem("token", response.data.token);
    });
};

export const useGetUserRequest = () => {
  const token = window.localStorage.getItem("token");
  return new Promise((resolve, reject) => {
    axios
      .get(`${API_URI}/profile`, {
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      })
      .then((user) => {
        resolve(user);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const useUserLogout = () => {
  const token = window.localStorage.getItem("token");
  return new Promise((resolve, reject) => {
    axios
      .delete(`${API_URI}/login`, {
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      })
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const useRoomCreateRequest = (room_name) => {
  const token = window.localStorage.getItem("token");
  return new Promise((resolve, reject) => {
    axios
      .post(
        `${API_URI}/rooms`,
        {
          room_name,
        },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
        }
      )
      .then((room) => {
        resolve(room);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const useGetRoomsRequest = () => {
  const token = window.localStorage.getItem("token");
  return new Promise((resolve, reject) => {
    axios
      .get(`${API_URI}/rooms`, {
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      })
      .then((rooms) => {
        resolve(rooms);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const useAddMessageRequest = (room_id, content) => {
  const token = window.localStorage.getItem("token");
  return new Promise((resolve, reject) => {
    axios
      .post(
        `${API_URI}/messages`,
        {
          room_id: room_id,
          content: content,
        },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
        }
      )
      .then((message) => {
        resolve(message.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
