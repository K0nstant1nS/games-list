import React from "react";
import styles from "./loader.module.css";

const Loader = () => {
  return (
    <div className={`${styles.container}`}>
      <div className={styles.lds}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
