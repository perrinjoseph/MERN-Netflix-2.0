import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_STATUS } from "../../Global/Api/constants";
import Slider from "../../Global/Components/Slider";
import { getMyListThunk } from "../Home/redux/thunks";

function MyList() {
  const dispatch = useDispatch();
  const { myList, apiStatus } = useSelector(
    ({
      homeScreen: {
        data: { myList, apiStatus },
      },
    }) => ({ myList, apiStatus })
  );

  //Only make the API call if myList isnt already fetched from home page.
  useEffect(() => {
    dispatch(getMyListThunk());
  }, []);

  return (
    <main className="myListPage">
      <section className="home--content--movies">
        {myList.length > 0 ? (
          <Slider
            isMyList={true}
            title={"My List"}
            list={myList}
            isLoading={apiStatus === API_STATUS.GETTING}
          />
        ) : (
          <div className="myListPage-noMovies">Your Movie List Is Empty</div>
        )}
      </section>
    </main>
  );
}

export default MyList;
