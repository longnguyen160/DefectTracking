import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { bindActionCreators } from 'redux';
import axios from 'axios';
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
import { INPUT_EMAIL, INPUT_PASSWORD } from '../../../utils/enums';
import { validateForm } from '../../../utils/ultis';

export default class SignUp extends Component {

  constructor(props) {
    super(props);
    const { error } = this.props;
    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      error: error,
      isLoading: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { error } = nextProps;
    this.setState({ error });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.error !== this.props.error)
      this.setState({ error: this.props.error });
  }

  handleKeyPress = (e) => {
    if (e.charCode === 13 && !this.state.isLoading) {
      this.createUser();
    }
  };

  handleInput = (type, e) => {
    const update = {};

    update[type] = e.target.value;
    this.setState(update);
  };

  checkEmail = (email) => {
    return CHECK.IS_EMAIL.test(email);
  };

  createUser = () => {
    const { name, email, password, confirmPassword } = this.state;
    const { history } = this.props;

    // check name
    if (name.trim() === '')
      return this.setState({error: 'Name is required.'});

    // check email
    if (!this.checkEmail(email))
      return this.setState({error: 'Email invalid.'});

    this.setState({ error: null });
    // check password
    if (password.trim() === '')
      return this.setState({error: 'Password is required.'});

    this.setState({ error: null });

    if (password !== confirmPassword)
      return this.setState({ error: 'Password does not match the confirm password.' });

    this.setState({ error: null, isLoading: true });

    axios.post('http://localhost:8080/auth/signup', { username: name, email, password }).then(res => {
      this.setState({ isLoading: false });
      console.log(res.data);
      history.push('/signin');
    });
  };

  render() {
    const { error } = this.state;

    return (
      <FormStyled>
        <PageStyled>
          <TitleAccountStyled>Defect Tracking</TitleAccountStyled>
          <FormBlockStyled show>
            <FormGroupStyled>
              <LineFormStyled hasTitle>
                <TitleFormStyled>Name</TitleFormStyled>
                <Input
                  onChange={(e) => this.handleInput('name', e)}
                  onKeyPress={this.handleKeyPress}
                  type='text'
                />
              </LineFormStyled>
            </FormGroupStyled>
            <FormGroupStyled>
              <LineFormStyled hasTitle>
                <TitleFormStyled>Email</TitleFormStyled>
                <Input
                  onChange={(e) => this.handleInput('email', e)}
                  onKeyPress={this.handleKeyPress}
                  type='email'
                />
              </LineFormStyled>
            </FormGroupStyled>
            <FormGroupStyled>
              <LineFormStyled hasTitle>
                <TitleFormStyled>Password</TitleFormStyled>
                <Input
                  onChange={(e) => this.handleInput('password', e)}
                  onKeyPress={this.handleKeyPress}
                  type='password'
                />
              </LineFormStyled>
            </FormGroupStyled>
            <FormGroupStyled>
              <LineFormStyled hasTitle>
                <TitleFormStyled>Confirm Password</TitleFormStyled>
                <Input
                  onChange={(e) => this.handleInput('confirmPassword', e)}
                  onKeyPress={this.handleKeyPress}
                  type='password'
                />
              </LineFormStyled>
            </FormGroupStyled>
            {
              error ?
                <TextErrorStyled error={true}>
                  {error}
                </TextErrorStyled>
                : null
            }
            {
              this.state.isLoading ?
                <Button hasBorder disabled>
                  <i className="fa fa-circle-o-notch fa-spin" />Loading
                </Button> :
                <Button hasBorder onClick={this.createUser.bind(this)}>Sign Up</Button>
            }
            <Label><Link to="/signin">You already have account?</Link></Label>
          </FormBlockStyled>
        </PageStyled>
      </FormStyled>
    );
  }
}
