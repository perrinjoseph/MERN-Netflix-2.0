import React, { useEffect, useMemo } from "react";
import Button from "../Button/Button";
import { buttonTypes } from "../Button/constants";
import { colors } from "../../../Styles/colors";
import { useDispatch, useSelector } from "react-redux";
import { getMoreLikeThisListThunk } from "./redux/thunks";
import addButton from "../../Assets/addbutton.svg";
import thumbsUpButton from "../../Assets/thumbsup.svg";
import removeButton from "../../Assets/remove-button.svg";

import { MdClose } from "react-icons/md";
import MOVIE_INFORMATION_ACTIONS from "./redux/actions";
import CardButton from "../Card/CardButton";
import {
  addToMyListThunk,
  deleteFromMyListThunk,
} from "../../../Pages/Home/redux/thunks";

function MovieInformation() {
  const { moreLikeThis, movie, myList } = useSelector(
    ({
      homeScreen: {
        data: { myList },
      },
      movieMoreInfo: {
        data: { moreLikeThis, movie },
      },
    }) => ({ moreLikeThis, movie, myList })
  );
  const dispatch = useDispatch();

  const isMyListMovie = useMemo(
    () =>
      myList.find((eachMovie) => eachMovie._id === movie._id) ? true : false,
    [myList, movie]
  );

  useEffect(() => {
    dispatch(getMoreLikeThisListThunk(movie.genre, 0, 6));
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <CardButton
              icon={thumbsUpButton}
              onClick={() => {
                dispatch(addToMyListThunk(movie));
              }}
              toolTipMessage="Add to my list"
            />
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
