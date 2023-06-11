import React from "react";
import "./home.css";



import { Search, TopBarHome, ChatsUser } from "../../components";
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
