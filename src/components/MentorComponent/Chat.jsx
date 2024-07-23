import { Button, Flex, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import Sidebar from './ChatRoom/SideBar'
import ChatWindow from './ChatRoom/ChatWindow'
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr'

const Chat = () => {

  const [con, setConnection] = useState();
  const [messages, setMessage] = useState([]);

  const connectSignalR = async () => {
    const token = localStorage.getItem("token");

    const connection = new HubConnectionBuilder()
      .withUrl("https://localhost:7251/chat", {
        withCredentials: true,
        accessTokenFactory: () => token
      })
      .configureLogging(LogLevel.Information)
      .build();

    await connection.start();
    setConnection(connection)

    connection.on("ReceiveMessage", (username, msg) => {
      setMessage(messages => [...messages, { username, msg }])
    });
  }

  useEffect(() => {
    connectSignalR()
  }, [])

  const SendMess = async () => {
    await con.invoke("SendMessageToUser", "1", "xin chao HR");

  }

  return (
    <div style={{ display: 'flex' }}>

      <Sidebar />
      {/* <ChatWindow /> */}
      <Button onClick={SendMess} >
        Send
      </Button>

      {messages.map((msg, index) => (
        <tr key={index}>
          <td>{msg.msg} - {msg.username}</td>
        </tr>
      ))}
    </div>
  )
}

export default Chat