import React from "react";
import styles from "./card-cloud.module.css";

function CardCloud({ text }) {
  return (
    <div className={styles.container}>
      <span>{text}</span>
    </div>
  );
}

export default CardCloud;
