import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loadIssueDetails, loadIssueShortcut } from '../../issue/actions/issue';
import { ListTableBodyItemStyled, ListTableBodyStyled } from '../../../stylesheets/Table';
import { ICONS, ISSUE_PRIORITY_ARRAY, MODAL_TYPE } from '../../../utils/enums';
import Icon from '../../../components/icon/Icon';
import { openModal } from '../../layout/actions/layout';

class BacklogIssueDetails extends React.Component {

  state = {
    issue: null
  };

  componentDidMount() {
    const { loadIssueShortcut, issueId } = this.props;

    loadIssueShortcut(issueId);
  }

  componentWillReceiveProps(nextProps) {
    const { issue, issueId } = nextProps;

    if (!this.state.issue && issue && issue.id === issueId) {
      this.setState({ issue });
    }
  }

  handleOpenModal = (issueId) => {
    const { openModal, loadIssueDetails } = this.props;

    loadIssueDetails(issueId, true);
    openModal(MODAL_TYPE.ISSUE_DETAILS);
  };

  render() {
    const { issue } = this.state;
    const priority = issue && ISSUE_PRIORITY_ARRAY.find(element => element.value === issue.priority);

    return (
      <ListTableBodyStyled
        {...this.props}
        onClick={() => this.handleOpenModal(issue.id)}
      >
        <ListTableBodyItemStyled itemId>
          {issue && issue.issueKey}
        </ListTableBodyItemStyled>
        <ListTableBodyItemStyled issueName>
          {issue && issue.summary}
        </ListTableBodyItemStyled>
        <ListTableBodyItemStyled priority>
          <Icon
            icon={ICONS.ARROW}
            color={priority && priority.color}
            width={15}
            height={15}
            rotated rotate={'rotateZ(90deg)'}
          />
        </ListTableBodyItemStyled>
      </ListTableBodyStyled>
    );
  }
}

BacklogIssueDetails.propTypes = {
  loadIssueShortcut: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
  loadIssueDetails: PropTypes.func.isRequired,
  issueId: PropTypes.string.isRequired,
  issue: PropTypes.shape({
    id: PropTypes.string.isRequired,
    issueKey: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    priority: PropTypes.string.isRequired,
  })
};

const mapStateToProps = state => ({
  issue: state.issue.issueShortcut
});

const mapDispatchToProps = dispatch => bindActionCreators({
  loadIssueShortcut: loadIssueShortcut,
  openModal: openModal,
  loadIssueDetails: loadIssueDetails
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BacklogIssueDetails);
