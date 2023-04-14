import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./game-card.module.css";
import { setMouseOver } from "../../services/slice/gamesSlice";

function GameCard({
  background_image,
  name,
  genre,
  platform,
  developer,
  released,
  id,
}) {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const { mouseOver } = useSelector((store) => store.gamesReducer);
  const cardStyle = { opacity: mouseOver === id ? 1 : 0 };

  const setMouseOverHandler = (e) => {
    dispatch(setMouseOver(id));
  };
  const setMouseOutHandler = (e) => {
    dispatch(setMouseOver(undefined));
  };

  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener("mouseenter", setMouseOverHandler);
      ref.current.addEventListener("mouseleave", setMouseOutHandler);
    }
    return () => {
      if (ref.current) {
        ref.current.removeEventListener("mouseenter", setMouseOverHandler);
        ref.current.removeEventListener("mouseleave", setMouseOutHandler);
      }
    };
  }, [ref.current]);

  return (
    <article ref={ref} className={styles.card}>
      <img className={styles.image} src={background_image} />
      <div style={cardStyle} className={styles.cardModal}>
        <img className={styles.image} src={background_image} />
        <span>{name}</span>
        <span>{genre}</span>
        <span>{released}</span>
      </div>
    </article>
  );
}

export default GameCard;
