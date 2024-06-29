import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { Layout, Typography, Card, Button, Row, Col } from 'antd';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import AddScheduleModal from './AddScheduleModal';

const { Header, Content } = Layout;
const { Title } = Typography;

const localizer = momentLocalizer(moment);

const Schedule = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventToEdit, setEventToEdit] = useState(null);

  const handleSelectSlot = (slotInfo) => {
    setShowModal(true);
    setSelectedDate(slotInfo.start);
    setEventToEdit(null);
  };

  const handleSelectEvent = (event) => {
    setShowModal(true);
    setSelectedDate(event.start);
    setEventToEdit(event);
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
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500, backgroundColor: 'white', borderRadius: '8px', padding: '20px' }}
            selectable
            onSelectSlot={handleSelectSlot}
            onSelectEvent={handleSelectEvent}
          />
          <AddScheduleModal
            visible={showModal}
            onClose={() => setShowModal(false)}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            setEvents={setEvents}
            events={events}
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
                  <Title level={5}>{item.title}</Title>
                  <p><strong>Date:</strong> {moment(item.start).format('DD-MM-YYYY')}</p>
                  <p><strong>Start Time:</strong> {moment(item.start).format('HH:mm')}</p>
                  <p><strong>End Time:</strong> {moment(item.end).format('HH:mm')}</p>
                  <p><strong>Description:</strong> {item.description}</p>
                  <Button type="primary">View Details</Button>
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
