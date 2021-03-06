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
    const { isOpen, maxWidth, noScroll, isHidden, fullHeight, isVisible, padding } = this.props;

    return (
      <MyModal
        id="myModal"
        onClick={this.closeModal}
        isOpen={isOpen}
      >
        <ModalContent
          onClick={this.clickModal}
          maxWidth={maxWidth}
          noScroll={noScroll}
          isHidden={isHidden}
          fullHeight={fullHeight}
          isVisible={isVisible}
          padding={padding}
        >
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
  maxWidth: PropTypes.string,
  padding: PropTypes.string,
  noScroll: PropTypes.bool,
  isHidden: PropTypes.bool,
  isVisible: PropTypes.bool,
  fullHeight: PropTypes.bool,
};
