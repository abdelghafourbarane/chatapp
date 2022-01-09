import React from "react";

import styles from "./CustomButton.module.scss";

function CustomButton({ children, variant }) {
  return (
    <button
      className={`${styles.custom_button} ${
        variant === "red" ? styles.red : ""
      } ${variant === "green" ? styles.green : ""} ${
        variant === "blue" ? styles.blue : ""
      }`}
    >
      {children}
    </button>
  );
}

export default CustomButton;
