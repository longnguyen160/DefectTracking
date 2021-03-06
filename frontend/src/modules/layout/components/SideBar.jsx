import React from 'react';
import PropTypes from 'prop-types';
import { SideBarMainStyled, SideBarMainBlockStyled } from '../../../stylesheets/SideBar';
import {
  SIDE_BAR_BEFORE_SELECT_PROJECT,
  SIDE_BAR_AFTER_SELECT_PROJECT,
  MANAGEMENT_SIDE_BAR,
  ROLES
} from '../../../utils/enums';
import Icon from '../../../components/icon/Icon';


class SideBar extends React.Component {
  constructor(props) {
    super(props);

    const { history, selectedProject, user } = props;
    let sideBar;

    if (selectedProject) {
      const userRole = user && user.roles.find(role => role !== ROLES.USER);
      sideBar = userRole ? SIDE_BAR_AFTER_SELECT_PROJECT.filter(element => element.role.includes(userRole)) : SIDE_BAR_AFTER_SELECT_PROJECT;
    } else {
      sideBar = user ? SIDE_BAR_BEFORE_SELECT_PROJECT.filter(element => element.role.includes(...user.roles)) : SIDE_BAR_BEFORE_SELECT_PROJECT;
    }

    this.state = {
      selected: sideBar.find(element => history.location.pathname.includes(element.url)),
      sideBar,
      managementSideBar: false
    };
  }

  componentWillReceiveProps(nextProps) {
    let { sideBar } = this.state;
    const { history } = this.props;
    const { user } = nextProps;

    if (nextProps.selectedProject) {
      const userRole = (user && user.roles.find(role => role !== ROLES.USER)) || ROLES.USER;
      sideBar = SIDE_BAR_AFTER_SELECT_PROJECT.filter(element => element.role.includes(userRole));
    } else if (history.location.pathname.includes('manage')) {
      sideBar = MANAGEMENT_SIDE_BAR;
      this.setState({ managementSideBar: true });
    } else {
      sideBar = user ? SIDE_BAR_BEFORE_SELECT_PROJECT.filter(element => element.role.includes(...user.roles)) : SIDE_BAR_BEFORE_SELECT_PROJECT;
    }

    let selected = sideBar.find(element =>
      (history.location.pathname.includes(element.url) && element.url !== '/') || (element.url === '/' && history.location.pathname === '/')
    );

    if (!selected) {
      selected = sideBar.find(element => element.url === '/');
    }
    this.setState({
      sideBar,
      selected
    });
  }

  handleSelectSideBar = (value) => {
    const { history, selectedProject, user } = this.props;
    const { sideBar } = this.state;

    this.setState({ selected: value });

    if (selectedProject && value.name !== 'Management') {
      history.push(`/project/${selectedProject.id}${value.url}`);
    } else if (value.name !== 'Management') {
      history.push(value.url);
    } else if (value.name === 'Management') {
      if (JSON.stringify(sideBar) !== JSON.stringify(MANAGEMENT_SIDE_BAR)) {
        this.setState({ sideBar: MANAGEMENT_SIDE_BAR, managementSideBar: true });
      } else {
        this.setState({
          sideBar: SIDE_BAR_BEFORE_SELECT_PROJECT.filter(element => element.role.includes(...user.roles)),
          managementSideBar: false
        });
      }
    }
  };

  render() {
    const { selected, sideBar, managementSideBar } = this.state;

    return (
      <SideBarMainStyled>
        {
          sideBar.map(item => (
            <SideBarMainBlockStyled
              onClick={() => this.handleSelectSideBar(item)}
              selected={selected && selected.name === item.name}
              key={item.name}
              isHeader={item.name === 'Management' && managementSideBar}
            >
              <Icon icon={item.icon} color={'#1A1A1A'} width={20} height={20} />
              <span>{item.name}</span>
            </SideBarMainBlockStyled>

          ))
        }
      </SideBarMainStyled>
    );
  }
}

SideBar.propTypes = {
  selectedProject: PropTypes.object,
  history: PropTypes.object,
  user: PropTypes.object
};

export default SideBar;
