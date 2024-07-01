import React, { useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AppContext } from "../context/Context";
import WorkerList from "../components/WorkerList";
import WorkerSearch from "../components/WorkerSearch";
import "../css/home.css";

export default function Home() {
  const {
    workers,
    setWorkers,
    setSelectedWorker,
    addToFavorites,
    isFavorite,
    setQuery,
    query,
  } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get("search");

    if (searchQuery) {
      setQuery(searchQuery);
      fetchWorkers(searchQuery);
    }
  }, [location.search]);

  const fetchWorkers = async (searchQuery) => {
    try {
      const response = await fetch(
        `https://randomuser.me/api/?results=10&seed=${searchQuery}`
      );
      const data = await response.json();
      setWorkers(data.results);
    } catch (error) {
      console.error("Error fetching workers:", error);
    }
  };

  const handleMoreInfo = (worker) => {
    const index = workers.findIndex((w) => w.login.uuid === worker.login.uuid);
    setSelectedWorker(worker);
    navigate(`/employee?company=${query}&index=${index}`);
  };

  return (
    <React.Fragment>
      <WorkerSearch />
      <WorkerList
        workers={workers}
        addToFavorites={addToFavorites}
        isFavorite={isFavorite}
        query={query}
        handleMoreInfo={handleMoreInfo}
      />
    </React.Fragment>
  );
}
