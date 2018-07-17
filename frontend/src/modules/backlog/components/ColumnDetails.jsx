import React from 'react';
import PropTypes from 'prop-types';
import LinesEllipsis from 'react-lines-ellipsis';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { ListTableBodyContainerStyled, ListTableBodyItemStyled, ListTableBodyStyled } from '../../../stylesheets/Table';
import { FILE_BASE_URL, ICONS, ISSUE_PRIORITY_ARRAY, MODAL_TYPE } from '../../../utils/enums';
import {
  DescriptionElementStyled,
  Image, LabelStyled,
  TableBlockStyled,
  TitleElementStyled
} from '../../../stylesheets/GeneralStyled';
import Icon from '../../../components/icon/Icon';

class ColumnDetails extends React.Component {

  handleOpenModal = (issueId) => {
    const { openModal, loadIssueDetails } = this.props;

    loadIssueDetails(issueId, true);
    openModal(MODAL_TYPE.ISSUE_DETAILS);
  };

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
                      key={item.id}
                      isDragging={snapshot.isDragging}
                      innerRef={provided.innerRef}
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                      onClick={() => this.handleOpenModal(item.id)}
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
                          <LinesEllipsis
                            text={item.summary}
                            maxLine='3'
                            ellipsis='...'
                            trimRight
                            basedOn='letters'
                          />
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
                        <Image dynamic={'25px'} src={FILE_BASE_URL + item.assignee.avatarURL}/>
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

ColumnDetails.propTypes = {
  data: PropTypes.array.isRequired,
  listId: PropTypes.string.isRequired,
  listType: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
  loadIssueDetails: PropTypes.func.isRequired
};

export default ColumnDetails;
