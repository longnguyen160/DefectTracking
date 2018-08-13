import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm, SubmissionError } from 'redux-form';
import { bindActionCreators } from 'redux';
import Notifications from 'react-notification-system-redux';
import { loginUser } from '../actions/login';
import {
  FormStyled,
  PageStyled,
  TitleAccountStyled,
  FormBlockStyled,
  FormGroupStyled,
  LineFormStyled,
  TextErrorStyled,
  TitleFormStyled,
  Input,
  Label
} from '../../../stylesheets/GeneralStyled';
import { Button } from '../../../stylesheets/Button';
import { INPUT_TEXT, INPUT_PASSWORD } from '../../../utils/enums';
import { validateForm } from '../../../utils/ultis';
import { notificationStyle } from '../../../stylesheets/Notifications';
import InputField from '../../../components/form/InputField';

const renderField = (field) => {
  const { input, type, placeholder } = field;

  return (
    <Input type={type} placeholder={placeholder} {...input} />
  );
};

class SignIn extends React.Component {

  handleLogin = (values) => {
    const { email, password } = values;
    const { login, history } = this.props;

    if ((validateForm.required(email)) || (validateForm.required(password))) {
      throw new SubmissionError({ _error: 'Email and password is required' });
    } else if (validateForm.email(email)) {
      throw new SubmissionError({ _error: 'Invalid email address' });
    }

    login({ email, password }, () => {
      history.push('/');
    });
  };

  render() {
    const {
      pristine,
      submitting,
      handleSubmit,
      account,
      error,
      submitFailed,
      submitSucceeded,
      notifications
    } = this.props;

    return (
      <FormStyled>
        <Notifications
          notifications={notifications}
          style={notificationStyle}
        />
        <PageStyled>
          <TitleAccountStyled>Defect Tracking</TitleAccountStyled>
          <FormBlockStyled show>
            <form onSubmit={handleSubmit(this.handleLogin)} id="LoginForm">
              <FormGroupStyled>
                <LineFormStyled hasTitle>
                  <TitleFormStyled>Email</TitleFormStyled>
                  <InputField
                    type={INPUT_TEXT}
                    name={'email'}
                    placeholder={'Email'}
                    component={renderField}
                  />
                </LineFormStyled>
              </FormGroupStyled>
              <FormGroupStyled>
                <LineFormStyled hasTitle>
                  <TitleFormStyled>Password</TitleFormStyled>
                  <InputField
                    type={INPUT_PASSWORD}
                    name={INPUT_PASSWORD}
                    placeholder={'Password'}
                    component={renderField}
                  />
                </LineFormStyled>
              </FormGroupStyled>
              {
                ((submitSucceeded && account.error) || (submitFailed && error)) &&
                  <TextErrorStyled error={true}>
                    {account.error || error}
                  </TextErrorStyled>
              }
              {
                submitting || account.isFetching ?
                  <Button
                    hasBorder
                    disabled
                    margin={'0 auto 10px'}
                  >
                    <i className="fa fa-circle-o-notch fa-spin" />Loading
                  </Button>
                :
                  <Button
                    hasBorder
                    type="submit"
                    form="LoginForm"
                    disabled={pristine}
                    margin={'0 auto 10px'}
                  >
                    Sign In
                  </Button>
              }
              <Label><Link to='/signup'>Sign up</Link></Label>
            </form>
          </FormBlockStyled>
        </PageStyled>
      </FormStyled>

    );
  }
}

SignIn.propTypes = {
  history: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  submitFailed: PropTypes.bool.isRequired,
  submitSucceeded: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  notifications: PropTypes.array.isRequired,
  account: PropTypes.shape({
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  })
};

const mapStateToProps = state => ({ account: state.account, notifications: state.notifications });

const mapDispatchToProps = dispatch => bindActionCreators({ login: loginUser }, dispatch);

export default reduxForm({
  form: 'LoginForm',
})(connect(mapStateToProps, mapDispatchToProps)(SignIn));
