import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SockJsClient from "react-stomp";
import moment from 'moment';
import {
  PageBoardStyled,
  PageBoardItemStyled,
  TitleElementStyled,
  ElementHeaderStyled,
  Image,
  TitleFormStyled,
  LabelStyled
} from '../../../stylesheets/GeneralStyled';
import {
  ListTableHeaderStyled,
  ListTableHeaderItemsStyled,
  ListTableBodyStyled,
  ListTableBodyItemStyled,
  ListTableBodyContainerStyled,
  ListTableStyled
} from '../../../stylesheets/Table';
import { openModal, resetSelectedProject } from '../../layout/actions/layout';
import { ICONS, ISSUE_PRIORITY_ARRAY, MODAL_TYPE, WEB_SOCKET_URL } from '../../../utils/enums';
import { loadAllIssuesShortcut, loadIssueDetails, resetIssueList } from '../../issue/actions/issue';
import Icon from '../../../components/icon/Icon';
import { loadAllMessages, resetMessage } from '../../message/actions/message';

class Home extends React.Component {

  componentWillMount() {
    const { resetSelectedProject, loadAllIssuesShortcut, loadAllMessages, user } = this.props;

    resetSelectedProject();
    loadAllMessages();

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

  componentWillUnmount() {
    const { resetIssueList, resetMessage } = this.props;

    resetIssueList();
    resetMessage();
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

  renderLog = (message) => (
    <ListTableBodyStyled showList top key={message.id}>
      <ListTableBodyItemStyled flex={'0 0 45px'}>
        <Image dynamic={'35px'} src={message.sender.avatarURL || '/images/default_avatar.jpg'}/>
      </ListTableBodyItemStyled>
      <ListTableBodyItemStyled issueName container>
        <ListTableBodyItemStyled display={'inline-block'} noPadding>
          <TitleFormStyled username margin={'0 5px 0 0'}>
            {message.sender.username}
          </TitleFormStyled>
          <TitleFormStyled message margin={'0'}>
            {`${message.message} on `}
          </TitleFormStyled>
          <TitleFormStyled
            detail
            noMargin
            onClick={() => this.handleOpenModal(message.issue.id)}
          >
            {`${message.issue.key} - ${message.issue.name}`}
          </TitleFormStyled>
        </ListTableBodyItemStyled>
        <TitleElementStyled padding={'5px 0'} fontSize={'12px'}>{moment(message.createdAt).format('LLL')}</TitleElementStyled>
      </ListTableBodyItemStyled>
    </ListTableBodyStyled>
  );

  renderComment = (message) => (
    <ListTableBodyStyled showList top key={message.id}>
      <ListTableBodyItemStyled flex={'0 0 45px'}>
        <Image dynamic={'35px'} src={message.sender.avatarURL || '/images/default_avatar.jpg'}/>
      </ListTableBodyItemStyled>
      <ListTableBodyItemStyled issueName container>
        <ListTableBodyItemStyled display={'inline-block'} noPadding>
          <TitleFormStyled username margin={'0 5px 0 0'}>
            {message.sender.username}
          </TitleFormStyled>
          <TitleFormStyled message margin={'0'}>
            {`commented on `}
          </TitleFormStyled>
          <TitleFormStyled
            detail
            noMargin
            onClick={() => this.handleOpenModal(message.issue.id)}
          >
            {`${message.issue.key} - ${message.issue.name}`}
          </TitleFormStyled>
        </ListTableBodyItemStyled>
        <LabelStyled left maxContent>
          {message.message}
        </LabelStyled>
        <TitleElementStyled padding={'5px 0'} fontSize={'12px'}>{moment(message.createdAt).format('LLL')}</TitleElementStyled>
      </ListTableBodyItemStyled>
    </ListTableBodyStyled>
  );

  render() {
    const { issues, messages } = this.props;

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
                    const priority = ISSUE_PRIORITY_ARRAY.find(element => element.value === issue.priority);

                    return (
                      <ListTableStyled
                        onClick={() => this.handleOpenModal(issue.id)}
                        key={issue.id}
                        odd={index % 2 === 0}
                      >
                        <ListTableBodyStyled
                          showList
                          noBackground
                          fixed
                          color={issue.status}
                        >
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
              <ListTableBodyContainerStyled willChange borderTop activity>
                {
                  messages.map(message => (
                    message.type === 'logs' ? this.renderLog(message) : this.renderComment(message)
                  ))
                }
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
  resetSelectedProject: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
  loadAllIssuesShortcut: PropTypes.func.isRequired,
  loadIssueDetails: PropTypes.func.isRequired,
  resetIssueList: PropTypes.func.isRequired,
  loadAllMessages: PropTypes.func.isRequired,
  resetMessage: PropTypes.func.isRequired,
  issues: PropTypes.array.isRequired,
  messages: PropTypes.array.isRequired,
  user: PropTypes.object
};

const mapStateToProps = state => ({
  issues: state.issue.issues,
  user: state.layout.user,
  messages: state.message.messages
});

const mapDispatchToProps = dispatch => bindActionCreators({
  resetSelectedProject: resetSelectedProject,
  openModal: openModal,
  loadAllIssuesShortcut: loadAllIssuesShortcut,
  loadIssueDetails: loadIssueDetails,
  loadAllMessages: loadAllMessages,
  resetIssueList: resetIssueList,
  resetMessage: resetMessage
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
