import { useContext } from "react";
import { AppColorsContext } from "../context/AppColorsContext";
import ExtendedEntry from "./ExtendedEntry";

function Date({
  id,
  initialFrom = "MONTH 20XX",
  initialTo = "PRESENT",
  ...props
}) {
  const appColors = useContext(AppColorsContext);

  const mainStyle = {
    fontFamily: "sans-serif",
    fontSize: "small",
    marginBottom: "1rem",
    color: appColors.mid,
  };

  return (
    <ExtendedEntry
      {...props}
      id={id}
      initialMainText={initialFrom}
      initialExtensionText={initialTo}
      initialMainStyle={mainStyle}
      initialExtensionStyle={mainStyle}
    />
  );
}

export default Date;
