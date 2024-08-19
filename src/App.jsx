import { Fragment, useState } from "react";
import { initialData } from "./data/initialData";
import { AppDefaultsContext } from "./context/AppDefaultsContext";
import { AppColorsContext } from "./context/AppColorsContext";
import { EditModeContext } from "./context/EditModeContext";
import Paragraph from "./components/Paragraph";
import SubHead from "./components/SubHead";
import Header from "./components/Header";
import Head from "./components/Head";
import Line from "./components/Line";
import Date from "./components/Date";
import List from "./components/List";

function App() {
  const [editMode, setEditMode] = useState(false);
  const handleTogglingEditMode = () => {
    setEditMode((iem) => !iem);
  };

  const appColors = {
    accent: "#00ab44",
    lightAccent: "#fdfdfd",
    light: "#ffffff",
    mid: "#7f7f7f",
    dark: "#000000",
  };

  const appDefaultsContext = {
    textMaxLength: {
      line: 80,
      paragraph: 999,
    },
    editCardMargin: "2rem auto",
    marginBottom: "0.25rem",
  };

  let entriesCount = 0;
  const generateId = () => `entry-${++entriesCount}`;

  return (
    <AppDefaultsContext.Provider value={appDefaultsContext}>
      <AppColorsContext.Provider value={appColors}>
        <EditModeContext.Provider value={editMode}>
          <Header>
            <button
              type="button"
              className="edit-btn"
              onClick={handleTogglingEditMode}
              style={{
                width: "6rem",
                height: "3rem",
                color: appColors.dark,
                backgroundColor: appColors.light,
              }}
            >
              {editMode ? "Submit" : "Edit"}
            </button>
          </Header>
          <div style={{ padding: "1rem" }}>
            <Line
              id={generateId()}
              initialText={initialData.name}
              initialStyle={{
                fontFamily: "Arial",
                fontSize: "xx-large",
                fontWeight: "bold",
                color: appColors.dark,
              }}
            />
            <Line
              id={generateId()}
              initialText={initialData.title}
              initialStyle={{
                fontFamily: "Arial",
                fontSize: "x-large",
                color: appColors.accent,
              }}
            />
            {initialData.contact.map((entry, i, arr) => {
              const initialStyle = {
                fontFamily: "Arial",
                color: appColors.mid,
              };
              if (i === arr.length - 1) initialStyle.marginBottom = "2rem";
              return (
                <Line
                  id={generateId()}
                  key={entry}
                  initialText={entry}
                  initialStyle={initialStyle}
                />
              );
            })}
            <Head id={generateId()} initialText={"SKILLS"} />
            <Paragraph id={generateId()} initialText={initialData.skills} />
            <Head id={generateId()} initialText={"EXPERIENCE"} />
            {initialData.experience.map((entry) => (
              <Fragment key={`${entry.org} - ${entry.title}`}>
                <SubHead
                  id={generateId()}
                  initialText={entry.org}
                  initialExtensionText={entry.title}
                />
                <Date id={generateId()} />
                <List id={generateId()} initialListItems={entry.details} />
              </Fragment>
            ))}
            <Head id={generateId()} initialText={"EDUCATION"} />
            {initialData.education.map((entry) => (
              <Fragment key={`${entry.org} - ${entry.deg}`}>
                <SubHead
                  id={generateId()}
                  initialText={entry.org}
                  initialExtensionText={entry.deg}
                />
                <Date id={generateId()} />
                <Paragraph id={generateId()} initialText={entry.about} />
              </Fragment>
            ))}
            <Head id={generateId()} initialText={"AWARDS"} />
            <List id={generateId()} initialListItems={initialData.awards} />
          </div>
        </EditModeContext.Provider>
      </AppColorsContext.Provider>
    </AppDefaultsContext.Provider>
  );
}

export default App;
