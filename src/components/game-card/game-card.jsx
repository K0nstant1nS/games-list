import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./game-card.module.css";
import { setMouseOver } from "../../services/slice/gamesSlice";

function GameCard({
  thumbnail,
  title,
  genre,
  platform,
  developer,
  release_date,
  id,
}) {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const { mouseOver } = useSelector((store) => store.gamesReducer);

  const setMouseOverHandler = (e) => {
    dispatch(setMouseOver(id));
  };
  const setMouseOutHandler = () => {
    dispatch(setMouseOver(undefined));
  };

  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener("mouseover", setMouseOverHandler);
      ref.current.addEventListener("mouseout", setMouseOutHandler);
    }
    return () => {
      if (ref.current) {
        ref.current.removeEventListener("mouseover", setMouseOverHandler);
        ref.current.removeEventListener("mouseout", setMouseOutHandler);
      }
    };
  }, [ref.current]);

  return (
    <article ref={ref} className={styles.card}>
      {mouseOver === id ? (
        <div className={styles.cardModal}>
          <img className={styles.image} src={thumbnail} />
          <span>{title}</span>
          <span>{genre}</span>
          <span>{release_date}</span>
        </div>
      ) : (
        <img className={styles.image} src={thumbnail} />
      )}
    </article>
  );
}

export default GameCard;
