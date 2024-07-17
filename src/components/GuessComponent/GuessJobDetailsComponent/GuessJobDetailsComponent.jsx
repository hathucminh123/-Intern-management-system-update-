import React, { useState } from 'react';
import { Button, Card, Col, Row, Space, Typography } from 'antd';
import { useLocation } from 'react-router-dom';
import "../GuessDetailsComponent/GuessDetailsComponent.css";
import "../../../pages/GuessDetailPage/GuessDetailPage.css";
import "./GuessJobDetailsComponent.css"
import { ClockCircleOutlined } from '@ant-design/icons';
import { CiLocationOn, CiHeart } from "react-icons/ci";
import { IoMdTime } from "react-icons/io";
import moment from 'moment';
import { GrSchedule } from 'react-icons/gr';
import { MdOutlineMonetizationOn, MdGroup } from "react-icons/md";
import FormCVModal from '../FormCVComponent/FormCVModal';

const GuessJobDetailsComponent = () => {
  const { Title, Text } = Typography;
  const { state } = useLocation();
  const jobs = state?.itemJob;
  const campaign = state?.itemCampaign;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectJobs, setSelectJobs] = useState(null);
  const [selectCampaigns, setSelectCampaigns] = useState(null);

  const showModal = (job, campaigns) => {
    setSelectJobs(job);
    setSelectCampaigns(campaigns);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <Space className="Container" direction="vertical">
      <div className='content-wrapper'>
        <Space className='inner-container' direction="vertical">
          <Card style={{ width: '100%', backgroundColor: '#f9f9f9' }}>
            <Title level={1} className="customTitle">
              Vị trí tuyển dụng: {jobs.name} vào campaign {campaign.name}
            </Title>
            <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
              <Col span={8}>
                <div className="detail-item">
                  <IoMdTime style={{ height: '16px' }} />
                  <div className="detail-text">
                    Ngày bắt đầu: <span className="bold">{moment(jobs.startDate).format("DD-MM-YYYY")}</span>
                  </div>
                </div>
              </Col>
              <Col span={8}>
                <div className="detail-item">
                  <GrSchedule />
                  <div className="detail-text">
                    Thời gian thực tập: <span className="bold">{jobs.duration} months</span>
                  </div>
                </div>
              </Col>
              <Col span={8}>
                <div className="detail-item">
                  <CiLocationOn />
                  <div className="detail-text">
                    Vị trí: <span className="bold">Thành phố Hồ Chí Minh</span>
                  </div>
                </div>
              </Col>
              <Col span={8}>
                <div className="detail-item">
                  <CiLocationOn />
                  <div className="detail-text">
                    tổng số thành viên: <span className="bold">10 members</span>
                  </div>
                </div>
              </Col>
            </Row>
            <Button
              style={{ marginTop: '20px' }}
              type="primary"
              className="rounded-full customButton"
              onClick={() => showModal(jobs, campaign)}
            >
              Ứng tuyển ngay
            </Button>
          </Card>

          <Title level={3} className="customTitle">
            Mô tả công việc:
          </Title>
          <div dangerouslySetInnerHTML={{ __html: jobs.scopeOfWork }} />

          <Title level={3} className="customTitle">
            Yêu cầu công việc:
          </Title>
          <div dangerouslySetInnerHTML={{ __html: jobs.requirements }} />

          <Title level={3} className="customTitle">
            Lợi ích công việc:
          </Title>
          <div dangerouslySetInnerHTML={{ __html: jobs.benefits }} />

          <Title level={3} className="customTitle">
            Các phúc lợi dành cho bạn:
          </Title>
          <Card className="benefit-card">
            <Space>
              <MdGroup style={{ color: 'blue' }} />
              <div>
                <p><strong>Hoạt động nhóm</strong></p>
                <p>Professional, dynamic working environment</p>
              </div>
            </Space>
          </Card>
          <Card className="benefit-card">
            <Space>
              <CiHeart style={{ color: 'blue' }} />
              <div>
                <p><strong>Chăm sóc sức khoẻ</strong></p>
                <p>Health insurance and Social insurance regulated by Vietnam Labor Law</p>
              </div>
            </Space>
          </Card>
          <Card className="benefit-card">
            <Space>
              <MdOutlineMonetizationOn style={{ color: 'blue' }} />
              <div>
                <p><strong>Thưởng</strong></p>
                <p>Attractive salary and bonus</p>
              </div>
            </Space>
          </Card>
        </Space>
        <FormCVModal visible={isModalVisible} onClose={handleCloseModal} title={jobs.name} intern={campaign} job={jobs} campaigns={campaign} />
      </div>
    </Space>
  );
}

export default GuessJobDetailsComponent;
