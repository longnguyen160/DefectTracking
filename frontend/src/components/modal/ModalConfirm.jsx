import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal';
import {
  ModalCloseStyle, ModalContentStyled,
  ModalHeaderStyled,
  ModalHeaderTitleStyled,
  ModalLineContentStyled, ModalLineStyled
} from '../../stylesheets/Modal';
import Icon from '../icon/Icon';
import { ICONS } from '../../utils/enums';
import { Button } from '../../stylesheets/Button';
import LoadingIcon from '../icon/LoadingIcon';

class ModalConfirm extends Component {
  render() {
    const { isOpen, onClose, handleDelete, entityId, loading } = this.props;

    return (
      <Modal
        onClose={onClose}
        isOpen={isOpen}
        maxWidth={'300px'}
        padding={'10px'}
      >
        <ModalHeaderStyled padding={'0'}>
          <ModalHeaderTitleStyled>
            Confirm
          </ModalHeaderTitleStyled>
          <ModalCloseStyle>
            <Icon
              icon={ICONS.DELETE}
              width={15}
              height={15}
              color={'#626262'}
              hoverPointer
              onClick={() => onClose()}
            />
          </ModalCloseStyle>
        </ModalHeaderStyled>
        <ModalContentStyled>
          <ModalLineStyled>
            <ModalLineContentStyled alignLeft>
              Do you want to delete this issue?
            </ModalLineContentStyled>
          </ModalLineStyled>
          <ModalLineStyled noMargin>
            <ModalLineContentStyled hasRows flexEnd iconMarginRight>
              <Button
                small
                fullHeight
                action={'Deactivate'}
                margin={'0 5px'}
                displayFlex={loading}
                onClick={() => handleDelete(entityId)}
                disabled={loading}
              >
                {
                  loading &&
                    <LoadingIcon
                      color={'#fff'}
                      width={20}
                      height={15}
                    />
                }
                Delete
              </Button>
              <Button
                no
                small
                hasBorder
                fullHeight
                margin={'0 5px'}
                onClick={onClose}
              >
                Cancel
              </Button>
            </ModalLineContentStyled>
          </ModalLineStyled>
        </ModalContentStyled>
      </Modal>
    );
  }
}

ModalConfirm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  entityId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default ModalConfirm;
