import { useState, useEffect } from "react";

export function useWindowInnerWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = (e) => {
      setWidth(e.target.innerWidth);
    };

    const listenerOptions = { passive: true };

    window.addEventListener("resize", handleResize, listenerOptions);

    return () => {
      window.removeEventListener("resize", handleResize, listenerOptions);
    };
  }, []);

  return width;
}

export default useWindowInnerWidth;
