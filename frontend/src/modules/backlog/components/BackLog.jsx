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
import { openModal } from '../../layout/actions/layout';
import { MODAL_TYPE, WEB_SOCKET_URL } from '../../../utils/enums';
import { loadAllPhases } from '../../phase/actions/phase';

class BackLog extends React.Component {

  constructor(props) {
    super(props);

    const object = {
      id: 'ISSUE-1',
      name: 'As a developer, I\'d like to update story status during the sprint >> Click the Active sprints link at the top right of the screen to go to the Active sprints where the current Phase\'s items can be updated',
      priority: 'High'
    };
    const b = [];
    const a = [];

    for (let i = 1; i <= 10; i+=1) {
      a.push({
        ...object,
        id: `ISSUE-${i}`
      });
    }

    for (let i = 11; i <= 20; i+=1) {
      b.push({
        ...object,
        id: `ISSUE-${i}`
      });
    }

    this.state = {
      list: {
        a,
        b
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
    const { loadAllPhases, selectedProject } = nextProps;

    if (selectedProject && !this.props.selectedProject) {
      loadAllPhases(selectedProject.id);
    }
  }

  onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const { list } = this.state;

    this.setState({
      list: reorderMap(
        list,
        result.source,
        result.destination
      ),
    });
  };

  onMessageReceive = () => {
    const { loadAllPhases, selectedProject } = this.props;

    loadAllPhases(selectedProject.id);
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
                      listId="a"
                      listType="card"
                      data={list.a}
                    />
                  </div>
                </div>
              </PageBoardItemStyled>
            ))
          }
          <PageBoardItemStyled activity>
            <ElementHeaderStyled padding={'20px 5px'}>
              <TitleElementStyled noPadding flex={'0 0 85px'}>
                Waiting
              </TitleElementStyled>
              <TitleElementStyled noPadding fontWeight={400} fontSize={'14px'}>
                14 Issues
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
                  data={list.b}
                />
              </div>
            </div>
          </PageBoardItemStyled>
        </DragDropContext>
        <SockJsClient
          url={WEB_SOCKET_URL}
          topics={['/topic/phase']}
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
  phases: PropTypes.array.isRequired,
  selectedProject: PropTypes.object
};

const mapStateToProps = state => ({
  phases: state.phase.phases,
  selectedProject: state.layout.selectedProject
});

const mapDispatchToProps = dispatch => bindActionCreators({
  openModal: openModal,
  loadAllPhases: loadAllPhases
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BackLog);
