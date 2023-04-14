import React, { useState } from "react";
import styles from "./sort-settings.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fitlerByPlatform,
  getGamesList,
  searchGames,
  setRequestParams,
} from "../../services/slice/gamesSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { getParam } from "../../services/utils";
import { refreshPage } from "../../API";

function SortSettings() {
  const dispatch = useDispatch();
  const location = useLocation();
  const param = getParam("sort", location.search);
  const { requestParams } = useSelector((store) => store.gamesReducer);
  const [searchValue, setSearchValue] = useState("");

  const onClick = () => {
    refreshPage();
    if (requestParams === "ordering=released") {
      dispatch(getGamesList("ordering=-released"));
      dispatch(setRequestParams("ordering=-released"));
    } else if (requestParams === "ordering=-released") {
      dispatch(getGamesList("ordering=released"));
      dispatch(setRequestParams("ordering=released"));
    } else if (requestParams === "") {
      dispatch(getGamesList("ordering=released"));
      dispatch(setRequestParams("ordering=released"));
    }
  };

  const onInputChange = (e) => {
    setSearchValue(e.target.value);
    //dispatch(searchGames({ searchValue: e.target.value }));
  };

  const onSelectChange = (e) => {
    //dispatch(fitlerByPlatform({ type: e.target.value }));
  };
  return (
    <ul className={styles.list}>
      <li>
        <input
          placeholder="Название игры"
          className={styles.navElem}
          type="text"
          value={searchValue}
          onChange={onInputChange}
        />
      </li>
      <li>
        <button className={styles.navElem} onClick={onClick} type="button">
          sortByYear
        </button>
        <span>
          {param === "increase" && "▲"}
          {param === "decrease" && "▼"}
        </span>
      </li>
      <li>
        <select
          className={styles.navElem}
          onChange={onSelectChange}
          defaultValue="ALL"
        >
          <option value="ALL">ALL</option>
          <option value="PC">PC</option>
          <option value="BROWSER">BROWSER</option>
        </select>
      </li>
    </ul>
  );
}

export default SortSettings;
