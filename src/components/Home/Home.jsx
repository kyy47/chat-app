import React from "react";
import "./home.css";
import TopBarHome from "./TopBarHome/TopBarHome";
import Search from "./Search/Search";
import ChatsUser from "./ChatsUser/ChatsUser";
const Home = () => {
  return (
    <div className="container">
      <div className="home">
        <TopBarHome />
        <Search />
        <ChatsUser />
      </div>
    </div>
  );
};

export default Home;
