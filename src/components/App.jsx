import React, { useState, useEffect } from "react";
import ImageGallery from "./ImageGallery/ImageGallery";
import Searchbar from "./Searchbar/Searchbar";
import { getImages } from "../services/getImages.js";
import Button from "./Button/Button";
import Loader from "./Loader/Loader";
import Modal from "./Modal/Modal";

const App = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (!query) return;
    fetchImages();
  }, [query, page]);

  const openModal = (image) => {
    setSelectedImage(image);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedImage(null);
  };

  const handleSearch = (searchText) => {
    setQuery(searchText);
    setPage(1);
    setImages([]);
    setShowModal(false);
  };

  const fetchImages = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { images: fetchedImages, totalHits } = await getImages(query, page);
      const shouldLoadMore = page < Math.ceil(totalHits / 12);
      const shouldShowLoadMore = fetchedImages.length > 0;

      setImages((prevImages) => [...prevImages, ...fetchedImages]);
      setLoadMore(shouldLoadMore);
      if (shouldShowLoadMore) {
        setShowModal(false);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    if (showModal) {
      window.addEventListener("keydown", handleKeyDown);
    } else {
      window.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showModal]);

  return (
    <div>
      {error && <h1>Error: {error}</h1>}
      <Searchbar handleSearch={handleSearch} />
      <ImageGallery images={images} openModal={openModal} />
      {isLoading && <Loader />}
      {loadMore && <Button onClick={handleLoadMore} />}
      {showModal && <Modal imageUrl={selectedImage} onClose={closeModal} />}
    </div>
  );
};

export default App;
