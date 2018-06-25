import React from 'react';
import PropTypes from 'prop-types';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { ListTableBodyContainerStyled } from '../../../stylesheets/Table';
import BacklogIssueDetails from './BacklogIssueDetails';

class BacklogDetails extends React.Component {

  renderItem = (parentProvided, data) => {
    return (
      <ListTableBodyContainerStyled innerRef={parentProvided.innerRef} dynamicHeight>
        {
          data.map((item, index) => (
            <Draggable key={item} draggableId={item} index={index}>
              {
                (provided, snapshot) => (
                  <BacklogIssueDetails
                    showList
                    issueId={item}
                    key={item}
                    isDragging={snapshot.isDragging}
                    innerRef={provided.innerRef}
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                  />
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
