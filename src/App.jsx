import { Fragment, useState } from "react";
import Header from "./components/Header";
import Button from "./components/Button";
import { initialData } from "./data/initialData";

function Select({ options, ...props }) {
  return (
    <select {...props}>
      {options.map((o, i) => (
        <option key={o} value={i} style={props.style}>
          {o.toUpperCase()}
        </option>
      ))}
    </select>
  );
}

function StyleController({
  id,
  fontSizeValue,
  onChangeFontSize,
  colorValue,
  onChangeColor,
}) {
  const FONT_SIZES = [
    "xx-small",
    "x-small",
    "small",
    "medium",
    "large",
    "x-large",
    "xx-large",
  ];
  const defaultFontSize = FONT_SIZES.indexOf(fontSizeValue ?? "medium");
  return (
    <div
      style={{
        marginTop: "1rem",
        display: "flex",
        flexWrap: "wrap",
        gap: "0.5rem",
        justifyContent: "flex-end",
      }}
    >
      <Select
        id={`${id}-fs-control`}
        value={defaultFontSize}
        onChange={(e) => onChangeFontSize(FONT_SIZES[e.target.value])}
        style={{ fontSize: "xx-small", fontWeight: "bold" }}
        options={FONT_SIZES}
      />
      <input
        type="color"
        value={colorValue ?? ""}
        onChange={(e) => onChangeColor(e.target.value)}
      />
    </div>
  );
}

function Line({ id, initialText, initialStyle, editMode = false }) {
  const MAX_LENGTH = 80;

  const [text, setText] = useState(initialText);
  const [style, setStyle] = useState(initialStyle);

  const handleChangeInput = (e) => {
    const lenIsOk = e.target.value.length <= MAX_LENGTH;
    setText((t) => (lenIsOk ? e.target.value : t));
  };

  const handleChangeFontSize = (fs) => {
    setStyle((s) => ({ ...s, fontSize: fs }));
  };

  const handleChangeColor = (c) => {
    setStyle((s) => ({ ...s, color: c }));
  };

  return editMode ? (
    <>
      <StyleController
        id={id}
        fontSizeValue={style.fontSize}
        onChangeFontSize={handleChangeFontSize}
        colorValue={style.color}
        onChangeColor={handleChangeColor}
      />
      <div
        style={{
          margin: "0.5rem 0",
          display: "flex",
          alignItems: "center",
        }}
      >
        <input
          id={id}
          type="text"
          maxLength={80}
          value={text}
          onChange={handleChangeInput}
          style={{ ...style, width: "100%" }}
        />
        <span style={{ ...style, marginLeft: "0.5rem" }}>
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

function App() {
  const APP_COLORS = {
    accent: "#00ab44",
    light: "#fff",
    mid: "#777",
    dark: "#000",
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
    <div>
      <Header appColors={APP_COLORS}>
        <Button
          appColors={APP_COLORS}
          className={"edit-btn"}
          onClick={handleTogglingEditMode}
        >
          {editMode ? "Submit" : "Edit"}
        </Button>
      </Header>
      <div className="resume-content">
        <Line
          {...getCommonEntryProps()}
          initialText={initialData.name}
          initialStyle={{
            fontSize: "xx-large",
            fontWeight: "bold",
          }}
        />
        <Line
          {...getCommonEntryProps()}
          initialText={initialData.title}
          initialStyle={{
            fontSize: "x-large",
            color: APP_COLORS.accent,
          }}
        />
        {initialData.contact.map((entry) => (
          <Line
            {...getCommonEntryProps()}
            key={entry}
            initialText={entry}
            initialStyle={{ color: APP_COLORS.mid }}
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
    </div>
  );
}

export default App;
