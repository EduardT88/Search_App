import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/Context";

import "../css/workerSearch.css";

export default function WorkerSearch() {
  const { query, setQuery } = useContext(AppContext);
  const nav = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    nav(`/?search=${query}`);
  };

  return (
    <div className="worker-strip">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search by company seed"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}
