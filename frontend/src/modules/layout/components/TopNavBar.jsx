import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SearchBox from './SearchBox';
import {
  HeaderMainBlockStyled,
  HeaderMainItemsStyled,
  HeaderMainStyled,
  LogoStyled,
  SubSelectListStyled,
  SubSelectStyled
} from '../../../stylesheets/TopNavBar';
import { Image } from "../../../stylesheets/GeneralStyled";
import Icon from '../../../components/icon/Icon';
import { ICONS, MODAL_TYPE } from '../../../utils/enums';

class TopNavBar extends Component {

  logOut = () => {
    const { logOut, history } = this.props;

    logOut(() => {
      history.push('/signin');
    });
  };

  render() {
    const { user, openModal } = this.props;

    if (user) {
      return (
        <HeaderMainStyled>
          <HeaderMainBlockStyled>
            <HeaderMainItemsStyled logo>
              <LogoStyled>
                <Link to='/'>Defect Tracking</Link>
              </LogoStyled>
            </HeaderMainItemsStyled>
            <SearchBox />
          </HeaderMainBlockStyled>
          <HeaderMainBlockStyled hasAuto>
            <HeaderMainItemsStyled info create hover>
              <i className="fa fa-plus" />
              <SubSelectStyled create>
                <SubSelectListStyled onClick={() => openModal(MODAL_TYPE.CREATING_USER)}>
                  <span>Create user...</span>
                </SubSelectListStyled>
                <SubSelectListStyled onClick={() => openModal(MODAL_TYPE.CREATING_PROJECT)}>
                  <span>Create project...</span>
                </SubSelectListStyled>
                <SubSelectListStyled onClick={() => openModal(MODAL_TYPE.CREATING_ISSUE)}>
                  <span>Create issue...</span>
                </SubSelectListStyled>
              </SubSelectStyled>
            </HeaderMainItemsStyled>
            <HeaderMainItemsStyled info user>
              <span>
                <Image topNav src={user.profile ? user.profile.imageSrc : 'images/default_avatar.jpg'}/>
                <span>{user ? user.username : null}</span>
              </span>
              <i className="fa fa-chevron-down" />
              <SubSelectStyled user>
                <SubSelectListStyled onClick={this.logOut}>
                  <Link to='/signin'>
                    <i className="fa fa-sign-out" />
                    Logout
                  </Link>
                </SubSelectListStyled>
              </SubSelectStyled>
            </HeaderMainItemsStyled>
            <HeaderMainItemsStyled info project hover>
              <span>
                <Icon icon={ICONS.PROJECT} color={'#fff'} width={20} height={20} />
                <span>Project</span>
              </span>
              <SubSelectStyled project>
                <SubSelectListStyled>
                  <span>ABC</span>
                </SubSelectListStyled>
                <SubSelectListStyled>
                  <span>ABC</span>
                </SubSelectListStyled>
                <SubSelectListStyled>
                  <span>ABC</span>
                </SubSelectListStyled>
              </SubSelectStyled>
            </HeaderMainItemsStyled>
            <HeaderMainItemsStyled notification hover>
              <i className="fa fa-bell" />
              <span>21</span>
            </HeaderMainItemsStyled>
          </HeaderMainBlockStyled>
        </HeaderMainStyled>
      );
    }
    return null;
  }
}

TopNavBar.propTypes = {
  user: PropTypes.object,
  logOut: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  openModal: PropTypes.func.isRequired
};

export default TopNavBar;
