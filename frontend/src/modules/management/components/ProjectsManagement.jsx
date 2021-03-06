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
  LabelStyled,
  TitleElementStyled,
  PageCustomStyled
} from '../../../stylesheets/GeneralStyled';
import { Button } from '../../../stylesheets/Button';
import { loadProjectDetails, openModal } from '../../layout/actions/layout';
import { FILE_BASE_URL, MODAL_TYPE, WEB_SOCKET_URL, DEFAULT_AVATAR } from '../../../utils/enums';
import { loadAllProjectsForManagement } from '../actions/project';
import LoadingComponent from '../../../components/table/LoadingComponent';
import NoDataProps from '../../../components/table/NoDataProps';
import NoDataComponent from '../../../components/table/NoDataComponent';

class ProjectsManagement extends React.Component {

  componentWillMount() {
    const { loadAllProjects } = this.props;

    loadAllProjects();
  }

  handleOpenModal = (projectId) => {
    const { openModal, loadProjectDetails } = this.props;

    loadProjectDetails(projectId);
    openModal(MODAL_TYPE.CREATING_PROJECT);
  };

  onMessageReceive = () => {
    const { loadAllProjects } = this.props;

    loadAllProjects();
  };

  render() {
    const { openModal } = this.props;
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
        Cell: row => (
          <TableBlockStyled
            alignLeft
            onClick={() => this.handleOpenModal(row.original.id)}
          >
            {row.value}
          </TableBlockStyled>
        )
      },
      {
        Header: 'Status',
        accessor: 'status',
        ...styleColumn
      },
      {
        Header: 'Project Managers',
        accessor: 'managers',
        ...styleColumn,
        Cell: row => (
          row.value.map(manager => (
            <TableBlockStyled alignLeft key={manager.id}>
              <Image topNav src={manager.avatarURL ? FILE_BASE_URL + manager.avatarURL : FILE_BASE_URL + DEFAULT_AVATAR}/>
              {manager.username}
            </TableBlockStyled>
          ))
        )
      },
      {
        Header: 'Project Categories',
        accessor: 'categories',
        ...styleColumn,
        Cell: row => (
          <PageCustomStyled margin={'0'}>
            {
              row.value.map(category => (
                <TableBlockStyled alignLeft key={category.id}>
                  <LabelStyled
                    background={category.background}
                    color={category.color}
                  >
                    {category.name}
                  </LabelStyled>
                </TableBlockStyled>
              ))
            }
          </PageCustomStyled>
        )
      },
      {
        Header: '',
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
    const { projects, loading } = this.props;

    return (
      <PageBoardStyled backlog>
        <ElementHeaderStyled padding={'0'}>
          <TitleElementStyled noPadding fontSize={'20px'}>
            Projects
          </TitleElementStyled>
          <Button autoWidth hasBorder right onClick={() => openModal(MODAL_TYPE.CREATING_PROJECT)}>
            Create Project
          </Button>
        </ElementHeaderStyled>
        <ReactTable
          data={projects}
          columns={columns}
          loading={loading}
          LoadingComponent={LoadingComponent}
          getNoDataProps={() => NoDataProps({ loading })}
          NoDataComponent={NoDataComponent}
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
  projects: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  projects: state.management.projectList,
  loading: state.management.isLoading
});

const mapDispatchToProps = dispatch => bindActionCreators({
  openModal: openModal,
  loadProjectDetails: loadProjectDetails,
  loadAllProjects: loadAllProjectsForManagement,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsManagement);
