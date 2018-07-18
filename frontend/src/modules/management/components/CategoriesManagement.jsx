import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactTable from "react-table";
import SockJsClient from "react-stomp";
import { ICONS, MODAL_TYPE, WEB_SOCKET_URL } from '../../../utils/enums';
import {
  ElementHeaderStyled,
  IssueStatusStyled,
  PageBoardStyled,
  TableBlockStyled,
  TitleElementStyled,
  PageCustomStyled
} from '../../../stylesheets/GeneralStyled';
import { Button } from '../../../stylesheets/Button';
import { openModal } from '../../layout/actions/layout';
import { deleteCategory, loadAllCategories } from '../actions/category';
import Icon from '../../../components/icon/Icon';
import NoDataProps from '../../../components/table/NoDataProps';
import NoDataComponent from '../../../components/table/NoDataComponent';

class CategoriesManagement extends React.Component {

  componentWillMount() {
    const { loadAllCategories } = this.props;

    loadAllCategories();
  }

  onMessageReceive = () => {
    const { loadAllCategories } = this.props;

    loadAllCategories();
  };

  render() {
    const { openModal, categories, loading, deleteCategory } = this.props;
    const styleColumn = {
      style: {
        display: 'flex',
        alignItems: 'center',
        fontSize: '13px'
      },
      headerStyle: {
        textAlign: 'left'
      }
    };
    const columns = [
      {
        Header: 'Name',
        accessor: 'name',
        ...styleColumn,
        Cell: row => (
          <TableBlockStyled
            alignLeft
            onClick={() => openModal(MODAL_TYPE.ADD_CATEGORY)}
          >
            <IssueStatusStyled status={row.original}>
              {row.value}
            </IssueStatusStyled>
          </TableBlockStyled>
        )
      },
      {
        Header: 'Project',
        accessor: 'projects',
        ...styleColumn,
        Cell: row => (
          <PageCustomStyled margin={'0'}>
            {
              row.value.map(project => (
                <TableBlockStyled alignLeft key={project.id} padding={'0 5px'}>
                  {project.name}
                </TableBlockStyled>
              ))
            }
          </PageCustomStyled>
        )
      },
      {
        Header: '',
        style: {
          ...styleColumn.style,
          justifyContent: 'flex-end'
        },
        ...styleColumn.headerStyle,
        Cell: row => (
          <Icon
            icon={ICONS.TRASH}
            color={'#ff3000'}
            width={15}
            height={15}
            margin={'0'}
            onClick={() => deleteCategory(row.original.id)}
          />
        )
      },
    ];

    return (
      <PageBoardStyled backlog>
        <ElementHeaderStyled padding={'0'}>
          <TitleElementStyled noPadding fontSize={'20px'}>
            Categories
          </TitleElementStyled>
          <Button autoWidth hasBorder right onClick={() => openModal(MODAL_TYPE.ADD_CATEGORY)}>
            Add Category
          </Button>
        </ElementHeaderStyled>
        <ReactTable
          data={categories}
          columns={columns}
          getNoDataProps={() => NoDataProps({ loading })}
          NoDataComponent={NoDataComponent}
          defaultPageSize={10}
          className="-striped -highlight"
        />
        <SockJsClient
          url={WEB_SOCKET_URL}
          topics={['/topic/categories']}
          onMessage={this.onMessageReceive}
          debug={true}
        />
      </PageBoardStyled>
    );
  }
}

CategoriesManagement.propTypes = {
  openModal: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  loadAllCategories: PropTypes.func.isRequired,
  deleteCategory: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  categories: state.management.categories,
  loading: state.management.isLoading
});

const mapDispatchToProps = dispatch => bindActionCreators({
  openModal: openModal,
  loadAllCategories: loadAllCategories,
  deleteCategory: deleteCategory
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesManagement);
