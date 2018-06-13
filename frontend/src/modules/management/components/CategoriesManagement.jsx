import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactTable from "react-table";
import { MODAL_TYPE } from '../../../utils/enums';
import { ElementHeaderStyled, PageBoardStyled, TitleElementStyled } from '../../../stylesheets/GeneralStyled';
import { Button } from '../../../stylesheets/Button';
import { openModal } from '../../layout/actions/layout';
import { loadAllCategories } from '../actions/category';

class CategoriesManagement extends React.Component {

  componentWillMount() {
    const { loadAllCategories } = this.props;

    // loadAllCategories();
  }

  render() {
    const { openModal, categories } = this.props;
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
        ...styleColumn
      },
      {
        Header: 'Description',
        accessor: 'description',
        ...styleColumn
      },
      {
        Header: 'Project',
        accessor: 'project',
        ...styleColumn
      },
      {
        Header: 'Action',
        ...styleColumn,
        Cell: row => (
          <Button hasBorder remove>
            Delete
          </Button>
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
          defaultPageSize={10}
          className="-striped -highlight"
        />
      </PageBoardStyled>
    );
  }
}

CategoriesManagement.propTypes = {
  openModal: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  loadAllCategories: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  categories: state.management.categories
});

const mapDispatchToProps = dispatch => bindActionCreators({
  openModal: openModal,
  loadAllCategories: loadAllCategories
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesManagement);
