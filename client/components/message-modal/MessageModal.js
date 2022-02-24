import React from "react";
import { Modal } from "@material-ui/core";
import { Zoom } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import { Button } from "@material-ui/core";

import styles from "./MessageModal.module.scss";

function MessageModal({ open, title, type, onClose, content }) {
  return (
    <Modal open={open} onClose={onClose} className={styles.modal}>
      <div className={styles.main_container}>
        <div
          className={`${styles.icon_container} ${
            type === "error" ? styles.error : styles.success
          }`}
        >
          {type === "success" ? (
            <CheckIcon className={styles.icon} />
          ) : (
            <ClearIcon className={styles.icon} />
          )}
        </div>
        <h1>{type === "success" ? "Success" : "Error"}</h1>
        <span className={styles.content}>{content}</span>
        <Button
          variant="contained"
          className={styles.ok_button}
          onClick={onClose}
        >
          ok
        </Button>
      </div>
    </Modal>
  );
}

export default MessageModal;
