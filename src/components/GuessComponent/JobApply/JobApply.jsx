import { Card, Col, Image, Row, Space, Typography, Layout, Button, message, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import image1 from '../../../assets/minhwap.jpg';
import * as Candidates from '../../../service/GuestCandidate';
import { useNavigate } from 'react-router-dom';

const { Text, Title } = Typography;
const { Content } = Layout;

const UserInfoCard = ({ application }) => {
  return (
    <Card
      title={<span>CV bạn ứng tuyển : <a style={{ color: '#00b14f' }} href={application.cvPath} target="_blank" rel="noopener noreferrer">View your CV</a></span>}
      key={application.id}
      style={{ borderColor: '#00b14f', marginTop: '15px' }}
    >
      <Space direction='vertical'>
        <Row gutter={[16, 16]} style={{ borderBottom: '1px solid #f0f0f0', paddingBottom: '10px' }}>
          <Col span={12}>
            <Text>Họ và Tên: <strong>{`${application.firstName} ${application.lastName}`}</strong></Text>
          </Col>
          <Col span={12}>
            <Text>Email: <strong>{`${application.email}`}</strong></Text>
          </Col>
          <Col span={12}>
            <Text>Số điện thoại: <strong>{`${application.phoneNumber}`}</strong></Text>
          </Col>
          <Col span={12}>
            <Text>Education: <strong>{`${application.education}`}</strong></Text>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Text>Trạng thái: <strong>{`${application.candidateStatus}`}</strong></Text>
          </Col>
        </Row>
      </Space>
    </Card>
  );
};

const JobApply = () => {
  const [apply, setApply] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchApply = async () => {
    try {
      setLoading(true);
      const res = await Candidates.fetchCandidateApplication();
      setApply(res.events);
    } catch (error) {
      message.error('Fetch Application failed');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApply();
  }, []);

  const userProfile = JSON.parse(localStorage.getItem('userProfile'));

  return (
    <div style={{ display: 'flex', justifyContent: 'center', minHeight: '100vh', background: '#f0f2f5', padding: '20px', gap: '40px' }}>
      <div style={{ width: '100%', maxWidth: '1000px', padding: '40px', borderRadius: '12px', background: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <Space direction='vertical' size='large' style={{ width: '100%' }}>
          <Title level={2} style={{ textAlign: 'center', color: '#1890ff' }}>Vị Trí đã ứng tuyển</Title>
          {loading ? (
            <Spin size="large" />
          ) : (
            apply.map((application) => (
              <Card key={application.id} style={{ width: '100%', backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', marginBottom: '20px' }}>
                <Row gutter={[16, 16]}>
                  <Col span={8}>
                    <Image
                      width='100%'
                      preview={false}
                      src={application.job.imagePath}
                      style={{ borderRadius: '12px' }}
                    />
                  </Col>
                  <Col span={16}>
                    <Space direction='vertical' size='middle' style={{ width: '100%', paddingBottom: '10px' }}>
                      <Title level={4} style={{ color: '#1890ff' }}>Bạn đã ứng tuyển vào vị trí: {application.job.name} trong {application.campaign.name}</Title>
                      <UserInfoCard key={application.id} application={application} />
                    </Space>
                  </Col>
                </Row>
              </Card>
            ))
          )}
        </Space>
      </div>
      <div style={{ width: '100%', height: 'fit-content', maxWidth: '350px', padding: '40px', borderRadius: '12px', background: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <Content>
          <Row gutter={10} align='middle'>
            <Col span={8}>
              {/* <Image preview={false} src={image1} width='100%' style={{ borderRadius: '50%' }} /> */}
            </Col>
            <Col span={16}>
              <Space direction='vertical'>
                <Text style={{ color: '#8c8c8c' }}>Chào mừng bạn trở lại</Text>
                <Title level={3} style={{ color: '#1890ff' }}>{userProfile?.events.userName}</Title>
                <Button type='primary' onClick={() => navigate('/guest/profile')}>Xem thông tin tài khoản</Button>
              </Space>
            </Col>
          </Row>
        </Content>
      </div>
    </div>
  );
}

export default JobApply;
