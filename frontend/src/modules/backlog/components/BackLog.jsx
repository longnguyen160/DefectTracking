import React from 'react';
import Select from 'react-select';
import { DragDropContext } from 'react-beautiful-dnd';
import {
  ElementHeaderStyled,
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

class BackLog extends React.Component {

  constructor(props) {
    super(props);

    const object = {
      id: 'ISSUE-1',
      name: 'As a developer, I\'d like to update story status during the sprint >> Click the Active sprints link at the top right of the screen to go to the Active sprints where the current Phase\'s items can be updated',
      priority: 'High'
    };
    const b = [];
    const a = [];

    for (let i = 1; i <= 10; i+=1) {
      a.push({
        ...object,
        id: `ISSUE-${i}`
      });
    }

    for (let i = 11; i <= 20; i+=1) {
      b.push({
        ...object,
        id: `ISSUE-${i}`
      });
    }

    this.state = {
      list: {
        a,
        b
      }
    };
  }

  onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const { list } = this.state;

    this.setState({
      list: reorderMap(
        list,
        result.source,
        result.destination
      ),
    });
  };

  render() {
    const { list } = this.state;

    return (
      <PageBoardStyled backlog>
        <PageBoardItemStyled>
          <Select
            isSearchable={false}
            placeholder={'Quick filter'}
            options={[
              { value: 'My Issue', label: 'One' },
              { value: 'All Issue', label: 'Two' }
            ]}
            classNamePrefix="react-select"
          />
        </PageBoardItemStyled>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <PageBoardItemStyled>
            <ElementHeaderStyled padding={'20px 5px'}>
              <TitleElementStyled noPadding flex={'0 0 85px'}>
                Phase 1
              </TitleElementStyled>
              <TitleElementStyled noPadding fontWeight={400} fontSize={'14px'}>
                14 Issues
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
                  listId="a"
                  listType="card"
                  data={list.a}
                />
              </div>
            </div>
          </PageBoardItemStyled>
          <PageBoardItemStyled activity>
            <ElementHeaderStyled padding={'20px 5px'}>
              <TitleElementStyled noPadding flex={'0 0 85px'}>
                Waiting
              </TitleElementStyled>
              <TitleElementStyled noPadding fontWeight={400} fontSize={'14px'}>
                14 Issues
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
                  listId="b"
                  listType="card"
                  data={list.b}
                />
              </div>
            </div>
          </PageBoardItemStyled>
        </DragDropContext>
      </PageBoardStyled>
    );
  }
}

export default BackLog;
