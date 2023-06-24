import {
  Timestamp,
  serverTimestamp,
  updateDoc,
  arrayUnion,
  doc,
} from "firebase/firestore";
import { AuthContext } from "../../context/AuthContext";
import "./write-chat.css";
import { v4 as uuid } from "uuid";
import { useContext, useState } from "react";
import { db } from "../../firebase/firebase";
import Error from "../Error/Error";

const WriteChat = ({ chatInput, setChatInput, data }) => {
  const { currentUser } = useContext(AuthContext);
  const [error, setError] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!chatInput) {
      setError(true);
      handleError();
      return;
    }
    const message = chatInput;
    setChatInput("");
    await updateDoc(doc(db, "chats", data.chatId), {
      messages: arrayUnion({
        id: uuid(),
        text: message,
        senderId: currentUser.uid,
        date: Timestamp.now(),
      }),
    });

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text: message,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
    await updateDoc(doc(db, "userChats", data.user.id), {
      [data.chatId + ".lastMessage"]: {
        text: message,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
  };

  const handleError = () => {
    setTimeout(() => {
      setError(false);
    }, 1500);
  };

  return (
    <form className="form" onSubmit={handleSend}>
      {error && <Error message="your message is empty!" />}
      <div className="write-send">
        <input
          type="text"
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
        />
        <button type="submit">Kirim</button>
      </div>
    </form>
  );
};

export default WriteChat;
