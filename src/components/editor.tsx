import { useStateStore } from "../store";
import "../css/editor.css";
import { useEffect, useState } from "react";
import NormalEditor from "./normalEditor";
import MarkdownViewer from "./markdownViewer";
import { readTextFile } from "@tauri-apps/plugin-fs";

enum ViewTypes {
  Markdown = "Markdown",
  Editor = "Editor",
  Both = "Editor + Markdown",
}

function Editor() {
  const currentPath = useStateStore((state) => state.currentPath);
  const name = currentPath?.split("/").pop();
  const setContents = useStateStore((state) => state.updateContents);

  const [contents, setContentsState] = useState<string>("");

  const [toggleView, setToggleView] = useState<ViewTypes>(ViewTypes.Markdown);

  useEffect(() => {
    const fetchContents = async () => {
      try {
        const contents = await readTextFile(currentPath as string);
        if (contents) {
          setContents(contents);
          setContentsState(contents);
        }
        console.log(contents);
      } catch (err) {
        console.error(err);
      }
    };

    if (currentPath) {
      fetchContents();
    }
  }, [currentPath]);

  const handleToggleView = () => {
    setToggleView((prevView) => {
      switch (prevView) {
        case ViewTypes.Markdown:
          return ViewTypes.Editor;
        case ViewTypes.Editor:
          return ViewTypes.Both;
        case ViewTypes.Both:
          return ViewTypes.Markdown;
        default:
          return ViewTypes.Markdown;
      }
    });
  };

  return (
    <div className="editor">
      <div className="header">
        <h2 className="filename">{name}</h2>
        <button className="toggleview" onClick={handleToggleView}>
          Toggle view
        </button>
      </div>

      <div className="editors">
        {toggleView === ViewTypes.Markdown && (
          <MarkdownViewer content={contents} />
        )}
        {toggleView === ViewTypes.Editor && (
          <NormalEditor content={contents} setContent={setContentsState} />
        )}
        {toggleView === ViewTypes.Both && (
          <div className="handleEditors">
            <div>
              <NormalEditor content={contents} setContent={setContentsState} />
            </div>
            <div>
              <MarkdownViewer content={contents} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Editor;