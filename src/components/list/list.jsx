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
  const { data, loaded, status } = useSelector((store) => store.gamesReducer);
  const location = useLocation();
  const dateParam = getParam("sort", location.search);
  let gamesElements = [...data];
  const scrollListener = (e) => {
    const { current } = ref;
    const { height, y } = current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    if (windowHeight + -y + 300 >= height && a.isTrue) {
      a.isTrue = false;
      dispatch(getNextGamesPage(a));
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

  gamesElements = gamesElements.slice(0, loaded * 20).map((item) => {
    return <GameCard key={item.id} {...item} />;
  });

  const renderer = () => {
    switch (status) {
      case "success": {
        return <main className={styles.main}>{gamesElements}</main>;
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
