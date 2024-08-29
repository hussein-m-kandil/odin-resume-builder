import { useContext } from "react";
import { AppDefaultsContext } from "../context/AppDefaultsContext";
import Select from "./Select";

const FONT_FAMILIES = [
  "sans-serif",
  "Arial",
  "Helvetica",
  "Verdana",
  "serif",
  "Tahoma",
  "Trebuchet MS",
  "Times New Roman",
  "Georgia",
  "Garamond",
  "monospace",
  "Courier New",
  "cursive",
];

function FontFamilyController({
  id,
  inputStyle,
  labelStyle,
  styleObject,
  onChangeStyle,
}) {
  const { googleFonts, googleFontFamilies } = useContext(AppDefaultsContext);

  const fontFamilyOptions =
    googleFontFamilies && Array.isArray(googleFontFamilies)
      ? FONT_FAMILIES.concat(googleFontFamilies)
      : FONT_FAMILIES;

  const defaultFontFamily = fontFamilyOptions.indexOf(
    styleObject.fontFamily || "Arial"
  );

  const linkToCSSGoogleFont = (family, index, onLoad) => {
    const linkId = `gf-css-link-${id}`;
    const linkTag = document.createElement("link");
    const variants =
      googleFonts.items[index].variants.length > 0
        ? `:${googleFonts.items[index].variants.join(",")}`
        : "";
    linkTag.href = `https://fonts.googleapis.com/css?family=${family}${variants}&display=block`;
    linkTag.id = linkId;
    linkTag.rel = "stylesheet";
    linkTag.setAttribute("fetchpriority", "high");
    linkTag.setAttribute("crossorigin", "anonymous");
    linkTag.onload = onLoad;
    const oldLinkTag = document.getElementById(linkId);
    if (oldLinkTag) {
      // Replace the old link's id with unique id until the old link deleted
      const kebabFF = family.replaceAll(" ", "-");
      const uuid = `${
        new Date().getTime() * Math.random() * Math.random()
      }`.replace(".", "");
      oldLinkTag.id += `-tmp-${kebabFF}-${uuid}`;
      setTimeout(() => oldLinkTag.remove(), 500);
    }
    document.head.appendChild(linkTag);
  };

  const handleChangeFontFamily = (e) => {
    if (e.target.value >= 0 && e.target.value < fontFamilyOptions.length) {
      const chosenFontFamily = fontFamilyOptions[e.target.value];
      const changeFamily = () => {
        onChangeStyle({
          ...styleObject,
          fontFamily: chosenFontFamily,
        });
      };
      // Add google fonts CSS link tag, only if not safe font family
      if (e.target.value >= FONT_FAMILIES.length) {
        linkToCSSGoogleFont(
          chosenFontFamily,
          e.target.value - FONT_FAMILIES.length,
          changeFamily
        );
      } else {
        changeFamily();
      }
    }
  };

  return (
    <Select
      title="Font family"
      id={`${id}-ff-control`}
      value={defaultFontFamily}
      onChange={handleChangeFontFamily}
      inputStyle={inputStyle}
      labelStyle={labelStyle}
      options={fontFamilyOptions}
    />
  );
}

export default FontFamilyController;
