import { useState, useEffect } from "react";

/**
 * A custom React Hook that tracks the window's inner width,
 * causing a re-render on every width change,
 * and returns the updated width value.
 *
 * This Hook is built using the useState and useEffect Hooks.
 *
 * It provides a clean useEffect callback
 * that removes the event listener from the window object
 * before the component unmounts, ensuring better performance.
 *
 * @returns {number} - The current window's inner width
 */
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
