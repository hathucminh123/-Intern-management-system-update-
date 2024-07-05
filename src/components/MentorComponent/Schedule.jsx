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
  const navigate =useNavigate()

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
  }

  useEffect(() => {
    fetchSchedule();
  }, []);

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
  const handleDetails = () => {
    navigate('/hrmanager/scheduleDetail');
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
            events={events}
            startAccessor="startTime"
            endAccessor="endTime"
            style={{ height: 500, backgroundColor: 'white', borderRadius: '8px', padding: '20px' }}
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
            {events.map((item) => (
              <Col xs={24} sm={12} md={8} key={item.id}>
                <Card
                  hoverable
                  className="shadow-lg"
                  style={{ borderRadius: '8px', backgroundColor: 'white' }}
                >
                  <Title level={5}>Name: {item.title}</Title>
                  <p><strong>Start Time:</strong> {moment(item.startTime).format('YYYY-MM-DD HH:mm')}</p>
                  <p><strong>End Time:</strong> {moment(item.endTime).format('YYYY-MM-DD HH:mm')}</p>
                  <p><strong>Description:</strong> {item.description}</p>
                  <p><strong>Location:</strong> {item.location}</p>
                  <p><strong>Minutes:</strong> {item.minutes}</p>
                  <p><strong>Status:</strong> {item.status}</p>
                  <p><strong>Priority:</strong> {item.priority}</p>
                  <Button type="primary" onClick={()=>{handleDetails()}}>View Details</Button>
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
