import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

import styles from "./Spinner.module.scss";

function Spinner() {
  return (
    <div className={styles.spinner}>
      <CircularProgress />
    </div>
  );
}

export default Spinner;
