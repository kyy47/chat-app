import React, { useContext, useEffect, useState } from "react";
import "./register.css";
import { TeenyiconsImageDocumentOutline } from "../../assets/icons/AvatarIcon";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, storage, db } from "../../firebase/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Error } from "../../components";
import Input from "../../utils/Input/Input";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [error, setError] = useState("");
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();
    const fileAvatar = e.target[3].files[0];
    if (!avatar) return setError("avatar is required");
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const storageRef = ref(storage, username);
      const uploadTask = uploadBytesResumable(storageRef, fileAvatar);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          setError(`${error.message}`);
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName: username,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", res.user.uid), {
              id: res.user.uid,
              username,
              email,
              avatar: downloadURL,
            });
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          });
        }
      );
    } catch (e) {
      setError(e.message);
    }
  };
  const handleInputFile = ({ target }) => {
    setAvatar(target.files[0].name);
  };
  useEffect(() => {
    if (currentUser) navigate("/");
  }, [currentUser]);
  return (
    <div className="container">
      <div className="register">
        <div className="title-register">
          <h3>🔰 kichat</h3>
          <p>Minimal Chat App</p>
        </div>
        <form onSubmit={handleRegister} className="form-register">
          <div className="input-form">
            <label htmlFor="username">Your username</label>
            <Input
              name="username"
              type="text"
              placeholder="xxx47"
              value={username}
              setValue={setUsername}
            />
          </div>
          <div className="input-form">
            <label htmlFor="email">Your email address</label>
            <Input
              name="email"
              type="email"
              placeholder="xxx@gmail.com"
              value={email}
              setValue={setEmail}
            />
          </div>
          <div className="input-form">
            <label htmlFor="password">Your password</label>
            <Input
              name="password"
              type="password"
              placeholder="#Xxx47"
              value={password}
              setValue={setPassword}
            />
          </div>
          <input
            type="file"
            id="file-input"
            onChange={handleInputFile}
            name="file-input"
          />
          <div className="box-input-file">
            <label htmlFor="file-input" className="label-file-input">
              <TeenyiconsImageDocumentOutline />
              <span className="info-file">
                {avatar ? avatar : "pick your avatar"}
              </span>
            </label>
            {error ? <Error message={error} /> : null}
          </div>

          <button type="submit" className="btn-register">
            Register
          </button>
        </form>
        <span className="to-login">
          You have an account? <a href="/login">login</a>
        </span>
      </div>
    </div>
  );
};

export default Register;
