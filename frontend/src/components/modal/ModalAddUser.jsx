import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import Modal from './Modal';
import {
  ModalContentStyled,
  ModalHeaderStyled,
  ModalHeaderTitleStyled,
  ModalLineContentStyled, ModalLineStyled, ModalLineTitleStyled
} from '../../stylesheets/Modal';
import { LineFormStyled } from '../../stylesheets/GeneralStyled';
import { Button } from '../../stylesheets/Button';

class ModalAddUser extends React.Component {
  render() {
    const { onClose, isOpen} = this.props;

    return (
      <Modal onClose={onClose} isOpen={isOpen} maxWidth={'500px'}>
        <ModalHeaderStyled>
          <ModalHeaderTitleStyled>
            <span>Add member</span>
          </ModalHeaderTitleStyled>
        </ModalHeaderStyled>
        <ModalContentStyled>
          <ModalLineStyled hasRows>
            <ModalLineContentStyled alignLeft>
              <ModalLineTitleStyled>User</ModalLineTitleStyled>
              <LineFormStyled>
                <Select
                  placeholder={'Username or email'}
                />
              </LineFormStyled>
            </ModalLineContentStyled>
            <ModalLineContentStyled alignLeft>
              <ModalLineTitleStyled>Role</ModalLineTitleStyled>
              <LineFormStyled>
                <Select
                  placeholder={'Role'}
                  options={[
                    { value: 'developer', label: 'Developer' },
                    { value: 'reporter', label: 'Reporter' },
                    { value: 'manager', label: 'Manager' }
                  ]}
                />
              </LineFormStyled>
            </ModalLineContentStyled>
          </ModalLineStyled>
          <ModalLineStyled>
            <ModalLineContentStyled>
              {
                <Button type='submit' btnModal hasBorder>
                  Add
                </Button>
              }
            </ModalLineContentStyled>
          </ModalLineStyled>
        </ModalContentStyled>
      </Modal>
    );
  }
}

ModalAddUser.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ModalAddUser;
