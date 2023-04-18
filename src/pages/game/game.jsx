import React, { useEffect } from "react";
import styles from "./game.module.css";
import likeImg from "../../images/like-64.png";
import dislikeImg from "../../images/dislike-64.png";
import bestImg from "../../images/best-64.png";
import confusedImg from "../../images/confused-face-64.png";
import metacriticImg from "../../images/metascore-64.png";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { getGameById } from "../../services/slice/gamesSlice";

const reactImagesSet = {
  exceptional: bestImg,
  recommended: likeImg,
  meh: confusedImg,
  skip: dislikeImg,
};

function GamePage() {
  const { gamePage, gamePageStatus } = useSelector(
    (store) => store.gamesReducer
  );
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGameById(id));
  }, []);

  const metaRating = gamePage["metacritic_platforms"] ? (
    <div className={styles.metaRatingSet}>
      <img src={metacriticImg} alt="" />
      <div className={styles.ratingStrings}>
        {gamePage["metacritic_platforms"].map(
          ({ metascore, platform, url }) => {
            return (
              <p className={`${styles.ratingString} r2`}>
                {platform.name}: <a href={url}>{metascore}</a>
              </p>
            );
          }
        )}
      </div>
    </div>
  ) : null;

  const usersRatingElement = (
    <div className={styles.usersRatingSet}>
      <h2>Users rating</h2>
      {gamePage.ratings
        ? gamePage.ratings.map(({ title, count, percent }) => {
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

  return (
    <div
      style={{ background: `#${gamePage["dominant_color"]}` }}
      className={styles.main}
    >
      <h1 className={styles.gameName}>{gamePage.name}</h1>
      <img
        className={styles.backgroundImage}
        src={gamePage["background_image"]}
      />
      <div className={styles.mainContent}>
        <div className={styles.ratings}>
          <div>{usersRatingElement}</div>
        </div>
        <div
          className={styles.about}
          dangerouslySetInnerHTML={{ __html: gamePage.description }}
        />
      </div>
    </div>
  );
}

export default GamePage;
