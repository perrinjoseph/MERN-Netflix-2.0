import React, { createRef, useEffect, useMemo, useState } from "react";
import addButton from "../../Assets/addbutton.svg";
import removeButton from "../../Assets/remove-button.svg";
import playButton from "../../Assets/playbutton.svg";
import thumbsUpButton from "../../Assets/thumbsup.svg";
import moreBtn from "../../Assets/more-option-btn.svg";
import { FiMoreHorizontal } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import GLOBAL_ACTIONS from "../../Redux/actions";
import axiosClient from "../../Api/axiosConfig";
import MOVIE_INFORMATION_ACTIONS from "../MovieInformation/redux/actions";
import {
  addToMyListThunk,
  deleteFromMyListThunk,
} from "../../../Pages/Home/redux/thunks";
import CardButton from "./CardButton";
import { useLocation, useNavigate } from "react-router-dom";

let timer;
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
    const navigate = useNavigate();
    const location = useLocation();
    const { myList } = useSelector(
      ({
        homeScreen: {
          data: { myList },
        },
      }) => ({ myList })
    );

    const isMyListMovie = useMemo(
      () =>
        myList.find((eachMovie) => eachMovie._id === movie._id) ? true : false,
      [myList, movie]
    );

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
        transitionDelay: "0s",
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
      // eslint-disable-next-line react-hooks/exhaustive-deps
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
      if (screenWidth >= 825) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          setOnHover(true);
        }, 800);
      }
    };

    const handleOnMouseLeave = () => {
      if (timer) clearTimeout(timer);
      setOnHover(false);
    };

    const handlePlayButtonClick = () => {
      dispatch(GLOBAL_ACTIONS.openMediaPlayerAction(trailer));
      navigate("/watch", { state: { from: location } });
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

        <div
          className="card--mediacontainer"
          onClick={() => {
            if (screenWidth <= 825 && screenWidth >= 600) {
              setExtend((extend) => !extend);
            }
          }}
        >
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
          <div className={`card--desc ${onHover ? "card--desc--show" : ""}`}>
            <div className="card--desc--buttons">
              <div className="card--desc--buttons--row">
                <CardButton
                  icon={playButton}
                  onClick={handlePlayButtonClick}
                  toolTipMessage="Play"
                />
                {isMyListMovie ? (
                  <CardButton
                    icon={removeButton}
                    onClick={() => {
                      dispatch(deleteFromMyListThunk(movie));
                    }}
                    toolTipMessage="Remove from list"
                  />
                ) : (
                  <CardButton
                    icon={addButton}
                    onClick={() => {
                      dispatch(addToMyListThunk(movie));
                    }}
                    toolTipMessage="Add to my list"
                  />
                )}
                <CardButton icon={thumbsUpButton} toolTipMessage="Like" />
              </div>

              <CardButton
                icon={moreBtn}
                onClick={() => {
                  setExtend((extend) => !extend);
                }}
                className="card--desc--buttons--btn"
                toolTipMessage="More Info"
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
