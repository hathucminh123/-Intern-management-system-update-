import { Card, Col, Image, Row, Space,Typography} from 'antd'
import React from 'react'
import image from '../../../assets/react_image.jpeg'

const {Text,Title}=Typography


const JobApply = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'start', height: '100vh', background: '#f0f2f5', padding: '20px' }}>
      <div style={{ width: '100%', maxWidth: '900px', padding: '40px', borderRadius: '8px', background: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', alignItems: 'center', flex: '1' }}>
        <Space  direction='vertical'  size="large" style={{ width: '100%' }}>
          
          <Title level={2}>Công việc đã ứng tuyển</Title>
          <Card>
            <Row  gutter={0}>
              <Col span={10}>
              <Image
                width={250}
                preview={false}
                src={image}
                style={{borderRadius:'20px'}}
                // className="profile-image"
              />
              </Col>
              <Col span={14}>
           <Title>sdasd</Title>
              </Col>

            </Row>
          
            </Card>




        </Space>
        </div>
    
    </div>
  )
}

export default JobApply