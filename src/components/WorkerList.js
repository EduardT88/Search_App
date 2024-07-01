import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function WorkerList({
  workers,
  addToFavorites,
  isFavorite,
  handleMoreInfo,
  removeFromFavorites,
}) {
  const location = useLocation();

  return (
    <div className="container-fluid py-5 text-center">
      <div className="row row-cols-1 row-cols-md-4 g-4">
        {workers.map((worker, index) => (
          <div key={worker.login.uuid} className="col">
            <div className="border p-3 h-100 overflow-hidden shadow">
              <img
                src={worker.picture.large}
                className="w-100 mb-3"
                alt={`${worker.name.first} ${worker.name.last}`}
              />
              <div>
                {worker.name.first} {worker.name.last}
              </div>
              <div>Age: {worker.dob.age}</div>
              <div>Country: {worker.location.country}</div>
              <button
                className="btn btn-dark mt-3"
                onClick={() => handleMoreInfo(worker)}
              >
                More Info
              </button>
              {!isFavorite(worker) && location.pathname !== "/favorites" && (
                <button
                  className="btn btn-primary mt-3 ms-2"
                  onClick={() => addToFavorites(worker)}
                >
                  Add to Favorites
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
