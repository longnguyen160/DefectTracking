import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TooltipContentStyled, TooltipStyled } from '../../stylesheets/Tooltip';

class Tooltip extends Component {

  state = {
    show: false
  };

  handleMouseIn = () => {
    this.setState({ show: true });
  };

  handleMouseOut = () => {
    this.setState({ show: false });
  };

  render() {
    const { children, content } = this.props;
    const { show } = this.state;

    return (
      <TooltipStyled
        onMouseOver={this.handleMouseIn}
        onMouseLeave={this.handleMouseOut}
      >
        {
          show &&
            <TooltipContentStyled left>
              {content}
            </TooltipContentStyled>
        }
        {children}
      </TooltipStyled>
    );
  }
}

Tooltip.propTypes = {
  content: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired
};

export default Tooltip;
