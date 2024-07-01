import React, { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../context/Context";
import WorkerDetails from "./WorkerDetails";

export default function WorkerInfo() {
  const {
    workers,
    favorites,
    selectedWorker,
    setSelectedWorker,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  } = useContext(AppContext);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const company = params.get("company");
    const index = parseInt(params.get("index"), 10);

    if (
      location.pathname === "/employee" &&
      company &&
      index >= 0 &&
      index < workers.length
    ) {
      setSelectedWorker(workers[index]);
    } else if (
      location.pathname === "/favorites/employee" &&
      index >= 0 &&
      index < favorites.length
    ) {
      setSelectedWorker(favorites[index]);
    } else {
      navigate("/");
    }
  }, [location.search, workers, favorites, setSelectedWorker, navigate]);

  return (
    <div>
      {selectedWorker ? (
        <WorkerDetails
          worker={selectedWorker}
          closeDetails={() =>
            navigate(location.pathname === "/employee" ? "/" : "/favorites")
          }
          addToFavorites={addToFavorites}
          removeFromFavorites={removeFromFavorites}
          isFavorite={isFavorite}
        />
      ) : (
        <div>No worker selected</div>
      )}
    </div>
  );
}
