import React, { useContext } from "react";
import "./top-bar-chat.css";
import { ChatContext } from "../../../context/ChatContext";

const TopBarChat = () => {
  const {
    data: { user },
  } = useContext(ChatContext);

  return (
    <div className="top-bar-chat">
      <img src={user?.avatar} alt="image user" className="img-user" />
      <span className="username-user">{user?.username}</span>
    </div>
  );
};

export default TopBarChat;
