import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactTable from "react-table";
import { MODAL_TYPE } from '../../../utils/enums';
import { ElementHeaderStyled, PageBoardStyled, TitleElementStyled } from '../../../stylesheets/GeneralStyled';
import { Button } from '../../../stylesheets/Button';
import { openModal } from '../../layout/actions/layout';

class CategoriesManagement extends React.Component {
  render() {
    const { openModal } = this.props;
    const data = [
      {
        name: 'Technology',
        description: 'blah blah blah',
        project: 'ewq'
      },
      {
        name: 'Music',
        description: 'la la la la la',
        project: 'def'
      },
      {
        name: 'App',
        description: 'he he he he he',
        project: 'abc'
      },
    ];
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
          data={data}
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
};

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => bindActionCreators({
  openModal: openModal
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesManagement);
