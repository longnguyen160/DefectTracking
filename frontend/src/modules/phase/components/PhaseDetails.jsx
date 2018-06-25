import React from 'react';
import PropTypes from 'prop-types';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { ListTableBodyContainerStyled, ListTableBodyItemStyled, ListTableBodyStyled } from '../../../stylesheets/Table';
import { ICONS, ISSUE_PRIORITY_ARRAY } from '../../../utils/enums';
import {
  DescriptionElementStyled,
  Image, LabelStyled,
  TableBlockStyled,
  TitleElementStyled
} from '../../../stylesheets/GeneralStyled';
import Icon from '../../../components/icon/Icon';

class PhaseDetails extends React.Component {

  renderItem = (parentProvided, data) => {
    return (
      <ListTableBodyContainerStyled innerRef={parentProvided.innerRef} dynamicHeight>
        {
          data.map((item, index) => {
            const priority = ISSUE_PRIORITY_ARRAY.find(element => element.value === item.priority);

            return (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {
                  (provided, snapshot) => (
                    <ListTableBodyStyled
                      showList
                      key={item.id}
                      isDragging={snapshot.isDragging}
                      innerRef={provided.innerRef}
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                    >
                      <ListTableBodyItemStyled flex={'0 0 35px'}>
                        <Icon
                          icon={ICONS.ARROW}
                          color={priority.color}
                          width={15}
                          height={15}
                          rotated
                          rotate={'rotateZ(90deg)'}
                        />
                      </ListTableBodyItemStyled>
                      <ListTableBodyItemStyled issueName container>
                        <TitleElementStyled noPadding fontSize={'14px'}>{item.issueKey}</TitleElementStyled>
                        <DescriptionElementStyled noPadding>
                          {item.summary}
                        </DescriptionElementStyled>
                        <TableBlockStyled alignLeft>
                          <LabelStyled fontSize={'10px'}>
                            Front end
                          </LabelStyled>
                          <LabelStyled fontSize={'10px'} color={'#f83f06'} textColor={'#fff'}>
                            Back end
                          </LabelStyled>
                        </TableBlockStyled>
                      </ListTableBodyItemStyled>
                      <ListTableBodyItemStyled flex={'0 0 35px'}>
                        <Image dynamic={'25px'} src={item.assignee.avatarURL}/>
                      </ListTableBodyItemStyled>
                    </ListTableBodyStyled>
                  )
                }
              </Draggable>
            );
          })
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

PhaseDetails.propTypes = {
  data: PropTypes.array.isRequired,
  listId: PropTypes.string.isRequired,
  listType: PropTypes.string.isRequired
};

export default PhaseDetails;
