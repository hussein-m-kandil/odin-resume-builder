import { useContext } from "react";
import { AppColorsContext } from "../context/AppColorsContext";
import { initialData } from "../data/initialData";
import Entry from "./Entry";

function Paragraph({ initialText = initialData.experience, ...props }) {
  const appColors = useContext(AppColorsContext);
  const initialStyle = {
    fontFamily: "sans-serif",
    marginBottom: "2rem",
    color: appColors.dark,
  };
  return (
    <Entry
      {...props}
      initialText={initialText}
      initialStyle={initialStyle}
      forParagraph={true}
    />
  );
}

export default Paragraph;
