import { useContext, useState } from "react";
import { AppDefaultsContext } from "../context/AppDefaultsContext";
import { EditModeContext } from "../context/EditModeContext";
import { useWindowInnerWidth } from "../hooks/useWindowInnerWidth";
import EditCard from "./EditCard";

function ExtendedEntry({
  id,
  initialMainText,
  initialExtensionText,
  initialMainStyle,
  initialExtensionStyle,
  ...props
}) {
  const editMode = useContext(EditModeContext);
  const appDefaultsContext = useContext(AppDefaultsContext);

  const TEXT_MAX_LENGTH = appDefaultsContext.textMaxLength.line;

  const windowInnerWidth = useWindowInnerWidth();

  const [mainText, setMainText] = useState(initialMainText);
  const [extensionText, setExtensionText] = useState(initialExtensionText);
  const [mainStyle, setMainStyle] = useState({
    marginBottom: appDefaultsContext.marginBottom,
    ...initialMainStyle,
  });
  const [extensionStyle, setExtensionStyle] = useState({
    ...initialExtensionStyle,
    marginBottom: mainStyle.marginBottom,
  });

  const isValidLength = (text) => text.length <= TEXT_MAX_LENGTH;

  const handleChangeMainText = (e) => {
    if (isValidLength(e.targe.value)) {
      setMainText(() => e.target.value);
    }
  };

  const handleChangeExtensionText = (e) => {
    if (isValidLength(e.targe.value)) {
      setExtensionText(() => e.target.value);
    }
  };

  const handleChangeMainStyle = (newStyle) => {
    setMainStyle((recentStyle) => ({ ...recentStyle, ...newStyle }));
    setExtensionStyle((recentStyle) => ({
      ...recentStyle,
      marginBottom: newStyle.marginBottom,
      fontFamily: newStyle.fontFamily,
      fontSize: newStyle.fontSize,
    }));
  };

  const handleChangeExtensionStyle = (newStyle) => {
    setExtensionStyle((recentStyle) => ({
      ...recentStyle,
      ...newStyle,
    }));
  };

  const containerStyle = {
    display: "flex",
    flexWrap: windowInnerWidth < 480 ? "wrap" : "nowrap",
    gap: `${editMode ? "1rem" : "0.5rem"}`,
  };

  if (editMode) containerStyle.margin = appDefaultsContext.editCardMargin;

  const editCardStyle = {
    flexGrow: "1",
    flexBasis: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  };

  const editCardCommonProps = {
    editCardStyle: editCardStyle,
    entryTextMaxLength: TEXT_MAX_LENGTH,
    textAreaEditor: false,
  };

  return (
    <div style={containerStyle}>
      {editMode ? (
        <>
          <EditCard
            {...editCardCommonProps}
            id={id}
            entryText={mainText}
            entryStyle={mainStyle}
            onChangeStyle={handleChangeMainStyle}
            onChangeText={handleChangeMainText}
            {...props}
          />
          <EditCard
            {...editCardCommonProps}
            id={`${id}-ext`}
            entryText={extensionText}
            entryStyle={extensionStyle}
            onChangeStyle={handleChangeExtensionStyle}
            onChangeText={handleChangeExtensionText}
            withMarginBottomController={false}
            withFontFamilyController={false}
            withFontSizeController={false}
            {...props}
          />
        </>
      ) : (
        <>
          <div style={mainStyle}>{mainText}</div>
          {initialExtensionText && (
            <>
              {!editMode && <div style={extensionStyle}>-</div>}
              <div style={extensionStyle}>{extensionText}</div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default ExtendedEntry;
