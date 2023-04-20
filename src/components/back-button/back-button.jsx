import React from "react";
import styles from "./back-button.module.css";
import leftArrow from "../../images/left-arrow-90.png";
import { useNavigate } from "react-router-dom";

function BackButton() {
  const navigate = useNavigate();

  const onClick = () => {
    navigate("/");
  };
  return (
    <button onClick={onClick} className={styles.button}>
      <img className={styles.image} src={leftArrow} />
    </button>
  );
}

export default BackButton;
