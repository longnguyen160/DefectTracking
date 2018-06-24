import React from 'react';
import PropTypes from 'prop-types';
import { ICONS, ISSUE_STATUS_ARRAY } from '../../utils/enums';
import { FilterBoxStyled, FilterBoxTopStyled, FilterBoxWrapperStyled } from '../../stylesheets/GeneralStyled';
import { SubSelectListStyled, SubSelectStyled } from '../../stylesheets/TopNavBar';
import Icon from '../icon/Icon';

class CustomSelectStatus extends React.Component {

  state = {
    showStatus: false,
    field: ISSUE_STATUS_ARRAY.find(status => status.value === this.props.value)
  };

  handleShowStatus = () => {
    const { showStatus } = this.state;

    this.setState({ showStatus: !showStatus });
  };

  handleSelectField = (field) => {
    const { setValueToAnchor } = this.props;

    this.setState({ field });
    setValueToAnchor(field.value);
  };

  render() {
    const { showStatus, field } = this.state;
    const listStatus = ISSUE_STATUS_ARRAY.filter(fieldData => fieldData.value !== field.value);

    return (
      <FilterBoxStyled
        onClick={() => this.handleShowStatus()}
        showFilter={showStatus}
        background={field.background}
        color={field.color}
        fullWidth
        padding={'10px 0'}
        childPadding={'10px 10px'}
        top={'36px'}
      >
        <FilterBoxTopStyled noBorder>
          <FilterBoxWrapperStyled>
            <span>{field.value}</span>
          </FilterBoxWrapperStyled>
          <Icon icon={ICONS.ANGLE_DOWN} height={6} marginRight={'0'} rotated={showStatus} />
        </FilterBoxTopStyled>
        <SubSelectStyled>
          {
            listStatus.map(fieldData => (
              <SubSelectListStyled
                key={fieldData.value}
                onClick={() => this.handleSelectField(fieldData)}
                background={fieldData.background}
                color={fieldData.color}
              >
                <FilterBoxWrapperStyled>
                  {fieldData.value}
                </FilterBoxWrapperStyled>
              </SubSelectListStyled>
            ))
          }
        </SubSelectStyled>
      </FilterBoxStyled>
    );
  }
}

CustomSelectStatus.propTypes = {
  setValueToAnchor: PropTypes.func.isRequired,
  value: PropTypes.object.isRequired
};

export default CustomSelectStatus;
