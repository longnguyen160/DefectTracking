import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, SubmissionError } from 'redux-form';
import Modal from './Modal';
import {
  ModalContentStyled,
  ModalHeaderStyled,
  ModalHeaderTitleStyled,
  ModalLineContentStyled, ModalLineStyled, ModalLineTitleStyled
} from '../../stylesheets/Modal';
import { LineFormStyled } from '../../stylesheets/GeneralStyled';
import { Button } from '../../stylesheets/Button';
import {INPUT_TEXT} from '../../utils/enums';
import InputField from '../form/InputField';

class ModalAddCategory extends React.Component {

  handleCreateCategory = (values) => {

  };

  render() {
    const { onClose, isOpen, handleSubmit } = this.props;

    return (
      <Modal onClose={onClose} isOpen={isOpen} maxWidth={'500px'}>
        <ModalHeaderStyled>
          <ModalHeaderTitleStyled>
            <span>Add category</span>
          </ModalHeaderTitleStyled>
        </ModalHeaderStyled>
        <form onSubmit={handleSubmit(this.handleCreateCategory)} id="CreateCategoryForm">
          <ModalContentStyled>
            <ModalLineStyled hasRows>
              <ModalLineContentStyled alignLeft>
                <ModalLineTitleStyled>Name</ModalLineTitleStyled>
                <ModalLineTitleStyled fullInput>
                  <LineFormStyled>
                    <InputField
                      type={INPUT_TEXT}
                      name={'categoryName'}
                      placeholder={'Name...'}
                    />
                  </LineFormStyled>
                </ModalLineTitleStyled>
              </ModalLineContentStyled>
              <ModalLineContentStyled alignLeft>
                <ModalLineTitleStyled>Description</ModalLineTitleStyled>
                <ModalLineTitleStyled fullInput>
                  <LineFormStyled>
                    <InputField
                      type={INPUT_TEXT}
                      name={'description'}
                      placeholder={'Description...'}
                    />
                  </LineFormStyled>
                </ModalLineTitleStyled>
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
        </form>
      </Modal>
    );
  }
}

ModalAddCategory.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  submitFailed: PropTypes.bool.isRequired,
  submitSucceeded: PropTypes.bool.isRequired,
};

export default reduxForm({
  form: 'CreateCategoryForm'
})(ModalAddCategory);
