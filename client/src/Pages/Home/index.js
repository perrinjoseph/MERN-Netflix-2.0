import React, { Suspense, useEffect, useRef, useState } from "react";
import Button from "../../Global/Components/Button/Button";
import { buttonTypes } from "../../Global/Components/Button/constants";
import Slider from "../../Global/Components/Slider";
import { BsPlusLg } from "react-icons/bs";
import { BsInfoCircle } from "react-icons/bs";
import { BsFillPlayFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { getMovieListThunk, getRandomMovieThunk } from "./redux/thunks";
import { GENRES } from "../../Global/Constants/constant";
import SliderLoading from "../../Global/Components/Slider/SliderLoading/SliderLoading";
import { API_STATUS } from "../../Global/Api/constants";
import useElementOnScreen from "../../Global/Hooks/useElementOnScreen";
import { SLIDER_CATEGORIES_FOR_HOME_PAGE } from "../../Global/Components/Slider/constants";

/*
This is done to create a closure here. because the call back 
function "observerHandler" will remember its lexical scope 
*/
let slidersLength;
function Home() {
  const { sliders, apiStatus, bannerMovie } = useSelector(
    ({
      homeScreen: {
        data: { sliders, bannerMovie },
        apiStatus,
      },
    }) => ({
      sliders,
      apiStatus,
      bannerMovie,
    })
  );
  slidersLength = sliders?.length;
  const [bannerImageLoaded, setBannerImageLoaded] = useState(false);
  const bannerImageRef = useRef();
  const dispatch = useDispatch();
  const skip = 0;
  const limit = 20;
  const observerHandler = () => {
    if (slidersLength > 0 && slidersLength < 6)
      dispatch(
        getMovieListThunk(
          SLIDER_CATEGORIES_FOR_HOME_PAGE[slidersLength],
          skip,
          limit,
          SLIDER_CATEGORIES_FOR_HOME_PAGE[slidersLength]
        )
      );
  };

  const options = {
    root: null,
    rootMargin: "200px",
    threshold: 0,
  };
  const [elementRef] = useElementOnScreen(observerHandler, options, 100);

  useEffect(() => {
    elementRef.current = document.getElementById("footer");
    if (slidersLength === 0) {
      dispatch(getMovieListThunk(GENRES.ALL_GENRES, 0, 40, "All Movies"));
    }
    dispatch(getRandomMovieThunk());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="home">
      <header className="home--header">
        <div className={`home--header--banner--preloader `}>
          <img
            ref={bannerImageRef}
            onLoad={() => {
              setBannerImageLoaded(true);
            }}
            src={`http://localhost:8080/api/movies/accessLink/media/${bannerMovie.data?.bannerImage?.filename}`}
            className={`home--header--banner ${
              bannerImageLoaded === true ? "home--header--banner--fadein" : ""
            }`}
            alt="bannerImg"
          ></img>
        </div>
      </header>
      <section className="home--content">
        <article className="home--content--info ">
          <div className="home--content--info--title">
            <img
              className="home--content--info--title "
              src={`http://localhost:8080/api/movies/accessLink/media/${bannerMovie.data?.titleImage?.filename}`}
              alt="Movie Name"
            ></img>
          </div>

          <div className="home--content--info--description home--content-mobile--container--desc">
            {bannerMovie.data?.description}
          </div>
          <div className="home--content--info--buttons">
            <div className="home--content--info--buttons--btn">
              <Button title="Play" type={buttonTypes.PRIMARY} />
            </div>
            <div className="home--content--info--buttons--btn">
              <Button title="Info" type={buttonTypes.SECONDARY} />
            </div>
          </div>
          <div className="home--content--info--buttons"></div>
        </article>
      </section>
      <section className="home--content--movies">
        <div className="home--content--movies--btns">
          <div className="btns-container">
            <div className="mobile-btn">
              <BsPlusLg /> My List
            </div>
            <div className="mobile-btn">
              <Button
                title={
                  <>
                    <BsFillPlayFill size={20} />
                    Play
                  </>
                }
                type={buttonTypes.SECONDARY_FILLED}
              />
            </div>

            <div className="mobile-btn">
              <BsInfoCircle />
              Info
            </div>
          </div>
        </div>
        {sliders.map((slider, index) => (
          <Slider
            key={index}
            title={slider.title}
            list={slider.movies}
            isLoading={slider.apiStatus === API_STATUS.GETTING}
          />
        ))}
        {apiStatus === API_STATUS.GETTING && <SliderLoading />}
      </section>
    </main>
  );
}

export default Home;
