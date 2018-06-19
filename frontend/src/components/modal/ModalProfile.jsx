import React from 'react';
import PropTypes from 'prop-types';
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
import { INPUT_TEXT, FILE_BASE_URL } from '../../utils/enums';
import { Button } from '../../stylesheets/Button';
import { validateForm } from '../../utils/ultis';
import InputField from '../form/InputField';
import { updateProfile } from '../../modules/account/actions/update';
import { loadFile, resetState, uploadFile } from '../../modules/file/actions/file';

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
  }

  componentWillReceiveProps(nextProps) {
    const { fileIds } = nextProps;

    if (fileIds.length > 0) {
      this.setState({ avatarURL: FILE_BASE_URL + fileIds[0] });
    }
  }

  componentWillUnmount() {
    const { resetState } = this.props;

    resetState();
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

  handleOpenFileDialog = () => {
    this.inputFile.click();
  };

  handleChangeFile = (e) => {
    const { uploadFile } = this.props;
    const file = new FormData();

    file.append("files", e.target.files[0]);
    uploadFile(file);
  };

  render() {
    const { onClose, isOpen, handleSubmit, submitFailed, error, submitSucceeded, submitting, user, account } = this.props;
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
                <Button
                  hasBorder
                  no
                  small
                  autoHeight
                  autoWidth
                  onClick={this.handleOpenFileDialog}
                  type="button"
                >
                  Choose Image
                </Button>
                <input
                  type="file"
                  style={{display: 'none'}}
                  ref={(e) => this.inputFile = e}
                  onChange={this.handleChangeFile}
                />
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
  uploadFile: PropTypes.func.isRequired,
  loadFile: PropTypes.func.isRequired,
  resetState: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  updateProfile: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  submitFailed: PropTypes.bool.isRequired,
  submitSucceeded: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  fileIds: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  account: PropTypes.shape({
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  })
};

const mapStateToProps = state => ({
  user: state.layout.user,
  account: state.account,
  fileIds: state.file.fileIds,
  fileData: state.file.fileData
});

const mapDispatchToProps = dispatch => bindActionCreators({
  updateProfile: updateProfile,
  uploadFile: uploadFile,
  loadFile: loadFile,
  resetState: resetState
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'EditProfileForm'
})(ModalProfile));
