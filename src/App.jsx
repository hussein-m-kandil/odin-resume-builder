import { useEffect, useRef, useState } from "react";
import { initialEntriesData } from "./initialEntriesData";
import { createEntryObject } from "./utils/createEntryObject";
import { AppDefaultsContext } from "./context/AppDefaultsContext";
import { AppColorsContext } from "./context/AppColorsContext";
import { EditModeContext } from "./context/EditModeContext";
import { appDefaults } from "./appDefaults";
import { appColors } from "./appColors";
import Header from "./components/Header";
import ControlPanel from "./components/ControlPanel";

const RESUME_CONTAINER_ID = "resume-container";

const focusLastEntry = (resume) => {
  let lastEntry = resume.lastChild;
  if (lastEntry) {
    const nodeName = lastEntry.nodeName;
    if ((nodeName === "UL" || nodeName === "OL") && lastEntry.lastChild) {
      lastEntry = lastEntry.lastChild;
    }
    lastEntry.scrollIntoView({ behavior: "smooth" });
  }
};

const focusTextEditor = (editCard) => {
  const textEditors = editCard.querySelectorAll("input, textarea");
  textEditors[textEditors.length - 1]?.focus();
};

function App() {
  const [editMode, setEditMode] = useState(false);

  const [resumeEntries, setResumeEntries] = useState([]);

  const generateEntryId = (entryCount) => `entry-${entryCount}`;

  const handleToggleEditMode = () => {
    setEditMode((em) => !em);
  };

  const handleDeleteEntry = (id) => {
    setResumeEntries((entries) => entries.filter((e) => e.id !== id));
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

  return (
    <AppDefaultsContext.Provider value={appDefaults}>
      <AppColorsContext.Provider value={appColors}>
        <EditModeContext.Provider value={editMode}>
          <Header>
            <ControlPanel
              editMode={editMode}
              onToggleEditMode={handleToggleEditMode}
              onAddEntry={handleAddEntry}
            />
          </Header>
          <div id={RESUME_CONTAINER_ID} style={{ padding: "1rem" }}>
            {resumeEntries.map((re) => re.component)}
          </div>
        </EditModeContext.Provider>
      </AppColorsContext.Provider>
    </AppDefaultsContext.Provider>
  );
}

export default App;
