import "../css/editor.css";
import { useStateStore } from "../store";

const NormalEditor = () => {
  const content = useStateStore((state) => state.contents);
  const updateContent = useStateStore((state) => state.updateContents);

  const handleTextarea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateContent(event.target.value);
  };

  return (
    <div className="normaleditor">
      <textarea
        className="textarea"
        name="contents"
        value={content}
        onChange={handleTextarea}
      ></textarea>
    </div>
  );
};

export default NormalEditor;
