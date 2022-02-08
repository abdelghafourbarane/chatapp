import React from "react";
import { Modal } from "@material-ui/core";

import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

import CloseIcon from "@material-ui/icons/Close";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";

import styles from "./CustomModal.module.scss";

function CustomModal({ type, open, handleCloseModal, message }) {
  return (
    <Modal open={open} onClose={handleCloseModal} className={styles.modal}>
      <div
        className={`${styles.modal_container} ${
          type === "error" ? styles.error : styles.success
        }`}
      >
        <div className={styles.top_container}>
          {type === "error" ? (
            <ErrorOutlineIcon className={styles.icon_title} />
          ) : (
            <CheckCircleOutlineIcon className={styles.icon_title} />
          )}
          <span className={styles.title}>
            {type === "error" ? "Error" : "Success"}
          </span>

          <CloseIcon
            className={styles.close_icon}
            onClick={() => {
              handleCloseModal();
            }}
          />
        </div>
        <div className={styles.middle_container}>
          <span>{message}</span>
        </div>
        <div className={styles.line}></div>
        <div className={styles.bottom_container}>
          <button
            onClick={() => {
              handleCloseModal();
            }}
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default CustomModal;
