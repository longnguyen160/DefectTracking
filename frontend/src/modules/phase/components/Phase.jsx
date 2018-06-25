import React from 'react';
import Select from 'react-select';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';
import SockJsClient from "react-stomp";
import {
  ElementHeaderStyled,
  FormGroupStyled,
  PageBoardItemStyled,
  PageBoardStyled,
  TitleElementStyled
} from '../../../stylesheets/GeneralStyled';
import {
  ListTableBodyContainerStyled,
  ListTableHeaderItemsStyled,
  ListTableHeaderStyled
} from '../../../stylesheets/Table';
import { ISSUE_STATUS_ARRAY } from '../../../utils/enums';
import PropTypes from 'prop-types';
import { openModal } from '../../layout/actions/layout';
import { loadActivePhase, resetPhase } from '../actions/phase';
import { reorderMap } from '../../../utils/ultis';
import PhaseDetails from './PhaseDetails';

class Phase extends React.Component {
  state = {
    issueList: [],
    list: {}
  };

  componentWillMount() {
    const { loadActivePhase, selectedProject } = this.props;
    let { list } = this.state;

    if (selectedProject) {
      loadActivePhase(selectedProject.id);
    }

    ISSUE_STATUS_ARRAY.map(status => {
      list = Object.assign({}, list, {
        [status.value]: []
      });

      return null;
    });

    this.setState({ list });
  }

  componentWillReceiveProps(nextProps) {
    const { phase, selectedProject, loadActivePhase } = nextProps;
    let { list } = this.state;

    if (selectedProject && !this.props.selectedProject) {
      loadActivePhase(selectedProject.id);
    }
    if (JSON.stringify(phase) !== JSON.stringify(this.props.phase)) {
      const issueStatuses = [...new Set(phase.issueList.map(issue => issue.status))];

      issueStatuses.map(status => {

        list = Object.assign({}, list, {
          [status]: phase.issueList.filter(issue => issue.status === status)
        });

        this.setState({ list });
      });
      this.setState({ issueList: phase.issueList });
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
    const updatedList = reorderMap(
      list,
      result.source,
      result.destination
    );

    this.setState({
      list: updatedList,
    });
  };

  render() {
    const { list } = this.state;
    console.log(list);
    return (
      <PageBoardStyled backlog>
        <ElementHeaderStyled padding={'10px 20px'}>
          <TitleElementStyled noPadding>
            Phase 1
          </TitleElementStyled>
        </ElementHeaderStyled>
        <FormGroupStyled paddingSelect={'10px 0px 10px 20px'} widthSelect={'150px'}>
          <Select placeholder={'Quick Filter'}/>
          <Select placeholder={'Assignee'} />
        </FormGroupStyled>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <PageBoardStyled noPadding>
            {
              ISSUE_STATUS_ARRAY.map(status => (
                <PageBoardItemStyled key={status.value}>
                  <ListTableHeaderStyled>
                    <ListTableHeaderItemsStyled>{status.value}</ListTableHeaderItemsStyled>
                  </ListTableHeaderStyled>
                  <ListTableBodyContainerStyled>
                    <PhaseDetails
                      data={list[status.value]}
                      listId={status.value}
                      listType={'card'}
                    />
                  </ListTableBodyContainerStyled>
                </PageBoardItemStyled>
              ))
            }
          </PageBoardStyled>
        </DragDropContext>
      </PageBoardStyled>
    );
  }
}

Phase.propTypes = {
  openModal: PropTypes.func.isRequired,
  loadActivePhase: PropTypes.func.isRequired,
  resetPhase: PropTypes.func.isRequired,
  selectedProject: PropTypes.object,
  phase: PropTypes.object
};

const mapStateToProps = state => ({
  phase: state.phase.activePhase,
  selectedProject: state.layout.selectedProject
});

const mapDispatchToProps = dispatch => bindActionCreators({
  openModal: openModal,
  loadActivePhase: loadActivePhase,
  resetPhase: resetPhase
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Phase);
