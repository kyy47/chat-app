import React, { useContext, useEffect, useState } from "react";
import "./chat.css";
import TopBarChat from "./TopBarChat/TopBarChat";
import {
  Timestamp,
  arrayUnion,
  doc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { v4 as uuid } from "uuid";
const Chat = () => {
  const { currentUser } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const { data, dispath } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
        if (doc.exists()) setMessages(doc.data().messages);
      });
      return () => {
        unsub();
      };
    };
    data.chatId && getChats();
  }, [data.chatId]);
  const handleSend = async (e) => {
    e.preventDefault();
    await updateDoc(doc(db, "chats", data.chatId), {
      messages: arrayUnion({
        id: uuid(),
        text: chatInput,
        senderId: currentUser.uid,
        date: Timestamp.now(),
      }),
    });

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text: chatInput,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
    await updateDoc(doc(db, "userChats", data.user.id), {
      [data.chatId + ".lastMessage"]: {
        text: chatInput,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
  };
  return (
    <div className="container">
      <div className="chat">
        <TopBarChat />
        <div className="messages">
          {messages.length
            ? messages.map((message) => {
                return (
                  <div
                    className={
                      message.senderId === currentUser.uid ? "send" : "receive"
                    }
                    key={message.id}
                  >
                    <p>{message.text}</p>
                  </div>
                );
              })
            : null}
        </div>
        <form className="form" onSubmit={handleSend}>
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
          />
          <button type="submit">Kirim</button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
