import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm, SubmissionError } from 'redux-form';
import Modal from './Modal';
import {
  ModalHeaderStyled,
  ModalHeaderTitleStyled,
  ModalContentStyled,
  ModalLineStyled,
  ModalLineContentStyled,
  ModalLineTitleStyled
} from '../../stylesheets/Modal';
import {LineFormStyled, TextErrorStyled} from '../../stylesheets/GeneralStyled';
import {INPUT_PASSWORD, INPUT_TEXT} from '../../utils/enums';
import { Button } from '../../stylesheets/Button';
import InputField from '../form/InputField';
import { signUpUser } from '../../modules/account/actions/signUp';
import { validateForm } from '../../utils/ultis';

class ModalCreatingAccount extends React.Component {

  handleCreateAccount = (values) => {
    const { username, email, password } = values;
    const { createAccount } = this.props;

    // check name
    if (validateForm.required(username))
      throw new SubmissionError({ _error: 'Name is required' });

    // check email
    if (validateForm.email(email))
      throw new SubmissionError({ _error: 'Invalid email address' });

    // check password
    if (validateForm.required(password))
      throw new SubmissionError({ _error: 'Password is required' });

    createAccount({ username, email, password })

  };

  render() {
    const {
      onClose,
      isOpen,
      handleSubmit,
      account,
      pristine,
      submitting,
      error,
      submitFailed,
      submitSucceeded
    } = this.props;

    return (
      <Modal onClose={onClose} isOpen={isOpen}>
        <ModalHeaderStyled>
          <ModalHeaderTitleStyled>
            <span>Create User</span>
          </ModalHeaderTitleStyled>
        </ModalHeaderStyled>
        <form onSubmit={handleSubmit(this.handleCreateAccount)} id="CreateAccountForm">
          <ModalContentStyled>
            <ModalLineStyled hasRow>
              <ModalLineContentStyled alignLeft>
              </ModalLineContentStyled>
            </ModalLineStyled>
            <ModalLineStyled>
              <ModalLineContentStyled alignLeft>
                <ModalLineTitleStyled>Username</ModalLineTitleStyled>
                <ModalLineTitleStyled fullInput>
                  <LineFormStyled>
                    <InputField
                      type={INPUT_TEXT}
                      name={'username'}
                      placeholder={'Username...'}
                    />
                  </LineFormStyled>
                </ModalLineTitleStyled>
              </ModalLineContentStyled>
            </ModalLineStyled>
            <ModalLineStyled>
              <ModalLineContentStyled alignLeft>
                <ModalLineTitleStyled>Email</ModalLineTitleStyled>
                <ModalLineTitleStyled fullInput>
                  <LineFormStyled>
                    <InputField
                      type={INPUT_TEXT}
                      name={'email'}
                      placeholder={'Email...'}
                    />
                  </LineFormStyled>
                </ModalLineTitleStyled>
              </ModalLineContentStyled>
            </ModalLineStyled>
            <ModalLineStyled>
              <ModalLineContentStyled alignLeft>
                <ModalLineTitleStyled>Password</ModalLineTitleStyled>
                <ModalLineTitleStyled fullInput>
                  <LineFormStyled>
                    <InputField
                      type={INPUT_PASSWORD}
                      name={'password'}
                      placeholder={'Password...'}
                    />
                  </LineFormStyled>
                </ModalLineTitleStyled>
              </ModalLineContentStyled>
            </ModalLineStyled>
            <ModalLineStyled>
              <ModalLineContentStyled>
                {
                  ((submitSucceeded && account.error) || (submitFailed && error)) &&
                    <TextErrorStyled error={true}>
                      {account.error || error}
                    </TextErrorStyled>
                }
                {
                  submitting || account.isFetching ?
                    <Button hasBorder btnModal disabled>
                      <i className="fa fa-circle-o-notch fa-spin" />Loading
                    </Button>
                  :
                    <Button type='submit' btnModal disabled={pristine}>
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

ModalCreatingAccount.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  createAccount: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  submitFailed: PropTypes.bool.isRequired,
  submitSucceeded: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  account: PropTypes.shape({
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  })

};

const mapStateToProps = state => ({
  account: state.account
});

const mapDispatchToProps = dispatch => bindActionCreators({
  createAccount: signUpUser
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'CreateAccountForm'
})(ModalCreatingAccount));
