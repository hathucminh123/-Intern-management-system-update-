import React, { useState } from 'react';
import { Input, Button, List, Avatar, Typography } from 'antd';


const { TextArea } = Input;
const { Text } = Typography;

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleMessageSubmit = () => {
    if (inputValue.trim() !== '') {
      const newMessage = {
        id: messages.length,
        content: inputValue,
        sender: 'Me',
      };
      setMessages([...messages, newMessage]);
      setInputValue('');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <List
        itemLayout="horizontal"
        dataSource={messages}
        renderItem={(message) => (
          <List.Item key={message.id}>
            <List.Item.Meta
              avatar={<Avatar>{message.sender[0]}</Avatar>}
              title={<Text strong>{message.sender}</Text>}
              description={message.content}
            />
          </List.Item>
        )}
      />
      <div style={{ marginTop: '20px' }}>
        <TextArea
        
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          autoSize={{ minRows: 2, maxRows: 6 }}
          placeholder="Type your message here..."
        />
        <Button type="primary" style={{ marginTop: '10px' }} onClick={handleMessageSubmit}>
          Send
        </Button>
      </div>
    </div>
  );
};

export default Chat;
