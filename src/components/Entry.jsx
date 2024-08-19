import { useContext, useState } from "react";
import { AppDefaultsContext } from "../context/AppDefaultsContext";
import { EditModeContext } from "../context/EditModeContext";
import EditCard from "./EditCard";

function Entry({
  id,
  initialText,
  initialStyle,
  forParagraph = false,
  forListItem = false,
  ...props
}) {
  const editMode = useContext(EditModeContext);
  const appDefaultsContext = useContext(AppDefaultsContext);

  const [text, setText] = useState(initialText);
  const [style, setStyle] = useState({
    marginBottom: appDefaultsContext.marginBottom,
    ...initialStyle,
  });

  const TEXT_MAX_LENGTH = forParagraph
    ? appDefaultsContext.textMaxLength.paragraph
    : appDefaultsContext.textMaxLength.line;

  const handleChangeText = (e) => {
    const lenIsOk = e.target.value.length <= TEXT_MAX_LENGTH;
    setText((t) => (lenIsOk ? e.target.value : t));
  };

  const handleChangeStyle = (newStyle) => {
    setStyle((recentStyle) => ({ ...recentStyle, ...newStyle }));
  };

  const editCardCommonProps = {
    id: id,
    entryText: text,
    entryStyle: style,
    editCardStyle: { margin: appDefaultsContext.editCardMargin },
    entryTextMaxLength: TEXT_MAX_LENGTH,
    onChangeStyle: handleChangeStyle,
    onChangeText: handleChangeText,
    textAreaEditor: forParagraph,
    withMarginBottomController: true,
  };

  return editMode ? (
    <EditCard {...editCardCommonProps} {...props} />
  ) : forListItem ? (
    <li style={style}>{text}</li>
  ) : (
    <div style={style}>{text}</div>
  );
}

export default Entry;
