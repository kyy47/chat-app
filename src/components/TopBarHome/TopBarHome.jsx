import "./top-bar-home.css";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";
const TopBarHome = () => {
  const { currentUser } = useContext(AuthContext);
  const handleSignOut = async () => {
    await signOut(auth);
  };
  return (
    <div className="top-bar-home">
      <div className="user">
        <img
          src={currentUser?.photoURL}
          alt="image user"
          className="img-user"
        />
        <span className="username-user">{currentUser?.displayName}</span>
      </div>
      <button className="btn-logout" type="button" onClick={handleSignOut}>
        Logout
      </button>
    </div>
  );
};
export default TopBarHome;
