import React, { useState } from "react";
import { Typography, Button } from "antd";
const { Title } = Typography;
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const MentorTaskContent = () => {
  const [isEditorVisible, setIsEditorVisible] = useState(false);
  const [value, setValue] = useState("");

  const toggleEditorVisibility = () => {
    setIsEditorVisible(!isEditorVisible);
  };

  // Hàm xử lý dữ liệu từ ReactQuill
  const handleEditorChange = (content, delta, source, editor) => {
    setValue(content);
  };

  // Render nội dung từ ReactQuill
  const renderContent = () => {
    return { __html: value };
  };

  return (
    <div>
      <div>Members:</div>
      <div style={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
        <Title level={5} style={{ marginBottom: 0 }}>
          Description
        </Title>
        <Button
          type="primary"
          onClick={toggleEditorVisibility}
          style={{ marginLeft: "auto" }}
        >
          {isEditorVisible ? "Hide" : "Edit"}
        </Button>
      </div>
      <div
        style={{ marginTop: "10px" }}
        dangerouslySetInnerHTML={renderContent()}
      />
      {isEditorVisible && (
        <div style={{ marginTop: "10px" }}>
          <ReactQuill
            value={value}
            onChange={handleEditorChange}
            theme="snow"
          />
        </div>
      )}
    </div>
  );
};

export default MentorTaskContent;
