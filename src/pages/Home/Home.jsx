import React, { useContext, useState } from "react";
import "./home.css";

import { Search, TopBarHome, ChatsUser } from "../../components";
import Chat from "../Chat/Chat";
import { IsMobileContext } from "../../context/IsMobileContext";
const Home = () => {
  const { isMobile } = useContext(IsMobileContext);
  const [search, setSearch] = useState("");
  return (
    <div className="container">
      <div className="container-home">
        <div className="home">
          <TopBarHome />
          <Search stateSearch={{ search, setSearch }} />
          <ChatsUser search={search} />
        </div>
        {!isMobile && (
          <div className="container-chat">
            <Chat />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
