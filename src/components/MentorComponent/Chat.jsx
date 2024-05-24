import { Flex, Space } from 'antd'
import React from 'react'
import Sidebar from './ChatRoom/SideBar'
import ChatWindow from './ChatRoom/ChatWindow'

const Chat = () => {
  return (
    <div style={{display:'flex'}}>

      <Sidebar/>
      <ChatWindow/>
    </div>
  )
}

export default Chat