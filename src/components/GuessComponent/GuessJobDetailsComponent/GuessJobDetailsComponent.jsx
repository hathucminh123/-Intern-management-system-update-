import React, { useEffect, useState } from 'react';
import { Button, Card, Col, message, Row, Space, Typography } from 'antd';
import { useLocation } from 'react-router-dom';
import "../GuessDetailsComponent/GuessDetailsComponent.css";
import "../../../pages/GuessDetailPage/GuessDetailPage.css";
import "./GuessJobDetailsComponent.css";
import { IoMdTime, IoMdRefresh } from "react-icons/io";
import { GrSchedule } from 'react-icons/gr';
import { CiLocationOn, CiHeart } from "react-icons/ci";
import { MdOutlineMonetizationOn, MdGroups, MdGroup } from "react-icons/md";
import moment from 'moment';
import FormCVModal from '../FormCVComponent/FormCVModal';
import FormCVReapplyModal from '../FormCVComponent/FormCVReapplyModal';
import * as Candidates from "../../../service/Candidate";

const GuestJobDetailsComponent = () => {
  const { Title } = Typography;
  const { state } = useLocation();
  const jobs = state?.itemJob;
  const campaign = state?.itemCampaign;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isReapplyModalVisible, setIsReapplyModalVisible] = useState(false);
  const [selectJobs, setSelectJobs] = useState(null);
  const [selectCampaigns, setSelectCampaigns] = useState(null);
  const [apply, setApply] = useState([]);
  const [candidate, setCandidate] = useState({});
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const profile = JSON.parse(sessionStorage.getItem('userProfile'));
    setUserProfile(profile);
  }, []);

  const fetchCandidate = async () => {
    try {
      const res = await Candidates.fetchCandidate(campaign.id, jobs.id);
      setApply(res.events);
    } catch (error) {
      message.error("Fetch Candidate failed: " + error.message);
    }
  };

  useEffect(() => {
    if (campaign?.id && jobs?.id) {
      fetchCandidate();
    }
  }, [campaign?.id, jobs?.id]);

  const filteredCandidates = userProfile ? apply.filter(candidate => candidate.email === userProfile.email) : [];

  const applyDisabled = filteredCandidates.length >= 2;

  const showModal = (job, campaigns) => {
    setSelectJobs(job);
    setSelectCampaigns(campaigns);
    setIsModalVisible(true);
  };

  const showReapplyModal = (job, campaigns) => {
    setSelectJobs(job);
    setSelectCampaigns(campaigns);
    setIsReapplyModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleCloseReapplyModal = () => {
    setIsReapplyModalVisible(false);
  };

  const handleApplicationSuccess = () => {
    fetchCandidate();
    setIsModalVisible(false);
  };

  const handleReapplySuccess = () => {
    fetchCandidate();
    setIsReapplyModalVisible(false);
  };

  return (
    <Space className="Container" direction="vertical">
      <div className='content-wrapper'>
        <Space className='inner-container' direction="vertical">
          <Card style={{ width: '100%', backgroundColor: '#f9f9f9', padding: '20px' }}>
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
                  <MdGroups />
                  <div className="detail-text">
                    Tổng số thành viên: <span className="bold">10 members</span>
                  </div>
                </div>
              </Col>
            </Row>
            {userProfile ? (
              filteredCandidates.length > 0 ? (
                <Button
                  style={{
                    marginTop: '20px',
                    backgroundColor: applyDisabled ? 'gray' : '#4CAF50',
                    color: 'white',
                    position: 'relative',
                  }}
                  type="primary"
                  className="rounded-full customButton"
                  onClick={() => showReapplyModal(jobs, campaign)}
                  disabled={applyDisabled}
                >
                  {applyDisabled ? (
                    "Hết lượt ứng tuyển"
                  ) : (
                    <>
                      <IoMdRefresh style={{ marginRight: '8px', position: 'absolute', right: '55%', bottom: '10px' }} />
                      ỨNG tuyển lại
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  style={{
                    marginTop: '20px',
                    backgroundColor: '#1890ff',
                    color: 'white',
                  }}
                  type="primary"
                  className="rounded-full customButton"
                  onClick={() => showModal(jobs, campaign)}
                >
                  Ứng tuyển ngay
                </Button>
              )
            ) : (
              <Button
                style={{
                  marginTop: '20px',
                  backgroundColor: 'gray',
                  color: 'white',
                }}
                type="primary"
                className="rounded-full customButton"
                disabled
              >
                Bạn cần đăng nhập để ứng tuyển
              </Button>
            )}
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
                <p>Được đào tạo trong môi trường chuyên nghiệp và năng động</p>
              </div>
            </Space>
          </Card>
          <Card className="benefit-card">
            <Space>
              <CiHeart style={{ color: 'blue' }} />
              <div>
                <p><strong>Chăm sóc sức khoẻ</strong></p>
                <p>Bảo hiểm sức khỏe và bảo hiểm xã hội</p>
              </div>
            </Space>
          </Card>
          <Card className="benefit-card">
            <Space>
              <MdOutlineMonetizationOn style={{ color: 'blue' }} />
              <div>
                <p><strong>Trợ cấp</strong></p>
                <p>2-5 triệu/tháng</p>
              </div>
            </Space>
          </Card>
        </Space>
        {userProfile && (
          <>
            <FormCVModal
              visible={isModalVisible}
              onClose={handleCloseModal}
              title={campaign.name}
              intern={campaign}
              job={selectJobs}
              campaigns={selectCampaigns}
              onApplicationSuccess={handleApplicationSuccess}
            />
            <FormCVReapplyModal
              visible={isReapplyModalVisible}
              onClose={handleCloseReapplyModal}
              title={campaign.name}
              intern={campaign}
              job={selectJobs}
              campaigns={selectCampaigns}
              onReapplySuccess={handleReapplySuccess}
              filteredCandidates={filteredCandidates}
              fetchCandidate={fetchCandidate}
            />
          </>
        )}
      </div>
    </Space>
  );
}

export default GuestJobDetailsComponent;
