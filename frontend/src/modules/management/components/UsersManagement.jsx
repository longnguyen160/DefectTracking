import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactTable from "react-table";
import { MODAL_TYPE } from '../../../utils/enums';
import { ElementHeaderStyled, PageBoardStyled, TitleElementStyled } from '../../../stylesheets/GeneralStyled';
import { Button } from '../../../stylesheets/Button';
import { openModal } from '../../layout/actions/layout';

class UsersManagement extends React.Component {
  render() {
    const { openModal } = this.props;
    const data = [
      {
        userID: '1',
        username: 'nhanhtse61580@gmail.com',
        password: '123456',
        fullname: 'huynh tunhan',
        email: 'nhanhtse61580@gmail.com',
        enable: 'true',
        phone: '090.000000',
        accessRole: 'admin'
      },
      {
        userID: '2',
        username: 'nhanhtse61580@gmail.com',
        password: '123456',
        fullname: 'huynh tunhan',
        email: 'nhanhtse61580@gmail.com',
        enable: 'true',
        phone: '090.000000',
        accessRole: 'admin'
      },
      {

        userID: '3',
        username: 'nhanhtse61580@gmail.com',
        password: '123456',
        fullname: 'huynh tunhan',
        email: 'nhanhtse61580@gmail.com',
        enable: 'true',
        phone: '090.000000',
        accessRole: 'admin'
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
        Header: 'UserID',
        accessor: 'userID',
        ...styleColumn
      },
      {
        Header: 'Username',
        accessor: 'username',
        ...styleColumn
      },
      {
        Header: 'Password',
        accessor: 'password',
        ...styleColumn
      },
      {
        Header: 'Fullname',
        accessor: 'fullname',
        ...styleColumn
      },
      {
        Header: 'Email',
        accessor: 'email',
        ...styleColumn
      },
      {
        Header: 'Enable',
        accessor: 'enable',
        ...styleColumn
      },
      {
        Header: 'Phone',
        accessor: 'phone',
        ...styleColumn
      },
      {
        Header: 'Role',
        accessor: 'accessRole',
        ...styleColumn
      },
      {
        Header: 'Action',
        ...styleColumn,

        Cell: row => (
          <div>
          <Button hasBorder remove>
            Ban account
          </Button>

        </div>
        ),
      },

    ];


    return (
      <PageBoardStyled backlog>
        <ElementHeaderStyled padding={'0'}>
          <TitleElementStyled noPadding fontSize={'20px'}>
            Users
          </TitleElementStyled>
          <Button autoWidth hasBorder right onClick={() => openModal(MODAL_TYPE.ADD_CATEGORY)}>
            Add New User
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

UsersManagement.propTypes = {
  openModal: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => bindActionCreators({
  openModal: openModal
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UsersManagement);
