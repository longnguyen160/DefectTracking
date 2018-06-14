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
import { ICONS, MODAL_TYPE } from '../../../utils/enums';

class TopNavBar extends Component {

  logOut = () => {
    const { logOut, history } = this.props;

    logOut(() => {
      history.push('/signin');
    });
  };

  handleSelectProject = (project) => {
    const { selectProject, history } = this.props;

    selectProject(project);
    history.push(`/project/${project.id}/backlog`);
  };

  render() {
    const { user, openModal, projects, selectedProject } = this.props;

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
            <HeaderMainItemsStyled info create hover>
              <i className="fa fa-plus" />
              <SubSelectStyled fixedWidth>
                <SubSelectListStyled onClick={() => openModal(MODAL_TYPE.CREATING_USER)}>
                  <span>Create user...</span>
                </SubSelectListStyled>
                <SubSelectListStyled onClick={() => openModal(MODAL_TYPE.CREATING_PROJECT)}>
                  <span>Create project...</span>
                </SubSelectListStyled>
                <SubSelectListStyled onClick={() => openModal(MODAL_TYPE.CREATING_ISSUE)}>
                  <span>Create issue...</span>
                </SubSelectListStyled>
              </SubSelectStyled>
            </HeaderMainItemsStyled>
            <HeaderMainItemsStyled info user hover>
              <span>
                <Image topNav src={user.profile && user.profile.avatarURL ? user.profile.avatarURL : '/images/default_avatar.jpg'}/>
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
                    <SubSelectListStyled key={project.id} onClick={() => this.handleSelectProject(project)}>
                      <span>{project.name}</span>
                    </SubSelectListStyled>
                  ))
                }
              </SubSelectStyled>
            </HeaderMainItemsStyled>
            <HeaderMainItemsStyled notification hover>
              <i className="fa fa-bell" />
              <span>21</span>
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
  selectProject: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  projects: state.project.projects,
  selectedProject: state.layout.selectedProject
});

export default connect(mapStateToProps, null)(TopNavBar);
