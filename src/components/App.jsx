//import { Component } from 'react';

import axios from 'axios';
import css from './App.module.css';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Loader } from './Loader/Loader';
import { useState } from 'react';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';

export const App = () => {
  //State
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [searchedImages, setSearchedImages] = useState('');
  const [totalHits, setTotalHits] = useState(0);
  console.log('totalHits State:' + totalHits);
  const [disabledButton, setDisabledButton] = useState(true);
  const [images, setImages] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [modalSrc, setModalSrc] = useState('');

  //Pixabay API
  const fetchGallery = async (q, page) => {
    const baseURL = `https://pixabay.com/api/?q=${q}&page=${page}&key=42580380-f7e9d56cf0d50abf8107b2707&image_type=photo&orientation=horizontal&per_page=12`;
    try {
      const response = await axios.get(baseURL);
      console.log('fetch gallery');
      return response.data;
    } catch (error) {
      console.error('Fetching error:', error);
    }
  };

  //Handle and fetch value from input
  const fetchSearchedValue = async data => {
    setIsLoading(true);
    setSearchedImages(data);
    console.log('setSearchedData:' + data);
    setCurrentPage(1);
    setTotalHits(0);
    console.log(currentPage);
    console.log(searchedImages);
    await fetchGallery(data, currentPage).then(results => {
      if (currentPage === 1) {
        console.log('fetch przy 1 stronie');
        setImages(results.hits);
        console.log(images);
        setTotalHits(() => results.totalHits);
        console.log(totalHits);
        checkIfLoadMore(results.totalHits);
      }
    });
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  //check if loadmore is abled
  const checkIfLoadMore = data => {
    if (data > 12) {
      console.log('totalHits większe niż 12');
      setDisabledButton(false);
      setCurrentPage(currentPage => currentPage + 1);
      setTotalHits(totalHits => totalHits - 12);
      console.log('current page checkIfLoadMore:' + currentPage);
      console.log('totalhits checkIfLoadMore:' + totalHits);
    } else {
      setDisabledButton(true);
    }
  };

  //load more images
  const loadMore = async () => {
    setIsLoading(true);
    console.log('loadmore searchedValue' + searchedImages);
    await fetchGallery(searchedImages, currentPage).then(data =>
      setImages(data.hits)
    );
    console.log('loadmore fetch:' + images);
    checkIfLoadMore(totalHits);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  //Modal- handle data from image and change the state to open/close modal
  const handleImageClick = image => {
    setOpenModal(true);
    setModalSrc(image.largeImageURL); //sprawdzić czy działa, jak nie to jak pobrać large url żeby wstawić jako source
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  return (
    <div className={css.app}>
      <Searchbar onSubmit={fetchSearchedValue} />
      <ImageGallery>
        {isLoading ? (
          <Loader />
        ) : (
          <ImageGalleryItem images={images} onClick={handleImageClick} />
        )}
      </ImageGallery>
      {totalHits !== 0 && (
        <Button disabled={disabledButton} onClick={loadMore} />
      )}
      {openModal && <Modal onClick={closeModal} openModal={modalSrc} />}
    </div>
  );
};
