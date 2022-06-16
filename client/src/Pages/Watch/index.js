import React from "react";
import movie from "../../Global/Videos/ozark-trailer.mp4";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import GLOBAL_ACTIONS from "../../Global/Redux/actions";

function Watch() {
  const diapatch = useDispatch();
  const { openPlayer } = useSelector(({ mediaPlayer: { openPlayer } }) => ({
    openPlayer,
  }));

  const handleCloseBtnClick = () => {
    diapatch(GLOBAL_ACTIONS.closeMediaPlayerAction())
  };
  return (
    <div className={`watch ${openPlayer ? "watch-open" : ""}`}>
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
        src={movie}
        type="video/mp4"
      ></video>
    </div>
  );
}

export default Watch;
