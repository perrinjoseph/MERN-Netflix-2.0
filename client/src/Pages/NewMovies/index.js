import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_STATUS } from "../../Global/Api/constants";
import Slider from "../../Global/Components/Slider";
import { getNewMoviesThunk } from "./redux/thunks";

function NewMovies() {
  const dispatch = useDispatch();
  const { data, apiStatus } = useSelector(
    ({ newMovies: { data, apiStatus } }) => ({
      data,
      apiStatus,
    })
  );
  useEffect(() => {
    if (data.length === 0) {
      console.log("hi");
      dispatch(getNewMoviesThunk());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <main className="myListPage">
      <section className="home--content--movies">
        {data.length > 0 && (
          <Slider
            isMyList={true}
            title={"New Movies"}
            list={data}
            isLoading={apiStatus === API_STATUS.GETTING}
          />
        )}
      </section>
    </main>
  );
}

export default NewMovies;
