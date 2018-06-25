import React from 'react';
import PropTypes from 'prop-types';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { ListTableBodyContainerStyled, ListTableBodyItemStyled, ListTableBodyStyled } from '../../../stylesheets/Table';
import BacklogIssueDetails from './BacklogIssueDetails';

class BacklogDetails extends React.Component {

  renderItem = (parentProvided, data) => {
    return (
      <ListTableBodyContainerStyled innerRef={parentProvided.innerRef} dynamicHeight>
        {
          data.map((item, index) => (
            <Draggable key={item} draggableId={item} index={index}>
              {
                (provided, snapshot) => item && (
                  <BacklogIssueDetails
                    showList
                    issueId={item}
                    key={item}
                    isDragging={snapshot.isDragging}
                    innerRef={provided.innerRef}
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                  />
                  // <ListTableBodyStyled
                  //   showList
                  //   key={item.id}
                  //   isDragging={snapshot.isDragging}
                  //   innerRef={provided.innerRef}
                  //   {...provided.dragHandleProps}
                  //   {...provided.draggableProps}
                  // >
                  //   <ListTableBodyItemStyled itemId>
                  //     {item.id}
                  //   </ListTableBodyItemStyled>
                  //   <ListTableBodyItemStyled issueName>
                  //     {item.name}
                  //   </ListTableBodyItemStyled>
                  //   <ListTableBodyItemStyled priority>
                  //     {item.priority}
                  //   </ListTableBodyItemStyled>
                  // </ListTableBodyStyled>
                )
              }
            </Draggable>
          ))
        }
        {parentProvided.placeholder}
      </ListTableBodyContainerStyled>
    );
  };

  render() {
    const { data, listId, listType } = this.props;

    return (
      <Droppable
        droppableId={listId}
        type={listType}
      >
        {
          (provided) => (
            this.renderItem(provided, data)
          )
        }
      </Droppable>
    );
  }
}

BacklogDetails.propTypes = {
  data: PropTypes.array.isRequired,
  listId: PropTypes.string.isRequired,
  listType: PropTypes.string.isRequired
};

export default BacklogDetails;
