import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm, SubmissionError } from 'redux-form';
import { bindActionCreators } from 'redux';
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
import { signUpUser } from '../actions/signUp';
import InputField from '../../../components/form/InputField';

const renderField = (field) => {
  const { input, type, placeholder } = field;

  return (
    <Input type={type} placeholder={placeholder} {...input} />
  );
};

class SignUp extends Component {

  handleSignUp = (values) => {
    const { name, email, password, confirmPassword } = values;
    const { history, signUp } = this.props;

    // check name
    if (validateForm.required(name))
      throw new SubmissionError({ _error: 'Name is required' });

    // check email
    if (validateForm.email(email))
      throw new SubmissionError({ _error: 'Invalid email address' });

    // check password
    if (validateForm.required(password))
      throw new SubmissionError({ _error: 'Password is required' });

    if (password !== confirmPassword)
      throw new SubmissionError({ _error: 'Confirm Password is not correct' });

    signUp({ username: name, email, password }, () => {
      history.push('/signin');
    })
  };

  render() {
    const {
      pristine,
      submitting,
      handleSubmit,
      account,
      error,
      submitFailed,
      submitSucceeded
    } = this.props;


    return (
      <FormStyled>
        <PageStyled>
          <TitleAccountStyled>Defect Tracking</TitleAccountStyled>
          <FormBlockStyled show>
            <form onSubmit={handleSubmit(this.handleSignUp)} id="SignUpForm">
              <FormGroupStyled>
                <LineFormStyled hasTitle>
                  <TitleFormStyled>Name</TitleFormStyled>
                  <InputField
                    type={INPUT_TEXT}
                    name={'name'}
                    placeholder={'Name'}
                    component={renderField}
                  />
                </LineFormStyled>
              </FormGroupStyled>
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
              <FormGroupStyled>
                <LineFormStyled hasTitle>
                  <TitleFormStyled>Confirm Password</TitleFormStyled>
                  <InputField
                    type={INPUT_PASSWORD}
                    name={'confirmPassword'}
                    placeholder={'Confirm Password'}
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
                  <Button hasBorder disabled>
                    <i className="fa fa-circle-o-notch fa-spin" />Loading
                  </Button>
                :
                  <Button
                    hasBorder
                    type="submit"
                    form="SignUpForm"
                    disabled={pristine}
                  >
                    Sign Up
                  </Button>
              }
              <Label><Link to="/signin">You already have account?</Link></Label>
            </form>
          </FormBlockStyled>
        </PageStyled>
      </FormStyled>
    );
  }
}

SignUp.propTypes = {
  history: PropTypes.object.isRequired,
  signUp: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  submitFailed: PropTypes.bool.isRequired,
  submitSucceeded: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  account: PropTypes.shape({
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  })
};

const mapStateToProps = state => ({ account: state.account });

const mapDispatchToProps = dispatch => bindActionCreators({ signUp: signUpUser }, dispatch);

export default reduxForm({
  form: 'SignUpForm',
})(connect(mapStateToProps, mapDispatchToProps)(SignUp));
