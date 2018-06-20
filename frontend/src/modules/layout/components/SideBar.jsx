import React from 'react';
import PropTypes from 'prop-types';
import { SideBarMainStyled, SideBarMainBlockStyled } from '../../../stylesheets/SideBar';
import { SIDE_BAR_BEFORE_SELECT_PROJECT, SIDE_BAR_AFTER_SELECT_PROJECT, MANAGEMENT_SIDE_BAR } from '../../../utils/enums';
import Icon from '../../../components/icon/Icon';


class SideBar extends React.Component {
  constructor(props) {
    super(props);

    const { history, selectedProject } = props;
    let sideBar = SIDE_BAR_BEFORE_SELECT_PROJECT;

    if (selectedProject) {
      sideBar = SIDE_BAR_AFTER_SELECT_PROJECT
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

    if (nextProps.selectedProject) {
      sideBar = SIDE_BAR_AFTER_SELECT_PROJECT;
    } else if (history.location.pathname.includes('manage')) {
      sideBar = MANAGEMENT_SIDE_BAR;
      this.setState({ managementSideBar: true });
    } else {
      sideBar = SIDE_BAR_BEFORE_SELECT_PROJECT;
    }

    this.setState({
      sideBar,
      selected: sideBar.find(element =>
        (history.location.pathname.includes(element.url) && element.url !== '/') || (element.url === '/' && history.location.pathname === '/')
      )
    });
  }

  handleSelectSideBar = (value) => {
    const { history, selectedProject } = this.props;
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
        this.setState({ sideBar: SIDE_BAR_BEFORE_SELECT_PROJECT, managementSideBar: false });
      }
    }
  };

  render() {
    const { selected, sideBar, managementSideBar } = this.state;

    return (
      <SideBarMainStyled>
        {
          selected && sideBar.map(item => (
            <SideBarMainBlockStyled
              onClick={() => this.handleSelectSideBar(item)}
              selected={selected.name === item.name}
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
  history: PropTypes.object
};

export default SideBar;
