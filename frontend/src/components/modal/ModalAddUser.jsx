import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Modal from './Modal';
import {
  ModalContentStyled,
  ModalHeaderStyled,
  ModalHeaderTitleStyled,
  ModalLineContentStyled, ModalLineStyled, ModalLineTitleStyled
} from '../../stylesheets/Modal';
import {LineFormStyled, TextErrorStyled} from '../../stylesheets/GeneralStyled';
import { Button } from '../../stylesheets/Button';
import { loadAllUsers } from '../../modules/account/actions/account';
import { USER_ROLE_IN_PROJECT } from '../../utils/enums';
import CustomOptionForSelect from '../form/CustomOptionForSelect';
import CustomValueForSelect from '../form/CustomValueForSelect';
import { addUserToProject } from '../../modules/projects/actions/usersInProject';

class ModalAddUser extends React.Component {

  state = {
    selectedUser: null,
    selectedRole: null
  };

  optionComponent = () => {
    return (props) => (
      <CustomOptionForSelect
        name={'user'}
        {...props}
      />
    );
  };

  valueComponent = () => {
    return (props) => (
      <CustomValueForSelect
        name={'user'}
        {...props}
      />
    );
  };

  loadUsers = (input) => {
    const { loadAllUsers, selectedProject } = this.props;

    if (input.length > 0) {
      loadAllUsers(input, selectedProject.id);
    }
  };

  handleSelectOnChange = (type, value) => {
    if (type === 'user') {
      this.setState({ selectedUser: value });
    } else {
      this.setState({ selectedRole: value });
    }
  };

  handleAddUserToProject = () => {
    const { selectedUser, selectedRole } = this.state;
    const { addUserToProject, selectedProject, onClose } = this.props;

    if (selectedUser && selectedRole) {
      addUserToProject({
        userId: selectedUser.value,
        role: selectedRole.value,
        projectId: selectedProject.id
      }, () => {
        onClose();
      });
    }
  };

  render() {
    const { onClose, isOpen, users, isLoading, error } = this.props;
    const { selectedUser, selectedRole } = this.state;

    return (
      <Modal onClose={onClose} isOpen={isOpen} maxWidth={'500px'} noScroll={true}>
        <ModalHeaderStyled>
          <ModalHeaderTitleStyled>
            <span>Add member</span>
          </ModalHeaderTitleStyled>
        </ModalHeaderStyled>
        <ModalContentStyled>
          <ModalLineStyled hasRows>
            <ModalLineContentStyled alignLeft>
              <ModalLineTitleStyled>User</ModalLineTitleStyled>
              <LineFormStyled>
                <Select
                  placeholder={'Username or email'}
                  options={users}
                  value={selectedUser}
                  onInputChange={this.loadUsers}
                  onChange={(value) => this.handleSelectOnChange('user', value)}
                  optionComponent={this.optionComponent()}
                  valueComponent={this.valueComponent()}
                />
              </LineFormStyled>
            </ModalLineContentStyled>
            <ModalLineContentStyled alignLeft>
              <ModalLineTitleStyled>Role</ModalLineTitleStyled>
              <LineFormStyled>
                <Select
                  placeholder={'Role'}
                  options={USER_ROLE_IN_PROJECT}
                  value={selectedRole}
                  onChange={(value) => this.handleSelectOnChange('role', value)}
                />
              </LineFormStyled>
            </ModalLineContentStyled>
          </ModalLineStyled>
          <ModalLineStyled>
            <ModalLineContentStyled>
              {
                error &&
                  <TextErrorStyled error={true}>
                    {error}
                  </TextErrorStyled>
              }
              {
                isLoading ?
                  <Button hasBorder disabled>
                    <i className="fa fa-circle-o-notch fa-spin" />Loading
                  </Button>
                :
                  <Button
                    type='submit'
                    btnModal
                    hasBorder
                    onClick={() => this.handleAddUserToProject()}
                  >
                    Add
                  </Button>
              }
            </ModalLineContentStyled>
          </ModalLineStyled>
        </ModalContentStyled>
      </Modal>
    );
  }
}

ModalAddUser.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  loadAllUsers: PropTypes.func.isRequired,
  addUserToProject: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired,
  selectedProject: PropTypes.object,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
};

const mapStateToProps = state => ({
  users: state.account.users.map(user => ({
    value: user.id,
    label: user.username,
    email: user.email,
    avatarURL: user.profile && user.profile.avatarURL
  })),
  isLoading: state.project.isLoading,
  error: state.project.error,
  selectedProject: state.layout.selectedProject
});

const mapDispatchToProps = dispatch => bindActionCreators({
  loadAllUsers: loadAllUsers,
  addUserToProject: addUserToProject
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ModalAddUser);
