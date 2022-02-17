import React, { useState, useContext } from "react";
import { useRouter } from "next/router";
import { TextField } from "@material-ui/core";

import { UserContext } from "../../context/user/user.context";

import ModalWithFormWrapper from "../modal-with-form-wrapper/ModalWithFormWrapper";

import { PasswordRegex } from "../../hooks/user.helpers";
import { useUpdatePasswordRequest } from "../../hooks/requests";
import { useUserLogout } from "../../hooks/requests";
import { signOutSuccess } from "../../context/user/user.actions";

import styles from "./ChangePasswordModal.module.scss";

function UpdatePasswordModal({ open, onClose }) {
  const [oldPasswordField, setOldPasswordField] = useState("");
  const [newPasswordField, setNewPasswordField] = useState("");
  const [retypedNewPasswordField, setRetypedNewPasswordField] = useState("");

  const handleFieldChange = (event) => {
    const { value, name } = event.target;
    switch (name) {
      case "old_password":
        setOldPasswordField(value);
        break;
      case "new_password":
        setNewPasswordField(value);
        break;
      case "retyped_new_password":
        setRetypedNewPasswordField(value);
        break;
    }
  };

  const router = useRouter();
  const { userDispatch } = useContext(UserContext);
  const handleSave = () => {
    if (PasswordRegex.test(newPasswordField)) {
      if (newPasswordField === retypedNewPasswordField) {
        useUpdatePasswordRequest(oldPasswordField, newPasswordField).then(
          () => {
            useUserLogout()
              .then(() => {
                userDispatch(signOutSuccess());
                router.push("/login");
              })
              .catch((err) => {
                console.log(err);
              });
          }
        );
      } else {
        return;
      }
    } else {
      return;
    }
  };
  return (
    <ModalWithFormWrapper
      title="Change Password"
      open={open}
      onSave={handleSave}
      onClose={onClose}
    >
      <div className={styles.inputs_container}>
        <TextField
          name="old_password"
          variant="outlined"
          label="Current Password"
          type="password"
          value={oldPasswordField}
          onChange={(event) => {
            handleFieldChange(event);
          }}
        />
        <TextField
          name="new_password"
          variant="outlined"
          label="New Password"
          type="password"
          value={newPasswordField}
          onChange={(event) => {
            handleFieldChange(event);
          }}
        />
        <TextField
          name="retyped_new_password"
          variant="outlined"
          label="Retype New Password"
          type="password"
          value={retypedNewPasswordField}
          onChange={(event) => {
            handleFieldChange(event);
          }}
        />
      </div>
    </ModalWithFormWrapper>
  );
}

export default UpdatePasswordModal;
