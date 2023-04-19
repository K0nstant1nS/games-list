import React, { useEffect, useRef } from "react";
import styles from "./game-rating-set.module.css";
import likeImg from "../../images/like-64.png";
import dislikeImg from "../../images/dislike-64.png";
import bestImg from "../../images/best-64.png";
import confusedImg from "../../images/confused-face-64.png";
import metacriticImg from "../../images/metascore-64.png";

const reactImagesSet = {
  exceptional: bestImg,
  recommended: likeImg,
  meh: confusedImg,
  skip: dislikeImg,
};

function GameRatingSet({ platforms, metacritic, ratings }) {
  const ratingRef = useRef({});
  const indicatorRef = useRef(null);
  const color =
    metacritic >= 70
      ? styles.green
      : metacritic >= 45
      ? styles.yellow
      : styles.red;

  useEffect(() => {
    if (indicatorRef.current && ratings) {
      indicatorRef.current.style.height = `${
        ratingRef.current.offsetHeight - 80
      }px`;
      ratings.forEach(({ title, percent }) => {
        indicatorRef.current.querySelector(
          `.${title}-stat`
        ).style.height = `${percent}%`;
      });
    }
  }, [ratingRef.current.offsetHeight, indicatorRef.current, ratings]);

  const metaRating = metacritic && (
    <div className={styles.metaRating}>
      <img className={styles.metacriticImg} src={metacriticImg} alt="" />
      <span className={`${styles.metastat} ${color} r2`}>{metacritic}</span>
      {platforms ? (
        platforms.length ? (
          <div className={styles.ratingStrings}>
            {platforms.map(({ metascore, platform, url }) => {
              return (
                <p className={`${styles.ratingString} r2`}>
                  {platform.name}: <a href={url}>{metascore}</a>
                </p>
              );
            })}
          </div>
        ) : null
      ) : null}
    </div>
  );

  return (
    <>
      <div ref={ratingRef} className={styles.usersRatingSet}>
        <h2>Users rating</h2>
        {ratings
          ? ratings.map(({ title, count, percent }) => {
              return (
                <div className={styles.usersRating}>
                  <img src={reactImagesSet[title]} />
                  <p className={`${styles.countPercent} r2`}>
                    <span className={styles.stat}>{count}</span>
                    <span className={styles.stat}>{percent}%</span>
                  </p>
                </div>
              );
            })
          : null}
        {metaRating}
      </div>
      {ratings ? (
        <div className={styles.ratingStats}>
          <div ref={indicatorRef} className={styles.ratingIndicate}>
            <div className={"exceptional-stat"}></div>
            <div className={"recommended-stat"}></div>
            <div className={"meh-stat"}></div>
            <div className={"skip-stat"}></div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default GameRatingSet;
