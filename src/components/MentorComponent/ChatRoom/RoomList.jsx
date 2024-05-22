import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Collapse, Typography, Button } from 'antd';
import styled from 'styled-components';
import { PlusSquareOutlined } from '@ant-design/icons';
import { setSelectedRoomId, setIsAddRoomVisible } from '../../../redux/roomSlice';
import AddRoomModal from './AddRoomModal';

const { Panel } = Collapse;

const PanelStyled = styled(Panel)`
  &&& {
    .ant-collapse-header,
    p {
      color: white;
    }

    .ant-collapse-content-box {
      padding: 0 40px;
    }

    .add-room {
      color: white;
      padding: 0;
    }
  }
`;

const LinkStyled = styled(Typography.Link)`
  display: block;
  margin-bottom: 5px;
  color: white;
`;

export default function RoomList() {
  const rooms = useSelector((state) => state.rooms.rooms);
  const isAddRoomVisible = useSelector((state) => state.rooms.isAddRoomVisible);
  const dispatch = useDispatch();

  const handleAddRoom = () => {
    dispatch(setIsAddRoomVisible(true));
  };

  const handleRoomClick = (roomId) => {
    dispatch(setSelectedRoomId(roomId));
  };

  return (
    <Collapse ghost defaultActiveKey={['1']}>
      <PanelStyled header='Danh sách các phòng' key='1'>
        {rooms.map((room) => (
          <LinkStyled key={room.id} onClick={() => handleRoomClick(room.id)}>
            {room.name}
          </LinkStyled>
        ))}
        <Button
          type='text'
          icon={<PlusSquareOutlined />}
          className='add-room'
          onClick={handleAddRoom}
        >
          Thêm phòng
        </Button>
        {isAddRoomVisible && <AddRoomModal isVisible={isAddRoomVisible} onClose={() => { dispatch(setIsAddRoomVisible(false)) }} />}
      </PanelStyled>
    </Collapse>
  );
}
