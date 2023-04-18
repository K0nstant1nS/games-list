import React, { useEffect, useRef, useState } from "react";
import webIcon from "../../images/web-24.png";
import iosIcon from "../../images/ios-logo-24.png";
import linuxIcon from "../../images/linux-24.png";
import droidIcon from "../../images/android-24.png";
import appleIcon from "../../images/apple-logo-24.png";
import nintendoIcon from "../../images/nintendo-24.png";
import pcIcon from "../../images/pc-24.png";
import psIcon from "../../images/ps4-24.png";
import xboxIcon from "../../images/xbox-24.png";
import notFound from "../../images/not-found-image.png";
import { useDispatch, useSelector } from "react-redux";
import styles from "./game-card.module.css";
import { setMouseOver } from "../../services/slice/gamesSlice";
import CardCloud from "../card-cloud/card-cloud";
import { useNavigate } from "react-router-dom";

const platformIconsSet = {
  PlayStation: psIcon,
  Xbox: xboxIcon,
  PC: pcIcon,
  Nintendo: nintendoIcon,
  "Apple Macintosh": appleIcon,
  Linux: linuxIcon,
  Android: droidIcon,
  Web: webIcon,
  iOS: iosIcon,
};

function GameCard({
  background_image,
  name,
  released,
  id,
  genres,
  parent_platforms,
  rating,
}) {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClick = () => {
    navigate(`game/${id}`);
  };

  const genresElement = (
    <div className={styles.genres}>
      {genres.map((item) => {
        return <CardCloud key={item.name} text={item.name} />;
      })}
    </div>
  );

  const platformsElement = (
    <div className={styles.platforms}>
      {parent_platforms
        ? parent_platforms.map(({ platform }) => {
            return <img src={platformIconsSet[platform.name]} />;
          })
        : []}
    </div>
  );

  return (
    <article onClick={onClick} className={styles.card}>
      <img
        className={styles.image}
        src={background_image ? background_image : notFound}
      />
      <div ref={ref} className={styles.cardModal}>
        <img
          className={styles.image}
          src={background_image ? background_image : notFound}
        />
        {platformsElement}
        <h2>{name}</h2>
        <ul className={styles.infoList}>
          <li className={styles.infoCell}>
            <span>Дата выхода:</span>
            <span>{released}</span>
          </li>
          <li className={styles.infoCell}>
            <span>Жанры:</span>
            {genresElement}
          </li>
          <li className={styles.infoCell}>
            <span>Рейтинг:</span>
            <span>{rating}</span>
          </li>
        </ul>
        {/*genresElement*/}
      </div>
    </article>
  );
}

export default GameCard;
