import React from 'react';
import PropTypes from 'prop-types';
import DragDrop from 'uppy/lib/plugins/DragDrop';
import Uppy from 'uppy/lib/core';
import Tus from 'uppy/lib/plugins/Tus';
import Form from 'uppy/lib/plugins/Form';

export default class DragAndDrop extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      creatingForm: null
    }
  }

  componentDidMount() {
    const { uppy } = this.props;
    const options = Object.assign(
      { id: 'react:DragDrop' },
      { target: this.container }
    );

    uppy.use(DragDrop, options);
    this.plugin = uppy.getPlugin(options.id);

    uppy.on('complete', (result) => {
      console.log(result);
    });
  }

  componentWillReceiveProps(nextProps) {
    const { uppy, creatingForm } = nextProps;

    if (creatingForm && !this.state.creatingForm) {
      this.setState({ creatingForm });
      uppy
        .use(Form, {
          target: creatingForm,
          getMetaFromForm: true,
          addResultToForm: true,
          resultName: 'uppyResult',
          submitOnSuccess: false
        });
    }
  }

  componentWillUnmount () {
    const { uppy } = this.props;

    uppy.removePlugin(this.plugin);
  }

  render() {
    const { input } = this.props;

    return (
      <div
        {...input}
        ref={(e) => this.container = e}
      />
    );
  }
}

DragAndDrop.propTypes = {
  uppy: PropTypes.object.isRequired,
  input: PropTypes.object.isRequired,
  creatingForm: PropTypes.element,
};
