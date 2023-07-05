import React from "react";

import info from "../images/info.jpeg";
import voice from "../images/voice.jpeg";
import video from "../images/video.jpeg";
import ChatMessages from "./ChatMessages";
import Input from "./Input";

// ! the chat content, opposite side bar
function Chats() {
  return (
    <div className="chat-side">
      <div className="chat-info">
        <span>Festus</span>

        <div className="top-icons">
          <img src={voice} alt="" />
          <img src={video} alt="" />
          <img src={info} alt="" />
        </div>
      </div>
      <ChatMessages></ChatMessages>
      <Input></Input>
    </div>
  );
}

export default Chats;
