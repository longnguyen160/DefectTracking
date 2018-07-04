import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Select from 'react-select';
import Modal from './Modal';
import {
  ModalContentStyled,
  ModalHeaderStyled,
  ModalHeaderTitleStyled,
  ModalLineContentStyled,
  ModalLineStyled,
  ModalLineTitleStyled
} from '../../stylesheets/Modal';
import { Input,
  LineFormStyled,
  TextErrorStyled,
  FilterBoxStyled,
  FilterBoxTopStyled,
  FilterBoxWrapperStyled
} from '../../stylesheets/GeneralStyled';
import { SubSelectListStyled, SubSelectStyled } from '../../stylesheets/TopNavBar';
import { Button } from '../../stylesheets/Button';
import { ICONS, ISSUE_STATUS_ARRAY, USER_ROLE_IN_PROJECT } from '../../utils/enums';
import Icon from '../icon/Icon';
import { createStatus } from '../../modules/management/actions/status';

class ModalAddStatus extends Component {

  state = {
    showStatus: false,
    field: ISSUE_STATUS_ARRAY[0],
    name: 'Status',
    selectedRole: [],
    error: null
  };

  componentWillReceiveProps(nextProps) {
    const { error } = nextProps;

    if (error) {
      this.setState({ error });
    }
  }

  handleSelectOnChange = (value) => {
    this.setState({ selectedRole: value });
  };

  handleShowStatus = () => {
    const { showStatus } = this.state;

    this.setState({ showStatus: !showStatus });
  };

  handleSelectField = (field) => {
    this.setState({ field });
  };

  handleChange = () => {
    if (this.input.value.length === 0) {
      this.setState({ name: 'Status' });
    } else {
      this.setState({ name: this.input.value });
    }
  };

  handleCreateStatus = () => {
    const { createStatus, onClose } = this.props;
    const { field, selectedRole } = this.state;

    if (this.input.value.length === 0) {
      this.setState({ error: 'Name is required' });
      return;
    }

    createStatus({
      name: this.input.value,
      background: field.background,
      color: field.color,
      isDefault: false,
      handlers: selectedRole.map(role => role.value)
    }, () => onClose());
  };

  render() {
    const { onClose, isOpen, isLoading } = this.props;
    const { showStatus, field, name, selectedRole, error } = this.state;
    const listStatus = ISSUE_STATUS_ARRAY.filter(fieldData => fieldData.background !== field.background);

    return (
      <Modal onClose={onClose} isOpen={isOpen} maxWidth={'500px'} isVisible={true}>
        <ModalHeaderStyled>
          <ModalHeaderTitleStyled>
            <span>Add Status</span>
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
                        {name}
                      </FilterBoxWrapperStyled>
                      <Icon icon={ICONS.ANGLE_DOWN} height={6} marginRight={'0'} rotated={showStatus} />
                    </FilterBoxTopStyled>
                    <SubSelectStyled>
                      {
                        listStatus.map(fieldData => (
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
            <ModalLineContentStyled alignLeft>
              <ModalLineTitleStyled>Allow role</ModalLineTitleStyled>
              <ModalLineTitleStyled fullInput>
                <LineFormStyled reactSelect fullWidthSelect>
                  <Select
                    placeholder={'Role'}
                    options={USER_ROLE_IN_PROJECT}
                    value={selectedRole}
                    multi
                    onChange={this.handleSelectOnChange}
                  />
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
                    onClick={() => this.handleCreateStatus()}
                  >
                    Create
                  </Button>
              }
            </ModalLineContentStyled>
          </ModalLineStyled>
        </ModalContentStyled>
      </Modal>
    );
  }
}

ModalAddStatus.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  createStatus: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
};

const mapStateToProps = state => ({
  error: state.management.error,
  isLoading: state.management.isLoading
});

const mapDispatchToProps = dispatch => bindActionCreators({
  createStatus: createStatus
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ModalAddStatus);
