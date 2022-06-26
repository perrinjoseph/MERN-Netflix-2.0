import React, { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { API_STATUS } from "../../Global/Api/constants";
import Slider from "../../Global/Components/Slider";
import { getSearchResultThunk } from "./redux/thunks";

function Search() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const timer = useRef();
  const { data, apiStatus } = useSelector(
    ({ search: { data, apiStatus } }) => ({ data, apiStatus })
  );

  const formatedData = useMemo(() => {
    let lowIndex = 0;
    let highIndex = 5;
    const splitArray = [...new Array(Math.ceil(data.length / 5))].map(() => {
      const tempArr = data.filter((_, i) => i >= lowIndex && i < highIndex);
      lowIndex += 5;
      highIndex += 5;
      return tempArr;
    });
    return splitArray;
  }, [data]);

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);
    if (searchParams.get("search")) {
      timer.current = setTimeout(() => {
        dispatch(getSearchResultThunk(searchParams.get("search")));
      }, 300);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <div className="myListPage">
      <section className="home--content--movies">
        {apiStatus === API_STATUS.SUCCESS &&
          data.length &&
          formatedData.map((list) => (
            <Slider
              isMyList={true}
              list={list}
              isLoading={apiStatus === API_STATUS.GETTING}
            />
          ))}
        {apiStatus === API_STATUS.SUCCESS && data.length <= 0 && (
          <div className="myListPage-noMovies">There were no results found</div>
        )}
        {apiStatus === null && (
          <div className="myListPage-noMovies">
            Search for movies through<br></br>the search bar
          </div>
        )}
      </section>
    </div>
  );
}

export default Search;
