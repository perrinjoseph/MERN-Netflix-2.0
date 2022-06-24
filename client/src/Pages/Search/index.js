import React from "react";
import { useSearchParams } from "react-router-dom";

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <main className="myListPage">
      <section className="home--content--movies">
        {/* {data.length > 0 && (
          <Slider
            isMyList={true}
            title={"New Movies"}
            list={data}
            isLoading={apiStatus === API_STATUS.GETTING}
          />
        )} */}
      </section>
    </main>
  );
}

export default Search;
