import React, { useContext, useEffect, useState } from "react";
import "./chats-user.css";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { IsMobileContext } from "../../context/IsMobileContext";
const ChatsUser = ({ search }) => {
  const { currentUser } = useContext(AuthContext);
  const { data, dispath } = useContext(ChatContext);
  const [chats, setChats] = useState(null);
  const { isMobile } = useContext(IsMobileContext);
  const navigate = useNavigate();

  const selectHandler = (user) => {
    dispath({ type: "CHANGE_USER", payload: user });
    if (isMobile) navigate("/chat");
  };
  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });
      return () => {
        unsub();
      };
    };
    currentUser.uid && getChats();
  }, [currentUser.uid]);
  return (
    !search && (
      <div className="chats-user">
        <span className="heading">Chats</span>
        <div className="chats">
          {chats
            ? Object.entries(chats).map((chat, index) => {
                const userInfo = chat[1].userInfo;

                if (userInfo) {
                  return (
                    <div
                      key={index}
                      className={`card-chats ${
                        data.user.id === userInfo.id && !isMobile
                          ? "now-focus"
                          : null
                      }`}
                      onClick={() => selectHandler(userInfo)}
                    >
                      <img
                        src={userInfo.avatar}
                        alt="avatar"
                        className="img-profile"
                      />
                      <div className="detail">
                        <span className="username">{userInfo.username}</span>
                        <span className="last-chat">
                          {chat[1].lastMessage?.text}
                        </span>
                      </div>
                    </div>
                  );
                }
              })
            : null}
        </div>
      </div>
    )
  );
};

export default ChatsUser;
