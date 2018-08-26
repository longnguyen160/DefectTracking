import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  InputSearchStyled,
  Input,
  FilterBoxStyled,
  FilterBoxTopStyled,
  FilterBoxWrapperStyled
} from "../../../stylesheets/GeneralStyled";
import { HeaderMainItemsStyled, SubSelectStyled, SubSelectListStyled } from '../../../stylesheets/TopNavBar';
import Icon from '../../../components/icon/Icon';
import { ICONS, MODAL_TYPE, SEARCH_FIELDS } from '../../../utils/enums';
import { openModal, searchData } from '../actions/layout';


class SearchBox extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showFilter: false,
      field: props.inputType && props.inputType.length > 0 ? SEARCH_FIELDS.find(field => field.name === props.inputType) : SEARCH_FIELDS[0]
    };
  }

  handleSearch = (e) => {
    const { modalType, searchData } = this.props;
    const { field } = this.state;

    if (modalType.length > 0) {
      searchData(field.name, e.target.value);
    }
  };

  handleShowFilter = () => {
    const { showFilter } = this.state;

    this.setState({ showFilter: !showFilter });
  };

  handleSelectField = (field) => {
    this.setState({ field });
  };

  handleKeyPress = (event) => {
    const { modalType, openModal, searchData } = this.props;
    const { field } = this.state;

    if (modalType.length === 0 && event.key === 'Enter' && this.search.value.length > 0) {
      searchData(field.name, this.search.value);
      openModal(MODAL_TYPE.SEARCH);
    }
  };

  render() {
    const { showFilter, field } = this.state;
    const { inputValue, user } = this.props;
    const fields = user ? SEARCH_FIELDS.filter(fieldData => fieldData.roles.includes(...user.roles)) : SEARCH_FIELDS;

    return (
      <HeaderMainItemsStyled padding={'0'}>
        <InputSearchStyled hasBorder>
          <Icon icon={ICONS.SEARCH} color={'#626262'} padding={'0'} margin={'2px 5px 0'}/>
          <Input
            innerRef={(e) => this.search = e}
            type="search"
            onChange={this.handleSearch}
            fontSize={'13px'}
            padding={'0'}
            value={inputValue}
            onKeyDown={this.handleKeyPress}
          />
          <FilterBoxStyled
            onClick={() => this.handleShowFilter()}
            showFilter={showFilter}
            padding={'2px 0'}
          >
            <FilterBoxTopStyled>
              <FilterBoxWrapperStyled>
                <Icon icon={field.icon} />
                <span>{field.name}</span>
              </FilterBoxWrapperStyled>
              <Icon icon={ICONS.ANGLE_DOWN} height={6} marginRight={'0'} rotated={showFilter} />
            </FilterBoxTopStyled>
            <SubSelectStyled>
              {
                fields.map(fieldData => (
                  <SubSelectListStyled
                    key={fieldData.name}
                    onClick={() => this.handleSelectField(fieldData)}
                  >
                    <FilterBoxWrapperStyled>
                      <Icon icon={fieldData.icon} />
                      <span>{fieldData.name}</span>
                    </FilterBoxWrapperStyled>
                    {
                      fieldData.name === field.name &&
                        <i className="fa fa-check" />
                    }
                  </SubSelectListStyled>
                ))
              }
            </SubSelectStyled>
          </FilterBoxStyled>
        </InputSearchStyled>
      </HeaderMainItemsStyled>
    );
  }
}

SearchBox.propTypes = {
  modalType: PropTypes.string.isRequired,
  inputType: PropTypes.string,
  inputValue: PropTypes.string,
  openModal: PropTypes.func.isRequired,
  searchData: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  modalType: state.layout.modalType,
  user: state.layout.user
});

const mapDispatchToProps = dispatch => bindActionCreators({
  openModal: openModal,
  searchData: searchData
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);
