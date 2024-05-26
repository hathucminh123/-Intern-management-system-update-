import React, { useState, useRef } from 'react';
import { Button, Form, List, Avatar, Typography } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import InviteMemberModal from './InviteMemberModal';
import InputFormComponent from '../../InputFormComponent/InputFormComponent';
import { useSelector, useDispatch } from 'react-redux';
import { formatRelative } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
import { addMessage } from '../../../redux/roomSlice';

const { Text } = Typography;

const HeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  height: 56px;
  padding: 0 16px;
  align-items: center;
  border-bottom: 1px solid rgb(230, 230, 230);

  .header {
    &__info {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    &__title {
      margin: 0;
      font-weight: bold;
    }

    &__description {
      font-size: 12px;
    }
  }
`;

const ButtonGroupStyled = styled.div`
  display: flex;
  align-items: center;
`;

const WrapperStyled = styled.div`
  height: 100vh;
  width: 70vw;
`;

const ContentStyled = styled.div`
  height: calc(100% - 56px);
  display: flex;
  flex-direction: column;
  padding: 11px;
  justify-content: flex-end;
`;

const FormStyled = styled(Form)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 2px 2px 0;
  border: 1px solid rgb(230, 230, 230);
  border-radius: 2px;

  .ant-form-item {
    flex: 1;
    margin-bottom: 0;
  }
`;

const MessageListStyled = styled.div`
  max-height: 100%;
  overflow-y: auto;
`;

export default function ChatWindow() {
  const [isInviteMemberVisible, setIsInviteMemberVisible] = useState(false);
  const [form] = Form.useForm();
  const messageListRef = useRef(null);
  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();
  
  const selectedRoomId = useSelector((state) => state.rooms.selectedRoomId);
  const rooms = useSelector((state) => state.rooms.rooms);
  const messages = useSelector((state) => state.rooms.messages[selectedRoomId] || []);

  const selectedRoom = rooms.find(room => room.id === selectedRoomId);

  const handleMessageSubmit = () => {
    if (inputValue.trim() !== '') {
      const newMessage = {
        id: uuidv4(),
        content: inputValue,
        sender: 'Me',
        createdAt: { seconds: new Date().getTime() / 1000 },
      };
      dispatch(addMessage({ roomId: selectedRoomId, message: newMessage }));
      setInputValue('');
    }
  };

  const handleInputChange = (value) => {
    setInputValue(value);
  };

  function formatDate(seconds) {
    let formattedDate = '';
    if (seconds) {
      formattedDate = formatRelative(new Date(seconds * 1000), new Date());
      formattedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    }
    return formattedDate;
  }

  if (!selectedRoom) {
    return <div>Chọn một phòng để bắt đầu trò chuyện</div>;
  }

  return (
    <WrapperStyled>
      <HeaderStyled>
        <div className="header__info">
          <p className="header__title">{selectedRoom.name}</p>
          <span className="header__description">
            {selectedRoom.description}
          </span>
        </div>
        <ButtonGroupStyled>
          <Button
            icon={<UserAddOutlined />}
            type="text"
            onClick={() => setIsInviteMemberVisible(true)}
          >
            Mời
          </Button>
          <InviteMemberModal
            isVisible={isInviteMemberVisible}
            onClose={() => setIsInviteMemberVisible(false)}
          />
          <Avatar.Group size="small" maxCount={2}>
            <Avatar />
          </Avatar.Group>
        </ButtonGroupStyled>
      </HeaderStyled>
      <ContentStyled>
        <MessageListStyled ref={messageListRef}>
          <List
            itemLayout="horizontal"
            dataSource={messages}
            renderItem={(message) => (
              <List.Item key={message.id}>
                <List.Item.Meta
                  avatar={<Avatar>{message.sender[0]}</Avatar>}
                  title={<Text strong>{message.sender} {formatDate(message.createdAt?.seconds)}</Text>}
                  description={message.content}
                />
              </List.Item>
            )}
          />
        </MessageListStyled>
        <FormStyled form={form}>
          <Form.Item name="message">
            <InputFormComponent
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Nhập tin nhắn..."
              autoComplete="off"
            />
          </Form.Item>
          <Button type="primary" onClick={handleMessageSubmit}>
            Gửi
          </Button>
        </FormStyled>
      </ContentStyled>
    </WrapperStyled>
  );
}
