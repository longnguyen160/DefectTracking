import React from 'react';
import PropTypes from 'prop-types';
import { ModalContent, MyModal } from '../../stylesheets/Modal';

export default class Modal extends React.Component {
  closeModal = () => {
    this.props.onClose();
  };

  clickModal = (e) => {
    e.stopPropagation();
  };

  render() {
    const { isOpen, maxWidth } = this.props;

    return (
      <MyModal
        id="myModal"
        onClick={this.closeModal}
        isOpen={isOpen}
      >
        <ModalContent onClick={this.clickModal} maxWidth={maxWidth}>
          {this.props.children}
        </ModalContent>
      </MyModal>
    );
  }
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  maxWidth: PropTypes.string
};
