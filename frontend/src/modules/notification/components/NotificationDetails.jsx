import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { ListTableBodyItemStyled, ListTableBodyStyled } from '../../../stylesheets/Table';
import { Image, LabelStyled, TitleElementStyled, TitleFormStyled } from '../../../stylesheets/GeneralStyled';
import { DEFAULT_AVATAR, FILE_BASE_URL, MESSAGE_TYPE } from '../../../utils/enums';

const NotificationDetails = props => {
  const { notification, handleOpenModal, setNotificationToSeen } = props;

  if (notification.issue) {
    return (
      <ListTableBodyStyled
        noStyle
        showList
        top
        onMouseEnter={() => setNotificationToSeen && setNotificationToSeen(notification.id)}
        onClick={() => handleOpenModal('issue', notification.issue.id, notification.id)}
      >
        <ListTableBodyItemStyled flex={'0 0 45px'}>
          <Image
            dynamic={'35px'}
            src={notification.sender.avatarURL ? FILE_BASE_URL + notification.sender.avatarURL : FILE_BASE_URL + DEFAULT_AVATAR}
          />
        </ListTableBodyItemStyled>
        {
          notification.type.entityName === MESSAGE_TYPE.LOGS ?
            <ListTableBodyItemStyled issueName container>
              <ListTableBodyItemStyled display={'inline-block'} noPadding>
                <TitleFormStyled username margin={'0 5px 0 0'}>
                  {notification.sender.username}
                </TitleFormStyled>
                <TitleFormStyled notification margin={'0'}>
                  {`${notification.message} on `}
                </TitleFormStyled>
                <TitleFormStyled
                  username
                  margin={'0'}
                >
                  {`${notification.issue.key} - ${notification.issue.name}`}
                </TitleFormStyled>
              </ListTableBodyItemStyled>
              <TitleElementStyled
                padding={'5px 0'}
                fontSize={'12px'}
              >
                {moment(notification.createdAt).format('LLL')}
              </TitleElementStyled>
            </ListTableBodyItemStyled>
          :
            <ListTableBodyItemStyled issueName container>
              <ListTableBodyItemStyled display={'inline-block'} noPadding>
                <TitleFormStyled username margin={'0 5px 0 0'}>
                  {notification.sender.username}
                </TitleFormStyled>
                <TitleFormStyled notification margin={'0'}>
                  {`commented on `}
                </TitleFormStyled>
                <TitleFormStyled
                  username
                  margin={'0'}
                >
                  {`${notification.issue.key} - ${notification.issue.name}`}
                </TitleFormStyled>
              </ListTableBodyItemStyled>
              <LabelStyled left maxContent>
                {notification.message}
              </LabelStyled>
              <TitleElementStyled
                padding={'5px 0'}
                fontSize={'12px'}
              >
                {moment(notification.createdAt).format('LLL')}
              </TitleElementStyled>
            </ListTableBodyItemStyled>
        }
      </ListTableBodyStyled>
    );
  }
  return (
    <ListTableBodyStyled
      noStyle
      showList
      top
      onMouseEnter={() => setNotificationToSeen && setNotificationToSeen(notification.id)}
      onClick={() => handleOpenModal('project', notification.project.id, notification.id)}
    >
      <ListTableBodyItemStyled flex={'0 0 45px'}>
        <Image
          dynamic={'35px'}
          src={notification.sender.avatarURL ? FILE_BASE_URL + notification.sender.avatarURL : FILE_BASE_URL + DEFAULT_AVATAR}
        />
      </ListTableBodyItemStyled>
      <ListTableBodyItemStyled issueName container>
        <ListTableBodyItemStyled display={'inline-block'} noPadding>
          <TitleFormStyled username margin={'0'}>
            {notification.sender.username}
          </TitleFormStyled>
          <TitleFormStyled notification margin={'0'}>
            {`${notification.message} on project `}
          </TitleFormStyled>
          <TitleFormStyled
            username
            margin={'0'}
          >
            {notification.project.name}
          </TitleFormStyled>
        </ListTableBodyItemStyled>
        <TitleElementStyled
          padding={'5px 0'}
          fontSize={'12px'}
        >
          {moment(notification.createdAt).format('LLL')}
        </TitleElementStyled>
      </ListTableBodyItemStyled>
    </ListTableBodyStyled>
  );
};

NotificationDetails.propTypes = {
  notification: PropTypes.object,
  handleOpenModal: PropTypes.func.isRequired,
  setNotificationToSeen: PropTypes.func,
};

export default NotificationDetails;
