import { useContext } from "react";
import "./search-result.css";
import { AuthContext } from "../../../context/AuthContext";
import {
  getDoc,
  doc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import { ChatContext } from "../../../context/ChatContext";
import { useNavigate } from "react-router-dom";

const SearchResult = ({ user }) => {
  const { currentUser } = useContext(AuthContext);
  const { dispath } = useContext(ChatContext);
  const navigate = useNavigate();
  const handleSelect = async () => {
    const combinedId =
      currentUser.uid > user.id
        ? currentUser.uid + user.id
        : user.id + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            id: user.id,
            username: user.username,
            avatar: user.avatar,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        await updateDoc(doc(db, "userChats", user.id), {
          [combinedId + ".userInfo"]: {
            id: currentUser.uid,
            username: currentUser.displayName,
            avatar: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
      dispath({ type: "CHANGE_USER", payload: user });
      navigate("/chat");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="card-result" onClick={handleSelect}>
      <img className="img-profile" src={user.avatar} alt="img profile" />
      <span className="username">{user.username}</span>
    </div>
  );
};
export default SearchResult;
