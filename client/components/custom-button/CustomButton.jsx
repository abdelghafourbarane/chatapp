import React from "react";

import styles from "./CustomButton.module.scss";

function CustomButton({ children, variant, rounded }) {
  return (
    <button
      className={`${styles.custom_button} ${
        variant === "red" ? styles.red : ""
      } ${variant === "green" ? styles.green : ""} ${
        variant === "blue" ? styles.blue : ""
      } ${rounded ? styles.rounded : ""}`}
    >
      {children}
    </button>
  );
}

export default CustomButton;
