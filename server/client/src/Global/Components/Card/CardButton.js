import React, { useRef, useState } from "react";

//styles for this component are inside _card.scss
function CardButton({ icon, onClick, toolTipMessage, ...props }) {
  const delayRef = useRef(null);
  const [hover, setHover] = useState(false);
  const handleMouseEnter = () => {
    if (delayRef.current) clearTimeout(delayRef.current);
    delayRef.current = setTimeout(() => {
      setHover(true);
    }, 500);
  };
  const handleMouseLeave = () => {
    if (delayRef.current) clearTimeout(delayRef.current);
    setHover(false);
  };
  return (
    <button
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="card--desc--buttons--btn"
      onClick={() => {
        if (onClick) onClick();
      }}
      {...props}
    >
      <div
        className={`card--desc--buttons--btn--toolTip ${
          hover && "show--tooltip"
        }`}
      >
        {toolTipMessage}
        <div className="card--desc--buttons--btn--toolTip--triangle"></div>
      </div>
      <img src={icon} alt={toolTipMessage} />
    </button>
  );
}

export default CardButton;
