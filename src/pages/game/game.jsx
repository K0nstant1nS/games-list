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
import GameRatingSet from "../../components/game-rating-set/game-rating-set";
import SystemRequirements from "../../components/system-requirements/system-requirements";
import Loader from "../../components/loader/loader";
import BackButton from "../../components/back-button/back-button";

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

  const renderer = () => {
    switch (gamePageStatus) {
      case "loading": {
        return (
          <div className={styles.loader}>
            <Loader />
          </div>
        );
      }
      case "error": {
        return null;
      }
      case "success": {
        return (
          <div
            style={{ background: `#${gamePage["dominant_color"]}` }}
            className={styles.main}
          >
            <img
              className={styles.backgroundImage}
              src={gamePage["background_image"]}
            />
            <div className={styles.mainContent}>
              <BackButton />
              <h1 className={styles.gameName}>{gamePage.name}</h1>
              <div className={styles.ratings}>
                <GameRatingSet
                  metacritic={gamePage.metacritic}
                  ratings={gamePage.ratings}
                  platforms={gamePage["metacritic_platforms"]}
                />
              </div>
              <div
                className={styles.about}
                dangerouslySetInnerHTML={{ __html: gamePage.description }}
              />
            </div>
            <SystemRequirements platforms={gamePage.platforms} />
          </div>
        );
      }
    }
  };

  return renderer();
}

export default GamePage;
