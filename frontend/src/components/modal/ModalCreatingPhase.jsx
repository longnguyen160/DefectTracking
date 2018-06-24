import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm, SubmissionError } from 'redux-form';
import Modal from './Modal';
import {
  ModalHeaderStyled,
  ModalHeaderTitleStyled,
  ModalContentStyled,
  ModalLineStyled,
  ModalLineContentStyled,
  ModalLineTitleStyled
} from '../../stylesheets/Modal';
import {LineFormStyled, TextErrorStyled} from '../../stylesheets/GeneralStyled';
import { DATETIME_PICKER, INPUT_TEXT, TEXT_AREA } from '../../utils/enums';
import { Button } from '../../stylesheets/Button';
import InputField from '../form/InputField';
import { validateForm } from '../../utils/ultis';
import moment from 'moment/moment';
import { createPhase } from '../../modules/phase/actions/phase';

class ModalCreatingPhase extends React.Component {

  handleCreatePhase = (values) => {
    const { name, startDate, endDate } = values;
    const { createPhase, onClose, project } = this.props;

    // check name
    if (validateForm.required(name))
      throw new SubmissionError({ _error: 'Name is required' });

    // check start date
    if (validateForm.required(startDate))
      throw new SubmissionError({ _error: 'Start date is required' });

    // check end date
    if (validateForm.required(endDate))
      throw new SubmissionError({ _error: 'End date is required' });

    createPhase({
      ...values,
      projectId: project.id,
      issueList: [],
      startDate: moment(values.startDate).format(moment.HTML5_FMT.DATETIME_LOCAL_MS),
      endDate: moment(values.endDate).format(moment.HTML5_FMT.DATETIME_LOCAL_MS),
    }, () => {
      onClose();
    });
  };

  render() {
    const {
      onClose,
      isOpen,
      handleSubmit,
      phase,
      pristine,
      submitting,
      error,
      submitFailed,
      submitSucceeded
    } = this.props;

    return (
      <Modal onClose={onClose} isOpen={isOpen} maxWidth={'700px'} isVisible>
        <ModalHeaderStyled>
          <ModalHeaderTitleStyled>
            <span>Create Phase</span>
          </ModalHeaderTitleStyled>
        </ModalHeaderStyled>
        <form onSubmit={handleSubmit(this.handleCreatePhase)} id="CreatePhaseForm">
          <ModalContentStyled>
            <ModalLineStyled padding={'5px'}>
              <ModalLineContentStyled alignLeft>
                <ModalLineTitleStyled>Name</ModalLineTitleStyled>
                <ModalLineTitleStyled fullInput>
                  <LineFormStyled>
                    <InputField
                      type={INPUT_TEXT}
                      name={'name'}
                      placeholder={'Name...'}
                    />
                  </LineFormStyled>
                </ModalLineTitleStyled>
              </ModalLineContentStyled>
            </ModalLineStyled >
            <ModalLineStyled hasRows>
              <ModalLineContentStyled alignLeft>
                <ModalLineTitleStyled>Start Date</ModalLineTitleStyled>
                <ModalLineTitleStyled fullInput>
                  <LineFormStyled datePicker>
                    <InputField
                      type={DATETIME_PICKER}
                      name={'startDate'}
                    />
                  </LineFormStyled>
                </ModalLineTitleStyled>
              </ModalLineContentStyled>
              <ModalLineContentStyled alignLeft>
                <ModalLineTitleStyled>End Date</ModalLineTitleStyled>
                <ModalLineTitleStyled fullInput>
                  <LineFormStyled datePicker>
                    <InputField
                      type={DATETIME_PICKER}
                      name={'endDate'}
                    />
                  </LineFormStyled>
                </ModalLineTitleStyled>
              </ModalLineContentStyled>
            </ModalLineStyled>
            <ModalLineStyled padding={'5px'}>
              <ModalLineContentStyled alignLeft>
                <ModalLineTitleStyled>Description</ModalLineTitleStyled>
                <ModalLineTitleStyled fullInput>
                  <LineFormStyled>
                    <InputField
                      type={TEXT_AREA}
                      name={'description'}
                      renderType={'textarea'}
                    />
                  </LineFormStyled>
                </ModalLineTitleStyled>
              </ModalLineContentStyled>
            </ModalLineStyled>
            <ModalLineStyled>
              <ModalLineContentStyled>
                {
                  ((submitSucceeded && phase.error) || (submitFailed && error)) &&
                  <TextErrorStyled error={true}>
                    {phase.error || error}
                  </TextErrorStyled>
                }
                {
                  submitting || phase.isLoading ?
                    <Button hasBorder btnModal disabled>
                      <i className="fa fa-circle-o-notch fa-spin" />Loading
                    </Button>
                    :
                    <Button type='submit' btnModal hasBorder disabled={pristine}>
                      Create
                    </Button>
                }
              </ModalLineContentStyled>
            </ModalLineStyled>
          </ModalContentStyled>
        </form>
      </Modal>
    );
  }
}

ModalCreatingPhase.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  createPhase: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  submitFailed: PropTypes.bool.isRequired,
  submitSucceeded: PropTypes.bool.isRequired,
  project: PropTypes.object.isRequired,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  phase: PropTypes.shape({
    isLoading: PropTypes.bool.isRequired,
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  })

};

const mapStateToProps = state => ({
  phase: state.phase,
  project: state.layout.selectedProject
});

const mapDispatchToProps = dispatch => bindActionCreators({
  createPhase: createPhase
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'CreatePhaseForm'
})(ModalCreatingPhase));
