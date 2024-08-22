import Entry from "./Entry";

function Line({ initialStyle, initialText = "New Line...", ...props }) {
  return (
    <Entry
      {...props}
      initialText={initialText}
      initialStyle={{ fontFamily: "sans-serif", ...initialStyle }}
    />
  );
}

export default Line;
