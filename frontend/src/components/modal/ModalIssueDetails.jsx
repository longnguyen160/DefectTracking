import React from 'react';
import PropTypes from 'prop-types';
import Uppy from 'uppy/lib/core';
import Tus from 'uppy/lib/plugins/Tus';
import Modal from './Modal';
import {
  ModalHeaderStyled,
  ModalHeaderTitleStyled,
  ModalContentStyled,
  ModalLineStyled,
  ModalLineContentStyled,
  ModalLineTitleStyled,
  ModalBodyStyled
} from '../../stylesheets/Modal';
import {
  DescriptionElementStyled,
  ElementHeaderStyled,
  FilterBoxWrapperStyled,
  Image,
  LineFormStyled,
  TitleElementStyled,
  Input, IssueStatusStyled
} from '../../stylesheets/GeneralStyled';
import { ICONS } from '../../utils/enums';
import { DragDrop } from 'uppy/lib/react';
import Icon from '../icon/Icon';

class ModalIssueDetails extends React.Component {

  state = {
    uploadedFile: []
  };

  componentWillMount() {
    this.uppy = new Uppy({ debug: true })
      .use(Tus, { endpoint: 'https://master.tus.io/files/' });
  }

  componentDidMount() {
    this.uppy.on('complete', (result) => {
      this.setState(prevState => {
        prevState.uploadedFile.push(...result.successful);

        return {
          uploadedFile: prevState.uploadedFile
        }
      });
    });
  }

  handleDeleteAttachment = (fileURL) => {
    this.setState(prevState => ({
      uploadedFile: prevState.uploadedFile.filter(file => file.uploadURL !== fileURL)
    }));
  };

  render() {
    const { onClose, isOpen} = this.props;
    const { uploadedFile } = this.state;

    return (
      <Modal onClose={onClose} isOpen={isOpen} maxWidth={'750px'}>
        <ModalHeaderStyled>
          <ModalHeaderTitleStyled>
            <span>ISSUE-1</span>
          </ModalHeaderTitleStyled>
        </ModalHeaderStyled>
        <ModalBodyStyled>
          <ModalContentStyled flex={'0 0 540px'} padding={'0 10px'}>
            <ModalLineStyled>
              <ModalLineContentStyled alignLeft>
                <ModalLineTitleStyled>
                  As a product owner, I'd like to express work in terms of actual user problems, aka User Stories, and place them in the backlog >> Try creating a new story with the "+ Create Issue" button (top right of screen)
                </ModalLineTitleStyled>
              </ModalLineContentStyled>
            </ModalLineStyled>
            <ModalLineStyled hasRows>
              <ModalLineContentStyled alignLeft>
                <ModalLineTitleStyled>Label</ModalLineTitleStyled>
                <LineFormStyled>
                  <span>aospdj</span>
                  <span>ddcds</span>
                  <span>scnskl</span>
                </LineFormStyled>
              </ModalLineContentStyled>
              <ModalLineContentStyled alignLeft>
                <ModalLineTitleStyled>Priority</ModalLineTitleStyled>
                <LineFormStyled>
                  <span>Urgent</span>
                </LineFormStyled>
              </ModalLineContentStyled>
            </ModalLineStyled>
            <ModalLineStyled>
              <ModalLineContentStyled alignLeft>
                <ModalLineTitleStyled>Description</ModalLineTitleStyled>
                <LineFormStyled>
                  <span>
                    When you click "+ Create Issue" you will be asked for the correct project (select "bimbeo") and Issue Type (select "Story").

                    About User Stories

                    The Scrum methodology drops traditional software requirement statements in favour of real world problems expressed as User Stories. Stories describe the task a particular user is trying to achieve and its value. They are typically of the form "As a (role) I want (something) so that (benefit)". This approach focuses the team on the core user need rather than on implementation details.

                    Stories are "placeholders for a conversation" – they do not need to be especially detailed since it is expected that the team will work together to resolve ambiguity as the story is developed.

                    Stories to be implemented in the future are stored in the Product Backlog. The backlog is ranked by the Product Owner so that the next items to be completed are at the top.
                  </span>
                </LineFormStyled>
              </ModalLineContentStyled>
            </ModalLineStyled>
            <ModalLineStyled>
              <ModalLineContentStyled alignLeft>
                <ModalLineTitleStyled>Attachments</ModalLineTitleStyled>
                <LineFormStyled fullWidth>
                  <DragDrop
                    uppy={this.uppy}
                  />
                </LineFormStyled>
                {
                  uploadedFile.map(file => (
                    <FilterBoxWrapperStyled key={file.uploadURL}>
                      {
                        file.type.includes('image') ?
                          <Image project src={file.uploadURL}/>
                          :
                          <Icon icon={ICONS.ATTACHMENT} color={'#1A1A1A'} width={30} height={30}/>
                      }
                      <TitleElementStyled padding={'10px 0'}>{file.name}</TitleElementStyled>
                      <Icon
                        icon={ICONS.DELETE}
                        color={'#1A1A1A'}
                        width={10}
                        height={10}
                        onClick={() => this.handleDeleteAttachment(file.uploadURL)}
                        hoverPointer
                      />
                    </FilterBoxWrapperStyled>
                  ))
                }
              </ModalLineContentStyled>
            </ModalLineStyled>
            <ModalLineStyled>
              <ModalLineTitleStyled alignLeft>
                <ModalLineTitleStyled>Comments</ModalLineTitleStyled>
                <LineFormStyled>
                  <FilterBoxWrapperStyled>
                    <Image topNav src={'/images/default_avatar.jpg'} />
                    <DescriptionElementStyled>
                      <ElementHeaderStyled padding={'0'}>
                        <span>bim beo</span>
                        <span>2 hour ago</span>
                      </ElementHeaderStyled>
                      <span>Hello</span>
                    </DescriptionElementStyled>
                  </FilterBoxWrapperStyled>
                </LineFormStyled>
                <ElementHeaderStyled padding={'0'}>
                  <Image topNav src={'/images/default_avatar.jpg'} margin={'0 5px'} />
                  <Input placeholder={'Comment...'} />
                </ElementHeaderStyled>
              </ModalLineTitleStyled>
            </ModalLineStyled>
          </ModalContentStyled>
          <ModalContentStyled padding={'0 10px'}>
            <ModalLineStyled>
              <ModalLineContentStyled alignLeft>
                <ModalLineTitleStyled>Status</ModalLineTitleStyled>
                <LineFormStyled>
                  <IssueStatusStyled status={'In Progress'}>In Progress</IssueStatusStyled>
                </LineFormStyled>
              </ModalLineContentStyled>
            </ModalLineStyled>
            <ModalLineStyled>
              <ModalLineContentStyled alignLeft>
                <ModalLineTitleStyled>Reporter</ModalLineTitleStyled>
                <LineFormStyled>
                  <ElementHeaderStyled padding={'0'}>
                    <Image topNav src={'/images/default_avatar.jpg'} margin={'0 5px'} />
                    <span>bim beo</span>
                  </ElementHeaderStyled>
                </LineFormStyled>
              </ModalLineContentStyled>
            </ModalLineStyled>
            <ModalLineStyled>
              <ModalLineContentStyled alignLeft>
                <ModalLineTitleStyled>Assignee</ModalLineTitleStyled>
                <LineFormStyled>
                  <ElementHeaderStyled padding={'0'}>
                    <Image topNav src={'/images/default_avatar.jpg'} margin={'0 5px'} />
                    <span>bim beo</span>
                  </ElementHeaderStyled>
                </LineFormStyled>
              </ModalLineContentStyled>
            </ModalLineStyled>
            <ModalLineStyled>
              <ModalLineContentStyled alignLeft>
                <ModalLineTitleStyled>Watchers</ModalLineTitleStyled>
                <LineFormStyled hasTitle>
                  <ElementHeaderStyled padding={'0'}>
                    <Image topNav src={'/images/default_avatar.jpg'} margin={'0 5px'} />
                    <span>bim beo</span>
                  </ElementHeaderStyled>
                  <ElementHeaderStyled padding={'0'}>
                    <Image topNav src={'/images/default_avatar.jpg'} margin={'0 5px'} />
                    <span>bim bim</span>
                  </ElementHeaderStyled>
                </LineFormStyled>
              </ModalLineContentStyled>
            </ModalLineStyled>
            <ModalLineStyled>
              <ModalLineContentStyled alignLeft>
                <ModalLineTitleStyled>Created</ModalLineTitleStyled>
                <LineFormStyled>
                  <span>Sunday, June 10, 2018</span>
                </LineFormStyled>
              </ModalLineContentStyled>
            </ModalLineStyled>
            <ModalLineStyled>
              <ModalLineContentStyled alignLeft>
                <ModalLineTitleStyled>Assignee</ModalLineTitleStyled>
                <LineFormStyled>
                  <span>Sunday, June 10, 2018</span>
                </LineFormStyled>
              </ModalLineContentStyled>
            </ModalLineStyled>
          </ModalContentStyled>
        </ModalBodyStyled>
      </Modal>
    );
  }
}

ModalIssueDetails.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ModalIssueDetails;
