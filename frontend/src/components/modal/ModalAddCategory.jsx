import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, SubmissionError } from 'redux-form';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Modal from './Modal';
import {
  ModalContentStyled,
  ModalHeaderStyled,
  ModalHeaderTitleStyled,
  ModalLineContentStyled,
  ModalLineStyled,
  ModalLineTitleStyled
} from '../../stylesheets/Modal';
import { LineFormStyled, TextErrorStyled } from '../../stylesheets/GeneralStyled';
import { Button } from '../../stylesheets/Button';
import {INPUT_TEXT} from '../../utils/enums';
import InputField from '../form/InputField';
import {createCategory} from '../../modules/management/actions/category';
import {validateForm} from '../../utils/ultis';


class ModalAddCategory extends React.Component {

  handleCreateCategory = (values) => {
    const { name, description } = values;
    const { createCategory, onClose } = this.props;

    if (validateForm.required(name)) {
      throw new SubmissionError({ _error: 'Name is required' });
    }
    if (validateForm.required(description)) {
      throw new SubmissionError({ _error: 'Description is required' });
    }

    createCategory({ name, description }, () => {
      onClose();
    });
  };

  render() {
    const { onClose, isOpen, handleSubmit, submitSucceeded, submitFailed, submitting, management, error } = this.props;

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
                      name={'name'}
                      placeholder={'Name...'}
                      renderType={'input'}
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
                      renderType={'input'}
                    />
                  </LineFormStyled>
                </ModalLineTitleStyled>
              </ModalLineContentStyled>
            </ModalLineStyled>
            <ModalLineStyled>
              <ModalLineContentStyled>
                {
                  ((submitSucceeded && management.error) || (submitFailed && error)) &&
                  <TextErrorStyled error={true}>
                    {management.error || error}
                  </TextErrorStyled>
                }
                {
                  submitting || management.isLoading ?
                    <Button hasBorder btnModal disabled>
                      <i className="fa fa-circle-o-notch fa-spin" />Loading
                    </Button>
                  :
                    <Button type='submit' btnModal hasBorder>
                      Create
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
  createCategory: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  submitFailed: PropTypes.bool.isRequired,
  submitSucceeded: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  management: PropTypes.shape({
    isLoading: PropTypes.bool.isRequired,
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  })
};

const mapStateToProps = state => ({ management: state.management });

const mapDispatchToProps = dispatch => bindActionCreators({
  createCategory: createCategory
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'CreateCategoryForm'
})(ModalAddCategory));
