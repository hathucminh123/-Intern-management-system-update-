import React from 'react';
import { Badge, Calendar, Space, Typography } from 'antd';
const getListData = (value) => {
  let listData;
  switch (value.date()) {
    case 8:
      listData = [
        {
          type: 'warning',
          content: 'This is warning event.',
        },
        {
          type: 'success',
          content: 'This is usual event.',
        },
      ];  
      break;
    case 10:
      listData = [
        {
          type: 'warning',
          content: 'This is warning event.',
        },
      
      ];
      break;
    case 15:
      listData = [
        {
          type: 'warning',
          content: 'This is warning event',
        },
     
      ];
      break;
    default:
  }
  return listData || [];
};
const getMonthData = (value) => {
  const currentMonth = new Date().getMonth(); // Lấy tháng hiện tại
  if (value.month() === currentMonth) { // So sánh tháng của value với tháng hiện tại
    return 1394;
  }
  return null; // Trả về null nếu không phải là tháng hiện tại
};
const Schedule = () => {
  const monthCellRender = (value) => {
    const num = getMonthData(value); // Gọi hàm getMonthData với value
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog month</span>
      </div>
    ) : null;
  };
  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content}  />
          </li>
        ))}
      </ul>
    );
  };
  const cellRender = (current, info) => {
    console.log('current',current)
    console.log('info',info)
    if (info.type === 'date') return dateCellRender(current);
    if (info.type === 'month') return monthCellRender(current);
    return info.originNode;
  };
  return (
  <Space size={20} direction='vertical'>
    <Typography.Title level={5}>Lịch Trình </Typography.Title>
  <Calendar cellRender={cellRender} disabledDate={(date)=>{
if(new Date(date).getDate()>22){
  return true;
}else{
  return false;
}


  }}  />
  </Space>
);
};
export default Schedule;