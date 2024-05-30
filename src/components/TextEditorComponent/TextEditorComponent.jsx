import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const TextEditorComponent = () => {
  const [value, setValue] = useState("");

  return (
    <div>
      <ReactQuill value={value} onChange={setValue} theme="snow" />
    </div>
  );
};

export default TextEditorComponent;
