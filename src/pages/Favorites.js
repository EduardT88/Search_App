import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/Context";


export default function Favorites() {
  const { favorites, removeFromFavorites, setSelectedWorker, confirm } =
    useContext(AppContext);

  const navigate = useNavigate();

  const handleMoreInfo = (worker) => {
    const index = favorites.findIndex(
      (fav) => fav.login.uuid === worker.login.uuid
    );
    setSelectedWorker(worker);
    navigate(`/favorites/employee?index=${index}`);
  };

  const handleRemoveFromFavorites = (worker) => {
    confirm("ARE YOU SURE WANT TO REMOVE?", () => {
      removeFromFavorites(worker);
    });
  };

  return (
    <div className="container-fluid py-5 text-center">
      <h2>Favorite Workers</h2>
      <div className="row row-cols-1 row-cols-md-4 g-4">
        {favorites.map((worker, index) => (
          <div key={worker.login.uuid} className="col">
            <div className="border p-3 h-100 overflow-hidden shadow">
              <img
                src={worker.picture.large}
                alt={`${worker.name.first} ${worker.name.last}`}
              />
              <h2>
                {worker.name.first} {worker.name.last}
              </h2>
              <div>Age: {worker.dob.age}</div>
              <div>Country: {worker.location.country}</div>
              <button
                className="btn btn-dark mt-3"
                onClick={() => handleMoreInfo(worker)}
              >
                View Details
              </button>
              <button
                className="btn btn-primary mt-3 ms-2"
                onClick={() => handleRemoveFromFavorites(worker)}
              >
                Remove From Favorite
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
