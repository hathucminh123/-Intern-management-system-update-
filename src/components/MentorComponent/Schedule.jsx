import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { Layout, Typography, Card, Button, Row, Col, message } from 'antd';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import AddScheduleModal from './AddScheduleModal';
import * as Meeting from '../../service/Schedule';
import { useNavigate } from 'react-router-dom';

const { Header, Content } = Layout;
const { Title } = Typography;

const localizer = momentLocalizer(moment);

const EventComponent = ({ event }) => (
  <div>
    <strong>{event.title}</strong>
    <div>{moment(event.startTime).format('HH:mm')} - {moment(event.endTime).format('HH:mm')}</div>
    <div>{event.location}</div>
    <div>{event.status}</div>
  </div>
);

const Schedule = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventToEdit, setEventToEdit] = useState(null);
  const navigate = useNavigate();

  const userProfile = parseInt(localStorage.getItem('userId'), 10); // Chuyển đổi thành số
  console.log('userProfile', userProfile);

  const fetchSchedule = async () => {
    try {
      const res = await Meeting.fetchSchedule();
      const formattedEvents = res.events.map(event => ({
        ...event,
        startTime: new Date(event.startTime),
        endTime: new Date(event.endTime)
      }));
      setEvents(formattedEvents);
    } catch (error) {
      message.error('Fetch Meeting schedule failed: ' + error.message);
    }
  };

  useEffect(() => {
    fetchSchedule();
  }, []);

  // Lọc các sự kiện chỉ khi userMeetings không rỗng
  const filteredEvents = events.filter(event => 
    event.userMeetings.length === 0 || event.userMeetings.some(userMeeting => userMeeting.id === userProfile)
  );
  
  console.log('filteredEvents', filteredEvents);

  const handleSelectSlot = (slotInfo) => {
    setShowModal(true);
    setSelectedDate(slotInfo.start);
    setEventToEdit(null);
  };

  const handleSelectEvent = (event) => {
    setShowModal(true);
    setSelectedDate(event.startTime);
    setEventToEdit(event);
  };

  const userRole = localStorage.getItem('role');
  const handleDetails = (item) => {
    navigate(`/${userRole}/scheduleDetail/${item.id}`, { state: { item } });
  };

  return (
    <Layout>
      <Header style={{ backgroundColor: 'white', color: 'black', textAlign: 'center', borderBottom: '1px solid #f0f0f0' }}>
        <Title level={3} style={{ margin: 0 }}>Schedule</Title>
      </Header>
      <Content style={{ padding: '24px', backgroundColor: '#f0f2f5', minHeight: '80vh' }}>
        <div className="container mx-auto">
          <Calendar
            localizer={localizer}
            events={filteredEvents}
            startAccessor="startTime"
            endAccessor="endTime"
            style={{ height: 750, backgroundColor: 'white', borderRadius: '8px', padding: '20px' }}
            selectable
            onSelectSlot={handleSelectSlot}
            onSelectEvent={handleSelectEvent}
            className="shadow-lg"
            components={{
              event: EventComponent
            }}
          />
          <AddScheduleModal
            visible={showModal}
            onClose={() => setShowModal(false)}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            fetchSchedule={fetchSchedule}
            eventToEdit={eventToEdit}
            setEventToEdit={setEventToEdit}
          />
          <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
            {filteredEvents.map((item) => (
              <Col xs={24} sm={12} md={8} key={item.id}>
                <Card
                  hoverable
                  className="shadow-lg"
                  style={{ borderRadius: '8px', backgroundColor: 'white' }}
                >
                  <Title level={5}>Name: {item.title}</Title>
                  <p><strong>Start Time:</strong> {moment(item.startTime).format('YYYY-MM-DD HH:mm')}</p>
                  <p><strong>End Time:</strong> {moment(item.endTime).format('YYYY-MM-DD HH:mm')}</p>
                  <p><strong>Location:</strong> {item.location}</p>
                  <Button type="primary" onClick={() => { handleDetails(item) }}>View Details</Button>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </Content>
    </Layout>
  );
};

export default Schedule;
