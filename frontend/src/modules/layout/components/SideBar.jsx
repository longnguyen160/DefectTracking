import React from 'react';
import { SideBarMainStyled, SideBarMainBlockStyled } from '../../../stylesheets/SideBar';
import { SIDE_BAR_BEFORE_SELECT_PROJECT } from '../../../utils/enums';
import Icon from '../../../components/icon/Icon';


class SideBar extends React.Component {
  constructor(props) {
    super(props);

    const { history } = props;

    this.state = {
      selected: SIDE_BAR_BEFORE_SELECT_PROJECT.find(element => element.url === history.location.pathname)
    };
  }

  handleSelectSideBar = (value) => {
    const { history } = this.props;

    this.setState({ selected: value });
    history.push(value.url);
  };

  render() {
    const { selected } = this.state;

    return (
      <SideBarMainStyled>
        {
          SIDE_BAR_BEFORE_SELECT_PROJECT.map(item => (
            <SideBarMainBlockStyled
              onClick={() => this.handleSelectSideBar(item)}
              selected={selected.name === item.name}
              key={item.name}
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

export default SideBar;
