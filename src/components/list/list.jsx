import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./list.module.css";
import {
  getGamesList,
  getNextGamesPage,
} from "../../services/slice/gamesSlice";
import SortSettings from "../sort-settings/sort-settings";
import GameCard from "../game-card/game-card";
import { useLocation } from "react-router-dom";
import { getParam, compareDate } from "../../services/utils";
import Loader from "../loader/loader";
const a = { isTrue: true };

function List() {
  const ref = useRef();
  const dispatch = useDispatch();
  const { data, status, requestParams } = useSelector(
    (store) => store.gamesReducer
  );
  const location = useLocation();
  const scrollListener = (e) => {
    const { current } = ref;
    const { height, y } = current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    if (windowHeight + -y + 300 >= height && a.isTrue) {
      a.isTrue = false;
      dispatch(getNextGamesPage(a, requestParams));
    }
  };

  /*if (dateParam) {
    gamesElements.sort((a, b) => {
      if (dateParam === "increase") {
        return compareDate(a.released, b.released);
      } else if (dateParam === "decrease") {
        return compareDate(b.released, a.released);
      }
    });
  }*/

  useEffect(() => {
    dispatch(getGamesList());
  }, []);

  useEffect(() => {
    document.addEventListener("scroll", scrollListener);
    return () => {
      document.removeEventListener("scroll", scrollListener);
    };
  }, [ref.current]);

  const gamesElements = data.reduce(
    (sum, item, index) => {
      if (index % 3 === 0) {
        return [
          [...sum[0], <GameCard key={item.id} {...item} />],
          [...sum[1]],
          [...sum[2]],
        ];
      } else if (index % 3 === 1) {
        return [
          [...sum[0]],
          [...sum[1], <GameCard key={item.id} {...item} />],
          [...sum[2]],
        ];
      } else {
        return [
          [...sum[0]],
          [...sum[1]],
          [...sum[2], , <GameCard key={item.id} {...item} />],
        ];
      }
    },
    [[], [], []]
  );

  const renderer = () => {
    switch (status) {
      case "success": {
        return (
          <main className={styles.main}>
            <div className={styles.column}>{gamesElements[0]}</div>
            <div className={styles.column}>{gamesElements[1]}</div>
            <div className={styles.column}>{gamesElements[2]}</div>
          </main>
        );
      }
      case "loading": {
        return <Loader />;
      }
      case "error": {
        return <div>Error =(</div>;
      }
    }
  };

  return (
    <div className={styles.page}>
      <SortSettings />
      <div ref={ref} className={styles.container}>
        {renderer()}
      </div>
    </div>
  );
}

export default List;
