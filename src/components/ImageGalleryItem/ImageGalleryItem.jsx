import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal/Modal';
import { Item, Img } from './ImageGalleryItem.styled';

// Класовий компонент ImageItem
class ImageItem extends Component {
  state = {
    showModal: false, // Зберігає стан модального вікна
  };

  // Метод для переключення стану модального вікна
  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal, // Інвертує значення showModal
    }));
  };

  render() {
    const { showModal } = this.state; // Отримання значення showModal із стану
    const { image } = this.props; // Отримання переданий пропс image

    return (
      <>
        <Item>
          <Img
            src={image.webformatURL} // URL маленького зображення
            alt={image.tags} // Теги зображення
            onClick={this.toggleModal} // Обробник кліку на відкриття модального вікна
          />
          {showModal && ( // Якщо showModal дорівнює true, відображаємо модальне вікно
            <Modal
              largeImageURL={image.largeImageURL} // URL великого зображення
              tags={image.tags} // Теги зображення
              onClose={this.toggleModal} // Обробник для закриття модального окна
            />
          )}
        </Item>
      </>
    );
  }
}

ImageItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
};

export default ImageItem;