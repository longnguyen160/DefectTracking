import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Scrollbars } from 'react-custom-scrollbars';
import SockJsClient from "react-stomp";
import moment from 'moment';
import {
  PageBoardStyled,
  PageBoardItemStyled,
  TitleElementStyled,
  ElementHeaderStyled,
  Image,
  TitleFormStyled,
  LabelStyled, IssueStatusStyled
} from '../../../stylesheets/GeneralStyled';
import {
  ListTableHeaderStyled,
  ListTableHeaderItemsStyled,
  ListTableBodyStyled,
  ListTableBodyItemStyled,
  ListTableBodyContainerStyled,
  ListTableStyled
} from '../../../stylesheets/Table';
import { loadCurrentUser, openModal, resetSelectedProject } from '../../layout/actions/layout';
import {
  FILE_BASE_URL,
  ICONS,
  ISSUE_PRIORITY_ARRAY,
  MESSAGE_TYPE,
  MODAL_TYPE,
  WEB_SOCKET_URL,
  DEFAULT_AVATAR
} from '../../../utils/enums';
import { loadAllIssuesShortcut, loadIssueDetails, resetIssueList } from '../../issue/actions/issue';
import Icon from '../../../components/icon/Icon';
import { loadAllMessages, resetMessage } from '../../message/actions/message';
import LoadingIcon from '../../../components/icon/LoadingIcon';

class Home extends React.Component {

  componentWillMount() {
    const { resetSelectedProject, loadAllIssuesShortcut, loadAllMessages, user, loadCurrentUser } = this.props;

    loadCurrentUser();
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

    loadIssueDetails(issueId, true);
    openModal(MODAL_TYPE.ISSUE_DETAILS);
  };

  onMessageReceive = (message) => {
    const { loadAllIssuesShortcut, user, loadAllMessages } = this.props;

    if (message.message === 'Create message successfully') {
      loadAllMessages();
    } else if (user) {
      loadAllIssuesShortcut(user.id);
    }
  };

  renderLog = (message) => (
    <ListTableBodyStyled showList top key={message.id}>
      <ListTableBodyItemStyled flex={'0 0 45px'}>
        <Image dynamic={'35px'} src={message.sender.avatarURL ? FILE_BASE_URL + message.sender.avatarURL : FILE_BASE_URL + DEFAULT_AVATAR}/>
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
            username
            margin={'0'}
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
        <Image dynamic={'35px'} src={message.sender.avatarURL ? FILE_BASE_URL + message.sender.avatarURL : FILE_BASE_URL + DEFAULT_AVATAR}/>
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
            username
            margin={'0'}
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

  renderIssue = (issues) => {
    return issues.map((issue, index) => {
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
            done={issue.status.done}
            color={issue.status.background}
          >
            <ListTableBodyItemStyled propertyType={'Issue'}>
              {issue.issueKey}
            </ListTableBodyItemStyled>
            <ListTableBodyItemStyled propertyType={'Name'}>
              {issue.summary}
            </ListTableBodyItemStyled>
            <ListTableBodyItemStyled propertyType={'Priority'}>
              <Icon
                icon={ICONS.ARROW}
                color={priority && priority.color}
                width={15}
                height={15}
                rotated rotate={'rotateZ(90deg)'}
              />
            </ListTableBodyItemStyled>
            <ListTableBodyItemStyled propertyType={'Status'}>
              <IssueStatusStyled small status={issue.status}>
                {issue.status.name}
              </IssueStatusStyled>
            </ListTableBodyItemStyled>
          </ListTableBodyStyled>
        </ListTableStyled>
      );
    });
  };

  renderIssueList = (title, issues) => {
    const { loadingIssues } = this.props;

    return (
      <PageBoardItemStyled>
        <ElementHeaderStyled>
          <TitleElementStyled noPadding>
            {title}
          </TitleElementStyled>
        </ElementHeaderStyled>
        <div>
          <div>
            <ListTableHeaderStyled>
              <ListTableHeaderItemsStyled propertyType={'Issue'}>Issue</ListTableHeaderItemsStyled>
              <ListTableHeaderItemsStyled propertyType={'Name'}>Summary</ListTableHeaderItemsStyled>
              <ListTableHeaderItemsStyled propertyType={'Priority'}>Priority</ListTableHeaderItemsStyled>
              <ListTableHeaderItemsStyled propertyType={'Status'}>Status</ListTableHeaderItemsStyled>
            </ListTableHeaderStyled>
            <Scrollbars
              ref={scroll => this.scroll = scroll}
              autoHide
              autoHeight
              autoHeightMax={300}
              style={{ position: 'relative' }}
            >
              <ListTableBodyContainerStyled noScroll willChange height={'445px'}>
                {
                  loadingIssues ?
                    <ElementHeaderStyled loading>
                      <LoadingIcon />
                    </ElementHeaderStyled>
                  :
                    issues.length > 0 ?
                      this.renderIssue(issues)
                    :
                      <ElementHeaderStyled loading>
                        No issues yet
                      </ElementHeaderStyled>
                }
              </ListTableBodyContainerStyled>
            </Scrollbars>
          </div>
        </div>
      </PageBoardItemStyled>
    )
  };

  render() {
    const { issues, messages, loadingMessages } = this.props;
    const assigned = issues ? issues.assigned : [];
    const reported = issues ? issues.reported : [];

    return (
      <PageBoardStyled padding={'0 15px'}>
        <PageBoardItemStyled>
          {this.renderIssueList('Assigned to me', assigned)}
          {this.renderIssueList('Reported by me', reported)}
        </PageBoardItemStyled>
        <PageBoardItemStyled activity>
          <ElementHeaderStyled>
            <TitleElementStyled noPadding>
              Activity history
            </TitleElementStyled>
          </ElementHeaderStyled>
          <div>
            <div>
              <Scrollbars
                ref={scroll => this.scroll = scroll}
                autoHide
                autoHeight
                autoHeightMax={600}
                style={{ position: 'relative' }}
              >
                <ListTableBodyContainerStyled noScroll willChange borderTop activity>
                  {
                    loadingMessages ?
                      <ElementHeaderStyled loading>
                        <LoadingIcon />
                      </ElementHeaderStyled>
                    :
                      messages.length > 0 ?
                        messages.map(message => (
                          message.type.entityName === MESSAGE_TYPE.LOGS ? this.renderLog(message) : this.renderComment(message)
                        ))
                      :
                        <ElementHeaderStyled loading>
                          No activities yet
                        </ElementHeaderStyled>
                  }
                </ListTableBodyContainerStyled>
              </Scrollbars>
            </div>
          </div>
        </PageBoardItemStyled>
        <SockJsClient
          url={WEB_SOCKET_URL}
          topics={['/topic/issuesList', '/topic/message']}
          onMessage={this.onMessageReceive}
          debug={true}
        />
      </PageBoardStyled>
    );
  }
}

Home.propTypes = {
  resetSelectedProject: PropTypes.func.isRequired,
  loadCurrentUser: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
  loadAllIssuesShortcut: PropTypes.func.isRequired,
  loadIssueDetails: PropTypes.func.isRequired,
  resetIssueList: PropTypes.func.isRequired,
  loadAllMessages: PropTypes.func.isRequired,
  resetMessage: PropTypes.func.isRequired,
  issues: PropTypes.object,
  messages: PropTypes.array.isRequired,
  user: PropTypes.object,
  loadingIssues: PropTypes.bool.isRequired,
  loadingMessages: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  issues: state.issue.issueForHomePage,
  loadingIssues: state.issue.isLoading,
  user: state.layout.user,
  messages: state.message.messages,
  loadingMessages: state.message.isLoading
});

const mapDispatchToProps = dispatch => bindActionCreators({
  resetSelectedProject: resetSelectedProject,
  loadCurrentUser: loadCurrentUser,
  openModal: openModal,
  loadAllIssuesShortcut: loadAllIssuesShortcut,
  loadIssueDetails: loadIssueDetails,
  loadAllMessages: loadAllMessages,
  resetIssueList: resetIssueList,
  resetMessage: resetMessage
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
