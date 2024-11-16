import { useStateStore } from "../store";
import "../css/editor.css";
import Markdown from "react-markdown";

const MarkdownViewer = () => {
  const content = useStateStore((state) => state.contents);

  return (
    <div className="normaleditor">
      <Markdown>{content || ""}</Markdown>{" "}
      {/* Agrega una cadena vacía como valor predeterminado */}
    </div>
  );
};

export default MarkdownViewer;
