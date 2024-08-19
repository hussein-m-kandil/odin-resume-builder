import { useContext } from "react";
import { AppColorsContext } from "../context/AppColorsContext";
import ExtendedEntry from "./ExtendedEntry";

function SubHead({
  id,
  initialText = "Organization, Location",
  initialExtensionText = "Title",
  ...props
}) {
  const appColors = useContext(AppColorsContext);

  const mainStyle = {
    fontFamily: "sans-serif",
    fontSize: "large",
    fontWeight: "bold",
  };

  const extensionStyle = {
    fontFamily: "sans-serif",
    fontSize: "large",
    fontWeight: "normal",
    fontStyle: "italic",
    color: appColors.mid,
  };

  return (
    <ExtendedEntry
      {...props}
      id={id}
      initialMainText={initialText}
      initialExtensionText={initialExtensionText}
      initialMainStyle={mainStyle}
      initialExtensionStyle={extensionStyle}
    />
  );
}

export default SubHead;
