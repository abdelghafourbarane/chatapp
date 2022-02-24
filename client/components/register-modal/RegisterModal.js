import React, { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Modal } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

import { useRegisterRequest } from "../../hooks/requests";

import CustomButton from "../custom-button/CustomButton";

import { UsernameRegex, PasswordRegex } from "../../hooks/user.helpers";

import styles from "./RegisterModal.module.scss";

function RegisterModal({ onClose, open }) {
  const [usernameField, setUsernameField] = useState("");
  const [emailField, setEmailField] = useState("");
  const [passwordField, setPasswordField] = useState("");
  const [retypedPasswordField, setRetypedPasswordField] = useState("");

  const handleChange = (event) => {
    const { value, name } = event.target;
    switch (name) {
      case "username":
        setUsernameField(value);
        break;
      case "password":
        setPasswordField(value);
        break;
      case "email":
        setEmailField(value);
        break;
      case "retyped_password":
        setRetypedPasswordField(value);
        break;
    }
  };

  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      UsernameRegex.test(usernameField) &&
      PasswordRegex.test(passwordField) &&
      passwordField === retypedPasswordField
    ) {
      useRegisterRequest(usernameField, emailField, passwordField)
        .then(({ token }) => {
          router.push("/room");
        })
        .catch((err) => {
          console.log("an error occured during user register");
        });
    }
  };
  return (
    <Modal open={open} className={styles.modal} onClose={onClose}>
      <div className={styles.main_container}>
        <CloseIcon className={styles.close_icon} onClick={onClose} />
        <Image src="/static/signup_illustration.png" width={500} height={500} />
        <div className={styles.card_container}>
          <div className={styles.header}>
            <h1>Sign Up</h1>
          </div>
          <form className={styles.inputs_container} onSubmit={handleSubmit}>
            <TextField
              name="username"
              variant="outlined"
              label="Username"
              value={usernameField}
              onChange={handleChange}
            />
            <TextField
              name="email"
              variant="outlined"
              label="Email"
              type="email"
              value={emailField}
              onChange={handleChange}
            />
            <TextField
              name="password"
              variant="outlined"
              label="Password"
              type="password"
              value={passwordField}
              onChange={handleChange}
            />
            <TextField
              name="retyped_password"
              variant="outlined"
              label="Retype Password"
              type="password"
              value={retypedPasswordField}
              onChange={handleChange}
            />
            <CustomButton variant="red">Sign Up</CustomButton>
          </form>
        </div>
      </div>
    </Modal>
  );
}

export default RegisterModal;
