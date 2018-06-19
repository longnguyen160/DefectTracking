import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SockJsClient from "react-stomp";
import {
  PageBoardStyled,
  PageBoardItemStyled,
  TitleElementStyled,
  ElementHeaderStyled,
} from '../../../stylesheets/GeneralStyled';
import {
  ListTableHeaderStyled,
  ListTableHeaderItemsStyled,
  ListTableBodyStyled,
  ListTableBodyItemStyled,
  ListTableBodyContainerStyled,
  ListTableStyled
} from '../../../stylesheets/Table';
import { openModal, resetProject } from '../../layout/actions/layout';
import { ICONS, ISSUE_STATUS_ARRAY, MODAL_TYPE, WEB_SOCKET_URL } from '../../../utils/enums';
import { loadAllIssuesShortcut, loadIssueDetails } from '../../issue/actions/issue';
import Icon from '../../../components/icon/Icon';

class Home extends React.Component {

  componentWillMount() {
    const { resetProject, loadAllIssuesShortcut, user } = this.props;

    resetProject();

    if (user) {
      loadAllIssuesShortcut(user.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { loadAllIssuesShortcut, user } = nextProps;

    if (user && !this.props.user) {
      loadAllIssuesShortcut(user.id);
    }
  }

  handleOpenModal = (issueId) => {
    const { openModal, loadIssueDetails } = this.props;

    loadIssueDetails(issueId);
    openModal(MODAL_TYPE.ISSUE_DETAILS);
  };

  onMessageReceive = () => {
    const { loadAllIssuesShortcut, user } = this.props;

    if (user) {
      loadAllIssuesShortcut(user.id);
    }
  };

  render() {
    const { issues } = this.props;

    return (
      <PageBoardStyled>
        <PageBoardItemStyled>
          <ElementHeaderStyled>
            <TitleElementStyled noPadding>
              Assigned to me
            </TitleElementStyled>
          </ElementHeaderStyled>
          <div>
            <div>
              <ListTableHeaderStyled>
                <ListTableHeaderItemsStyled itemId>Issue</ListTableHeaderItemsStyled>
                <ListTableHeaderItemsStyled issueName>Summary</ListTableHeaderItemsStyled>
                <ListTableHeaderItemsStyled priority>Priority</ListTableHeaderItemsStyled>
              </ListTableHeaderStyled>
              <ListTableBodyContainerStyled willChange>
                {
                  issues.map((issue, index) => {
                    const priority = ISSUE_STATUS_ARRAY.find(element => element.value === issue.priority);

                    return (
                      <ListTableStyled
                        onClick={() => this.handleOpenModal(issue.id)}
                        key={issue.id}
                        odd={index % 2 === 0}
                      >
                        <ListTableBodyStyled showList noBackground fixed>
                          <ListTableBodyItemStyled itemId>
                            {issue.issueKey}
                          </ListTableBodyItemStyled>
                          <ListTableBodyItemStyled issueName>
                            {issue.summary}
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
                      </ListTableStyled>
                    );
                  })
                }
              </ListTableBodyContainerStyled>
            </div>
          </div>
        </PageBoardItemStyled>
        <PageBoardItemStyled activity>
          <ElementHeaderStyled>
            <TitleElementStyled noPadding>
              Activity history
            </TitleElementStyled>
          </ElementHeaderStyled>
          <div>
            <div>
              <ListTableBodyContainerStyled borderTop activity>
                <ListTableBodyStyled showList>
                  <ListTableBodyItemStyled itemId>
                    ISSUE-1
                  </ListTableBodyItemStyled>
                  <ListTableBodyItemStyled issueName>
                    As a developer, I'd like to update story status during the sprint >> Click the Active sprints link at the top right of the screen to go to the Active sprints where the current Sprint's items can be updated
                  </ListTableBodyItemStyled>
                  <ListTableBodyItemStyled priority>
                    High
                  </ListTableBodyItemStyled>
                </ListTableBodyStyled>
                <ListTableBodyStyled showList>
                  <ListTableBodyItemStyled itemId>
                    ISSUE-1
                  </ListTableBodyItemStyled>
                  <ListTableBodyItemStyled issueName>
                    As a developer, I'd like to update story status during the sprint >> Click the Active sprints link at the top right of the screen to go to the Active sprints where the current Sprint's items can be updated
                  </ListTableBodyItemStyled>
                  <ListTableBodyItemStyled priority>
                    High
                  </ListTableBodyItemStyled>
                </ListTableBodyStyled>
                <ListTableBodyStyled showList>
                  <ListTableBodyItemStyled itemId>
                    ISSUE-1
                  </ListTableBodyItemStyled>
                  <ListTableBodyItemStyled issueName>
                    As a developer, I'd like to update story status during the sprint >> Click the Active sprints link at the top right of the screen to go to the Active sprints where the current Sprint's items can be updated
                  </ListTableBodyItemStyled>
                  <ListTableBodyItemStyled priority>
                    High
                  </ListTableBodyItemStyled>
                </ListTableBodyStyled>
                <ListTableBodyStyled showList>
                  <ListTableBodyItemStyled itemId>
                    ISSUE-1
                  </ListTableBodyItemStyled>
                  <ListTableBodyItemStyled issueName>
                    As a developer, I'd like to update story status during the sprint >> Click the Active sprints link at the top right of the screen to go to the Active sprints where the current Sprint's items can be updated
                  </ListTableBodyItemStyled>
                  <ListTableBodyItemStyled priority>
                    High
                  </ListTableBodyItemStyled>
                </ListTableBodyStyled>
                <ListTableBodyStyled showList>
                  <ListTableBodyItemStyled itemId>
                    ISSUE-1
                  </ListTableBodyItemStyled>
                  <ListTableBodyItemStyled issueName>
                    As a developer, I'd like to update story status during the sprint >> Click the Active sprints link at the top right of the screen to go to the Active sprints where the current Sprint's items can be updated
                  </ListTableBodyItemStyled>
                  <ListTableBodyItemStyled priority>
                    High
                  </ListTableBodyItemStyled>
                </ListTableBodyStyled>
                <ListTableBodyStyled showList>
                  <ListTableBodyItemStyled itemId>
                    ISSUE-1
                  </ListTableBodyItemStyled>
                  <ListTableBodyItemStyled issueName>
                    As a developer, I'd like to update story status during the sprint >> Click the Active sprints link at the top right of the screen to go to the Active sprints where the current Sprint's items can be updated
                  </ListTableBodyItemStyled>
                  <ListTableBodyItemStyled priority>
                    High
                  </ListTableBodyItemStyled>
                </ListTableBodyStyled>
                <ListTableBodyStyled showList>
                  <ListTableBodyItemStyled itemId>
                    ISSUE-1
                  </ListTableBodyItemStyled>
                  <ListTableBodyItemStyled issueName>
                    As a developer, I'd like to update story status during the sprint >> Click the Active sprints link at the top right of the screen to go to the Active sprints where the current Sprint's items can be updated
                  </ListTableBodyItemStyled>
                  <ListTableBodyItemStyled priority>
                    High
                  </ListTableBodyItemStyled>
                </ListTableBodyStyled>
                <ListTableBodyStyled showList>
                  <ListTableBodyItemStyled itemId>
                    ISSUE-1
                  </ListTableBodyItemStyled>
                  <ListTableBodyItemStyled issueName>
                    As a developer, I'd like to update story status during the sprint >> Click the Active sprints link at the top right of the screen to go to the Active sprints where the current Sprint's items can be updated
                  </ListTableBodyItemStyled>
                  <ListTableBodyItemStyled priority>
                    High
                  </ListTableBodyItemStyled>
                </ListTableBodyStyled>
              </ListTableBodyContainerStyled>
            </div>
          </div>
        </PageBoardItemStyled>
        <SockJsClient
          url={WEB_SOCKET_URL}
          topics={['/topic/issuesList']}
          onMessage={this.onMessageReceive}
          debug={true}
        />
      </PageBoardStyled>
    );
  }
}

Home.propTypes = {
  resetProject: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
  loadAllIssuesShortcut: PropTypes.func.isRequired,
  loadIssueDetails: PropTypes.func.isRequired,
  issues: PropTypes.array.isRequired,
  user: PropTypes.object
};

const mapStateToProps = state => ({
  issues: state.issue.issues,
  user: state.layout.user
});

const mapDispatchToProps = dispatch => bindActionCreators({
  resetProject: resetProject,
  openModal: openModal,
  loadAllIssuesShortcut: loadAllIssuesShortcut,
  loadIssueDetails: loadIssueDetails
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
