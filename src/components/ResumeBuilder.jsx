import { Fragment } from "react";
import Header from "./Header.jsx";
import { initialData } from "../data/initialData.js";
import "../styles/ResumeBuilder.css";

function Line({ initialText, className }) {
  return <div className={className}>{initialText}</div>;
}

function Head({ initialText, className }) {
  return (
    <div
      className={className}
      style={{ marginTop: "2rem", marginBottom: "1rem" }}
    >
      {initialText}
    </div>
  );
}

function Paragraph({ initialText, className }) {
  return (
    <div className={className} style={{ marginTop: "0.5rem" }}>
      {initialText}
    </div>
  );
}

function SubHead({
  initialText,
  className,
  initialExtensionText,
  extensionClassName,
}) {
  return (
    <div className={className}>
      {initialText}
      {initialExtensionText && (
        <span
          className={extensionClassName}
        >{` - ${initialExtensionText}`}</span>
      )}
    </div>
  );
}

function Date({ initialFrom, initialTo, className }) {
  return <div className={className}>{`${initialFrom} - ${initialTo}`}</div>;
}

function List({ initialListItems, className, ordered = false }) {
  const jsxListItems = initialListItems.map((listItem) => (
    <li key={listItem}>{listItem}</li>
  ));
  return ordered ? (
    <ol className={className}>{jsxListItems}</ol>
  ) : (
    <ul className={className}>{jsxListItems}</ul>
  );
}

function ResumeBuilder() {
  return (
    <div>
      <Header />
      <div className="resume-content">
        <Line
          initialText={initialData.name}
          className={"fs-xx-large fw-bold"}
        />
        <Line
          initialText={initialData.title}
          className={"fs-x-large accent-color"}
        />
        {initialData.contact.map((entry) => (
          <Line key={entry} initialText={entry} className={"mid-color"} />
        ))}
        <Head
          initialText={"SKILLS"}
          className={"fs-x-large fw-bold accent-color"}
        />
        <Paragraph initialText={initialData.skills} />
        <Head
          initialText={"EXPERIENCE"}
          className={"fs-x-large fw-bold accent-color"}
        />
        {initialData.experience.map((entry) => (
          <Fragment key={`${entry.org} - ${entry.title}`}>
            <SubHead
              initialText={entry.org}
              initialExtensionText={entry.title}
              className={"fs-large fw-bold"}
              extensionClassName={"fs-italic fw-normal mid-color"}
            />
            <Date
              initialFrom={entry.date.from}
              initialTo={entry.date.to}
              className={"fs-small mid-color"}
            />
            <List initialListItems={entry.details} />
          </Fragment>
        ))}
        <Head
          initialText={"EDUCATION"}
          className={"fs-x-large fw-bold accent-color"}
        />
        {initialData.education.map((entry) => (
          <Fragment key={`${entry.org} - ${entry.deg}`}>
            <SubHead
              initialText={entry.org}
              initialExtensionText={entry.deg}
              className={"fs-large fw-bold"}
              extensionClassName={"fs-italic fw-normal mid-color"}
            />
            <Date
              initialFrom={entry.date.from}
              initialTo={entry.date.to}
              className={"fs-small mid-color"}
            />
            <Paragraph initialText={entry.about} />
          </Fragment>
        ))}
        <Head
          initialText={"AWARDS"}
          className={"fs-x-large fw-bold accent-color"}
        />
        <List initialListItems={initialData.awards} />
      </div>
    </div>
  );
}

export default ResumeBuilder;
