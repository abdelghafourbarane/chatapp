import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { TextField } from "@material-ui/core";

import styles from "../styles/login.module.scss";
import CustomButton from "../components/custom-button/CustomButton";

import { useLoginRequest } from "../hooks/requests";

function Login() {
  const [usernameField, setUsernameField] = useState("");
  const [passwordField, setPasswordField] = useState("");

  const handleUsernameChange = (event) => {
    setUsernameField(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPasswordField(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    useLoginRequest(usernameField, passwordField);
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
            InputProps={{
              className: styles.input_mui,
            }}
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
            InputProps={{
              className: styles.input_mui,
            }}
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
