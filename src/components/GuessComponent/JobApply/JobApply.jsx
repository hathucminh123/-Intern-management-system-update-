import { Card, Col, Image, Row, Space, Typography, Layout, Button } from 'antd';
import React from 'react';
import image from '../../../assets/react_image.jpeg';
import image1 from '../../../assets/minhwap.jpg'
import * as job from '../../../service/JobsService';
const { Text, Title } = Typography;
const { Header, Content } = Layout;

const JobApply = () => {
  const userProfile = JSON.parse(sessionStorage.getItem('userProfile'));

  return (
    <div style={{ display: 'flex', justifyContent: 'center', height: '100vh', background: '#f0f2f5', padding: '20px', gap: '40px' }}>
      <div style={{ width: '100%', maxWidth: '900px', padding: '40px', borderRadius: '12px', background: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <Space direction='vertical' size='large' style={{ width: '100%' }}>
          <Title level={2} style={{ textAlign: 'center' }}>Công việc đã ứng tuyển</Title>
          <Card style={{ width: '100%', backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <Image
                  width='100%'
                  preview={false}
                  src={image}
                  style={{ borderRadius: '12px' }}
                />
              </Col>
              <Col span={16}>
                <Space direction='vertical' size='middle' style={{ width: '100%', borderBottom: '1px solid #f0f0f0', paddingBottom: '10px' }}>
                  <Title level={3}>Trưởng Phòng Kinh Doanh</Title>
                  <Text><strong>Thời gian ứng tuyển:</strong> 18-07-2024 17:43 PM</Text>
                  <Text><strong>CV đã ứng tuyển:</strong> CV tải lên</Text>
                </Space>
                <Row style={{ marginTop: '10px' }}>
                  <Col span={12}>
                    <Text><strong>Trạng thái:</strong> Đã ứng tuyển</Text>
                  </Col>
                  <Col span={12}>
                    <Text><strong>Vào lúc:</strong> 18-07-2024 17:43 PM</Text>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card>
        </Space>
      </div>
      <div style={{ width: '100%',height:'fit-content', maxWidth: '350px', padding: '40px', borderRadius: '12px', background: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <Content>
          <Row gutter={10} align='middle'>
            <Col span={8}>
              <Image preview={false} src={image1} width='100%' style={{ borderRadius: '50%' }} />
            </Col>
            <Col span={16}>
              <Space direction='vertical'>
                <Text style={{ color: '#8c8c8c' }}>Chào mừng bạn trở lại</Text>
                <Title level={3}>{userProfile?.userName}</Title>
                <Button type='primary'>Xem thông tin tài khoản</Button>
              </Space>
            </Col>
          </Row>
        </Content>
      </div>
    </div>
  );
}

export default JobApply;
