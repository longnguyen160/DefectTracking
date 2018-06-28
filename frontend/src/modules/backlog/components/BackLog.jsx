import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Select from 'react-select';
import { DragDropContext } from 'react-beautiful-dnd';
import SockJsClient from "react-stomp";
import {
  ElementHeaderStyled, FormGroupStyled,
  PageBoardItemStyled,
  PageBoardStyled,
  TitleElementStyled
} from '../../../stylesheets/GeneralStyled';
import {
  ListTableHeaderItemsStyled,
  ListTableHeaderStyled
} from '../../../stylesheets/Table';
import BacklogDetails from './BacklogDetails';
import { reorderMap } from '../../../utils/ultis';
import { Button } from '../../../stylesheets/Button';
import { loadProjectDetails, openModal } from '../../layout/actions/layout';
import { ICONS, ISSUE_PRIORITY_ARRAY, ISSUE_STATUS_ARRAY, MODAL_TYPE, WEB_SOCKET_URL } from '../../../utils/enums';
import { updateBacklog } from '../actions/backlog';
import Icon from '../../../components/icon/Icon';
import Column from './Column';
import CustomOptionForSelect from '../../../components/form/CustomOptionForSelect';
import CustomValueForSelect from '../../../components/form/CustomValueForSelect';

class BackLog extends React.Component {

  constructor(props) {
    super(props);

    const { selectedProject } = props;

    this.state = {
      view: 'list',
      list: {
        backlog: selectedProject ? selectedProject.backlog : []
      }
    };
  }

  componentWillReceiveProps(nextProps) {
    const { selectedProject } = nextProps;

    if (JSON.stringify(selectedProject) !== JSON.stringify(this.props.selectedProject)) {
      const list = {
        backlog: selectedProject.backlog
      };

      this.setState({ list });
    }
  }

  handleChangeView = (type) => {
    this.setState({ view: type });
  };

  onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const { list } = this.state;
    const { selectedProject, updateBacklog } = this.props;
    const updatedList = reorderMap(
      list,
      result.source,
      result.destination
    );

    this.setState({
      list: updatedList,
    });

    if (JSON.stringify(updatedList.backlog) !== JSON.stringify(selectedProject.backlog)) {
      updateBacklog(selectedProject.id, updatedList.backlog);
    }
  };

  optionComponent = () => {
    return (props) => (
      <CustomOptionForSelect
        name={'priority'}
        {...props}
      />
    );
  };

  valueComponent = () => {
    return (props) => (
      <CustomValueForSelect
        name={'priority'}
        {...props}
      />
    );
  };

  onMessageReceive = () => {
    const { selectedProject, loadProjectDetails } = this.props;

    loadProjectDetails(selectedProject.id);
  };

  render() {
    const { list, view } = this.state;

    return (
      <PageBoardStyled backlog>
        <ElementHeaderStyled padding={'0'}>
          <TitleElementStyled noPadding fontSize={'20px'}>
            Dashboard
          </TitleElementStyled>
          <TitleElementStyled noPadding flex={'0 0 60px'}>
            <Icon
              icon={ICONS.MENU}
              color={view === 'list' ? '#d1d1d1' : '#1A1A1A'}
              width={20}
              height={20}
              margin={'0 5px'}
              onClick={() => this.handleChangeView('list')}
            />
            |
            <Icon
              icon={ICONS.COLUMN}
              color={view === 'column' ? '#d1d1d1' : '#1A1A1A'}
              width={15}
              height={15}
              margin={'0 5px'}
              onClick={() => this.handleChangeView('column')}
            />
          </TitleElementStyled>
        </ElementHeaderStyled>
        <FormGroupStyled visible>
          <Select
            isSearchable={false}
            placeholder={'Status'}
            options={ISSUE_STATUS_ARRAY}
            valueKey={'value'}
            labelKey={'value'}
            classNamePrefix="react-select"
          />
          <Select
            isSearchable={false}
            placeholder={'Priority'}
            options={ISSUE_PRIORITY_ARRAY}
            name={'priority'}
            optionComponent={this.optionComponent()}
            valueComponent={this.valueComponent()}
            classNamePrefix="react-select"
          />
          <Select
            isSearchable={false}
            placeholder={'Assignee'}
            options={[
              { value: 'My Issue', label: 'One' },
              { value: 'All Issue', label: 'Two' }
            ]}
            classNamePrefix="react-select"
          />
          <Select
            isSearchable={false}
            placeholder={'Reporter'}
            options={[
              { value: 'My Issue', label: 'One' },
              { value: 'All Issue', label: 'Two' }
            ]}
            classNamePrefix="react-select"
          />
          <Select
            isSearchable={false}
            placeholder={'Category'}
            options={[
              { value: 'My Issue', label: 'One' },
              { value: 'All Issue', label: 'Two' }
            ]}
            classNamePrefix="react-select"
          />
        </FormGroupStyled>
        {
          view === 'list' ?
            <DragDropContext onDragEnd={this.onDragEnd}>
              <PageBoardItemStyled activity margin={'0'}>
                <ElementHeaderStyled padding={'20px 5px'}>
                  <TitleElementStyled noPadding flex={'0 0 85px'}>
                    Issues
                  </TitleElementStyled>
                  <TitleElementStyled noPadding fontWeight={400} fontSize={'14px'}>
                    {list.backlog.length} Issues
                  </TitleElementStyled>
                </ElementHeaderStyled>
                <div>
                  <div>
                    <ListTableHeaderStyled>
                      <ListTableHeaderItemsStyled itemId>Issue</ListTableHeaderItemsStyled>
                      <ListTableHeaderItemsStyled issueName>Name</ListTableHeaderItemsStyled>
                      <ListTableHeaderItemsStyled priority>Priority</ListTableHeaderItemsStyled>
                    </ListTableHeaderStyled>
                    <BacklogDetails
                      listId="backlog"
                      listType="card"
                      data={list.backlog}
                    />
                  </div>
                </div>
              </PageBoardItemStyled>
            </DragDropContext>
          :
            <Column />
        }
        <SockJsClient
          url={WEB_SOCKET_URL}
          topics={['/topic/issuesList']}
          onMessage={this.onMessageReceive}
          debug={true}
        />
      </PageBoardStyled>
    );
  }
}

BackLog.propTypes = {
  loadProjectDetails: PropTypes.func.isRequired,
  updateBacklog: PropTypes.func.isRequired,
  selectedProject: PropTypes.object
};

const mapStateToProps = state => ({
  selectedProject: state.layout.selectedProject
});

const mapDispatchToProps = dispatch => bindActionCreators({
  loadProjectDetails: loadProjectDetails,
  updateBacklog: updateBacklog,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BackLog);
