import React from 'react';
import Select from 'react-select';
import {
  DescriptionElementStyled, ElementHeaderStyled,
  ElementStyled, FormGroupStyled,
  Image,
  LabelStyled,
  PageBoardItemStyled,
  PageBoardStyled, TableBlockStyled,
  TitleElementStyled
} from '../../../stylesheets/GeneralStyled';
import {
  ListTableBodyContainerStyled,
  ListTableBodyItemStyled,
  ListTableBodyStyled,
  ListTableHeaderItemsStyled,
  ListTableHeaderStyled
} from '../../../stylesheets/Table';
import Icon from '../../../components/icon/Icon';
import { ICONS } from '../../../utils/enums';

class Sprint extends React.Component {

  render() {
    return (
      <PageBoardStyled backlog>
        <ElementHeaderStyled padding={'10px 20px'}>
          <TitleElementStyled noPadding>
            Sprint 1
          </TitleElementStyled>
        </ElementHeaderStyled>
        <FormGroupStyled paddingSelect={'10px 0px 10px 20px'} widthSelect={'150px'}>
          <Select placeholder={'Quick Filter'}/>
          <Select placeholder={'Assignee'} />
        </FormGroupStyled>
        <PageBoardStyled noPadding>
          <PageBoardItemStyled>
            <ListTableHeaderStyled>
              <ListTableHeaderItemsStyled>To Do</ListTableHeaderItemsStyled>
            </ListTableHeaderStyled>
            <ListTableBodyContainerStyled>
              <ListTableBodyStyled>
                <ListTableBodyItemStyled flex={'0 0 35px'}>
                  <Icon icon={ICONS.ARROW} color={'#f83f06'} width={15} height={15} rotated rotate={'rotateZ(90deg)'}/>
                </ListTableBodyItemStyled>
                <ListTableBodyItemStyled issueName container>
                  <TitleElementStyled noPadding fontSize={'14px'}>ISSUE-1</TitleElementStyled>
                  <DescriptionElementStyled noPadding>
                    As a product owner, I'd like to include bugs, tasks and other issue types in my backlog >> Bugs like this one will also appear in your backlog but they are not normally estimated
                  </DescriptionElementStyled>
                </ListTableBodyItemStyled>
                <ListTableBodyItemStyled flex={'0 0 35px'}>
                  <Image dynamic={'25px'} src={'/images/default_avatar.jpg'} />
                </ListTableBodyItemStyled>
              </ListTableBodyStyled>
              <ListTableBodyStyled>
                <ListTableBodyItemStyled flex={'0 0 35px'}>
                  <Icon icon={ICONS.ARROW} color={'#f83f06'} width={15} height={15} rotated rotate={'rotateZ(90deg)'}/>
                </ListTableBodyItemStyled>
                <ListTableBodyItemStyled issueName container>
                  <TitleElementStyled noPadding fontSize={'14px'}>ISSUE-2</TitleElementStyled>
                  <DescriptionElementStyled noPadding>
                    This is a sample task. Tasks are used to break down the steps to implement a user story
                  </DescriptionElementStyled>
                </ListTableBodyItemStyled>
                <ListTableBodyItemStyled flex={'0 0 35px'}>
                  <Image dynamic={'25px'} src={'/images/default_avatar.jpg'} />
                </ListTableBodyItemStyled>
              </ListTableBodyStyled>
              <ListTableBodyStyled>
                <ListTableBodyItemStyled flex={'0 0 35px'}>
                  <Icon icon={ICONS.ARROW} color={'#f83f06'} width={15} height={15} rotated rotate={'rotateZ(90deg)'}/>
                </ListTableBodyItemStyled>
                <ListTableBodyItemStyled issueName>
                  ISSUE-3
                </ListTableBodyItemStyled>
                <ListTableBodyItemStyled flex={'0 0 35px'}>
                  <Image dynamic={'25px'} src={'/images/default_avatar.jpg'} />
                </ListTableBodyItemStyled>
              </ListTableBodyStyled>
            </ListTableBodyContainerStyled>
          </PageBoardItemStyled>
          <PageBoardItemStyled>
            <ListTableHeaderStyled>
              <ListTableHeaderItemsStyled>In Progress</ListTableHeaderItemsStyled>
            </ListTableHeaderStyled>
            <ListTableBodyContainerStyled>
              <ListTableBodyStyled>
                <ListTableBodyItemStyled flex={'0 0 35px'}>
                  <Icon icon={ICONS.ARROW} color={'#f83f06'} width={15} height={15} rotated rotate={'rotateZ(90deg)'}/>
                </ListTableBodyItemStyled>
                <ListTableBodyItemStyled issueName container>
                  <TitleElementStyled noPadding fontSize={'14px'}>ISSUE-1</TitleElementStyled>
                  <DescriptionElementStyled noPadding>
                    As a product owner, I'd like to include bugs, tasks and other issue types in my backlog >> Bugs like this one will also appear in your backlog but they are not normally estimated
                  </DescriptionElementStyled>
                </ListTableBodyItemStyled>
                <ListTableBodyItemStyled flex={'0 0 35px'}>
                  <Image dynamic={'25px'} src={'/images/default_avatar.jpg'} />
                </ListTableBodyItemStyled>
              </ListTableBodyStyled>
              <ListTableBodyStyled>
                <ListTableBodyItemStyled flex={'0 0 35px'}>
                  <Icon icon={ICONS.ARROW} color={'#f83f06'} width={15} height={15} rotated rotate={'rotateZ(90deg)'}/>
                </ListTableBodyItemStyled>
                <ListTableBodyItemStyled issueName container>
                  <TitleElementStyled noPadding fontSize={'14px'}>ISSUE-2</TitleElementStyled>
                  <DescriptionElementStyled noPadding>
                    This is a sample task. Tasks are used to break down the steps to implement a user story
                  </DescriptionElementStyled>
                </ListTableBodyItemStyled>
                <ListTableBodyItemStyled flex={'0 0 35px'}>
                  <Image dynamic={'25px'} src={'/images/default_avatar.jpg'} />
                </ListTableBodyItemStyled>
              </ListTableBodyStyled>
              <ListTableBodyStyled>
                <ListTableBodyItemStyled flex={'0 0 35px'}>
                  <Icon icon={ICONS.ARROW} color={'#f83f06'} width={15} height={15} rotated rotate={'rotateZ(90deg)'}/>
                </ListTableBodyItemStyled>
                <ListTableBodyItemStyled issueName>
                  ISSUE-3
                </ListTableBodyItemStyled>
                <ListTableBodyItemStyled flex={'0 0 35px'}>
                  <Image dynamic={'25px'} src={'/images/default_avatar.jpg'} />
                </ListTableBodyItemStyled>
              </ListTableBodyStyled>
            </ListTableBodyContainerStyled>
          </PageBoardItemStyled>
          <PageBoardItemStyled>
            <ListTableHeaderStyled>
              <ListTableHeaderItemsStyled>Testing</ListTableHeaderItemsStyled>
            </ListTableHeaderStyled>
            <ListTableBodyContainerStyled>
              <ListTableBodyStyled>
                <ListTableBodyItemStyled flex={'0 0 35px'}>
                  <Icon icon={ICONS.ARROW} color={'#f83f06'} width={15} height={15} rotated rotate={'rotateZ(90deg)'}/>
                </ListTableBodyItemStyled>
                <ListTableBodyItemStyled issueName container>
                  <TitleElementStyled noPadding fontSize={'14px'}>ISSUE-1</TitleElementStyled>
                  <DescriptionElementStyled noPadding>
                    As a product owner, I'd like to include bugs, tasks and other issue types in my backlog >> Bugs like this one will also appear in your backlog but they are not normally estimated
                  </DescriptionElementStyled>
                </ListTableBodyItemStyled>
                <ListTableBodyItemStyled flex={'0 0 35px'}>
                  <Image dynamic={'25px'} src={'/images/default_avatar.jpg'} />
                </ListTableBodyItemStyled>
              </ListTableBodyStyled>
              <ListTableBodyStyled>
                <ListTableBodyItemStyled flex={'0 0 35px'}>
                  <Icon icon={ICONS.ARROW} color={'#f83f06'} width={15} height={15} rotated rotate={'rotateZ(90deg)'}/>
                </ListTableBodyItemStyled>
                <ListTableBodyItemStyled issueName container>
                  <TitleElementStyled noPadding fontSize={'14px'}>ISSUE-2</TitleElementStyled>
                  <DescriptionElementStyled noPadding>
                    This is a sample task. Tasks are used to break down the steps to implement a user story
                  </DescriptionElementStyled>
                </ListTableBodyItemStyled>
                <ListTableBodyItemStyled flex={'0 0 35px'}>
                  <Image dynamic={'25px'} src={'/images/default_avatar.jpg'} />
                </ListTableBodyItemStyled>
              </ListTableBodyStyled>
              <ListTableBodyStyled>
                <ListTableBodyItemStyled flex={'0 0 35px'}>
                  <Icon icon={ICONS.ARROW} color={'#f83f06'} width={15} height={15} rotated rotate={'rotateZ(90deg)'}/>
                </ListTableBodyItemStyled>
                <ListTableBodyItemStyled issueName>
                  ISSUE-3
                </ListTableBodyItemStyled>
                <ListTableBodyItemStyled flex={'0 0 35px'}>
                  <Image dynamic={'25px'} src={'/images/default_avatar.jpg'} />
                </ListTableBodyItemStyled>
              </ListTableBodyStyled>
            </ListTableBodyContainerStyled>
          </PageBoardItemStyled>
          <PageBoardItemStyled>
            <ListTableHeaderStyled>
              <ListTableHeaderItemsStyled>Done</ListTableHeaderItemsStyled>
            </ListTableHeaderStyled>
            <ListTableBodyContainerStyled>
              <ListTableBodyStyled>
                <ListTableBodyItemStyled flex={'0 0 35px'}>
                  <Icon icon={ICONS.ARROW} color={'#f83f06'} width={15} height={15} rotated rotate={'rotateZ(90deg)'}/>
                </ListTableBodyItemStyled>
                <ListTableBodyItemStyled issueName container>
                  <TitleElementStyled noPadding fontSize={'14px'}>ISSUE-5</TitleElementStyled>
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
                  <Image dynamic={'25px'} src={'/images/default_avatar.jpg'} />
                </ListTableBodyItemStyled>
              </ListTableBodyStyled>
              <ListTableBodyStyled>
                <ListTableBodyItemStyled flex={'0 0 35px'}>
                  <Icon icon={ICONS.ARROW} color={'#f83f06'} width={15} height={15} rotated rotate={'rotateZ(90deg)'}/>
                </ListTableBodyItemStyled>
                <ListTableBodyItemStyled issueName>
                  ISSUE-2
                </ListTableBodyItemStyled>
                <ListTableBodyItemStyled flex={'0 0 35px'}>
                  <Image dynamic={'25px'} src={'/images/default_avatar.jpg'} />
                </ListTableBodyItemStyled>
              </ListTableBodyStyled>
              <ListTableBodyStyled>
                <ListTableBodyItemStyled flex={'0 0 35px'}>
                  <Icon icon={ICONS.ARROW} color={'#f83f06'} width={15} height={15} rotated rotate={'rotateZ(90deg)'}/>
                </ListTableBodyItemStyled>
                <ListTableBodyItemStyled issueName>
                  ISSUE-3
                </ListTableBodyItemStyled>
                <ListTableBodyItemStyled flex={'0 0 35px'}>
                  <Image dynamic={'25px'} src={'/images/default_avatar.jpg'} />
                </ListTableBodyItemStyled>
              </ListTableBodyStyled>
            </ListTableBodyContainerStyled>
          </PageBoardItemStyled>
        </PageBoardStyled>
      </PageBoardStyled>
    );
  }
}

export default Sprint;
