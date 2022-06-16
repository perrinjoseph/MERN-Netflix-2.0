import { useEffect, useState } from "react";

function useToggle(ref) {
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    const bindActionHandler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setToggle(false);
    };
    const eventListener = document.addEventListener(
      "mousedown",
      bindActionHandler
    );
    return () => eventListener;
  }, [ref]);
  return [toggle, setToggle];
}

export default useToggle;
