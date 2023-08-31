import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Overlay, ModalWindow } from './Modal.styled';

// Об'єкт модального вікна в DOM-дереві
const modalRoot = document.querySelector('#modal-root');

// Класовий компонент Modal
class Modal extends Component {
  // Метод життєвого циклу: викликається після монтування конмпонента
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown); // Добавляємо обробник стану натискання клавіатури
    document.body.style.overflow = 'hidden';
  }

  // Метод життєвого циклу: викликається перед розмонтуванням компонента
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown); // Видалення обробника стану натискання клавіатури
    document.body.style.overflow = 'visible';
  }

  // Обробник стану натискання клавіатури
  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onClose(); // Закриваємо модальне вікно при натисканні кнопки Escape
    }
  };

  // Обробнику при нитисканні на модальне вікно
  handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose(); // Закриваємо модальне вікно при натисканні на фон
    }
  };

    
render() {
    const { largeImageURL, tags } = this.props; //Отримання значення пропсів
    return createPortal(
      <Overlay onClick={this.handleBackdropClick}>
        <ModalWindow>
          <img src={largeImageURL} alt={tags} />
        </ModalWindow>
      </Overlay>,
      modalRoot,
    );
  }
}

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;

