import { useContext } from "react";
import { AppColorsContext } from "../context/AppColorsContext";
import Entry from "./Entry";

function Head({ initialText = "New Headline...", ...props }) {
  const appColors = useContext(AppColorsContext);
  const initialStyle = {
    fontFamily: "sans-serif",
    fontSize: "x-large",
    fontWeight: "bold",
    marginBottom: "0.5rem",
    color: appColors.accent,
  };

  return (
    <Entry {...props} initialText={initialText} initialStyle={initialStyle} />
  );
}

export default Head;
