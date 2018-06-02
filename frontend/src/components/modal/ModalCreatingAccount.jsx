import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import Modal from './Modal';
import {
  ModalHeaderStyled,
  ModalHeaderTitleStyled,
  ModalContentStyled,
  ModalLineStyled,
  ModalLineContentStyled,
  ModalLineTitleStyled
} from '../../stylesheets/Modal';
import { Input, LineFormStyled } from '../../stylesheets/GeneralStyled';
import { INPUT_NAME, INPUT_EMAIL, INPUT_PASSWORD } from '../../utils/enums';
import { Button } from '../../stylesheets/Button';

const renderField = (field) => {
  const { input, type, placeholder } = field;

  return (
    <Input type={type} placeholder={placeholder} {...input} />
  );
};

class ModalCreatingAccount extends React.Component {

  constructor(props) {
    super(props);

    this.state = {

    };
  }

  handleCreateAccount = (values) => {
    console.log(values);
  };

  render() {
    const { onClose, isOpen, handleSubmit } = this.props;

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
                    <Field
                      type={INPUT_NAME}
                      name={INPUT_NAME}
                      placeholder={'Username...'}
                      component={renderField}
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
                    <Field
                      type={INPUT_EMAIL}
                      name={INPUT_EMAIL}
                      placeholder={'Email...'}
                      component={renderField}
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
                    <Field
                      type={INPUT_PASSWORD}
                      name={INPUT_PASSWORD}
                      placeholder={'Password...'}
                      component={renderField}
                    />
                  </LineFormStyled>
                </ModalLineTitleStyled>
              </ModalLineContentStyled>
            </ModalLineStyled>
            <ModalLineStyled>
              <ModalLineContentStyled>
                {
                  <Button type='submit' btnModal>
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
};

export default reduxForm({
  form: 'CreateAccountForm'
})(ModalCreatingAccount);
