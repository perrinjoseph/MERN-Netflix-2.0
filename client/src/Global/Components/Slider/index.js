import React, { createRef, useEffect, useMemo, useRef, useState } from "react";
import Card from "../Card";
import { FiChevronRight } from "react-icons/fi";
import { FiChevronLeft } from "react-icons/fi";
import { API_STATUS } from "../../Api/constants";
function Slider({ title, list = [], isLoading, isMyList = false }) {
  const [onHover, setOnHover] = useState(false);
  const [scroll, setScroll] = useState(0);
  const [screenWidth, setScreenWidth] = useState(0);
  const cardRef = createRef();
  const hoverRef = useRef(null);
  const [maximumPage, setMaximumPage] = useState();

  useEffect(() => {
    const widthListener = window.addEventListener("resize", (e) => {
      // console.log(window.innerWidth);
      setScreenWidth(window.innerWidth);
    });
    //This is done here because on the page load the resize will not be fired so we wont have the screenWidth
    //Hence we set the screen width in this useEffect with an expty dep array so that it will do it once when the page loads.
    setScreenWidth(window.innerWidth);
    return () => widthListener;
  }, []);

  const screensShowing = useMemo(() => {
    if (screenWidth > 1000) {
      return 5;
    } else if (screenWidth > 600) {
      return 4;
    } else {
      return 3;
    }
  }, [screenWidth]);

  useEffect(() => {
    setMaximumPage(Math.ceil(list.length / screensShowing));
  }, [screensShowing, list]);

  // useEffect(() => {
  //   console.log("max", maximumPage);
  // }, [maximumPage, scroll]);

  const handleOnHover = (value) => {
    if (value) {
      hoverRef.current = setTimeout(() => {
        setOnHover(value);
      }, 600);
    } else {
      setOnHover(false);
      clearTimeout(hoverRef.current);
    }
  };
  return (
    !isLoading && (
      <article className="slider">
        <h2 className="slider--title">{title}</h2>
        <div className="slider--main">
          {!onHover && scroll !== 0 && (
            <div
              className="slider--main--controller-left"
              onClick={() =>
                !onHover && scroll !== 0 ? setScroll(scroll - 1) : null
              }
            >
              <FiChevronLeft />
            </div>
          )}
          <div
            className="slider--main--carousel"
            style={{
              transition: "all 0.8s ease-in-out",
              transform: `translateX(${-100 * scroll}%)`,
            }}
          >
            {list?.map((movie, index) => (
              <Card
                showMyListCard={isMyList}
                screenWidth={screenWidth}
                growDirection={
                  (index + 1) % screensShowing === 1
                    ? "left"
                    : (index + 1) % screensShowing === 0
                    ? `${(screenWidth / screensShowing) * 1.35}px`
                    : "center"
                }
                key={`${movie.title}-${movie._id}`}
                getOnHover={handleOnHover}
                img={movie.thumbnailImage.filename}
                title={movie.title}
                watched={movie.watched}
                duration={movie.duration}
                trailer={movie.trailer}
                ref={cardRef}
                movie={movie}
              />
            ))}
          </div>
          {!onHover && scroll + 1 !== maximumPage && maximumPage !== 1 && (
            <div
              className="slider--main--controller-right"
              onClick={() =>
                !onHover && scroll !== maximumPage && maximumPage !== 1
                  ? setScroll(scroll + 1)
                  : null
              }
            >
              <FiChevronRight />
            </div>
          )}
        </div>
      </article>
    )
  );
}

export default Slider;
