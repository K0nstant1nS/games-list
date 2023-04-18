import React from "react";
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
  const metaRating = platforms ? (
    platforms.length ? (
      <div className={styles.metaRatingSet}>
        <img src={metacriticImg} alt="" />
        <div className={styles.ratingStrings}>
          {platforms.map(({ metascore, platform, url }) => {
            return (
              <p className={`${styles.ratingString} r2`}>
                {platform.name}: <a href={url}>{metascore}</a>
              </p>
            );
          })}
        </div>
      </div>
    ) : (
      <div className={styles.usersRating}>
        <img src={metacriticImg} />
        <p className={`${styles.countPercent} r2`}>
          <span className={`${styles.stat}`}>{metacritic}</span>
        </p>
      </div>
    )
  ) : null;

  return (
    <div className={styles.usersRatingSet}>
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
  );
}

export default GameRatingSet;
