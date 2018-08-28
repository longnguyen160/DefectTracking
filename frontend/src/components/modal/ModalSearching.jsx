import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Scrollbars } from 'react-custom-scrollbars';
import Modal from './Modal';
import {
  ModalCloseStyle,
  ModalContentStyled,
  ModalHeaderStyled,
  ModalHeaderTitleStyled,
  ModalLineStyled
} from '../../stylesheets/Modal';
import Icon from '../icon/Icon';
import { DEFAULT_AVATAR, FILE_BASE_URL, ICONS, ISSUE_PRIORITY_ARRAY, MODAL_TYPE } from '../../utils/enums';
import SearchBox from '../../modules/layout/components/SearchBox';
import {
  AlertStyled, ElementHeaderStyled,
  Image, IssueStatusStyled, LineFormStyled,
  SearchDataBodyContentStyled,
  SearchDataBodyStyled,
  SearchDataHeaderStyled,
  SearchDataStyled, TableBlockStyled
} from '../../stylesheets/GeneralStyled';
import LoadingIcon from '../icon/LoadingIcon';
import { loadProjectDetails, openModal, selectProject } from '../../modules/layout/actions/layout';
import { loadIssueDetails } from '../../modules/issue/actions/issue';

class ModalSearching extends Component {

  handleClick = (entityId) => {
    const { inputType, history, loadProjectDetails, selectProject, onClose, openModal, loadIssueDetails } = this.props;

    switch (inputType) {
      case 'Projects':
        loadProjectDetails(entityId, (project) => {
          selectProject(project);
          onClose();
        });
        history.push(`/project/${entityId}/dashboard`);
        break;

      case 'Issues':
        loadIssueDetails(entityId, true);
        openModal(MODAL_TYPE.ISSUE_DETAILS);
        break;

      default:
        break;
    }
  };

  renderProjects = () => {
    const { searchData } = this.props;

    return searchData.map(data => (
      <ModalLineStyled key={data.id} onClick={() => this.handleClick(data.id)}>
        <SearchDataStyled>
          <SearchDataHeaderStyled>
            <h2>
              <Icon icon={ICONS.PROJECT} />
              <span>{data.name}</span>
            </h2>
          </SearchDataHeaderStyled>
          <SearchDataBodyStyled>
            <SearchDataBodyContentStyled>
              {data.description}
            </SearchDataBodyContentStyled>
          </SearchDataBodyStyled>
        </SearchDataStyled>
      </ModalLineStyled>
    ));
  };

  renderIssues = () => {
    const { searchData } = this.props;

    return searchData.map(data => {
      const priority = ISSUE_PRIORITY_ARRAY.find(element => element.value === data.priority);

      return (
        <ModalLineStyled key={data.id} onClick={() => this.handleClick(data.id)}>
          <SearchDataStyled>
            <SearchDataHeaderStyled>
              <h2>
                <Icon icon={ICONS.ISSUES} />
                <span>{data.issueKey}</span>
              </h2>
            </SearchDataHeaderStyled>
            <SearchDataBodyStyled>
              <SearchDataBodyContentStyled>
                <TableBlockStyled justifyContent={'start'} search>
                  <p>{data.summary}</p>
                  <div>
                    <LineFormStyled alignCenter>
                      <Icon
                        icon={ICONS.ARROW}
                        color={priority && priority.color}
                        width={15}
                        height={15}
                        rotated rotate={'rotateZ(90deg)'}
                      />
                      <span>{priority && priority.label}</span>
                    </LineFormStyled>
                    <IssueStatusStyled small status={data.status}>
                      {data.status.name}
                    </IssueStatusStyled>
                  </div>
                </TableBlockStyled>
              </SearchDataBodyContentStyled>
            </SearchDataBodyStyled>
          </SearchDataStyled>
        </ModalLineStyled>
      );
    });
  };

  renderAccounts = () => {
    const { searchData } = this.props;

    return searchData.map(data => (
      <ModalLineStyled key={data.id}>
        <SearchDataStyled>
          <SearchDataHeaderStyled>
            <h2>
              <Icon icon={ICONS.USER} />
              <span>{data.username}</span>
            </h2>
          </SearchDataHeaderStyled>
          <SearchDataBodyStyled>
            <SearchDataBodyContentStyled>
              <TableBlockStyled justifyContent={'start'}>
                <Image topNav src={data.avatarURL ? FILE_BASE_URL + data.avatarURL : FILE_BASE_URL + DEFAULT_AVATAR}/>
                {data.email}
              </TableBlockStyled>
            </SearchDataBodyContentStyled>
          </SearchDataBodyStyled>
        </SearchDataStyled>
      </ModalLineStyled>
    ));
  };

  render() {
    const { onClose, isOpen, searchData, loading, inputValue, inputType } = this.props;
    let renderData = this.renderProjects;

    switch (inputType) {
      case 'Projects':
        renderData = this.renderProjects();
        break;

      case 'Issues':
        renderData = this.renderIssues();
        break;

      case 'Accounts':
        renderData = this.renderAccounts();
        break;

      default:
        break;
    }

    return (
      <Modal onClose={onClose} isOpen={isOpen} maxWidth={'500px'} isVisible={true}>
        <ModalHeaderStyled>
          <ModalHeaderTitleStyled>
            <span>Search</span>
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
        <ModalContentStyled>
          <Scrollbars
            ref={scroll => this.scroll = scroll}
            autoHide
            autoHeight
            autoHeightMax={550}
            style={{ position: 'relative' }}
          >
            <ModalLineStyled>
              <SearchBox inputValue={inputValue} inputType={inputType} />
            </ModalLineStyled>
            {
              inputValue.length > 0 && !loading &&
                <ModalLineStyled>
                  <AlertStyled type={searchData.length > 0 ? 'success' : 'info'}>
                    <p>{`${searchData.length > 0 ? searchData.length : 'No'} results found for '${inputValue}'`}</p>
                  </AlertStyled>
                </ModalLineStyled>
            }
            {
              loading &&
                <ElementHeaderStyled loading>
                  <LoadingIcon />
                </ElementHeaderStyled>
            }
            {inputValue.length > 0 && renderData}
          </Scrollbars>
        </ModalContentStyled>
      </Modal>
    );
  }
}

ModalSearching.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  searchData: PropTypes.array.isRequired,
  inputValue: PropTypes.string.isRequired,
  inputType: PropTypes.string.isRequired,
  history: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  loadProjectDetails: PropTypes.func.isRequired,
  selectProject: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
  loadIssueDetails: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  loading: state.layout.isLoading,
  searchData: state.layout.searchData,
  inputValue: state.layout.inputValue,
  inputType: state.layout.inputType,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  loadProjectDetails: loadProjectDetails,
  selectProject: selectProject,
  openModal: openModal,
  loadIssueDetails: loadIssueDetails,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ModalSearching);
