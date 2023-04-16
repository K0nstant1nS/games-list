import React, { useState } from "react";
import styles from "./sort-settings.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getGamesList, setRequestParam } from "../../services/slice/gamesSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { getParam } from "../../services/utils";

function SortSettings() {
  const dispatch = useDispatch();
  const location = useLocation();
  const param = getParam("sort", location.search);
  const { requestParams } = useSelector((store) => store.gamesReducer);
  const [searchValue, setSearchValue] = useState("");

  const onClick = async () => {
    if (requestParams.ordering === "released") {
      dispatch(setRequestParam({ ordering: "-released", page: 1 }));
    } else if (
      requestParams.ordering === "-released" ||
      !requestParams.ordering
    ) {
      dispatch(setRequestParam({ ordering: "released", page: 1 }));
    }

    console.log(requestParams);
  };

  const onInputChange = (e) => {
    dispatch(setRequestParam({ search: e.target.value, page: 1 }));
  };

  const onSelectChange = (e) => {
    dispatch(setRequestParam({ parent_platforms: e.target.value, page: 1 }));
  };
  return (
    <ul className={styles.list}>
      <li>
        <input
          placeholder="Название игры"
          className={styles.navElem}
          type="text"
          value={requestParams.search}
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
          defaultValue=""
        >
          <option value="">ALL</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
        </select>
      </li>
    </ul>
  );
}

export default SortSettings;
