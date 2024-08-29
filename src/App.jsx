import { useEffect, useRef, useState } from "react";
import { getInitialEntriesData } from "./utils/getInitialEntriesData";
import { AppDefaultsContext } from "./context/AppDefaultsContext";
import { createEntryObject } from "./utils/createEntryObject";
import { AppColorsContext } from "./context/AppColorsContext";
import { EditModeContext } from "./context/EditModeContext";
import { appDefaults } from "./data/appDefaults";
import { appColors } from "./data/appColors";
import Header from "./components/Header";
import ControlPanel from "./components/ControlPanel";

const GF_KEY = import.meta.env.VITE_GF_KEY;
const GF_API_URL = `https://www.googleapis.com/webfonts/v1/webfonts?key=${GF_KEY}&sort=alpha`;

const RESUME_CONTAINER_ID = "resume-container";

const initialEntriesData = getInitialEntriesData();

const focusLastEntry = (resume) => {
  let lastEntry = resume.lastChild;
  if (lastEntry) {
    const nodeName = lastEntry.nodeName;
    if ((nodeName === "UL" || nodeName === "OL") && lastEntry.lastChild) {
      lastEntry = lastEntry.lastChild;
    }
    lastEntry.scrollIntoView(false);
  }
};

const focusTextEditor = (editCard) => {
  const textEditors = editCard.querySelectorAll("input, textarea");
  textEditors[textEditors.length - 1]?.focus();
};

const save = () => {
  alert("Please check the print settings before printing/saving.");
  print();
};

function App() {
  const [googleFonts, setGoogleFonts] = useState(null);

  const [editMode, setEditMode] = useState(false);

  const [resumeEntries, setResumeEntries] = useState([]);

  const [saveBtnClicked, setSaveBtnClicked] = useState(false);

  const generateEntryId = (entryCount) => `entry-${entryCount}`;

  const handleToggleEditMode = () => {
    setEditMode((em) => !em);
  };

  const handleDeleteEntry = (id) => {
    setResumeEntries((entries) => entries.filter((e) => e.id !== id));
  };

  const handleSave = () => {
    if (editMode) {
      handleToggleEditMode();
      setSaveBtnClicked(true);
    } else {
      save();
    }
  };

  /**
   * Takes component's type & its props to create an entry object
   * with a unique id and update the state of resume's entries
   * by adding this newly created entry object.
   *
   * The entry object form is: { id: string, component: React.ComponentType }.
   *
   * Note: If the number of entries exceeded the maximum safe JS number,
   * this function does nothing and fires an alert.
   *
   * @param {React.ComponentType} type
   * @param {object} props
   *
   * @returns {void}
   */
  const handleAddEntry = (type, props = {}) => {
    if (resumeEntries.length < Number.MAX_SAFE_INTEGER) {
      const updatedProps = {
        ...props,
        onDeleteEntry: handleDeleteEntry,
      };
      // Assert that entry id number > initial entries' count to avoid id conflicts
      const entriesLen = resumeEntries.length;
      const initEntriesLen = initialEntriesData.length;
      const initEntriesRendered = entriesLen >= initEntriesLen;
      const numericId = entriesLen + (initEntriesRendered ? 1 : initEntriesLen);
      const entryId = generateEntryId(numericId);
      const newEntryObject = createEntryObject(entryId, type, updatedProps);
      setResumeEntries((res) => [...res, newEntryObject]);
    } else {
      alert("You exceeded tha max number of entries! Clear some entries.");
    }
  };

  // Add initial resume's entries
  useEffect(() => {
    setResumeEntries(
      initialEntriesData.map((ire, i) => {
        const entryComponent = ire.component;
        const props = ire.props || {};
        const entryProps = {
          ...props,
          onDeleteEntry: handleDeleteEntry,
        };
        return createEntryObject(
          generateEntryId(++i),
          entryComponent,
          entryProps
        );
      })
    );
  }, []);

  // Scroll to last added entry only right after addition
  const entriesCountRef = useRef(initialEntriesData.length);
  useEffect(() => {
    const resume = document.getElementById(RESUME_CONTAINER_ID);
    const entryAdded = resumeEntries.length > entriesCountRef.current;
    if (resume && entryAdded) {
      if (editMode) {
        focusTextEditor(resume.lastChild);
        // Current ref value on gets updated after entering the edit mode
        return () => {
          entriesCountRef.current = resumeEntries.length;
        };
      }
      focusLastEntry(resume);
    }
  }, [entriesCountRef, editMode, resumeEntries]);

  // Submit edits on Enter key press
  useEffect(() => {
    if (editMode) {
      const handleEntryKeyDown = (e) => {
        if (e.key === "Enter") {
          handleToggleEditMode();
        }
      };
      document.addEventListener("keydown", handleEntryKeyDown);
      return () => {
        document.removeEventListener("keydown", handleEntryKeyDown);
      };
    }
  }, [editMode]);

  // Save the resume after exiting edit mode
  useEffect(() => {
    if (saveBtnClicked) {
      setSaveBtnClicked(false);
      // Save in clean callback to delay it as we can
      return () => save();
    }
  }, [saveBtnClicked]);

  // Fetch all google font families
  useEffect(() => {
    if (!googleFonts || !googleFonts.items) {
      fetch(GF_API_URL, { mode: "cors" })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw response;
        })
        .then((data) => {
          console.log("%cReceived google fonts: ", "color: orange", data);
          setGoogleFonts(data);
        })
        .catch((error) => console.log(error));
      console.log("%cFetching google fonts...", "color: orange");
    }
  }, [googleFonts]);

  const googleFontFamilies = googleFonts?.items.map((f) => f.family);

  return (
    <AppDefaultsContext.Provider
      value={{ ...appDefaults, googleFonts, googleFontFamilies }}
    >
      <AppColorsContext.Provider value={appColors}>
        <EditModeContext.Provider value={editMode}>
          <div id="app-container">
            <Header>
              <ControlPanel
                editMode={editMode}
                onSave={handleSave}
                onAddEntry={handleAddEntry}
                onToggleEditMode={handleToggleEditMode}
              />
            </Header>
            <div id={RESUME_CONTAINER_ID}>
              {resumeEntries.map((re) => re.component)}
            </div>
          </div>
        </EditModeContext.Provider>
      </AppColorsContext.Provider>
    </AppDefaultsContext.Provider>
  );
}

export default App;
