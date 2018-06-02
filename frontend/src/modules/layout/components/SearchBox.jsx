import React from 'react';
import PropTypes from 'prop-types';
import { InputSearchStyled, Input, FilterBoxStyled, FilterBoxTopStyled, FilterBoxWrapperStyled } from "../../../stylesheets/GeneralStyled";
import { HeaderMainItemsStyled, SubSelectStyled, SubSelectListStyled } from '../../../stylesheets/TopNavBar';
import Icon from '../../../components/icon/Icon';
import { ICONS, SEARCH_FIELDS } from '../../../utils/enums';

class SearchBox extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showFilter: false,
      field: SEARCH_FIELDS[0]
    };
  }

  handleSearch = (e) => {
    e.preventDefault();
    console.log(this.search);
  };

  handleShowFilter = () => {
    const { showFilter } = this.state;

    this.setState({ showFilter: !showFilter });
  };

  handleSelectField = (field) => {
    this.setState({ field });
  };

  render() {
    const { showFilter, field } = this.state;

    return (
      <HeaderMainItemsStyled>
        <InputSearchStyled noBorder>
          <Icon icon={ICONS.SEARCH} color={'#626262'} padding={'0'} margin={'2px 5px 0'}/>
          <Input
            innerRef={(e) => this.search = e}
            type="search"
            onChange={this.handleSearch}
            fontSize={'13px'}
            padding={'0'}
          />
          <FilterBoxStyled
            onClick={() => this.handleShowFilter()}
            showFilter={showFilter}
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
                SEARCH_FIELDS.map(fieldData => (
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

export default SearchBox;
