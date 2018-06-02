import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import Select from 'react-select';
import Uppy from 'uppy/lib/core';
import Tus from 'uppy/lib/plugins/Tus';
import { DragDrop } from 'uppy/lib/react';
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
import { Button } from '../../stylesheets/Button';

// const uppy = Uppy({
//   autoProceed: true
// });
//
// uppy.use(Tus, { endpoint: 'https://master.tus.io/files/' });
//
// uppy.on('complete', (result) => {
//   const url = result.successful[0].tus.uploadUrl;
//   console.log(url);
// });

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

const renderSelect = (field) => {
  const { input, options } = field;

  return (
    <Select
      isSearchable={false}
      options={options}
      onChange={() => input.onChange(input.name)}
      value={input.value}
      classNamePrefix="react-select"
      name={input.name}
      {...input}
    />
  );
};

const renderUploadFile = (field) => {
  const { input, uppy } = field;

  return (
    <DragDrop
      uppy={uppy}
      locale={{
        strings: {
          dropHereOr: 'Drop here or %{browse}',
          // Used as the label for the link that opens the system file selection dialog.
          browse: 'browse'
        }
      }}
      {...input}
    />
  );
};

class ModalCreatingIssue extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      project: '',
      priority: ''
    };
  }

  componentWillMount() {
    this.uppy = new Uppy({ autoProceed: false }).use(Tus, { endpoint: 'https://master.tus.io/files/' });
    this.uppy.on('complete', (result) => {
      console.log(result);
    });
  }

  componentWillUnmount () {
    this.uppy.close();
  }

  handleChange = (value, type) => {
    this.setState({ [type]: value });
  };

  handleCreateAccount = (values) => {
    console.log(values);
  };

  render() {
    const { onClose, isOpen, handleSubmit } = this.props;
    const { project, priority } = this.state;

    return (
      <Modal onClose={onClose} isOpen={isOpen} openWidth={true}>
        <ModalHeaderStyled>
          <ModalHeaderTitleStyled>
            <span>Create Issue</span>
          </ModalHeaderTitleStyled>
        </ModalHeaderStyled>
        <form onSubmit={handleSubmit(this.handleCreateAccount)} id="CreateIssueForm">
          <ModalContentStyled>
            <ModalLineStyled hasRows>
              <ModalLineContentStyled alignLeft>
                <ModalLineTitleStyled>Project</ModalLineTitleStyled>
                <ModalLineTitleStyled fullInput>
                  <LineFormStyled>
                    <Field
                      name={'project'}
                      onChange={(e) => this.handleChange(e, 'project')}
                      component={renderSelect}
                      value={project && project.value}
                      options={[
                        { value: 'one', label: 'One' },
                        { value: 'two', label: 'Two' }
                      ]}
                    />
                  </LineFormStyled>
                </ModalLineTitleStyled>
              </ModalLineContentStyled>
              <ModalLineContentStyled alignLeft>
                <ModalLineTitleStyled>Priority</ModalLineTitleStyled>
                <ModalLineTitleStyled fullInput>
                  <LineFormStyled>
                    <Field
                      name={'priority'}
                      onChange={(e) => this.handleChange(e, 'priority')}
                      component={renderSelect}
                      value={priority && priority.value}
                      options={[
                        { value: 'high', label: 'High' },
                        { value: 'low', label: 'Low' }
                      ]}
                    />
                  </LineFormStyled>
                </ModalLineTitleStyled>
              </ModalLineContentStyled>
            </ModalLineStyled>
            <ModalLineStyled>
              <ModalLineContentStyled alignLeft>
                <ModalLineTitleStyled>Summary</ModalLineTitleStyled>
                <ModalLineTitleStyled fullInput>
                  <LineFormStyled>
                    <Field
                      type={'text'}
                      name={'issueName'}
                      placeholder={'Summary...'}
                      component={renderField}
                      renderType={'input'}
                    />
                  </LineFormStyled>
                </ModalLineTitleStyled>
              </ModalLineContentStyled>
            </ModalLineStyled>
            <ModalLineStyled>
              <ModalLineContentStyled alignLeft>
                <ModalLineTitleStyled>Reporter</ModalLineTitleStyled>
                <ModalLineTitleStyled fullInput>
                  <LineFormStyled>
                    <Field
                      type={'text'}
                      name={'reporter'}
                      placeholder={'Reporter...'}
                      component={renderField}
                      renderType={'input'}
                    />
                  </LineFormStyled>
                </ModalLineTitleStyled>
              </ModalLineContentStyled>
            </ModalLineStyled>
            <ModalLineStyled>
              <ModalLineContentStyled alignLeft>
                <ModalLineTitleStyled>Attachment</ModalLineTitleStyled>
                <ModalLineTitleStyled fullInput>
                  <LineFormStyled>
                    {/*<Field*/}
                      {/*name={'attachment'}*/}
                      {/*component={renderUploadFile}*/}
                      {/*uppy={this.uppy}*/}
                    {/*/>*/}
                  </LineFormStyled>
                </ModalLineTitleStyled>
              </ModalLineContentStyled>
            </ModalLineStyled>
            <ModalLineStyled>
              <ModalLineContentStyled alignLeft>
                <ModalLineTitleStyled>Due Date</ModalLineTitleStyled>
                <ModalLineTitleStyled fullInput>
                  <LineFormStyled>
                    <Field
                      type={'text'}
                      name={'dueDate'}
                      component={renderField}
                      renderType={'input'}
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
                      type={'text'}
                      name={'description'}
                      component={renderField}
                      renderType={'textarea'}
                    />
                  </LineFormStyled>
                </ModalLineTitleStyled>
              </ModalLineContentStyled>
            </ModalLineStyled>
            <ModalLineStyled>
              <ModalLineContentStyled alignLeft>
                <ModalLineTitleStyled>Assignee</ModalLineTitleStyled>
                <ModalLineTitleStyled fullInput>
                  <LineFormStyled>
                    <Field
                      name={'assignee'}
                      onChange={(e) => this.handleChange(e, 'assignee')}
                      component={renderSelect}
                      options={[
                        { value: 'Me', label: 'me' },
                      ]}
                    />
                  </LineFormStyled>
                </ModalLineTitleStyled>
              </ModalLineContentStyled>
            </ModalLineStyled>
            <ModalLineStyled>
              <ModalLineContentStyled alignLeft>
                <ModalLineTitleStyled>Labels</ModalLineTitleStyled>
                <ModalLineTitleStyled fullInput>
                  <LineFormStyled>
                    <Field
                      name={'label'}
                      onChange={(e) => this.handleChange(e, 'label')}
                      component={renderSelect}
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

ModalCreatingIssue.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'CreateIssueForm'
})(ModalCreatingIssue);
