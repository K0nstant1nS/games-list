import React, { useState } from "react";
import styles from "./sort-settings.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fitlerByPlatform,
  searchGames,
  yearSortToggle,
} from "../../services/slice/gamesSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { getParam } from "../../services/utils";

function SortSettings() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const param = getParam("sort", location.search);
  const [searchValue, setSearchValue] = useState("");

  const onClick = () => {
    (param === "decrease") | !param
      ? navigate("/?sort=increase")
      : navigate("/?sort=decrease");
  };

  const onInputChange = (e) => {
    setSearchValue(e.target.value);
    dispatch(searchGames({ searchValue: e.target.value }));
  };

  const onSelectChange = (e) => {
    dispatch(fitlerByPlatform({ type: e.target.value }));
  };
  return (
    <ul className={styles.list}>
      <li>
        <input type="text" value={searchValue} onChange={onInputChange} />
      </li>
      <li>
        <button onClick={onClick} type="button">
          sortByYear
        </button>
        <span>
          {param === "increase" && "▲"}
          {param === "decrease" && "▼"}
        </span>
      </li>
      <li>
        <select onChange={onSelectChange} defaultValue="ALL">
          <option value="ALL">ALL</option>
          <option value="PC">PC</option>
          <option value="BROWSER">BROWSER</option>
        </select>
      </li>
    </ul>
  );
}

export default SortSettings;
