import React from "react";

import styles from "./CustomButton.module.scss";

function CustomButton({ children, variant, rounded, blured, handleClick }) {
  return (
    <button
      className={`${styles.custom_button} ${
        variant === "red" ? styles.red : ""
      } ${variant === "green" ? styles.green : ""} ${
        variant === "blue" ? styles.blue : ""
      } ${variant === "danger" ? styles.danger : ""}
      ${rounded ? styles.rounded : ""} ${blured ? styles.blured : ""}`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}

export default CustomButton;
