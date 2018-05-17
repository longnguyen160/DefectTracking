import React from 'react';
import { Link } from 'react-router-dom';
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
} from '../stylesheets/GeneralStyled';
import { Button } from '../stylesheets/Button';

export default class SignIn extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isLoading: false,
      error: null
    };
  }

  handleKeyPress = (e) => {
    if (e.charCode === 13)
      this.login();
  };

  login = () => {
    const email = this.email.value;
    const password = this.password.value;
    const { history } = this.props;

    this.setState({ isLoading: true });
    axios
      .post('http://localhost:8080/auth/signin', { email, password })
      .then(res => {
        this.setState({ isLoading: false });

        if (res.data) {
          history.push('/');
        } else {
          this.setState({ error: 'Invalid email or password' });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { isLoading, error } = this.state;

    return (
      <FormStyled>
        <PageStyled>
          <TitleAccountStyled>Defect Tracking</TitleAccountStyled>
          <FormBlockStyled show>
            <FormGroupStyled>
              <LineFormStyled hasTitle>
                <TitleFormStyled>Email</TitleFormStyled>
                <Input
                  onKeyPress={this.handleKeyPress}
                  type='email'
                  placeholder="Email"
                  innerRef={(element) => this.email = element}
                />
              </LineFormStyled>
            </FormGroupStyled>
            <FormGroupStyled>
              <LineFormStyled hasTitle>
                <TitleFormStyled>Password</TitleFormStyled>
                <Input
                  onKeyPress={this.handleKeyPress}
                  type='password'
                  placeholder="Password"
                  innerRef={(element) => this.password = element}
                />
              </LineFormStyled>
            </FormGroupStyled>
            <TextErrorStyled error={true}>
              {
                error ? error : null
              }
            </TextErrorStyled>

            {
              isLoading ?
                <Button hasBorder disabled>
                  <i className="fa fa-circle-o-notch fa-spin" />Loading
                </Button> :
                <Button hasBorder onClick={this.login}>Sign In</Button>
            }
            <Label><Link to='/signup'>Create Account</Link></Label>
          </FormBlockStyled>
        </PageStyled>
      </FormStyled>

    );
  }
}
