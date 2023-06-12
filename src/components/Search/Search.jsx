import React, { useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import "./search.css";
import iconSearch from "../../assets/icons/icon-search.svg";
import SearchResult from "./SearchResult/SearchResult";

const Search = ({ stateSearch: { search, setSearch } }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    const username = e.target.value;
    setLoading(true);
    setSearch(username);
    const q = query(collection(db, "users"), where("username", "==", username));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } else {
      setUser(null);
    }
    setLoading(false);
  };

  return (
    <div className="search">
      <div className="input-search">
        <img src={iconSearch} alt="icon-search" className="icon-search" />
        <input
          type="text"
          placeholder="search other user"
          value={search}
          onChange={handleSearch}
        />
      </div>

      {user && <SearchResult user={user} />}
      {search && loading && <p className="looking-user">looking for user...</p>}
      {search && !user && !loading && (
        <p className="not-found">user not found</p>
      )}
    </div>
  );
};

export default Search;
