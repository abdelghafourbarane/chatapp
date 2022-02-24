import React, { useState, useContext } from "react";
import { useRouter } from "next/router";
import { TextField } from "@material-ui/core";

import CustomButton from "../custom-button/CustomButton";

import { useLoginRequest, useGetUserRequest } from "../../hooks/requests";
import { signInSuccess } from "../../context/user/user.actions";

import styles from "./LoginCard.module.scss";
import { UserContext } from "../../context/user/user.context";

function LoginCard({ handleRegisterModalShow }) {
  const [usernameField, setUsernameField] = useState("");
  const [passwordField, setPasswordField] = useState("");
  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "username":
        setUsernameField(value);
        break;
      case "password":
        setPasswordField(value);
        break;
    }
  };

  const router = useRouter();
  const { userDispatch } = useContext(UserContext);
  const handleSubmit = (event) => {
    event.preventDefault();
    useLoginRequest(usernameField, passwordField)
      .then((token) => {
        useGetUserRequest().then(({ data }) => {
          userDispatch(signInSuccess(data));
          router.push("/room");
        });
      })
      .catch((err) => {
        console.log("error: ", err);
      });
  };
  return (
    <div className={styles.card}>
      <div className={styles.top_container}>
        <h1>Sign In</h1>
        <form
          className={styles.form_container}
          type="submit"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <TextField
            name="username"
            variant="outlined"
            label="Username"
            value={usernameField}
            onChange={handleChange}
            autoComplete="none"
          />
          <TextField
            name="password"
            variant="outlined"
            label="Password"
            type="password"
            value={passwordField}
            onChange={handleChange}
            autoComplete="none"
          />
          <div className={styles.login_button}>
            <CustomButton type="submit" variant="blue" thin>
              Sign In
            </CustomButton>
          </div>
          <span>Forgot Password?</span>
        </form>
      </div>
      <div className={styles.bottom_container}>
        <span>
          Don't have an account?&nbsp;
          <span className={styles.link} onClick={handleRegisterModalShow}>
            Create One
          </span>
        </span>
      </div>
    </div>
  );
}

export default LoginCard;
