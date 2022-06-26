import React from "react";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import GLOBAL_ACTIONS from "../../Global/Redux/actions";

function Watch() {
  const diapatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { source } = useSelector(
    ({
      mediaPlayer: {
        data: { source },
      },
    }) => ({
      source,
    })
  );

  const handleCloseBtnClick = () => {
    const from = location.state?.from?.pathname || "/home";

    diapatch(GLOBAL_ACTIONS.closeMediaPlayerAction());
    navigate(from);
  };
  return (
    <div className="watch watch-open">
      <MdClose
        size={30}
        className="watch--btn-back"
        color="white"
        onClick={handleCloseBtnClick}
      />

      <video
        className="watch--video"
        autoPlay={true}
        controls
        src={`http://localhost:8080/api/movies/accessLink/media/none/?type=trailer&path=${source}`}
        type="video/mp4"
      ></video>
    </div>
  );
}

export default Watch;
