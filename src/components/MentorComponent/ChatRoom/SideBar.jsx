import React from 'react';
import { Row, Col } from 'antd';
import Userinfo from './Userinfo';
import RoomList from './RoomList';
import styled from 'styled-components';

const SidebarStyled = styled.div`
  background-color: rgba(17,25,40,0.75);
  color: white;
  height: 100vh;
  width:20vw
`;

export default function Sidebar() {
  return (
    <SidebarStyled>
      <Row>
        <Col span={24}>
          <Userinfo />
        </Col>
        <Col span={24}>
          <RoomList />
        </Col>
      </Row>
    </SidebarStyled>
  );
}