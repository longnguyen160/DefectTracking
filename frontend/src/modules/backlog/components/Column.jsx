import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';
import {
  PageBoardItemStyled,
  PageBoardStyled,
} from '../../../stylesheets/GeneralStyled';
import {
  ListTableBodyContainerStyled,
  ListTableHeaderItemsStyled,
  ListTableHeaderStyled
} from '../../../stylesheets/Table';
import { ISSUE_STATUS_ARRAY } from '../../../utils/enums';
import PropTypes from 'prop-types';
import { openModal } from '../../layout/actions/layout';
import { reorderMap } from '../../../utils/ultis';
import ColumnDetails from './ColumnDetails';
import { loadIssueDetails } from '../../issue/actions/issue';
import { loadAllIssuesFromBacklog, resetIssueList } from '../actions/backlog';

class Column extends React.Component {
  state = {
    issueList: [],
    list: {}
  };

  componentWillMount() {
    const { loadAllIssuesFromBacklog, selectedProject } = this.props;
    let { list } = this.state;

    if (selectedProject) {
      loadAllIssuesFromBacklog(selectedProject.backlog);
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
    const { issueList, selectedProject, loadAllIssuesFromBacklog } = nextProps;

    if (JSON.stringify(selectedProject) !== JSON.stringify(this.props.selectedProject)) {
      loadAllIssuesFromBacklog(selectedProject.backlog);
    }
    if (JSON.stringify(issueList) !== JSON.stringify(this.props.issueList)) {
      this.handleIssueListData(issueList);
      this.setState({ issueList });
    }
  }

  componentWillUnmount() {
    const { resetIssueList } = this.props;

    resetIssueList();
  }

  handleIssueListData = (issueList) => {
    let { list } = this.state;
    const issueStatuses = [...new Set(issueList.map(issue => issue.status))];

    issueStatuses.map(status => {
      list = Object.assign({}, list, {
        [status]: issueList.filter(issue => issue.status === status)
      });

      this.setState({ list });
    });
  };

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
    const { openModal, loadIssueDetails } = this.props;
    const { list } = this.state;

    return (
      <PageBoardItemStyled activity margin={'10px 0'}>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <PageBoardStyled noPadding>
            {
              ISSUE_STATUS_ARRAY.map((status, index) => {
                let margin = '0 10px';

                if (index === 0) {
                  margin = '0 10px 0 0';
                } else if (index === ISSUE_STATUS_ARRAY.length) {
                  margin = '0 0 0 10px';
                }

                return (
                  <PageBoardItemStyled
                    margin={margin}
                    key={status.value}
                  >
                    <ListTableHeaderStyled>
                      <ListTableHeaderItemsStyled>{status.value}</ListTableHeaderItemsStyled>
                    </ListTableHeaderStyled>
                    <ListTableBodyContainerStyled>
                      <ColumnDetails
                        openModal={openModal}
                        loadIssueDetails={loadIssueDetails}
                        data={list[status.value]}
                        listId={status.value}
                        listType={'card'}
                      />
                    </ListTableBodyContainerStyled>
                  </PageBoardItemStyled>
                )
              })
            }
          </PageBoardStyled>
        </DragDropContext>
      </PageBoardItemStyled>
    );
  }
}

Column.propTypes = {
  openModal: PropTypes.func.isRequired,
  loadAllIssuesFromBacklog: PropTypes.func.isRequired,
  resetIssueList: PropTypes.func.isRequired,
  loadIssueDetails: PropTypes.func.isRequired,
  selectedProject: PropTypes.object,
  issueList: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  issueList: state.backlog.issueList,
  selectedProject: state.layout.selectedProject
});

const mapDispatchToProps = dispatch => bindActionCreators({
  openModal: openModal,
  loadAllIssuesFromBacklog: loadAllIssuesFromBacklog,
  loadIssueDetails: loadIssueDetails,
  resetIssueList: resetIssueList
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Column);
