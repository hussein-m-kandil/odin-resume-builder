import { useContext } from "react";
import { AppColorsContext } from "../context/AppColorsContext";
import StyleController from "./StyleController";
import TextEditor from "./TextEditor";

function EditCard({
  id,
  entryStyle,
  entryText,
  entryTextMaxLength,
  onChangeStyle,
  onChangeText,
  editCardStyle,
  textAreaEditor = false,
  ...styleControlFlags
}) {
  const appColors = useContext(AppColorsContext);

  return (
    <div
      style={{
        backgroundColor: appColors.lightAccent,
        boxShadow: "0 0 3px 0 #0007",
        borderRadius: "1rem",
        padding: "1rem",
        ...editCardStyle,
      }}
    >
      <StyleController
        id={id}
        styleObject={entryStyle}
        onChangeStyle={onChangeStyle}
        {...styleControlFlags}
      />
      <TextEditor
        id={id}
        text={entryText}
        maxLength={entryTextMaxLength}
        style={entryStyle}
        onChange={onChangeText}
        textAreaInput={textAreaEditor}
      />
    </div>
  );
}

export default EditCard;
