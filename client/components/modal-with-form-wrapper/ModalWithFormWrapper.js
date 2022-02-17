import React from "react";
import { Modal } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

import styles from "./ModalWithFormWrapper.module.scss";

function ModalWithFormWrapper({ children, open, onClose, title, onSave }) {
  return (
    <Modal open={open} onClose={onClose} className={styles.modal}>
      <div className={styles.modal_box}>
        <div className={styles.header_container}>
          <h2>{title}</h2>
          <CloseIcon className={styles.close_icon} onClick={onClose} />
        </div>
        <div className={styles.separator_ligne}></div>
        <div className={styles.main_container}>{children}</div>
        <div className={styles.bottom_container}>
          <button
            className={styles.save_button}
            onClick={() => {
              onSave();
              onClose();
            }}
          >
            Save
          </button>
          <button className={styles.cancel_button} onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default ModalWithFormWrapper;
