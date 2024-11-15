import React from "react";
import Markdown from "react-markdown";

interface Props {
  content: string;
}

const MarkdownViewer: React.FC<Props> = ({ content }) => {
  return (
    <div>
      <Markdown>{content}</Markdown>
    </div>
  );
};

export default MarkdownViewer;
