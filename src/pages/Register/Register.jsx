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
        <h3 className="title-register">Register</h3>
        <form onSubmit={handleRegister} className="form-register">
          <input
            className="input-form"
            type="text"
            placeholder="username"
            required
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
          <input
            className="input-form"
            type="email"
            placeholder="email"
            required
            value={email}
            onChange={({ target }) => setEmail(target.value)}
          />
          <input
            className="input-form"
            type="password"
            placeholder="password"
            required
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
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
