import "../styles/Button.css";

export default function Button({ children, onClick }) {
  return (
    <button type="button" className="btn" onClick={onClick}>
      {children}
    </button>
  );
}

export { Button };
