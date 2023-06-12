import React, { useState } from "react";
import "./home.css";

import { Search, TopBarHome, ChatsUser } from "../../components";
const Home = () => {
  const [search, setSearch] = useState("");
  return (
    <div className="container">
      <div className="home">
        <TopBarHome />
        <Search stateSearch={{ search, setSearch }} />
        <ChatsUser search={search} />
      </div>
    </div>
  );
};

export default Home;
