import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  AttachmentWrapperStyled,
  AttachmentImageStyled,
  AttachmentImageContentStyled,
  AttachmentDetailsStyled,
  AttachmentDetailsHeaderStyled,
  AttachmentDetailsBodyStyled,
  AttachmentContentStyled,
  AttachmentContainerStyled,
  AttachmentDetailsBodySizeStyled,
  AttachmentDetailsBodyDeleteStyled, Image
} from '../../stylesheets/GeneralStyled';
import { loadFile } from '../../modules/file/actions/file';
import { FILE_BASE_URL } from '../../utils/enums';
import { formatBytes } from '../../utils/ultis';

class Attachment extends React.Component {
  state = {
    attachment: null
  };

  componentDidMount() {
    const { fileId, loadFile } = this.props;

    loadFile(fileId);
  }

  componentWillReceiveProps(nextProps) {
    const { attachment } = nextProps;

    if (!this.state.attachment) {
      this.setState({ attachment });
    }
  }

  render() {
    const { handleDeleteAttachment, fileId } = this.props;
    const { attachment } = this.state;

    return (
      <AttachmentWrapperStyled>
        <AttachmentContainerStyled>
          <AttachmentContentStyled>
            <AttachmentImageStyled>
              <AttachmentImageContentStyled>
                {
                  attachment && attachment.contentType.includes('image') &&
                    <Image dynamic={'100%'} src={FILE_BASE_URL + fileId} />
                }
              </AttachmentImageContentStyled>
            </AttachmentImageStyled>
            <AttachmentDetailsStyled>
              <AttachmentDetailsHeaderStyled>
                {attachment && attachment.name}
              </AttachmentDetailsHeaderStyled>
              <AttachmentDetailsBodyStyled>
                <AttachmentDetailsBodySizeStyled>
                  {attachment && formatBytes(attachment.size, 3)}
                </AttachmentDetailsBodySizeStyled>
                <AttachmentDetailsBodyDeleteStyled onClick={handleDeleteAttachment}>
                  X
                </AttachmentDetailsBodyDeleteStyled>
              </AttachmentDetailsBodyStyled>
            </AttachmentDetailsStyled>
          </AttachmentContentStyled>
        </AttachmentContainerStyled>
      </AttachmentWrapperStyled>
    );
  }
}

Attachment.propTypes = {
  handleDeleteAttachment: PropTypes.func.isRequired,
  loadFile: PropTypes.func.isRequired,
  attachment: PropTypes.object,
  fileId: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  attachment: state.file.fileData
});

const mapDispatchToProps = dispatch => bindActionCreators({
  loadFile: loadFile
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Attachment);
