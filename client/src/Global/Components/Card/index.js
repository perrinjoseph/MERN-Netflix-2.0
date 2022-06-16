import React, { useEffect, useState } from "react";
import addButton from "../../Assets/addbutton.svg";
import playButton from "../../Assets/playbutton.svg";
import thumbsUpButton from "../../Assets/thumbsup.svg";
import downButton from "../../Assets/down.svg";
import { FiMoreHorizontal } from "react-icons/fi";
import { useDispatch } from "react-redux";
import GLOBAL_ACTIONS from "../../Redux/actions";

const Card = React.forwardRef(
  (
    {
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
    const diapatch = useDispatch();
    const [onHover, setOnHover] = useState(false);
    const [cardHoverEffectStyle, setCardHoverEffectStyle] = useState({});

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
      if (getOnHover) getOnHover(onHover);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [onHover]);

    const handleOnMouseEnter = () => {
      if (screenWidth >= 825) setOnHover(true);
    };

    const handleOnMouseLeave = () => {
      setOnHover(false);
    };

    const handlePlayButtonClick = () => {
      diapatch(GLOBAL_ACTIONS.openMediaPlayerAction(trailer));
    };

    return (
      <div
        className="card"
        style={onHover ? cardHoverEffectStyle : {}}
        ref={ref}
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
      >
        <section className="card--mediacontainer--mobileDesc">
          <button className="card--mediacontainer--mobileDesc--btn">
            <FiMoreHorizontal
              className="card--mediacontainer--mobileDesc--btn--mobileIcon"
              size={28}
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
            <video
              poster={`http://localhost:8080/api/movies/accessLink/media/${img}`}
              className={`card--mediacontainer--video ${
                onHover ? "card--mediacontainer--video-show" : ""
              }`}
              src={`http://localhost:8080/api/movies/accessLink/media/${trailer}`}
              autoPlay={onHover}
              loop
              type="video/mp4"
            ></video>
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
              <div className="card--desc--buttons--row">
                <button className="card--desc--buttons--btn">
                  <img src={downButton} alt="like button"></img>
                </button>
              </div>
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
