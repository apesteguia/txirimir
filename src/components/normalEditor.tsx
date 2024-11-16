import "../css/editor.css";
import { useStateStore } from "../store";
import { useCallback, useState } from "react";
import debounce from "debounce";

const NormalEditor = () => {
  const content = useStateStore((state) => state.contents);
  const updateContent = useStateStore((state) => state.updateContents);
  const [localContent, setLocalContent] = useState(content);

  const debouncedUpdateContent = useCallback(
    debounce((value) => {
      updateContent(value);
    }, 500),
    [],
  );

  const handleTextarea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setLocalContent(value);
    debouncedUpdateContent(value);
  };

  return (
    <div className="normaleditor">
      <textarea
        className="textarea"
        name="contents"
        value={localContent}
        onChange={handleTextarea}
      ></textarea>
    </div>
  );
};

export default NormalEditor;
