import { Modal } from 'components/Modal/Modal';
import React, { useState } from 'react';
import { GalleryImage, GalleryItem } from './ImageGalleryItem.styled';

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    border: 'none',
    backgroundColor: 'transparent',
  },
};

export const ImageGalleryItem = ({ searchImage }) => {
  const { id, webformatURL, tags, largeImageURL } = searchImage;
  const [isModalOpen, setIsModalOpen] = useState(false);
 

  const openModal = () => {
    if (!isModalOpen) {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    isModalOpen(false);
  };

  
    return <GalleryItem key={id}>
        <GalleryImage
          src={webformatURL}
          alt={tags}
          loading="lazy"
          onClick={openModal}
        />
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Image Modal"
          largeImageURL={largeImageURL}
          tags={tags}
        />
      </GalleryItem>
    
  }

