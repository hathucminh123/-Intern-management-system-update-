import React, { useState } from 'react'
import { Layout ,Table} from 'antd'

const StudentListClass = () => {
    const { Header,Content}=Layout
    const [pageSize] = useState(6);
    const [currentPage, setCurrentPage] = useState(1);
   
const data = [
    { id: 1, name: "Thúc Minh", email: 'minhhtse150913@fpt.edu.vn', phoneNumber: '123456789', education: 'fpt',class:'reactjs ' },
    { id: 2, name: "Hoàng Hiệp", email: 'hiepse150913@fpt.edu.vn', phoneNumber: '123456789', education: 'fpt',class:'reactjs ' },
    { id: 3, name: "Minh Trí", email: 'trise150913@fpt.edu.vn', phoneNumber: '123456789', education: 'fpt ',class:'reactjs ' },
    { id: 4, name: "Tâm", email: 'tamse150913@fpt.edu.vn', phoneNumber: '123456789', education: 'fpt',class:'reactjs ' }
  ];

  const columns = [
    // {
    //   title: "",
    //   dataIndex: "checkbox",
    //   key: "checkbox",
    //   render: (_, record) => (
    //     <Checkbox
    //       checked={!!checkedKeys[record.id]}
    //       onChange={(e) => handleCheckboxChange(record, e.target.checked)}
    //     />
    //   ),
    // },
    { title: "Name", dataIndex: "name", key: "name", responsive: ['md'] },
    { title: "Email", dataIndex: "email", key: "email", responsive: ['md'] },
    { title: "phoneNumber", dataIndex: "phoneNumber", key: "phoneNumber", responsive: ['md'] },
    { title: "education", dataIndex: "education", key: "education", responsive: ['md'] },
    { title: "class", dataIndex: "class", key: "class", responsive: ['md'] },
    // { 
    //   title: "Role", 
    //   dataIndex: "role", 
    //   key: "type", 
    //   responsive: ['md'],
    // },
    // { 
    //   title: "Actions", 
    //   key: "actions", 
    //   responsive: ['md'], 
    //   render: (text, record) => (
    //     <Space size="middle">
    //       <Dropdown overlay={menu(record)}>
    //         <Button>
    //           More <DownOutlined />
    //         </Button>
    //       </Dropdown>
    //     </Space>
    //   ),
    // },
  ];
  return (
    <Layout>
      <Header style={{ backgroundColor: 'white', color: 'black', borderBottom: '1px solid #f0f0f0' }}>
        student List
      </Header>
      <Content style={{ padding: '20px', backgroundColor: '#f0f2f5', minHeight: '80vh' }}>
        <div className="container mx-auto">
        <Table
          dataSource={data}
          columns={columns}
          rowKey="id"
          style={{ marginTop: "20px" }}
          pagination={{ pageSize: pageSize, current: currentPage, onChange: (page) => setCurrentPage(page) }}
        />
         </div>
         </Content>
         </Layout>   
  )
}

export default StudentListClass