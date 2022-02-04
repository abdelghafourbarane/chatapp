import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { TextField } from "@material-ui/core";

import CustomButton from "../components/custom-button/CustomButton";
import Spinner from "../components/spinner/Spinner";

import { useRegisterRequest, useGetUserRequest } from "../hooks/requests";

import styles from "../styles/register.module.scss";

function Register() {
  const router = useRouter();
  //Check user login
  const [loginCheck, setLoginCheck] = useState(true);
  useEffect(() => {
    useGetUserRequest()
      .then((user) => {
        router.push("/room");
      })
      .catch((err) => {
        setLoginCheck(false);
      });
  }, []);
  //controlled inputs for register form
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypedPassword, setRetypedPassword] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleRetypedPasswordChange = (event) => {
    setRetypedPassword(event.target.value);
  };

  const handleSubmitClick = (event) => {
    event.preventDefault();
    useRegisterRequest(username, email, password);
  };

  return loginCheck ? (
    <Spinner />
  ) : (
    <form onSubmit={handleSubmitClick}>
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

          <div className={styles.inputs_container}>
            <TextField
              variant="outlined"
              label="Username"
              InputProps={{
                className: styles.input_mui,
              }}
              name="username"
              value={username}
              onChange={handleUsernameChange}
            />
            <TextField
              variant="outlined"
              label="Email"
              type="email"
              className={styles.input_mui}
              name="email"
              value={email}
              onChange={handleEmailChange}
            />
            <TextField
              variant="outlined"
              label="Password"
              type="password"
              className={styles.input_mui}
              name="password"
              value={password}
              onChange={handlePasswordChange}
            />
            <TextField
              variant="outlined"
              label="Retype Password"
              type="password"
              className={styles.input_mui}
              name="retypedPassword"
              value={retypedPassword}
              onChange={handleRetypedPasswordChange}
            />
            <CustomButton variant="red" type="submit">
              Register
            </CustomButton>
          </div>
        </div>
      </main>
    </form>
  );
}

export default Register;
