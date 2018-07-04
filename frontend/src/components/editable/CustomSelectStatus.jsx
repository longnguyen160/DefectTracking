import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ICONS } from '../../utils/enums';
import { FilterBoxStyled, FilterBoxTopStyled, FilterBoxWrapperStyled } from '../../stylesheets/GeneralStyled';
import { SubSelectListStyled, SubSelectStyled } from '../../stylesheets/TopNavBar';
import Icon from '../icon/Icon';
import { loadAllStatus } from '../../modules/management/actions/status';

class CustomSelectStatus extends React.Component {

  state = {
    showStatus: false,
    field: this.props.statusList && this.props.statusList.find(status => status.id === this.props.value.id)
  };

  componentWillMount() {
    const { loadAllStatus, userRole } = this.props;

    loadAllStatus(userRole);
  }

  componentWillReceiveProps(nextProps) {
    const { statusList, value } = this.props;

    if (JSON.stringify(nextProps.statusList) !== JSON.stringify(statusList)) {
      this.setState({ field: nextProps.statusList.find(status => status.id === value.id) });
    }
  }

  handleShowStatus = () => {
    const { showStatus } = this.state;

    this.setState({ showStatus: !showStatus });
  };

  handleSelectField = (field) => {
    const { setValueToAnchor } = this.props;

    this.setState({ field });
    setValueToAnchor(field);
  };

  render() {
    const { showStatus, field } = this.state;
    const { statusList } = this.props;
    const listStatus = field ? statusList.filter(fieldData => fieldData.id !== field.id) : [];

    return (
      <FilterBoxStyled
        onClick={() => this.handleShowStatus()}
        showFilter={showStatus}
        background={field && field.background}
        color={field && field.color}
        fullWidth
        padding={'10px 0'}
        childPadding={'10px 10px'}
        top={'36px'}
      >
        <FilterBoxTopStyled noBorder>
          <FilterBoxWrapperStyled>
            <span>{field && field.name}</span>
          </FilterBoxWrapperStyled>
          <Icon icon={ICONS.ANGLE_DOWN} height={6} marginRight={'0'} rotated={showStatus} />
        </FilterBoxTopStyled>
        <SubSelectStyled>
          {
            listStatus.map(fieldData => (
              <SubSelectListStyled
                key={fieldData.id}
                onClick={() => this.handleSelectField(fieldData)}
                background={fieldData.background}
                color={fieldData.color}
              >
                <FilterBoxWrapperStyled>
                  {fieldData.name}
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
  loadAllStatus: PropTypes.func.isRequired,
  value: PropTypes.object.isRequired,
  statusList: PropTypes.array.isRequired,
  userRole: PropTypes.string
};

const mapStateToProps = state => ({
  statusList: state.management.statusList
});

const mapDispatchToProps = dispatch => bindActionCreators({
  loadAllStatus: loadAllStatus,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CustomSelectStatus);
