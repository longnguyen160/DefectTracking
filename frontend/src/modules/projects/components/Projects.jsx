import React from 'react';
import PropTypes from 'prop-types';
import LinesEllipsis from 'react-lines-ellipsis';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PageCustomStyled, ElementStyled, TitleElementStyled, DescriptionElementStyled } from '../../../stylesheets/GeneralStyled';
import { openModal } from '../../layout/actions/layout';
import { MODAL_TYPE } from '../../../utils/enums';
import { loadAllProjects } from '../actions/project';

class Projects extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedProject: '',
      priority: ''
    };
  }

  componentWillMount() {
    const { loadAllProjects } = this.props;

    loadAllProjects();
  }

  render() {
    const { openModal, project: { projects } } = this.props;

    return (
      <PageCustomStyled>
        {
          projects.map(project => (
            <ElementStyled key={project.id}>
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
      </PageCustomStyled>
    );
  }
}

Projects.propTypes = {
  openModal: PropTypes.func.isRequired,
  loadAllProjects: PropTypes.func.isRequired,
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
  loadAllProjects: loadAllProjects
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
