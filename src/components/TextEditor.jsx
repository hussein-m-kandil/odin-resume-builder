import { useContext } from "react";
import { AppColorsContext } from "../context/AppColorsContext";

function TextEditor({
  id,
  text,
  maxLength,
  style,
  onChange,
  textAreaInput = false,
}) {
  const appColors = useContext(AppColorsContext);

  const customProps = {
    id: `${id}-editor`,
    maxLength,
    value: text,
    placeholder: "Edit entry...",
    onChange: onChange,
  };

  const commonStyle = {
    ...style,
    width: "100%",
    marginTop: "0",
    marginRight: "0",
    marginBottom: "0",
    marginLeft: "0",
    padding: "0.75rem",
    display: "block",
  };

  return (
    <div
      style={{
        marginBottom: style.marginBottom,
        position: "relative",
      }}
    >
      <label htmlFor={customProps.id} title="Entry editor">
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
