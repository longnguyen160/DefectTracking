import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
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
import { ICONS } from '../../../utils/enums';

class TopNavBar extends Component {

  logOut = () => {
    const { logOut, history } = this.props;

    logOut(() => {
      history.push('/signin');
    });
  };

  render() {
    const { user } = this.props;

    if (user) {
      return (
        <HeaderMainStyled>
          <HeaderMainBlockStyled>
            <HeaderMainItemsStyled logo>
              <LogoStyled>
                <Link to='/'>Defect Tracking</Link>
              </LogoStyled>
            </HeaderMainItemsStyled>
          </HeaderMainBlockStyled>
          <HeaderMainBlockStyled hasAuto>
            <HeaderMainItemsStyled info user>
              <span>
                <Image topNav src={user.profile ? user.profile.imageSrc : 'images/default_avatar.jpg'}/>
                <span>{user ? user.username : null}</span>
              </span>
              <i className="fa fa-chevron-down"/>
              <SubSelectStyled user>
                <SubSelectListStyled onClick={this.logOut}>
                  <Link to='/signin'>
                    <i className="fa fa-sign-out" />
                    Logout
                  </Link>
                </SubSelectListStyled>
              </SubSelectStyled>
            </HeaderMainItemsStyled>
            <HeaderMainItemsStyled info project>
              <span>
                <Icon icon={ICONS.PROJECT} color={'#fff'} size={20} />
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
            <HeaderMainItemsStyled notification>
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
};

export default TopNavBar;
