import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Modal from './Modal';
import {
  ModalContentStyled,
  ModalHeaderStyled,
  ModalHeaderTitleStyled,
  ModalLineContentStyled,
  ModalLineStyled,
  ModalLineTitleStyled
} from '../../stylesheets/Modal';
import {
  FilterBoxStyled,
  FilterBoxTopStyled, FilterBoxWrapperStyled,
  Input,
  LineFormStyled,
  TextErrorStyled
} from '../../stylesheets/GeneralStyled';
import { Button } from '../../stylesheets/Button';
import { COLOR_ARRAY, ICONS } from '../../utils/enums';
import { createCategory, resetCategory, updateCategory } from '../../modules/management/actions/category';
import Icon from '../icon/Icon';
import { SubSelectListStyled, SubSelectStyled } from '../../stylesheets/TopNavBar';


class ModalAddingCategory extends React.Component {

  state = {
    showFilter: false,
    field: COLOR_ARRAY[0],
    name: 'Category',
    error: null
  };

  componentWillReceiveProps(nextProps) {
    const { error, category } = nextProps;

    if (error) {
      this.setState({ error });
    }
    if (JSON.stringify(category) !== JSON.stringify(this.props.category)) {
      this.input.value = category.name;
      this.setState({
        name: category.name,
        field: {
          background: category.background,
          color: category.color
        }
      })
    }
  }

  componentWillUnmount() {
    const { resetCategory } = this.props;

    resetCategory();
  }

  handleShowFilter = () => {
    const { showFilter } = this.state;

    this.setState({ showFilter: !showFilter });
  };

  handleSelectField = (field) => {
    this.setState({ field });
  };

  handleChange = () => {
    if (this.input.value.length === 0) {
      this.setState({ name: 'Category' });
    } else {
      this.setState({ name: this.input.value });
    }
  };

  handleCreateCategory = () => {
    const { createCategory, updateCategory, onClose, category } = this.props;
    const { field } = this.state;
    const handleFunction = category ? updateCategory : createCategory;

    if (this.input.value.length === 0) {
      this.setState({ error: 'Name is required' });
      return;
    }

    handleFunction({
      id: category ? category.id : null,
      name: this.input.value,
      background: field.background,
      color: field.color
    }, () => onClose());
  };

  render() {
    const { onClose, isOpen, error, isLoading, category } = this.props;
    const { showFilter, field, name } = this.state;
    const colorList = COLOR_ARRAY.filter(fieldData => fieldData.background !== field.background);

    return (
      <Modal onClose={onClose} isOpen={isOpen} maxWidth={'500px'} isVisible={true}>
        <ModalHeaderStyled>
          <ModalHeaderTitleStyled>
            <span>{category ? 'Update' : 'Add'} category</span>
          </ModalHeaderTitleStyled>
        </ModalHeaderStyled>
        <ModalContentStyled>
          <ModalLineStyled hasRows>
            <ModalLineContentStyled alignLeft>
              <ModalLineTitleStyled>Name</ModalLineTitleStyled>
              <ModalLineTitleStyled fullInput>
                <LineFormStyled>
                  <Input
                    innerRef={(ref) => this.input = ref}
                    onChange={this.handleChange}
                  />
                </LineFormStyled>
              </ModalLineTitleStyled>
            </ModalLineContentStyled>
            <ModalLineContentStyled alignLeft>
              <ModalLineTitleStyled>Color</ModalLineTitleStyled>
              <ModalLineTitleStyled fullInput>
                <LineFormStyled>
                  <FilterBoxStyled
                    onClick={() => this.handleShowFilter()}
                    showFilter={showFilter}
                    background={field.background}
                    color={field.color}
                    fullWidth
                    padding={'10px 0'}
                    childPadding={'10px 10px'}
                    top={'36px'}
                  >
                    <FilterBoxTopStyled noBorder>
                      <FilterBoxWrapperStyled>
                        {name}
                      </FilterBoxWrapperStyled>
                      <Icon icon={ICONS.ANGLE_DOWN} height={6} marginRight={'0'} rotated={showFilter} />
                    </FilterBoxTopStyled>
                    <SubSelectStyled>
                      {
                        colorList.map(fieldData => (
                          <SubSelectListStyled
                            key={fieldData.background}
                            onClick={() => this.handleSelectField(fieldData)}
                            background={fieldData.background}
                            color={fieldData.color}
                          >
                            <FilterBoxWrapperStyled>
                              {name}
                            </FilterBoxWrapperStyled>
                          </SubSelectListStyled>
                        ))
                      }
                    </SubSelectStyled>
                  </FilterBoxStyled>
                </LineFormStyled>
              </ModalLineTitleStyled>
            </ModalLineContentStyled>
          </ModalLineStyled>
          <ModalLineStyled>
            <ModalLineContentStyled>
              {
                error &&
                <TextErrorStyled error={true}>
                  {error}
                </TextErrorStyled>
              }
              {
                isLoading ?
                  <Button hasBorder btnModal disabled>
                    <i className="fa fa-circle-o-notch fa-spin" />Loading
                  </Button>
                :
                  <Button
                    btnModal
                    hasBorder
                    onClick={() => this.handleCreateCategory()}
                  >
                    {category ? 'Update' : 'Create'}
                  </Button>
              }
            </ModalLineContentStyled>
          </ModalLineStyled>
        </ModalContentStyled>
      </Modal>
    );
  }
}

ModalAddingCategory.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  createCategory: PropTypes.func.isRequired,
  updateCategory: PropTypes.func.isRequired,
  resetCategory: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  category: PropTypes.object
};

const mapStateToProps = state => ({
  error: state.management.error,
  isLoading: state.management.isLoading,
  category: state.management.category
});

const mapDispatchToProps = dispatch => bindActionCreators({
  createCategory: createCategory,
  updateCategory: updateCategory,
  resetCategory: resetCategory
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ModalAddingCategory);
