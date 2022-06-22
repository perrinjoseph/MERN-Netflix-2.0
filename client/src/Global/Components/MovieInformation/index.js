import React, { useEffect } from "react";
import Button from "../Button/Button";
import { buttonTypes } from "../Button/constants";
import { RiThumbUpLine } from "react-icons/ri";
import { colors } from "../../../Styles/colors";
import { useDispatch, useSelector } from "react-redux";
import { getMoreLikeThisListThunk } from "./redux/thunks";
import { AiOutlinePlus } from "react-icons/ai";
import { MdClose } from "react-icons/md";
import MOVIE_INFORMATION_ACTIONS from "./redux/actions";

function MovieInformation() {
  const { moreLikeThis, movie } = useSelector(
    ({
      movieMoreInfo: {
        data: { moreLikeThis, movie },
      },
    }) => ({ moreLikeThis, movie })
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMoreLikeThisListThunk(movie.genre, 0, 6));
  }, [movie]);

  return (
    <div className="movieInformation-backdrop">
      <div className="movieInformation-modal">
        <div className="movieInformation-modal--mediaContainer">
          <MdClose
            size={30}
            className="watch--btn-back"
            color="white"
            onClick={() =>
              dispatch(MOVIE_INFORMATION_ACTIONS.closeMoreInfoAction())
            }
          />
          <video
            poster={`http://localhost:8080/api/movies/accessLink/media/${movie.thumbnailImage.filename}`}
            loop
            type="video/mp4"
            autoPlay={true}
            src={`http://localhost:8080/api/movies/accessLink/media/none/?type=trailer&path=${movie.trailer}`}
            className="movieInformation-modal--video"
          ></video>
          <div className="movieInformation-modal--video-overlay"></div>
          <section className="movieInformation-modal--video-title"></section>
        </div>
        <div className="movieInformation-modal--infoContainer">
          <section className="moreinfo-btns">
            <Button
              type={buttonTypes.SECONDARY_FILLED}
              title="Play"
              style={{ width: "30%", height: "40px" }}
            />
            <div className="movieInformation-modal--video-title--btn">
              <AiOutlinePlus size={27} color="white" />
            </div>
            <div className="movieInformation-modal--video-title--btn">
              <RiThumbUpLine size={27} color="white" />
            </div>
          </section>
          <h2>{movie.title}</h2>
          <section className="movieInformation-modal--infoContainer--row">
            <aside
              className="movieInformation-modal--infoContainer--col"
              style={{ flex: "0.7" }}
            >
              <div className="movieInformation-modal--infoContainer--stats">
                <span className="movieInformation-modal--infoContainer--stats--stat">
                  2022
                </span>
                <div className="movieInformation-modal--infoContainer--stats--isSeries movieInformation-modal--infoContainer--stats--stat">
                  MOVIE
                </div>
                <span className="movieInformation-modal--infoContainer--stats--stat">
                  1h 23m
                </span>
                <div
                  className="movieInformation-modal--infoContainer--stats--isSeries movieInformation-modal--infoContainer--stats--stat"
                  style={{ color: colors.green.primary }}
                >
                  HD
                </div>
              </div>
              <span className="GLOBAL--dark-text">Summary</span>
              <p>
                <br />
                {movie.description}
              </p>
            </aside>
            <aside
              className="movieInformation-modal--infoContainer--col"
              style={{ flex: "0.2" }}
            >
              <p>
                <span className="GLOBAL--dark-text">Cast: </span>Vihaan
                Samat,Suchitra Pillai, Riya Rahul and more
              </p>
              <p>
                <span className="GLOBAL--dark-text">Genre: </span>
                {movie.genre}
              </p>
              <p>
                <span className="GLOBAL--dark-text">Rating </span>
                ⭐️⭐️⭐️⭐️⭐️
              </p>
            </aside>
          </section>
          <section className="movieInformation-modal--infoContainer--row">
            <div style={{ flex: 1 }}>
              <header className="movieInformation-modal--infoContainer--more--header">
                More Like This
              </header>
              <div className="movieInformation-modal--infoContainer--more">
                {moreLikeThis
                  .filter((el, index) => index < 3)
                  .map((movie, index) => (
                    <div
                      className={`movieInformation-modal--infoContainer--more--card card${
                        index + 1
                      }`}
                    >
                      {movie.title && (
                        <img
                          className="movieInformation-modal--infoContainer--more--card--img"
                          alt="movie"
                          src={`http://localhost:8080/api/movies/accessLink/media/${movie?.thumbnailImage?.filename}`}
                        ></img>
                      )}
                    </div>
                  ))}
                {moreLikeThis
                  .filter((el, index) => index >= 3)
                  .map((movie, index) => (
                    <div
                      className={`movieInformation-modal--infoContainer--more--card card${
                        index + 1
                      }`}
                    >
                      {movie.title && (
                        <img
                          className="movieInformation-modal--infoContainer--more--card--img"
                          alt="movie"
                          src={`http://localhost:8080/api/movies/accessLink/media/${movie?.thumbnailImage?.filename}`}
                        ></img>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default MovieInformation;
