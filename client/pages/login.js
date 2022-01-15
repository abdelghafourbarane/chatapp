import React, { useState, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { TextField } from "@material-ui/core";

import styles from "../styles/login.module.scss";
import CustomButton from "../components/custom-button/CustomButton";

import { useLoginRequest, useGetUserRequest } from "../hooks/requests";
import { UserContext } from "../context/user/user.context";
import { signInSuccess } from "../context/user/user.actions";

function Login() {
  // controled login field
  const [usernameField, setUsernameField] = useState("");
  const [passwordField, setPasswordField] = useState("");

  // extract dispatch function from context
  const { dispatch } = useContext(UserContext);

  // the router will be used to redirect user after success signin
  const router = useRouter();

  const handleUsernameChange = (event) => {
    setUsernameField(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPasswordField(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    useLoginRequest(usernameField, passwordField)
      .then((token) => {
        useGetUserRequest().then(({ data }) => {
          dispatch(signInSuccess(data));
          router.push("/room");
        });
      })
      .catch((err) => {
        console.log("error: ", err);
      });
  };

  return (
    <main className={styles.main_container}>
      <div>
        <Link href="/">
          <a>
            <ArrowBackIosIcon className={styles.arrow_icon} />
          </a>
        </Link>
      </div>
      <div className={styles.center_container}>
        <div className={styles.logo_container}>
          <div className={styles.image_wrapper}>
            <Image
              src="/static/chat.png"
              height={512}
              width={512}
              className={styles.chat_image}
            />
          </div>
          <h1 className={styles.app_name}>Next.js Chat App</h1>
        </div>

        <form
          className={styles.inputs_container}
          method="post"
          onSubmit={handleSubmit}
        >
          <TextField
            name="username"
            variant="outlined"
            label="Username"
            value={usernameField}
            onChange={(event) => {
              handleUsernameChange(event);
            }}
          />
          <TextField
            name="password"
            variant="outlined"
            label="Password"
            type="password"
            value={passwordField}
            onChange={handlePasswordChange}
          />
          <CustomButton variant="blue" type="submit">
            Login
          </CustomButton>
          <div className={styles.link_register}>
            <Link href="/register">
              <a>I dont have an account</a>
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}

export default Login;
