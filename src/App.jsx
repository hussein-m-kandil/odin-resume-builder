import { Fragment, useState } from "react";
import { initialData } from "./data/initialData";

function Select({ options, ...props }) {
  return (
    <select {...props}>
      {options.map((o, i) => (
        <option key={o} value={i} style={props.style}>
          {o}
        </option>
      ))}
    </select>
  );
}

function Checkbox({
  id,
  labelText,
  labelStyle,
  checkboxStyle,
  checked,
  onChange,
  checkboxBeforeLabel = true,
}) {
  return (
    <label htmlFor={id} style={labelStyle}>
      {!checkboxBeforeLabel && labelText}
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        style={checkboxStyle}
      />
      {checkboxBeforeLabel && labelText}
    </label>
  );
}

function StyleController({ id, styleObject, onStyleChange }) {
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
  const FONT_SIZES = [
    "xx-small",
    "x-small",
    "small",
    "medium",
    "large",
    "x-large",
    "xx-large",
  ];
  const defaultFontFamily = FONT_FAMILIES.indexOf(
    styleObject.fontFamily || "Arial"
  );
  const defaultFontSize = FONT_SIZES.indexOf(styleObject.fontSize || "medium");
  const containerStyle = {
    marginTop: "1rem",
    display: "flex",
    flex: "1",
    gap: "0.5rem",
    flexWrap: "wrap",
    justifyContent: "end",
  };
  const commonStyle = { fontSize: "small", fontWeight: "bold" };
  const checkboxStylesProps = {
    labelStyle: {
      ...commonStyle,
      display: "flex",
      alignItems: "center",
    },
    checkboxStyle: {
      height: "2em",
      width: "2em",
      marginTop: "0",
      marginLeft: "0",
      marginBottom: "0",
      marginRight: "0.25rem",
    },
  };

  const handleChangeFontFamily = (e) => {
    onStyleChange({
      ...styleObject,
      fontFamily: FONT_FAMILIES[e.target.value],
    });
  };

  const handleChangeFontSize = (e) => {
    onStyleChange({ ...styleObject, fontSize: FONT_SIZES[e.target.value] });
  };

  const handleChangeBoldFont = (e) => {
    onStyleChange({
      ...styleObject,
      fontWeight: e.target.checked ? "bold" : "normal",
    });
  };

  const handleChangeItalicFont = (e) => {
    onStyleChange({
      ...styleObject,
      fontStyle: e.target.checked ? "italic" : "normal",
    });
  };

  const handleChangeColor = (e) => {
    onStyleChange({ ...styleObject, color: e.target.value });
  };

  return (
    <div style={containerStyle}>
      <Select
        id={`${id}-ff-control`}
        value={defaultFontFamily}
        onChange={handleChangeFontFamily}
        style={commonStyle}
        options={FONT_FAMILIES}
      />
      <Select
        id={`${id}-fs-control`}
        value={defaultFontSize}
        onChange={handleChangeFontSize}
        style={commonStyle}
        options={FONT_SIZES}
      />
      <Checkbox
        id={`${id}-bold-control`}
        labelText={"Bold"}
        {...checkboxStylesProps}
        checked={styleObject.fontWeight === "bold"}
        onChange={handleChangeBoldFont}
      />
      <Checkbox
        id={`${id}-italic-control`}
        labelText={"Italic"}
        {...checkboxStylesProps}
        checked={styleObject.fontStyle === "italic"}
        onChange={handleChangeItalicFont}
      />
      <input
        id={`${id}-c-control`}
        type="color"
        value={styleObject.color || "#000000"}
        onChange={handleChangeColor}
      />
    </div>
  );
}

function Line({ id, initialText, initialStyle, appColors, editMode = false }) {
  const MAX_LENGTH = 80;

  const [text, setText] = useState(initialText);
  const [style, setStyle] = useState(initialStyle);

  const handleChangeInput = (e) => {
    const lenIsOk = e.target.value.length <= MAX_LENGTH;
    setText((t) => (lenIsOk ? e.target.value : t));
  };

  return editMode ? (
    <>
      <StyleController
        id={id}
        styleObject={style}
        onStyleChange={(newStyle) => {
          setStyle((recentStyle) => ({ ...recentStyle, ...newStyle }));
        }}
      />
      <div
        style={{
          margin: "0.5rem 0",
          display: "flex",
          alignItems: "center",
          position: "relative",
        }}
      >
        <input
          id={id}
          type="text"
          maxLength={80}
          value={text}
          onChange={handleChangeInput}
          style={{ ...style, width: "100%", paddingRight: "2rem" }}
        />
        <span
          style={{
            marginLeft: "0.5rem",
            fontSize: "x-small",
            position: "absolute",
            right: "0.25rem",
            color: appColors.mid,
          }}
        >
          {`${text.length}/${MAX_LENGTH}`}
        </span>
      </div>
    </>
  ) : (
    <div style={{ ...style, margin: "0.25rem 0" }}>
      <span>{text}</span>
    </div>
  );
}

function Head({ appColors, initialText = "Headline" }) {
  return (
    <div
      style={{
        fontSize: "x-large",
        fontWeight: "bold",
        color: appColors.accent,
        marginTop: "2rem",
        marginBottom: "1rem",
      }}
    >
      {initialText}
    </div>
  );
}

function Paragraph({ appColors, initialText }) {
  initialText =
    initialText ??
    "Lorem ipsum dolor sit amet, " +
      "consectetuer adipiscing elit, " +
      "sed diam nonummy nibh euismod tincidunt " +
      "ut laoreet dolore magna aliquam erat volutpat.";
  return (
    <div style={{ marginTop: "0.5rem", color: appColors.dark }}>
      {initialText}
    </div>
  );
}

function SubHead({
  appColors,
  initialText = "Organization, Location",
  initialExtensionText = "Title",
}) {
  return (
    <div style={{ fontSize: "large", fontWeight: "bold" }}>
      {initialText}
      {initialExtensionText && (
        <span
          style={{
            fontWeight: "normal",
            fontStyle: "italic",
            color: appColors.mid,
          }}
        >{` - ${initialExtensionText}`}</span>
      )}
    </div>
  );
}

function Date({ appColors, initialFrom, initialTo }) {
  return (
    <div
      style={{ fontSize: "small", color: appColors.mid }}
    >{`${initialFrom} - ${initialTo}`}</div>
  );
}

function List({ appColors, initialListItems, ordered = false }) {
  const jsxListItems = initialListItems.map((listItem) => (
    <li key={listItem} style={{ color: appColors.dark }}>
      {listItem}
    </li>
  ));
  return ordered ? <ol>{jsxListItems}</ol> : <ul>{jsxListItems}</ul>;
}

function Header({ children, appColors }) {
  return (
    <div
      className="header"
      style={{
        backgroundColor: appColors.accent,
        position: "sticky",
        zIndex: "1000",
        width: "100%",
        top: "0",
      }}
    >
      <div
        style={{
          maxWidth: "720px",
          margin: "0 auto",
          padding: "1rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flex: "1",
        }}
      >
        <h1
          style={{
            color: appColors.light,
            margin: "0",
          }}
        >
          Odin Résumé Builder
        </h1>
        {children}
      </div>
    </div>
  );
}

function App() {
  const APP_COLORS = {
    accent: "#00ab44",
    light: "#ffffff",
    mid: "#7f7f7f",
    dark: "#000000",
  };

  const [editMode, setEditMode] = useState(false);
  const handleTogglingEditMode = () => {
    setEditMode((iem) => !iem);
  };

  let entriesCount = 0;

  const getCommonEntryProps = () => ({
    id: `entry-${++entriesCount}`,
    editMode: editMode,
    appColors: APP_COLORS, // TODO: Use React Context
  });

  return (
    <>
      <Header appColors={APP_COLORS}>
        <button
          type="button"
          className="edit-btn"
          onClick={handleTogglingEditMode}
          style={{
            width: "6rem",
            height: "3rem",
            color: APP_COLORS.dark,
            backgroundColor: APP_COLORS.light,
          }}
        >
          {editMode ? "Submit" : "Edit"}
        </button>
      </Header>
      <div style={{ padding: "1rem" }}>
        <Line
          {...getCommonEntryProps()}
          initialText={initialData.name}
          initialStyle={{
            fontFamily: "Arial",
            fontSize: "xx-large",
            fontWeight: "bold",
          }}
        />
        <Line
          {...getCommonEntryProps()}
          initialText={initialData.title}
          initialStyle={{
            fontFamily: "Arial",
            fontSize: "x-large",
            color: APP_COLORS.accent,
          }}
        />
        {initialData.contact.map((entry) => (
          <Line
            {...getCommonEntryProps()}
            key={entry}
            initialText={entry}
            initialStyle={{ fontFamily: "Arial", color: APP_COLORS.mid }}
          />
        ))}
        <Head {...getCommonEntryProps()} initialText={"SKILLS"} />
        <Paragraph
          {...getCommonEntryProps()}
          initialText={initialData.skills}
        />
        <Head {...getCommonEntryProps()} initialText={"EXPERIENCE"} />
        {initialData.experience.map((entry) => (
          <Fragment key={`${entry.org} - ${entry.title}`}>
            <SubHead
              {...getCommonEntryProps()}
              initialText={entry.org}
              initialExtensionText={entry.title}
            />
            <Date
              {...getCommonEntryProps()}
              initialFrom={entry.date.from}
              initialTo={entry.date.to}
            />
            <List {...getCommonEntryProps()} initialListItems={entry.details} />
          </Fragment>
        ))}
        <Head {...getCommonEntryProps()} initialText={"EDUCATION"} />
        {initialData.education.map((entry) => (
          <Fragment key={`${entry.org} - ${entry.deg}`}>
            <SubHead
              {...getCommonEntryProps()}
              initialText={entry.org}
              initialExtensionText={entry.deg}
            />
            <Date
              {...getCommonEntryProps()}
              initialFrom={entry.date.from}
              initialTo={entry.date.to}
            />
            <Paragraph {...getCommonEntryProps()} initialText={entry.about} />
          </Fragment>
        ))}
        <Head {...getCommonEntryProps()} initialText={"AWARDS"} />
        <List
          {...getCommonEntryProps()}
          initialListItems={initialData.awards}
        />
      </div>
    </>
  );
}

export default App;
