import React, { useState, useContext } from "react";
import { useRouter } from "next/router";
import { TextField } from "@material-ui/core";

import { UserContext } from "../../context/user/user.context";
import { changeUsernameSuccess } from "../../context/user/user.actions";

import ModalWithFormWrapper from "../modal-with-form-wrapper/ModalWithFormWrapper";

import { UsernameRegex } from "../../hooks/user.helpers";
import { useUpdateUsernameRequest } from "../../hooks/requests";

import styles from "./ChangeProfileModal.module.scss";

function ChangeProfileModal({ onClose, open }) {
  const router = useRouter();
  const {
    userState: { user },
    userDispatch,
  } = useContext(UserContext);

  const [usernameField, setUsernameField] = useState(user?.username);
  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "username":
        setUsernameField(value);
        break;
      default:
        return;
    }
  };

  const handleSave = () => {
    if (UsernameRegex.test(usernameField)) {
      useUpdateUsernameRequest(usernameField).then(({ token }) => {
        window.localStorage.setItem("token", token);
        userDispatch(changeUsernameSuccess(usernameField));
      });
    } else {
      //if username typed is not valid
    }
  };
  return (
    <ModalWithFormWrapper
      open={open}
      onClose={onClose}
      title="Change Profile"
      onSave={handleSave}
    >
      <div className={styles.inputs_container}>
        <TextField
          name="username"
          variant="outlined"
          label="username"
          type="text"
          value={usernameField}
          onChange={(event) => {
            handleFieldChange(event);
          }}
        />
      </div>
    </ModalWithFormWrapper>
  );
}

export default ChangeProfileModal;
