import React from 'react';
import { Layout } from 'antd';
import ViewGuestInfoCv from '../../components/HR/CampaignsComponent/ViewGuestInfoCv'; // Adjust the path as needed

const { Header, Content, Footer } = Layout;

const HRPage = () => (
  <Layout>
    <Header style={{ color: 'white' }}>Trang chủ    </Header>
    <Content style={{ padding: '24px', minHeight: '80vh' }}>
      <ViewGuestInfoCv />
    </Content>
  
  </Layout>
);

export default HRPage;
