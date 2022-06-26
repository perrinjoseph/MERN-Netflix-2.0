import { useEffect, useRef } from "react";

/**
  it might be better to handel limits on server size. as well 
 */
function useElementOnScreen(callback, options, delay) {
  const elementRef = useRef();
  let timer;
  const debounce = (entries) => {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout((...args) => {
      callback();
    }, delay);
  };

  useEffect(() => {
    const element = elementRef.current;
    if (element) {
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) debounce(entries);
      }, options);
      observer.observe(element);
      return () => {
        if (element) observer.unobserve(element);
      };
    }
  }, [elementRef, options]);

  return [elementRef];
}

export default useElementOnScreen;
