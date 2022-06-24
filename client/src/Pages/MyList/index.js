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
    if (myList.length === 0) {
      dispatch(getMyListThunk());
    }
  }, [myList]);

  return (
    <main className="myListPage">
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
    </main>
  );
}

export default MyList;
