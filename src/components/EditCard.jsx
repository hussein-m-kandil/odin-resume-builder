import { useContext } from "react";
import { AppColorsContext } from "../context/AppColorsContext";
import StyleController from "./StyleController";
import TextEditor from "./TextEditor";

function EditCard({
  id,
  entryStyle,
  entryText,
  entryPlaceholder,
  entryTextMaxLength,
  onChangeStyle,
  onChangeText,
  editCardStyle,
  onDeleteEntry,
  textAreaEditor = false,
  ...styleControlFlags
}) {
  const appColors = useContext(AppColorsContext);

  return (
    <div
      style={{
        position: "relative",
        backgroundColor: appColors.lightAccent,
        boxShadow: "0 0 3px 0 #0007",
        borderRadius: "1rem",
        padding: "2rem",
        ...editCardStyle,
      }}
    >
      <button
        aria-label="Delete"
        style={{
          padding: "0",
          position: "absolute",
          right: "0.5rem",
          top: "0.5rem",
          width: "1.5rem",
          height: "1.5rem",
          fontSize: "0.85rem",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClick={() => onDeleteEntry(id)}
      >
        X
      </button>
      <StyleController
        id={id}
        styleObject={entryStyle}
        onChangeStyle={onChangeStyle}
        {...styleControlFlags}
      />
      <TextEditor
        id={id}
        text={entryText}
        placeholder={entryPlaceholder}
        maxLength={entryTextMaxLength}
        style={entryStyle}
        onChange={onChangeText}
        textAreaInput={textAreaEditor}
      />
    </div>
  );
}

export default EditCard;
