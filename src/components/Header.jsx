import "../styles/Header.css";
import Button from "./Button";

export default function Header() {
  return (
    <div className="header">
      <div className="header-content">
        <h1 className="header-title">Odin Résumé Builder</h1>
        <Button
          className="edit-submit-btn"
          onClick={() => console.log("Edit clicked!")}
        >
          Edit
        </Button>
      </div>
    </div>
  );
}

export { Header };
