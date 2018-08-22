import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Modal from './Modal';
import {
  ModalBodyStyled,
  ModalCloseStyle, ModalContentStyled,
  ModalHeaderStyled,
  ModalHeaderTitleStyled,
  ModalLineStyled, ModalLineTitleStyled
} from '../../stylesheets/Modal';
import Icon from '../icon/Icon';
import { ICONS } from '../../utils/enums';
import { resetSummaryDetails } from '../../modules/summary/actions/summary';
import { PlaceHolder } from '../../stylesheets/PlaceHolder';

class ModalSummaryReport extends Component {

  componentWillUnmount() {
    const { resetSummaryDetails } = this.props;

    resetSummaryDetails();
  }

  render() {
    const { onClose, isOpen, summaryDetails } = this.props;

    return (
      <Modal onClose={onClose} isOpen={isOpen} maxWidth={'500px'}>
        <ModalHeaderStyled>
          <ModalHeaderTitleStyled>
            <span>Summary Report - {summaryDetails && summaryDetails.username}</span>
          </ModalHeaderTitleStyled>
          <ModalCloseStyle>
            <Icon
              icon={ICONS.DELETE}
              width={15}
              height={15}
              color={'#626262'}
              hoverPointer
              onClick={() => onClose()}
            />
          </ModalCloseStyle>
        </ModalHeaderStyled>
        <ModalBodyStyled>
          <ModalContentStyled flex={'0 0 400px'}  padding={'0 10px'}>
            {
              summaryDetails ?
                summaryDetails.summary.map(item => (
                  <ModalLineStyled key={item.criteria}>
                    <ModalLineTitleStyled fontSize={'15px'}>{item.criteria}</ModalLineTitleStyled>
                  </ModalLineStyled>
                ))
              :
                <PlaceHolder />
            }
          </ModalContentStyled>
          <ModalContentStyled padding={'0 10px'}>
            {
              summaryDetails ?
                summaryDetails.summary.map(item => (
                  <ModalLineStyled key={item.criteria}>
                    <ModalLineTitleStyled fontSize={'15px'}>{item.value}</ModalLineTitleStyled>
                  </ModalLineStyled>
                ))
              :
                <PlaceHolder />
            }
          </ModalContentStyled>
        </ModalBodyStyled>
      </Modal>
    );
  }
}

ModalSummaryReport.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  resetSummaryDetails: PropTypes.func.isRequired,
  summaryDetails: PropTypes.object
};

const mapStateToProps = state => ({
  summaryDetails: state.summary.summaryDetails
});

const mapDispatchToProps = dispatch => bindActionCreators({
  resetSummaryDetails: resetSummaryDetails
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ModalSummaryReport);
