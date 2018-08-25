import React from 'react';
import PropTypes from 'prop-types';
import LinesEllipsis from 'react-lines-ellipsis';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SockJsClient from "react-stomp";
import {
  PageCustomStyled,
  ElementStyled,
  TitleElementStyled,
  DescriptionElementStyled,
  PageBoardItemStyled,
  PageBoardStyled,
  ElementHeaderStyled
} from '../../../stylesheets/GeneralStyled';
import { loadProjectDetails, openModal, selectProject } from '../../layout/actions/layout';
import { ICONS, MODAL_TYPE, PROJECT_STATUS, ROLES, WEB_SOCKET_URL } from '../../../utils/enums';
import { loadAllProjects, selectProjectType } from '../actions/project';
import Icon from '../../../components/icon/Icon';

class Projects extends React.Component {

  componentWillMount() {
    const { loadAllProjects } = this.props;

    loadAllProjects();
  }

  onMessageReceive = () => {
    const { loadAllProjects } = this.props;

    loadAllProjects();
  };

  handleSelectProject = (projectId) => {
    const { loadProjectDetails, history, selectProject } = this.props;

    loadProjectDetails(projectId, (project) => selectProject(project));
    history.push(`/project/${projectId}/dashboard`);
  };

  handleCreateProject = (title) => {
    const { openModal, selectProjectType } = this.props;

    selectProjectType(title);
    openModal(MODAL_TYPE.CREATING_PROJECT);
  };

  renderProjects = (projects, icon, title) => (
    <PageBoardItemStyled margin={'20px'}>
      <ElementHeaderStyled>
        <Icon icon={icon} color={'#1A1A1A'} width={30} height={30}/>
        <TitleElementStyled noPadding fontSize={'20px'}>
          {title}
        </TitleElementStyled>
      </ElementHeaderStyled>
      <PageCustomStyled margin={'0'}>
        {
          projects.map(project => (
            <ElementStyled key={project.id} onClick={() => this.handleSelectProject(project.id)}>
              <TitleElementStyled>
                {project.name}
              </TitleElementStyled>
              <DescriptionElementStyled>
                <LinesEllipsis
                  text={project.description}
                  maxLine='2'
                  ellipsis='...'
                  trimRight
                  basedOn='letters'
                />
              </DescriptionElementStyled>
            </ElementStyled>
          ))
        }
        {
          this.props.user && this.props.user.roles.includes(ROLES.ADMIN) &&
            <ElementStyled created onClick={() => this.handleCreateProject(title.toLowerCase())}>
              <TitleElementStyled>
                Create new project...
              </TitleElementStyled>
            </ElementStyled>
        }
      </PageCustomStyled>
    </PageBoardItemStyled>
  );

  render() {
    const { project: { projects } } = this.props;
    const privateProject = projects.filter(project => project.status === PROJECT_STATUS.PRIVATE);
    const publicProject = projects.filter(project => project.status === PROJECT_STATUS.PUBLIC);

    return (
      <PageBoardStyled backlog>
        {this.renderProjects(privateProject, ICONS.PRIVATE, 'Private')}
        {this.renderProjects(publicProject, ICONS.PUBLIC, 'Public')}
        <SockJsClient
          url={WEB_SOCKET_URL}
          topics={['/topic/projects']}
          onMessage={this.onMessageReceive}
          debug={true}
        />
      </PageBoardStyled>
    );
  }
}

Projects.propTypes = {
  openModal: PropTypes.func.isRequired,
  loadProjectDetails: PropTypes.func.isRequired,
  loadAllProjects: PropTypes.func.isRequired,
  selectProject: PropTypes.func.isRequired,
  selectProjectType: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  user: PropTypes.object,
  project: PropTypes.shape({
    projects: PropTypes.array.isRequired,
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  })
};

const mapStateToProps = state => ({
  project: state.project,
  user: state.layout.user
});

const mapDispatchToProps = dispatch => bindActionCreators({
  openModal: openModal,
  loadProjectDetails: loadProjectDetails,
  selectProject: selectProject,
  loadAllProjects: loadAllProjects,
  selectProjectType: selectProjectType
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
