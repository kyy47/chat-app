import { useContext } from "react";
import "./message.css";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";

const Message = ({ message, scrollRef }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  return (
    <div
      className={
        "message " + (message.senderId === currentUser.uid ? "send" : "receive")
      }
      key={message.id}
      ref={scrollRef}
    >
      <div className="box-img">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.avatar
          }
          alt="avatar"
          className="avatar-message"
        />
      </div>
      <p>{message.text}</p>
    </div>
  );
};
export default Message;
