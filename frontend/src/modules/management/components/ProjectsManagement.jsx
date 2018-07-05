import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SockJsClient from "react-stomp";
import ReactTable from "react-table";
import {
  ElementHeaderStyled,
  Image,
  PageBoardStyled,
  TableBlockStyled,
  TitleElementStyled
} from '../../../stylesheets/GeneralStyled';
import { Button } from '../../../stylesheets/Button';
import { loadProjectDetails, openModal } from '../../layout/actions/layout';
import { loadAllProjects } from '../../projects/actions/project';
import { WEB_SOCKET_URL } from '../../../utils/enums';

class ProjectsManagement extends React.Component {

  componentWillMount() {
    const { loadAllProjects } = this.props;

    loadAllProjects();
  }

  onMessageReceive = () => {
    const { loadAllProjects } = this.props;

    loadAllProjects();
  };

  render() {
    const styleColumn = {
      style: {
        display: 'flex',
        alignItems: 'center',
        fontSize: '13px'
      },
      headerStyle: {
        textAlign: 'left'
      }
    };
    const columns = [
      {
        Header: 'Name',
        accessor: 'name',
        ...styleColumn,
      },
      {
        Header: 'Project Manager',
        accessor: 'managers',
        ...styleColumn,
        Cell: row => (
          <TableBlockStyled alignLeft>
            <Image topNav src={row.value && row.value.avatarURL ? row.value.avatarURL : '/images/default_avatar.jpg'}/>
            {row.value && row.value.username}
          </TableBlockStyled>
        )
      },
      {
        Header: 'Project Category',
        accessor: 'category',
        ...styleColumn,
      },
      {
        Header: 'Action',
        ...styleColumn,
        Cell: row => (
          <TableBlockStyled alignLeft>
            <Button small hasBorder remove>
              Close
            </Button>
          </TableBlockStyled>
        )
      },
    ];
    const { projects } = this.props;

    return (
      <PageBoardStyled backlog>
        <ElementHeaderStyled padding={'0'}>
          <TitleElementStyled noPadding fontSize={'20px'}>
            Projects
          </TitleElementStyled>
        </ElementHeaderStyled>
        <ReactTable
          data={projects}
          columns={columns}
          defaultPageSize={10}
          className="-striped -highlight"
        />
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

ProjectsManagement.propTypes = {
  openModal: PropTypes.func.isRequired,
  loadAllProjects: PropTypes.func.isRequired,
  loadProjectDetails: PropTypes.func.isRequired,
  projects: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  projects: state.project.projects
});

const mapDispatchToProps = dispatch => bindActionCreators({
  openModal: openModal,
  loadProjectDetails: loadProjectDetails,
  loadAllProjects: loadAllProjects
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsManagement);
