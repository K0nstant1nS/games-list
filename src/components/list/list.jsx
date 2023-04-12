import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./list.module.css";
import {
  getGamesList,
  loadMore,
  setDefaultAmount,
} from "../../services/slice/gamesSlice";
import SortSettings from "../sort-settings/sort-settings";
import GameCard from "../game-card/game-card";
import { useLocation } from "react-router-dom";
import { getParam, compareDate } from "../../services/utils";
import Loader from "../loader/loader";

function List() {
  const ref = useRef();
  const dispatch = useDispatch();
  const { visible, loaded, status } = useSelector(
    (store) => store.gamesReducer
  );
  const location = useLocation();
  const dateParam = getParam("sort", location.search);
  let gamesElements = [...visible];
  const scrollListener = (e) => {
    const { current } = ref;
    const { height, y } = current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    if (windowHeight + -y + 200 >= height) {
      dispatch(loadMore());
    }
  };

  if (dateParam) {
    gamesElements.sort((a, b) => {
      if (dateParam === "increase") {
        return compareDate(a.release_date, b.release_date);
      } else if (dateParam === "decrease") {
        return compareDate(b.release_date, a.release_date);
      }
    });
  }

  useEffect(() => {
    dispatch(getGamesList());
  }, []);

  useEffect(() => {
    document.addEventListener("scroll", scrollListener);
    return () => {
      document.removeEventListener("scroll", scrollListener);
    };
  }, [ref.current]);

  useEffect(() => {
    dispatch(setDefaultAmount());
  }, [dateParam]);

  gamesElements = gamesElements.slice(0, loaded).map((item) => {
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
    <div ref={ref} className={styles.container}>
      <SortSettings />
      {renderer()}
    </div>
  );
}

export default List;
