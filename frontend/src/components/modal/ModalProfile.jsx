import React from 'react';
import PropTypes from 'prop-types';
import Uppy from 'uppy/lib/core';
import Tus from 'uppy/lib/plugins/Tus';
import FileInput from 'uppy/lib/plugins/FileInput';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, SubmissionError } from 'redux-form';
import Modal from './Modal';
import {
  ModalHeaderStyled,
  ModalHeaderTitleStyled,
  ModalContentStyled,
  ModalLineStyled,
  ModalLineContentStyled,
  ModalLineTitleStyled,
  ModalBodyStyled
} from '../../stylesheets/Modal';
import { Image, LineFormStyled, TextErrorStyled } from '../../stylesheets/GeneralStyled';
import { INPUT_TEXT } from '../../utils/enums';
import { Button } from '../../stylesheets/Button';
import { validateForm } from '../../utils/ultis';
import InputField from '../form/InputField';
import { updateProfile } from '../../modules/account/actions/update';

class ModalProfile extends React.Component {

  state = {
    avatarURL: null
  };

  componentDidMount() {
    const { user, change } = this.props;

    if (user.profile) {
      change('firstName', user.profile.firstName);
      change('lastName', user.profile.lastName);
      change('age', user.profile.age);
      change('phone', user.profile.phone);
    }
    change('email', user.email);

    this.uppy = new Uppy({ debug: true })
      .use(Tus, { endpoint: 'https://master.tus.io/files/' })
      .use(FileInput, { target: this.avatar });
    this.uppy.on('complete', (result) => {
      this.setState({ avatarURL: result.successful[0].uploadURL });
    });

    document.querySelector('.uppy-FileInput-btn').innerHTML = 'Choose image';
  }

  componentWillUnmount() {
    this.uppy.close();
  }

  handleEditProfile = (values) => {
    const { updateProfile } = this.props;
    const { avatarURL } = this.state;

    if (validateForm.email(values.email)) {
      throw new SubmissionError({ _error: 'Invalid email address' });
    } else if (values.age && values.age.trim().length > 0 && validateForm.number(values.age) && (Number.parseInt(values.age) > 100)) {
      throw new SubmissionError({ _error: 'Invalid age' });
    } else if (values.phone && (values.phone.trim().length < 8 || values.phone.trim().length > 12) && validateForm.number(values.phone)) {
      throw new SubmissionError({ _error: 'Invalid phone number' });
    }

    updateProfile({
      firstName: values.firstName,
      lastName: values.lastName,
      age: values.age,
      phone: values.phone,
      avatarURL
    }, values.email);
  };

  render() {
    const { onClose, isOpen, handleSubmit, submitFailed, error, submitSucceeded, submitting, user } = this.props;
    const { avatarURL } = this.state;
    let url = '/images/default_avatar.jpg';

    if (user.profile && user.profile.avatarURL) {
      url = user.profile.avatarURL;
    }
    if (avatarURL) {
      url = avatarURL;
    }

    return (
      <Modal onClose={onClose} isOpen={isOpen} maxWidth={'500px'}>
        <ModalHeaderStyled>
          <ModalHeaderTitleStyled>
            <span>Profile</span>
          </ModalHeaderTitleStyled>
        </ModalHeaderStyled>
        <form onSubmit={handleSubmit(this.handleEditProfile)} id="EditProfileForm">
          <ModalBodyStyled>
            <ModalContentStyled>
              <LineFormStyled hasTitle image alignCenter innerRef={(e) => this.avatar = e}>
                <Image avatar src={url} />
              </LineFormStyled>
            </ModalContentStyled>
            <ModalContentStyled>
              <ModalLineStyled hasRows>
                <ModalLineContentStyled alignLeft>
                  <ModalLineTitleStyled>First Name</ModalLineTitleStyled>
                  <ModalLineTitleStyled fullInput>
                    <LineFormStyled>
                      <InputField
                        type={INPUT_TEXT}
                        name={'firstName'}
                        placeholder={'First name...'}
                        renderType={'input'}
                      />
                    </LineFormStyled>
                  </ModalLineTitleStyled>
                </ModalLineContentStyled>
                <ModalLineContentStyled alignLeft>
                  <ModalLineTitleStyled>Last Name</ModalLineTitleStyled>
                  <ModalLineTitleStyled fullInput>
                    <LineFormStyled>
                      <InputField
                        type={INPUT_TEXT}
                        name={'lastName'}
                        placeholder={'Last name...'}
                        renderType={'input'}
                      />
                    </LineFormStyled>
                  </ModalLineTitleStyled>
                </ModalLineContentStyled>
              </ModalLineStyled>
              <ModalLineStyled padding={'5px'}>
                <ModalLineContentStyled alignLeft>
                  <ModalLineTitleStyled>Email</ModalLineTitleStyled>
                  <ModalLineTitleStyled fullInput>
                    <LineFormStyled>
                      <InputField
                        type={INPUT_TEXT}
                        name={'email'}
                        placeholder={'Email...'}
                        renderType={'input'}
                      />
                    </LineFormStyled>
                  </ModalLineTitleStyled>
                </ModalLineContentStyled>
              </ModalLineStyled>
              <ModalLineStyled hasRows>
                <ModalLineContentStyled alignLeft>
                  <ModalLineTitleStyled>Age</ModalLineTitleStyled>
                  <ModalLineTitleStyled fullInput>
                    <LineFormStyled>
                      <InputField
                        type={INPUT_TEXT}
                        name={'age'}
                        placeholder={'Age...'}
                        renderType={'input'}
                      />
                    </LineFormStyled>
                  </ModalLineTitleStyled>
                </ModalLineContentStyled>
                <ModalLineContentStyled alignLeft>
                  <ModalLineTitleStyled>Phone Number</ModalLineTitleStyled>
                  <ModalLineTitleStyled fullInput>
                    <LineFormStyled>
                      <InputField
                        type={INPUT_TEXT}
                        name={'phone'}
                        placeholder={'Phone Number...'}
                        renderType={'input'}
                      />
                    </LineFormStyled>
                  </ModalLineTitleStyled>
                </ModalLineContentStyled>
              </ModalLineStyled>
              <ModalLineStyled>
                <ModalLineContentStyled>
                  {
                    ((submitSucceeded) || (submitFailed && error)) &&
                    <TextErrorStyled error={true}>
                      {error}
                    </TextErrorStyled>
                  }
                  {
                    submitting ?
                      <Button hasBorder btnModal disabled>
                        <i className="fa fa-circle-o-notch fa-spin" />Loading
                      </Button>
                    :
                      <Button type='submit' btnModal hasBorder>
                        Update
                      </Button>
                  }
                </ModalLineContentStyled>
              </ModalLineStyled>
            </ModalContentStyled>
          </ModalBodyStyled>
        </form>
      </Modal>
    );
  }
}

ModalProfile.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  updateProfile: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  submitFailed: PropTypes.bool.isRequired,
  submitSucceeded: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.layout.user,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  updateProfile: updateProfile
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'EditProfileForm'
})(ModalProfile));
