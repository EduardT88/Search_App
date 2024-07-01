import React, { createContext, useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

export const AppContext = createContext();

export const ContextProvider = ({ children }) => {
  const [workers, setWorkers] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [query, setQuery] = useState("google");
  const [showFooter, setShowFooter] = useState(true);

  //Confirmation modal
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [onConfirm, setOnConfirm] = useState(() => () => {});

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  const addToFavorites = (worker) => {
    const newFavorites = [...favorites, worker];
    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  const removeFromFavorites = (worker) => {
    const newFavorites = favorites.filter(
      (fav) => fav.login.uuid !== worker.login.uuid
    );
    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  const isFavorite = (worker) => {
    return favorites.some((fav) => fav.login.uuid === worker.login.uuid);
  };

  //Fuucntion to show the confirmation modal
  const confirm = (message, callback) => {
    setModalMessage(message);
    setOnConfirm(() => () => {
      callback();
      setShowModal(false);
    });
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <AppContext.Provider
      value={{
        workers,
        setWorkers,
        favorites,
        addToFavorites,
        removeFromFavorites,
        selectedWorker,
        setSelectedWorker,
        query,
        setQuery,
        isFavorite,
        confirm,
        showFooter,
        setShowFooter,
      }}
    >
      {children}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton className="justify-content-center">
          <Modal.Title className="text-danger p-2 text-center">
            Confirm Action
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            No
          </Button>
          <Button variant="primary" onClick={onConfirm}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </AppContext.Provider>
  );
};
