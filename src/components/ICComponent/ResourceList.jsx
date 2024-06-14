// src/components/ResourceList.js
import React from "react";
import { Table, Button } from "antd";

const ResourceList = ({ resources, onDelete }) => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "File",
      dataIndex: "file",
      key: "file",
      render: (file) => <a href={file.url} download>{file.name}</a>,
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Button type="link" onClick={() => onDelete(record.id)}>Delete</Button>
      ),
    },
  ];

  return <Table columns={columns} dataSource={resources} rowKey="id" />;
};

export default ResourceList;
