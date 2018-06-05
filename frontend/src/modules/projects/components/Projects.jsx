import React from 'react';
import PropTypes from 'prop-types';
import LinesEllipsis from 'react-lines-ellipsis';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SockJsClient from "react-stomp";
import { PageCustomStyled, ElementStyled, TitleElementStyled, DescriptionElementStyled } from '../../../stylesheets/GeneralStyled';
import { openModal, selectProject } from '../../layout/actions/layout';
import { MODAL_TYPE, WEB_SOCKET_URL } from '../../../utils/enums';
import { loadAllProjects } from '../actions/project';

class Projects extends React.Component {

  componentWillMount() {
    const { loadAllProjects } = this.props;

    loadAllProjects();
  }

  onMessageReceive = () => {
    const { loadAllProjects } = this.props;

    loadAllProjects();
  };

  handleSelectProject = (project) => {
    const { selectProject, history } = this.props;

    selectProject(project);
    history.push(`/${project.id}/backlog`);
  };

  render() {
    const { openModal, project: { projects } } = this.props;

    return (
      <PageCustomStyled>
        {
          projects.map(project => (
            <ElementStyled key={project.id} onClick={() => this.handleSelectProject(project)}>
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
        <ElementStyled created onClick={() => openModal(MODAL_TYPE.CREATING_PROJECT)}>
          <TitleElementStyled>
            Create new project...
          </TitleElementStyled>
        </ElementStyled>
        <SockJsClient
          url={WEB_SOCKET_URL}
          topics={['/topic/projects']}
          onMessage={this.onMessageReceive}
          debug={true}
        />
      </PageCustomStyled>
    );
  }
}

Projects.propTypes = {
  openModal: PropTypes.func.isRequired,
  loadAllProjects: PropTypes.func.isRequired,
  selectProject: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  project: PropTypes.shape({
    projects: PropTypes.array.isRequired,
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  })
};

const mapStateToProps = state => ({
  project: state.project
});

const mapDispatchToProps = dispatch => bindActionCreators({
  openModal: openModal,
  loadAllProjects: loadAllProjects,
  selectProject: selectProject
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
