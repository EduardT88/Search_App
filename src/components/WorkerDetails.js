import React, { useContext, useEffect } from "react";
import { AppContext } from "../context/Context";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "../css/workerDetails.css";

// Fix leaflet's default icon issue
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Fix leaflet's default icon issue
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export default function WorkerDetails({
  worker,
  closeDetails,
  addToFavorites,
  removeFromFavorites,
  isFavorite,
}) {
  const { confirm, setShowFooter } = useContext(AppContext);

  useEffect(() => {
    setShowFooter(false);
    return () => {
      setShowFooter(true);
    };
  }, [setShowFooter]);

  const handleRemoveFromFavorites = (worker) => {
    confirm("ARE YOU SURE WANT TO REMOVE?", () => {
      removeFromFavorites(worker);
    });
  };
  return (
    <div className="container p-2 text-center">
      <button className="btn btn-secondary mb-3" onClick={closeDetails}>
        Back
      </button>
      <h2>
        Info about: {worker.name.first} {worker.name.last}
      </h2>
      <img
        src={worker.picture.large}
        className="mb-3"
        alt={`${worker.name.first} ${worker.name.last}`}
      />
      <div>Age: {worker.dob.age}</div>
      <div>Country: {worker.location.country}</div>
      <div>City: {worker.location.city}</div>
      <div>Email: {worker.email}</div>
      <div>Phone: {worker.phone}</div>
      <button
        className="btn btn-danger mt-3"
        onClick={() =>
          isFavorite(worker)
            ? handleRemoveFromFavorites(worker)
            : addToFavorites(worker)
        }
      >
        {isFavorite(worker) ? "Remove from Favorites" : "Add to Favorites"}
      </button>
      <div className="small-map-container">
        <MapContainer
          center={[
            worker.location.coordinates.latitude,
            worker.location.coordinates.longitude,
          ]}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker
            position={[
              worker.location.coordinates.latitude,
              worker.location.coordinates.longitude,
            ]}
          />
        </MapContainer>
      </div>
    </div>
  );
}
