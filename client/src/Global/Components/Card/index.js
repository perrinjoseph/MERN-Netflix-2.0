import React, { createRef, useEffect, useState } from "react";
import addButton from "../../Assets/addbutton.svg";
import playButton from "../../Assets/playbutton.svg";
import thumbsUpButton from "../../Assets/thumbsup.svg";
import { FiMoreHorizontal } from "react-icons/fi";
import { useDispatch } from "react-redux";
import GLOBAL_ACTIONS from "../../Redux/actions";
import axiosClient from "../../Api/axiosConfig";
import { CgMoreO } from "react-icons/cg";
import MOVIE_INFORMATION_ACTIONS from "../MovieInformation/redux/actions";

const Card = React.forwardRef(
  (
    {
      movie,
      img,
      title = "The Movie",
      watched,
      duration,
      trailer,
      getOnHover,
      growDirection,
      screenWidth,
    },
    ref
  ) => {
    const dispatch = useDispatch();
    const [onHover, setOnHover] = useState(false);
    const [cardHoverEffectStyle, setCardHoverEffectStyle] = useState({});
    const videoRef = createRef();
    const [extend, setExtend] = useState(false);
    const extendStyle = {
      zIndex: "2",
      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    };
    useEffect(() => {
      setCardHoverEffectStyle({
        transitionDelay: "0.5s",
        transformOrigin: growDirection,
        transform: "scale(1.5)",
        zIndex: "2",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
      });
    }, [growDirection]);

    useEffect(() => {
      setOnHover(false);
    }, [screenWidth]);

    useEffect(() => {
      if (!onHover && videoRef.current) videoRef.current.currentTime = 0;
      const getMovie = async () => {
        if (onHover === true) {
          try {
            await axiosClient.get(
              `http://localhost:8080/api/movies/accessLink/media/none/?type=trailer&path=${trailer}`
            );
          } catch (error) {
            console.log("Could not fetch the Trailer", error);
          }
        }
      };
      getMovie();
    }, [onHover, trailer]);

    useEffect(() => {
      if (getOnHover) getOnHover(onHover);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [onHover]);

    useEffect(() => {
      if (extend === true) {
        dispatch(MOVIE_INFORMATION_ACTIONS.setMoreInfoMovieAction(movie));
        dispatch(MOVIE_INFORMATION_ACTIONS.openMoreInfoAction());
        setExtend(false);
        setOnHover(false);
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [extend]);

    const handleOnMouseEnter = () => {
      if (screenWidth >= 825) setOnHover(true);
    };

    const handleOnMouseLeave = () => {
      setOnHover(false);
    };

    const handlePlayButtonClick = () => {
      dispatch(GLOBAL_ACTIONS.openMediaPlayerAction(trailer));
    };

    return (
      <div
        className="card"
        style={onHover ? (extend ? extendStyle : cardHoverEffectStyle) : {}}
        ref={ref}
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
      >
        <section className="card--mediacontainer--mobileDesc">
          <button className="card--mediacontainer--mobileDesc--btn">
            <FiMoreHorizontal
              className="card--mediacontainer--mobileDesc--btn--mobileIcon"
              size={28}
              onClick={() => {
                dispatch(
                  MOVIE_INFORMATION_ACTIONS.setMoreInfoMovieAction(movie)
                );
                dispatch(MOVIE_INFORMATION_ACTIONS.openMoreInfoAction());
              }}
            />
          </button>
        </section>

        <div className="card--mediacontainer">
          <img
            width={"100%"}
            height={"auto"}
            className={`card--img ${
              onHover && trailer ? "card--img-fadeOut" : ""
            }`}
            src={`http://localhost:8080/api/movies/accessLink/media/${img}`}
            alt="movie"
          ></img>

          {onHover && screenWidth >= 825 && (
            <div className="card--mediacontainer--popout">
              <video
                ref={videoRef}
                poster={`http://localhost:8080/api/movies/accessLink/media/${img}`}
                className={`card--mediacontainer--video ${
                  onHover ? "card--mediacontainer--video-show" : ""
                }`}
                src={`${
                  onHover
                    ? `http://localhost:8080/api/movies/accessLink/media/none/?type=trailer&path=${trailer}`
                    : ""
                }`}
                autoPlay={onHover}
                loop
                type="video/mp4"
              ></video>
            </div>
          )}
        </div>

        {screenWidth >= 825 && (
          <div
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
            className={`card--desc ${onHover ? "card--desc--show" : ""}`}
          >
            <div className="card--desc--buttons">
              <div className="card--desc--buttons--row">
                <button
                  className="card--desc--buttons--btn"
                  onClick={handlePlayButtonClick}
                >
                  <img src={playButton} alt="play button"></img>
                </button>
                <button className="card--desc--buttons--btn">
                  <img src={addButton} alt="add button"></img>
                </button>
                <button className="card--desc--buttons--btn">
                  <img src={thumbsUpButton} alt="like button"></img>
                </button>
              </div>
              <CgMoreO
                onClick={() => {
                  setExtend((extend) => !extend);
                }}
                className="card--desc--buttons--btn"
                size={23}
              />
            </div>

            <span className="card--desc--title">{title}</span>
            <footer className="card--desc--footer">
              <article className="card--desc--footer--progressbar">
                <article
                  className="card--desc--footer--progressbBackground"
                  style={{ width: `${(watched / duration) * 100}%` }}
                />
              </article>
              <span className="card--desc--footer--time">
                {watched} of {duration}m
              </span>
            </footer>
          </div>
        )}
      </div>
    );
  }
);

export default Card;
