import { useState, useRef, useEffect } from "react";

function Select({ id, title, labelStyle, inputStyle, options, ...props }) {
  const [onScreen, setOnScreen] = useState(false);
  const thisRef = useRef(null);

  // Add the full list of options only when the component on screen
  // to avoid rendering useless long list of options
  // and to maintain better performance
  useEffect(() => {
    if (IntersectionObserver && thisRef.current) {
      const handleIntersection = (entries) => {
        if (entries[0]?.isIntersecting) {
          setOnScreen(true);
        } else {
          setOnScreen(false);
        }
      };
      const observer = new IntersectionObserver(handleIntersection);
      observer.observe(thisRef.current);
      return () => observer.disconnect();
    }
  }, []);

  const customOptions = onScreen ? options : options.slice(0, 15);

  return (
    <label ref={thisRef} htmlFor={id} title={title} style={labelStyle}>
      <select
        id={id}
        style={{
          // Only for font size select menu
          minWidth: /.+-ff-.+/.test(id) ? "12rem" : "initial",
          ...inputStyle,
        }}
        {...props}
      >
        {customOptions.map((opt, i) => (
          <option key={opt} value={i} style={inputStyle}>
            {opt}
          </option>
        ))}
      </select>
    </label>
  );
}

export default Select;
