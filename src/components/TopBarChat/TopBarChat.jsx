import React, { useContext } from "react";
import "./top-bar-chat.css";
import { ChatContext } from "../../context/ChatContext";
import { Link } from "react-router-dom";
import chevronLeft from "../../assets/icons/chevron-left.svg";
import { IsMobileContext } from "../../context/IsMobileContext";
const TopBarChat = () => {
  const { isMobile } = useContext(IsMobileContext);
  const {
    data: { user },
  } = useContext(ChatContext);

  return (
    <div className="top-bar-chat">
      {isMobile && (
        <Link to="/" className="back">
          <img src={chevronLeft} alt="sasas" className="back-icon" />
        </Link>
      )}
      <img src={user?.avatar} alt="image user" className="img-user" />
      <span className="username-user">{user?.username}</span>
    </div>
  );
};

export default TopBarChat;
