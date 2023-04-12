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
  const modalRef = useRef(null);
  const dispatch = useDispatch();
  const { mouseOver } = useSelector((store) => store.gamesReducer);

  const setMouseOverHandler = (e) => {
    console.log(e.target);
    dispatch(setMouseOver(id));
  };
  const setMouseOutHandler = (e) => {
    dispatch(setMouseOver(undefined));
  };

  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener("mouseenter", setMouseOverHandler);
    }
    return () => {
      if (ref.current) {
        ref.current.removeEventListener("mouseenter", setMouseOverHandler);
      }
    };
  }, [ref.current]);

  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.addEventListener("mouseleave", setMouseOutHandler);
    }
    return () => {
      if (modalRef.current) {
        modalRef.current.removeEventListener("mouseleave", setMouseOutHandler);
      }
    };
  }, [modalRef.current]);

  return (
    <article ref={ref} className={styles.card}>
      {mouseOver === id ? (
        <div ref={modalRef} className={styles.cardModal}>
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
