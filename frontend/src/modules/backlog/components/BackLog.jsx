import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Select from 'react-select';
import { DragDropContext } from 'react-beautiful-dnd';
import SockJsClient from "react-stomp";
import moment from 'moment';
import {
  ElementHeaderStyled,
  PageBoardItemStyled,
  PageBoardStyled,
  TitleElementStyled
} from '../../../stylesheets/GeneralStyled';
import {
  ListTableHeaderItemsStyled,
  ListTableHeaderStyled
} from '../../../stylesheets/Table';
import BacklogDetails from './BacklogDetails';
import { reorderMap } from '../../../utils/ultis';
import { Button } from '../../../stylesheets/Button';
import { loadProjectDetails, openModal } from '../../layout/actions/layout';
import { MODAL_TYPE, WEB_SOCKET_URL } from '../../../utils/enums';
import { loadAllPhases, resetPhase, updatePhaseIssuesList } from '../../phase/actions/phase';
import { updateBacklog } from '../actions/backlog';

class BackLog extends React.Component {

  constructor(props) {
    super(props);

    const { selectedProject } = props;

    this.state = {
      list: {
        backlog: selectedProject ? selectedProject.backlog : []
      }
    };
  }

  componentDidMount() {
    const { loadAllPhases, selectedProject } = this.props;

    if (selectedProject) {
      loadAllPhases(selectedProject.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { loadAllPhases, selectedProject, phases } = nextProps;

    if (selectedProject && !this.props.selectedProject) {
      const list = {
        backlog: selectedProject.backlog
      };

      this.setState({ list });
      loadAllPhases(selectedProject.id);
    }
    if (phases.length > 0 && JSON.stringify(phases) !== JSON.stringify(this.props.phases)) {
      let { list } = this.state;

      phases.map(phase => {
        list = Object.assign({}, list, {
          [phase.name]: phase.issueList
        });

        return null;
      });
      this.setState({ list });
    }
  }

  componentWillUnmount() {
    const { resetPhase } = this.props;

    resetPhase();
  }

  onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const { list } = this.state;
    const { selectedProject, updateBacklog, phases, updatePhaseIssuesList } = this.props;
    const updatedList = reorderMap(
      list,
      result.source,
      result.destination
    );

    this.setState({
      list: updatedList,
    });

    if (JSON.stringify(updatedList.backlog) !== JSON.stringify(selectedProject.backlog)) {
      updateBacklog(selectedProject.id, updatedList.backlog);
    }
    phases.map(phase => {
      if (JSON.stringify(phase.issueList) !== JSON.stringify(updatedList[phase.name])) {
        updatePhaseIssuesList(phase.id, updatedList[phase.name]);
      }
    });
  };

  onMessageReceive = (message) => {
    const { loadAllPhases, selectedProject, loadProjectDetails } = this.props;

    switch (message.message) {
      case 'Update backlog successfully':
        loadProjectDetails(selectedProject.id);
        break;

      default:
        loadAllPhases(selectedProject.id);
        break;
    }
  };

  render() {
    const { list } = this.state;
    const { openModal, phases } = this.props;

    return (
      <PageBoardStyled backlog>
        <PageBoardItemStyled>
          <Select
            isSearchable={false}
            placeholder={'Quick filter'}
            options={[
              { value: 'My Issue', label: 'One' },
              { value: 'All Issue', label: 'Two' }
            ]}
            classNamePrefix="react-select"
          />
        </PageBoardItemStyled>
        <DragDropContext onDragEnd={this.onDragEnd}>
          {
            phases.map(phase => (
              <PageBoardItemStyled key={phase.id}>
                <ElementHeaderStyled padding={'20px 0 0 0'}>
                  <TitleElementStyled noPadding flex={'0 0 85px'}>
                    {phase.name}
                  </TitleElementStyled>
                  <TitleElementStyled noPadding fontWeight={400} fontSize={'14px'} flex={1}>
                    {phase.issueList.length} Issues
                  </TitleElementStyled>
                </ElementHeaderStyled>
                <ElementHeaderStyled padding={'0 0 20px 0'}>
                  <TitleElementStyled noPadding fontWeight={400} fontSize={'13px'}>
                    {moment(phase.startDate).format('LLL')} - {moment(phase.endDate).format('LLL')}
                  </TitleElementStyled>
                </ElementHeaderStyled>
                <div>
                  <div>
                    <ListTableHeaderStyled>
                      <ListTableHeaderItemsStyled itemId>Issue</ListTableHeaderItemsStyled>
                      <ListTableHeaderItemsStyled issueName>Name</ListTableHeaderItemsStyled>
                      <ListTableHeaderItemsStyled priority>Priority</ListTableHeaderItemsStyled>
                    </ListTableHeaderStyled>
                    <BacklogDetails
                      listId={phase.name}
                      listType="card"
                      data={list[phase.name]}
                    />
                  </div>
                </div>
              </PageBoardItemStyled>
            ))
          }
          <PageBoardItemStyled activity>
            <ElementHeaderStyled padding={'20px 5px'}>
              <TitleElementStyled noPadding flex={'0 0 85px'}>
                New Issues
              </TitleElementStyled>
              <TitleElementStyled noPadding fontWeight={400} fontSize={'14px'}>
                {list.backlog.length} Issues
              </TitleElementStyled>
              <TitleElementStyled noPadding flex={'0'}>
                <Button hasBorder onClick={() => openModal(MODAL_TYPE.CREATING_PHASE)}>
                  Create Phase
                </Button>
              </TitleElementStyled>
            </ElementHeaderStyled>
            <div>
              <div>
                <ListTableHeaderStyled>
                  <ListTableHeaderItemsStyled itemId>Issue</ListTableHeaderItemsStyled>
                  <ListTableHeaderItemsStyled issueName>Name</ListTableHeaderItemsStyled>
                  <ListTableHeaderItemsStyled priority>Priority</ListTableHeaderItemsStyled>
                </ListTableHeaderStyled>
                <BacklogDetails
                  listId="backlog"
                  listType="card"
                  data={list.backlog}
                />
              </div>
            </div>
          </PageBoardItemStyled>
        </DragDropContext>
        <SockJsClient
          url={WEB_SOCKET_URL}
          topics={['/topic/phase', '/topic/projects']}
          onMessage={this.onMessageReceive}
          debug={true}
        />
      </PageBoardStyled>
    );
  }
}

BackLog.propTypes = {
  openModal: PropTypes.func.isRequired,
  loadAllPhases: PropTypes.func.isRequired,
  resetPhase: PropTypes.func.isRequired,
  loadProjectDetails: PropTypes.func.isRequired,
  updateBacklog: PropTypes.func.isRequired,
  updatePhaseIssuesList: PropTypes.func.isRequired,
  phases: PropTypes.array.isRequired,
  selectedProject: PropTypes.object
};

const mapStateToProps = state => ({
  phases: state.phase.phases,
  selectedProject: state.layout.selectedProject
});

const mapDispatchToProps = dispatch => bindActionCreators({
  openModal: openModal,
  loadAllPhases: loadAllPhases,
  resetPhase: resetPhase,
  loadProjectDetails: loadProjectDetails,
  updateBacklog: updateBacklog,
  updatePhaseIssuesList: updatePhaseIssuesList
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BackLog);
