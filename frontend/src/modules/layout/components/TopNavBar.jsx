import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import SearchBox from './SearchBox';
import {
  HeaderMainBlockStyled,
  HeaderMainItemsStyled,
  HeaderMainStyled,
  LogoStyled,
  SubSelectListStyled,
  SubSelectStyled
} from '../../../stylesheets/TopNavBar';
import { FilterBoxWrapperStyled , Image} from '../../../stylesheets/GeneralStyled';
import Icon from '../../../components/icon/Icon';
import { FILE_BASE_URL, ICONS, MODAL_TYPE, ROLES, DEFAULT_AVATAR } from '../../../utils/enums';
import Notification from '../../notification/components/Notification';

class TopNavBar extends Component {

  state = {
    isOpen: false
  };

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  logOut = () => {
    const { logOut, history } = this.props;

    logOut(() => {
      history.push('/signin');
    });
  };

  handleClickOutside = (event) => {
    if (this.wrapper && !this.wrapper.contains(event.target)) {
      this.setState({ isOpen: false });
    }
  };

  handleSelectProject = (projectId) => {
    const { loadProjectDetails, history, selectProject } = this.props;

    loadProjectDetails(projectId, (project) => selectProject(project));
    history.push(`/project/${projectId}/dashboard`);
  };

  handleNotification = () => {
    const { isOpen } = this.state;
    const { setAllNotificationsToSeen, resetNotificationCount } = this.props;

    resetNotificationCount();
    setAllNotificationsToSeen();
    this.setState({ isOpen: !isOpen });
  };

  closeNotification = () => {
    this.setState({ isOpen: false });
  };

  render() {
    const { user, openModal, projects, selectedProject, notificationCount, history } = this.props;
    const { isOpen } = this.state;

    if (user) {
      return (
        <HeaderMainStyled>
          <HeaderMainBlockStyled>
            <HeaderMainItemsStyled logo>
              <LogoStyled>
                <Link to='/'>Defect Tracking</Link>
              </LogoStyled>
            </HeaderMainItemsStyled>
            <SearchBox />
          </HeaderMainBlockStyled>
          <HeaderMainBlockStyled hasAuto>
            {
              user && ((user.roles.length === 1 && !user.roles.includes(ROLES.USER)) || (user.roles.includes(ROLES.USER) && user.roles.length > 1 && !user.roles.includes(ROLES.DEVELOPER))) &&
                <HeaderMainItemsStyled info create hover>
                  <i className="fa fa-plus"/>
                  <SubSelectStyled fixedWidth>
                    {
                      user.roles.includes(ROLES.ADMIN) &&
                      <SubSelectListStyled onClick={() => openModal(MODAL_TYPE.CREATING_USER)}>
                        <span>Create user...</span>
                      </SubSelectListStyled>
                    }
                    {
                      user.roles.includes(ROLES.ADMIN) &&
                      <SubSelectListStyled onClick={() => openModal(MODAL_TYPE.CREATING_PROJECT)}>
                        <span>Create project...</span>
                      </SubSelectListStyled>
                    }
                    <SubSelectListStyled onClick={() => openModal(MODAL_TYPE.CREATING_ISSUE)}>
                      <span>Create issue...</span>
                    </SubSelectListStyled>
                  </SubSelectStyled>
                </HeaderMainItemsStyled>
            }
            <HeaderMainItemsStyled info user hover>
              <span>
                <Image topNav src={user.profile && user.profile.avatarURL ? FILE_BASE_URL + user.profile.avatarURL : FILE_BASE_URL + DEFAULT_AVATAR}/>
                <span>{user ? user.username : null}</span>
              </span>
              <i className="fa fa-chevron-down" />
              <SubSelectStyled>
                <SubSelectListStyled onClick={() => openModal(MODAL_TYPE.PROFILE)}>
                  <FilterBoxWrapperStyled>
                    <Icon icon={ICONS.USER} color={'#1A1A1A'} width={20} height={20}/>
                    <span>Profile</span>
                  </FilterBoxWrapperStyled>
                </SubSelectListStyled>
                <SubSelectListStyled onClick={this.logOut}>
                  <Link to='/signin'>
                    <FilterBoxWrapperStyled>
                      <Icon icon={ICONS.LOGOUT} color={'#1A1A1A'} width={20} height={20}/>
                      <spam>Logout</spam>
                    </FilterBoxWrapperStyled>
                  </Link>
                </SubSelectListStyled>
              </SubSelectStyled>
            </HeaderMainItemsStyled>
            <HeaderMainItemsStyled info project hover>
              <span>
                <Icon icon={ICONS.PROJECT} color={'#fff'} width={20} height={20} />
                <span>{selectedProject ? selectedProject.name : 'Project'}</span>
              </span>
              <SubSelectStyled fixedWidth>
                {
                  projects.map(project => (
                    <SubSelectListStyled key={project.id} onClick={() => this.handleSelectProject(project.id)}>
                      <span>{project.name}</span>
                    </SubSelectListStyled>
                  ))
                }
              </SubSelectStyled>
            </HeaderMainItemsStyled>
            <HeaderMainItemsStyled
              notification
              hover
              innerRef={(node) => this.wrapper = node}
            >
              <i className="fa fa-bell" onClick={this.handleNotification} />
              {
                notificationCount > 0 &&
                  <span>{notificationCount}</span>
              }
              {
                isOpen && <Notification history={history} closeNotification={this.closeNotification} />
              }
            </HeaderMainItemsStyled>
          </HeaderMainBlockStyled>
        </HeaderMainStyled>
      );
    }
    return null;
  }
}

TopNavBar.propTypes = {
  user: PropTypes.object,
  logOut: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  openModal: PropTypes.func.isRequired,
  projects: PropTypes.array.isRequired,
  selectedProject: PropTypes.object,
  notificationCount: PropTypes.number.isRequired,
  loadProjectDetails: PropTypes.func.isRequired,
  selectProject: PropTypes.func.isRequired,
  resetNotificationCount: PropTypes.func.isRequired,
  setAllNotificationsToSeen: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  projects: state.project.projects,
  selectedProject: state.layout.selectedProject
});

export default connect(mapStateToProps, null)(TopNavBar);
