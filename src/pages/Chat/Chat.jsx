import React, { useContext, useEffect, useRef, useState } from "react";
import "./chat.css";
import { Message, TopBarChat, WriteChat } from "../../components";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { ChatContext } from "../../context/ChatContext";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const { data } = useContext(ChatContext);
  const scrollRef = useRef();
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

  useEffect(() => {
    const scrollToLastMessage = () => {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    };
    scrollRef.current && scrollToLastMessage();
  }, [messages]);

  return (
    <div className="container">
      <div className="chat">
        <TopBarChat />
        <div className="messages" ref={scrollRef}>
          {messages.length
            ? messages.map((message) => {
                return (
                  <Message
                    message={message}
                    data={data}
                    scrollRef={scrollRef}
                    key={message.id}
                  />
                );
              })
            : null}
        </div>
        <WriteChat
          chatInput={chatInput}
          setChatInput={setChatInput}
          data={data}
        />
      </div>
    </div>
  );
};

export default Chat;
