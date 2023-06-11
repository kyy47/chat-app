import React, { useContext, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { AuthContext } from "../../context/AuthContext";
import "./search.css";
import iconSearch from "../../assets/icons/icon-search.svg";
import { ChatContext } from "../../context/ChatContext";
import { useNavigate } from "react-router-dom";
const Search = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [keyword, setKeyword] = useState("");
  const [user, setUser] = useState(null);
  const { dispath } = useContext(ChatContext);
  const handleSearch = async (e) => {
    const username = e.target.value;
    setKeyword(username);
    const q = query(collection(db, "users"), where("username", "==", username));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } else {
      setUser(null);
    }
  };
  const handleSelect = async () => {
    const combinedId =
      currentUser.uid > user.id
        ? currentUser.uid + user.id
        : user.id + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      console.log(res);
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
    <div className="search">
      <div className="input-search">
        <img src={iconSearch} alt="icon-search" className="icon-search" />
        <input
          type="text"
          placeholder="search other user"
          value={keyword}
          onChange={handleSearch}
        />
      </div>

      {user ? (
        <div className="card-result" onClick={handleSelect}>
          <img className="img-profile" src={user.avatar} alt="img profile" />
          <span className="username">{user.username}</span>
        </div>
      ) : null}
    </div>
  );
};

export default Search;
