import "../css/editor.css";

interface Props {
  content: string;
  setContent: (content: string) => void;
}

const NormalEditor: React.FC<Props> = ({ content, setContent }) => {
  const handleTextarea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
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
