import React from 'react';
import "./chatpage.scss"
import "./test.scss"
import SideBar from './components/SideBar';
import Chats from './components/Chats';

function ChatPage() {
  return (
    <div className='chatpage' >
        <div className="container">
            <SideBar></SideBar>
            <Chats></Chats>
        </div>
    </div>
  )
}

export default ChatPage