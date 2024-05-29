// import React, { useState } from 'react';
// import { Badge, Button, Calendar, Space, Typography} from 'antd';
// import { useDispatch, useSelector } from 'react-redux';
// import { addEvent, removeEvent, setIsAddEventVisible } from '../../redux/calendarSlice';
// import AddScheduleModal from './AddScheduleModal';

// const Schedule = () => {
//   const dispatch = useDispatch();
//   const events = useSelector(state => state.calendar.events);
//   const isAddEventVisible = useSelector(state => state.calendar.isAddEventVisible);
//   const [selectedDate, setSelectedDate] = useState(null);

//   const handleAddEvent = (value) => {
//     setSelectedDate(value.format('YYYY-MM-DD')); // Update selected date
//     dispatch(setIsAddEventVisible(true));
//   };

//   const handleRemoveEvent = (eventId) => {
//     dispatch(removeEvent(eventId));
//     dispatch(setIsAddEventVisible(true));
//   };

//   const handleModalClose = () => {
//     dispatch(setIsAddEventVisible(false));
//   };

//   const monthCellRender = (value) => {
//     const currentMonth = new Date().getMonth();
//     return value.month() === currentMonth ? (
//       <div className="notes-month">
//         <section>1394</section>
//         <span>Backlog month</span>
//       </div>
//     ) : null;
//   };

//   const dateCellRender = (value) => {
//     const listData = events.filter(event => event.date === value.format('YYYY-MM-DD'));
//     return (
//       <ul className="events">
//         {listData.map(item => (
//           <div key={item.id}>
//             <Badge status={item.types} text={item.events} />
//             <Space direction='vertical'>
//             {item.types}
//             {item.events}
//             <Button onClick={() => handleRemoveEvent(item.id)}>Remove</Button>
//             </Space>
          
            
//           </div>
//         ))}
//       </ul>
//     );
//   };

//   const cellRender = (current, info) => {
//     console.log('info', info)
//     if (info.type === 'date') return dateCellRender(current);
//     if (info.type === 'month') return monthCellRender(current);
//     return info.originNode;
//   };

//   return (
//     <Space size={20} direction='vertical'>
//       <Typography.Title level={5}>Lịch Trình</Typography.Title>
//       <Button onClick={handleAddEvent}>Thêm sự kiện</Button>
//       <Calendar cellRender={cellRender} onSelect={handleAddEvent} />
//       {isAddEventVisible && <AddScheduleModal visible={isAddEventVisible} onClose={handleModalClose} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />}
//     </Space>
//   );
// };

// export default Schedule;


import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import AddScheduleModal from './AddScheduleModal';

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
    <div style={{ height: '500px' }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ margin: '50px' }}
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
    </div>
  );
};

export default Schedule;

