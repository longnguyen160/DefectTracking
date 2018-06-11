import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  PageBoardStyled,
  PageBoardItemStyled,
  TitleElementStyled,
  ElementHeaderStyled,
} from '../../../stylesheets/GeneralStyled';
import {
  ListTableHeaderStyled,
  ListTableHeaderItemsStyled,
  ListTableBodyStyled,
  ListTableBodyItemStyled,
  ListTableBodyContainerStyled
} from '../../../stylesheets/Table';
import { openModal, resetProject } from '../../layout/actions/layout';
import { bindActionCreators } from 'redux';
import { MODAL_TYPE } from '../../../utils/enums';

class Home extends React.Component {

  componentWillMount() {
    const { resetProject } = this.props;

    resetProject();
  }

  render() {
    const { openModal } = this.props;

    return (
      <PageBoardStyled>
        <PageBoardItemStyled>
          <ElementHeaderStyled>
            <TitleElementStyled noPadding>
              Assigned to me
            </TitleElementStyled>
          </ElementHeaderStyled>
          <div>
            <div>
              <ListTableHeaderStyled>
                <ListTableHeaderItemsStyled itemId>Issue</ListTableHeaderItemsStyled>
                <ListTableHeaderItemsStyled issueName>Name</ListTableHeaderItemsStyled>
                <ListTableHeaderItemsStyled priority>Priority</ListTableHeaderItemsStyled>
              </ListTableHeaderStyled>
              <ListTableBodyContainerStyled>
                <ListTableBodyStyled showList onClick={() => openModal(MODAL_TYPE.ISSUE_DETAILS)}>
                  <ListTableBodyItemStyled itemId>
                    ISSUE-1
                  </ListTableBodyItemStyled>
                  <ListTableBodyItemStyled issueName>
                    As a developer, I'd like to update story status during the sprint >> Click the Active sprints link at the top right of the screen to go to the Active sprints where the current Sprint's items can be updated
                  </ListTableBodyItemStyled>
                  <ListTableBodyItemStyled priority>
                    High
                  </ListTableBodyItemStyled>
                </ListTableBodyStyled>
                <ListTableBodyStyled showList>
                  <ListTableBodyItemStyled itemId>
                    ISSUE-1
                  </ListTableBodyItemStyled>
                  <ListTableBodyItemStyled issueName>
                    As a team, I'd like to commit to a set of stories to be completed in a sprint (or iteration) >> Click "Create Sprint" then drag the footer down to select issues for a sprint (you can't start a sprint at the moment because one is already active)
                  </ListTableBodyItemStyled>
                  <ListTableBodyItemStyled priority>
                    High
                  </ListTableBodyItemStyled>
                </ListTableBodyStyled>
                <ListTableBodyStyled showList>
                  <ListTableBodyItemStyled itemId>
                    ISSUE-1
                  </ListTableBodyItemStyled>
                  <ListTableBodyItemStyled issueName>
                    As a developer, I'd like to update story status during the sprint >> Click the Active sprints link at the top right of the screen to go to the Active sprints where the current Sprint's items can be updated
                  </ListTableBodyItemStyled>
                  <ListTableBodyItemStyled priority>
                    High
                  </ListTableBodyItemStyled>
                </ListTableBodyStyled>
                <ListTableBodyStyled showList>
                  <ListTableBodyItemStyled itemId>
                    ISSUE-1
                  </ListTableBodyItemStyled>
                  <ListTableBodyItemStyled issueName>
                    As a developer, I'd like to update story status during the sprint >> Click the Active sprints link at the top right of the screen to go to the Active sprints where the current Sprint's items can be updated
                  </ListTableBodyItemStyled>
                  <ListTableBodyItemStyled priority>
                    High
                  </ListTableBodyItemStyled>
                </ListTableBodyStyled>
                <ListTableBodyStyled showList>
                  <ListTableBodyItemStyled itemId>
                    ISSUE-1
                  </ListTableBodyItemStyled>
                  <ListTableBodyItemStyled issueName>
                    As a developer, I'd like to update story status during the sprint >> Click the Active sprints link at the top right of the screen to go to the Active sprints where the current Sprint's items can be updated
                  </ListTableBodyItemStyled>
                  <ListTableBodyItemStyled priority>
                    High
                  </ListTableBodyItemStyled>
                </ListTableBodyStyled>
                <ListTableBodyStyled showList>
                  <ListTableBodyItemStyled itemId>
                    ISSUE-1
                  </ListTableBodyItemStyled>
                  <ListTableBodyItemStyled issueName>
                    As a developer, I'd like to update story status during the sprint >> Click the Active sprints link at the top right of the screen to go to the Active sprints where the current Sprint's items can be updated
                  </ListTableBodyItemStyled>
                  <ListTableBodyItemStyled priority>
                    High
                  </ListTableBodyItemStyled>
                </ListTableBodyStyled>
                <ListTableBodyStyled showList>
                  <ListTableBodyItemStyled itemId>
                    ISSUE-1
                  </ListTableBodyItemStyled>
                  <ListTableBodyItemStyled issueName>
                    As a developer, I'd like to update story status during the sprint >> Click the Active sprints link at the top right of the screen to go to the Active sprints where the current Sprint's items can be updated
                  </ListTableBodyItemStyled>
                  <ListTableBodyItemStyled priority>
                    High
                  </ListTableBodyItemStyled>
                </ListTableBodyStyled>
                <ListTableBodyStyled showList>
                  <ListTableBodyItemStyled itemId>
                    ISSUE-1
                  </ListTableBodyItemStyled>
                  <ListTableBodyItemStyled issueName>
                    As a developer, I'd like to update story status during the sprint >> Click the Active sprints link at the top right of the screen to go to the Active sprints where the current Sprint's items can be updated
                  </ListTableBodyItemStyled>
                  <ListTableBodyItemStyled priority>
                    High
                  </ListTableBodyItemStyled>
                </ListTableBodyStyled>
                <ListTableBodyStyled showList>
                  <ListTableBodyItemStyled itemId>
                    ISSUE-1
                  </ListTableBodyItemStyled>
                  <ListTableBodyItemStyled issueName>
                    As a developer, I'd like to update story status during the sprint >> Click the Active sprints link at the top right of the screen to go to the Active sprints where the current Sprint's items can be updated
                  </ListTableBodyItemStyled>
                  <ListTableBodyItemStyled priority>
                    High
                  </ListTableBodyItemStyled>
                </ListTableBodyStyled>
              </ListTableBodyContainerStyled>
            </div>
          </div>
        </PageBoardItemStyled>
        <PageBoardItemStyled activity>
          <ElementHeaderStyled>
            <TitleElementStyled noPadding>
              Activity history
            </TitleElementStyled>
          </ElementHeaderStyled>
          <div>
            <div>
              <ListTableBodyContainerStyled borderTop activity>
                <ListTableBodyStyled showList>
                  <ListTableBodyItemStyled itemId>
                    ISSUE-1
                  </ListTableBodyItemStyled>
                  <ListTableBodyItemStyled issueName>
                    As a developer, I'd like to update story status during the sprint >> Click the Active sprints link at the top right of the screen to go to the Active sprints where the current Sprint's items can be updated
                  </ListTableBodyItemStyled>
                  <ListTableBodyItemStyled priority>
                    High
                  </ListTableBodyItemStyled>
                </ListTableBodyStyled>
                <ListTableBodyStyled showList>
                  <ListTableBodyItemStyled itemId>
                    ISSUE-1
                  </ListTableBodyItemStyled>
                  <ListTableBodyItemStyled issueName>
                    As a developer, I'd like to update story status during the sprint >> Click the Active sprints link at the top right of the screen to go to the Active sprints where the current Sprint's items can be updated
                  </ListTableBodyItemStyled>
                  <ListTableBodyItemStyled priority>
                    High
                  </ListTableBodyItemStyled>
                </ListTableBodyStyled>
                <ListTableBodyStyled showList>
                  <ListTableBodyItemStyled itemId>
                    ISSUE-1
                  </ListTableBodyItemStyled>
                  <ListTableBodyItemStyled issueName>
                    As a developer, I'd like to update story status during the sprint >> Click the Active sprints link at the top right of the screen to go to the Active sprints where the current Sprint's items can be updated
                  </ListTableBodyItemStyled>
                  <ListTableBodyItemStyled priority>
                    High
                  </ListTableBodyItemStyled>
                </ListTableBodyStyled>
                <ListTableBodyStyled showList>
                  <ListTableBodyItemStyled itemId>
                    ISSUE-1
                  </ListTableBodyItemStyled>
                  <ListTableBodyItemStyled issueName>
                    As a developer, I'd like to update story status during the sprint >> Click the Active sprints link at the top right of the screen to go to the Active sprints where the current Sprint's items can be updated
                  </ListTableBodyItemStyled>
                  <ListTableBodyItemStyled priority>
                    High
                  </ListTableBodyItemStyled>
                </ListTableBodyStyled>
                <ListTableBodyStyled showList>
                  <ListTableBodyItemStyled itemId>
                    ISSUE-1
                  </ListTableBodyItemStyled>
                  <ListTableBodyItemStyled issueName>
                    As a developer, I'd like to update story status during the sprint >> Click the Active sprints link at the top right of the screen to go to the Active sprints where the current Sprint's items can be updated
                  </ListTableBodyItemStyled>
                  <ListTableBodyItemStyled priority>
                    High
                  </ListTableBodyItemStyled>
                </ListTableBodyStyled>
                <ListTableBodyStyled showList>
                  <ListTableBodyItemStyled itemId>
                    ISSUE-1
                  </ListTableBodyItemStyled>
                  <ListTableBodyItemStyled issueName>
                    As a developer, I'd like to update story status during the sprint >> Click the Active sprints link at the top right of the screen to go to the Active sprints where the current Sprint's items can be updated
                  </ListTableBodyItemStyled>
                  <ListTableBodyItemStyled priority>
                    High
                  </ListTableBodyItemStyled>
                </ListTableBodyStyled>
                <ListTableBodyStyled showList>
                  <ListTableBodyItemStyled itemId>
                    ISSUE-1
                  </ListTableBodyItemStyled>
                  <ListTableBodyItemStyled issueName>
                    As a developer, I'd like to update story status during the sprint >> Click the Active sprints link at the top right of the screen to go to the Active sprints where the current Sprint's items can be updated
                  </ListTableBodyItemStyled>
                  <ListTableBodyItemStyled priority>
                    High
                  </ListTableBodyItemStyled>
                </ListTableBodyStyled>
                <ListTableBodyStyled showList>
                  <ListTableBodyItemStyled itemId>
                    ISSUE-1
                  </ListTableBodyItemStyled>
                  <ListTableBodyItemStyled issueName>
                    As a developer, I'd like to update story status during the sprint >> Click the Active sprints link at the top right of the screen to go to the Active sprints where the current Sprint's items can be updated
                  </ListTableBodyItemStyled>
                  <ListTableBodyItemStyled priority>
                    High
                  </ListTableBodyItemStyled>
                </ListTableBodyStyled>
              </ListTableBodyContainerStyled>
            </div>
          </div>
        </PageBoardItemStyled>
      </PageBoardStyled>
    );
  }
}

Home.propTypes = {
  resetProject: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => bindActionCreators({
  resetProject: resetProject,
  openModal: openModal
}, dispatch);

export default connect(null, mapDispatchToProps)(Home);

