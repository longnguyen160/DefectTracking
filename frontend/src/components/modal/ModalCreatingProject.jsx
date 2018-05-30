import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import Modal from './Modal';
import {
  ModalHeaderStyled,
  ModalHeaderTitleStyled,
  ModalContentStyled,
  ModalLineStyled,
  ModalLineContentStyled,
  ModalLineTitleStyled
} from '../../stylesheets/Modal';
import { Input, LineFormStyled, TextArea } from '../../stylesheets/GeneralStyled';
import { INPUT_NAME, INPUT_DESCRIPTION, INPUT_STATUS } from '../../utils/enums';
import { Button } from '../../stylesheets/Button';

const renderField = (field) => {
  const { input, type, placeholder, renderType } = field;
  let InputType = Input;

  if (renderType === 'textarea') {
    InputType = TextArea;
  }

  return (
    <InputType type={type} placeholder={placeholder} {...input} />
  );
};

class ModalCreatingProject extends React.Component {

  constructor(props) {
    super(props);

    this.state = {

    };
  }

  handleCreateProject = (values) => {
    console.log(values);
  };

  render() {
    const { onClose, isOpen, handleSubmit } = this.props;

    return (
      <Modal onClose={onClose} isOpen={isOpen}>
        <ModalHeaderStyled>
          <ModalHeaderTitleStyled>
            <span>Create Project</span>
          </ModalHeaderTitleStyled>
        </ModalHeaderStyled>
        <form onSubmit={handleSubmit(this.handleCreateProject)} id="CreateProjectForm">
          <ModalContentStyled>
            <ModalLineStyled hasRow>
              <ModalLineContentStyled alignLeft>
              </ModalLineContentStyled>
            </ModalLineStyled>
            <ModalLineStyled>
              <ModalLineContentStyled alignLeft>
                <ModalLineTitleStyled>Project Name</ModalLineTitleStyled>
                <ModalLineTitleStyled fullInput>
                  <LineFormStyled>
                    <Field
                      type={INPUT_NAME}
                      name={INPUT_NAME}
                      placeholder={'Project name...'}
                      renderType={'input'}
                      component={renderField}
                    />
                  </LineFormStyled>
                </ModalLineTitleStyled>
              </ModalLineContentStyled>
            </ModalLineStyled>
            <ModalLineStyled>
              <ModalLineContentStyled alignLeft>
                <ModalLineTitleStyled>Description</ModalLineTitleStyled>
                <ModalLineTitleStyled fullInput>
                  <LineFormStyled>
                    <Field
                      type={INPUT_DESCRIPTION}
                      name={INPUT_DESCRIPTION}
                      placeholder={'Description...'}
                      renderType={'textarea'}
                      component={renderField}
                    />
                  </LineFormStyled>
                </ModalLineTitleStyled>
              </ModalLineContentStyled>
            </ModalLineStyled>
            <ModalLineStyled hasRows>
              <ModalLineContentStyled alignCenter hasRows>
                <ModalLineTitleStyled>Public</ModalLineTitleStyled>
                <ModalLineTitleStyled autoWith>
                  <LineFormStyled noMargin autoWidth>
                    <Field
                      type="radio"
                      name={INPUT_STATUS}
                      component={renderField}
                      value="public"
                    />
                  </LineFormStyled>
                </ModalLineTitleStyled>
              </ModalLineContentStyled>
              <ModalLineContentStyled alignCenter hasRows>
                <ModalLineTitleStyled>Private</ModalLineTitleStyled>
                <ModalLineTitleStyled autoWith>
                  <LineFormStyled noMargin autoWidth>
                    <Field
                      type="radio"
                      name={INPUT_STATUS}
                      component={renderField}
                      value="private"
                    />
                  </LineFormStyled>
                </ModalLineTitleStyled>
              </ModalLineContentStyled>
            </ModalLineStyled>
            <ModalLineStyled>
              <ModalLineContentStyled>
                {
                  <Button type='submit' btnModal>
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

ModalCreatingProject.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'CreateProjectForm'
})(ModalCreatingProject);
