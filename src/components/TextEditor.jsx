import { useContext } from "react";
import { AppColorsContext } from "../context/AppColorsContext";

function TextEditor({
  id,
  text,
  style,
  onChange,
  maxLength,
  placeholder,
  textAreaInput = false,
}) {
  const appColors = useContext(AppColorsContext);

  const customProps = {
    id: `${id}-editor`,
    maxLength,
    value: text,
    placeholder: placeholder || "Edit entry...",
    onChange: onChange,
  };

  const commonStyle = {
    ...style,
    display: "block",
    padding: "0.75rem",
    marginBottom: "0",
    marginRight: "0",
    marginLeft: "0",
    marginTop: "0",
    width: "100%",
    backgroundColor: "#ffffff",
  };

  if (!text) {
    commonStyle.fontWeight = "lighter";
    commonStyle.fontStyle = "italic";
    commonStyle.fontSize = "small";
    commonStyle.color = "#eeeeee";
  }

  return (
    <div
      style={{
        marginBottom: style.marginBottom,
        position: "relative",
      }}
    >
      <label htmlFor={customProps.id}>
        {textAreaInput ? (
          <textarea
            {...customProps}
            rows={7}
            style={{
              ...commonStyle,
              resize: "none",
              overflow: "auto",
            }}
          />
        ) : (
          <input {...customProps} type="text" style={commonStyle} />
        )}
      </label>
      <span
        style={{
          marginLeft: "0.5rem",
          fontSize: "x-small",
          position: "absolute",
          bottom: "0.25rem",
          right: "0.5rem",
          color: appColors.mid,
        }}
      >
        {`${text.length}/${maxLength}`}
      </span>
    </div>
  );
}

export default TextEditor;
