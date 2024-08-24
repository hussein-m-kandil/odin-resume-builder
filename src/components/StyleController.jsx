import { useContext } from "react";
import { AppDefaultsContext } from "../context/AppDefaultsContext";
import { AppColorsContext } from "../context/AppColorsContext";
import MarginBottomController from "./MarginBottomController";
import FontFamilyController from "./FontFamilyController";
import FontStyleController from "./FontStyleController";
import FontSizeController from "./FontSizeController";
import ColorController from "./ColorController";
import TextAlignController from "./TextAlignController";

function StyleController({
  id,
  styleObject,
  onChangeStyle,
  withColorController = true,
  withFontSizeController = true,
  withFontStyleController = true,
  withFontFamilyController = true,
  withMarginBottomController = true,
  withTextAlignController = true,
}) {
  const appColors = useContext(AppColorsContext);
  const appDefaultsContext = useContext(AppDefaultsContext);

  const inputMinHeight = "2em";

  const commonStyle = {
    minHeight: inputMinHeight,
    fontSize: "small",
    fontWeight: "bold",
    accentColor: appColors.accent || "auto",
  };

  const containerStyle = {
    width: "100%",
    minHeight: inputMinHeight,
    marginBottom: appDefaultsContext.marginBottom,
    display: "flex",
    gap: "0.5rem",
    flexWrap: "wrap",
    justifyContent: "start",
    alignItems: "start",
  };

  const labelStyle = { display: "flex", alignItems: "center" };

  const checkboxStylesProps = {
    labelStyle: {
      ...commonStyle,
      ...labelStyle,
    },
    checkboxStyle: {
      height: inputMinHeight,
      width: inputMinHeight,
      marginTop: "0",
      marginLeft: "0",
      marginBottom: "0",
      marginRight: "0.25rem",
    },
  };

  const commonControlProps = {
    id: id,
    labelStyle: labelStyle,
    inputStyle: commonStyle,
    styleObject: styleObject,
    onChangeStyle: onChangeStyle,
  };

  return (
    <div style={containerStyle}>
      {withFontFamilyController && (
        <FontFamilyController {...commonControlProps} />
      )}
      {withFontSizeController && <FontSizeController {...commonControlProps} />}
      {withTextAlignController && (
        <TextAlignController {...commonControlProps} />
      )}
      {withFontStyleController && (
        <FontStyleController
          id={id}
          {...checkboxStylesProps}
          styleObject={styleObject}
          onChangeStyle={onChangeStyle}
        />
      )}
      {withColorController && <ColorController {...commonControlProps} />}
      {withMarginBottomController && (
        <MarginBottomController {...commonControlProps} />
      )}
    </div>
  );
}

export default StyleController;
