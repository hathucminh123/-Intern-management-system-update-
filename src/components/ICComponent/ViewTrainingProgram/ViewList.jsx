// src/App.js
import React from "react";
import { Layout } from "antd";
import TrainingProgramList from "../ViewTrainingProgram/TrainingProgramList";

const { Header, Content, Footer } = Layout;

const App = () => {
  return (
    <Layout>
      <Header style={{ color: 'white', textAlign: 'center' }}>Training Programs</Header>
      <Content style={{ padding: '24px', minHeight: '80vh' }}>
        <TrainingProgramList />
      </Content>
      <Footer style={{ textAlign: 'center' }}>Training Program ©2023 Created by YourName</Footer>
    </Layout>
  );
};

export default App;
