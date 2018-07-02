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
  AttachmentDetailsBodyDeleteStyled,
  Image
} from '../../stylesheets/GeneralStyled';
import { loadFile, resetState } from '../../modules/file/actions/file';
import {FILE_BASE_URL, ICONS} from '../../utils/enums';
import { formatBytes } from '../../utils/ultis';
import Icon from '../icon/Icon';

class Attachment extends React.Component {
  state = {
    attachment: null
  };

  componentDidMount() {
    const { fileId, loadFile } = this.props;

    loadFile(fileId);
  }

  componentWillReceiveProps(nextProps) {
    const { attachment, fileId } = nextProps;

    if (!this.state.attachment && attachment && attachment.id === fileId) {
      this.setState({ attachment });
    }
  }

  componentWillUnmount() {
    const { resetState } = this.props;

    resetState();
  }

  renderForType = () => {
    const { handleDeleteAttachment } = this.props;

    return (
      <AttachmentDetailsStyled padding={'0'}>
        <AttachmentDetailsBodyStyled color={'#fff'} right>
          <AttachmentDetailsBodyDeleteStyled onClick={handleDeleteAttachment}>
            <Icon
              icon={ICONS.DELETE}
              color={'#fff'}
              width={10}
              height={10}
              hoverPointer
            />
          </AttachmentDetailsBodyDeleteStyled>
        </AttachmentDetailsBodyStyled>
      </AttachmentDetailsStyled>
    )
  };

  render() {
    const { handleDeleteAttachment, fileId, height, width, type } = this.props;
    const { attachment } = this.state;
    const isImage = attachment && attachment.contentType.includes('image');

    return (
      <AttachmentWrapperStyled
        height={height}
        width={width}
      >
        <AttachmentContainerStyled>
          <AttachmentContentStyled>
            <AttachmentImageStyled>
              <AttachmentImageContentStyled>
                {
                  isImage ?
                    <Image dynamic={'100%'} src={FILE_BASE_URL + fileId} />
                  :
                    <Icon icon={ICONS.FILE} color={'#d1d1d1'} width={50} height={50} />
                }
              </AttachmentImageContentStyled>
            </AttachmentImageStyled>
            {
              type === 'comment' ?
                this.renderForType()
              :
                <AttachmentDetailsStyled>
                  <AttachmentDetailsHeaderStyled color={'#fff'}>
                    {attachment && attachment.name}
                  </AttachmentDetailsHeaderStyled>
                  <AttachmentDetailsBodyStyled color={'#fff'}>
                    <AttachmentDetailsBodySizeStyled>
                      {
                        isImage ?
                          <Icon icon={ICONS.IMAGE} color={'#fff'} width={15} height={15}/>
                          :
                          <Icon icon={ICONS.ATTACHMENT} color={'#fff'} width={15} height={15}/>
                      }
                      {attachment && formatBytes(attachment.size, 3)}
                    </AttachmentDetailsBodySizeStyled>
                    <AttachmentDetailsBodyDeleteStyled onClick={handleDeleteAttachment}>
                      <Icon
                        icon={ICONS.DELETE}
                        color={'#fff'}
                        width={10}
                        height={10}
                        hoverPointer
                      />
                    </AttachmentDetailsBodyDeleteStyled>
                  </AttachmentDetailsBodyStyled>
                </AttachmentDetailsStyled>
            }
          </AttachmentContentStyled>
        </AttachmentContainerStyled>
      </AttachmentWrapperStyled>
    );
  }
}

Attachment.propTypes = {
  handleDeleteAttachment: PropTypes.func.isRequired,
  loadFile: PropTypes.func.isRequired,
  resetState: PropTypes.func.isRequired,
  attachment: PropTypes.object,
  fileId: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  type: PropTypes.string
};

const mapStateToProps = state => ({
  attachment: state.file.fileData
});

const mapDispatchToProps = dispatch => bindActionCreators({
  loadFile: loadFile,
  resetState: resetState
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Attachment);
