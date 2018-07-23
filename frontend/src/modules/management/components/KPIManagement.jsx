import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SockJsClient from "react-stomp";
import ReactTable from 'react-table';
import NoDataProps from '../../../components/table/NoDataProps';
import { WEB_SOCKET_URL } from '../../../utils/enums';
import NoDataComponent from '../../../components/table/NoDataComponent';
import {
  ElementHeaderStyled,
  Input,
  PageBoardItemStyled,
  PageBoardStyled,
  TitleElementStyled
} from '../../../stylesheets/GeneralStyled';

class KPIManagement extends Component {

  renderEditable = (cell) => {
    return (
      <Input
        value={cell.value}
        fullWidth
        fontSize={'14px'}
      />
    )
  };

  render() {
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
        Header: 'Position',
        accessor: 'position',
        ...styleColumn,
      },
      {
        Header: 'Criteria',
        accessor: 'criteria',
        ...styleColumn,
        width: 750
      },
      {
        Header: 'Weight',
        accessor: 'weight',
        ...styleColumn,
        width: 100,
        Cell: this.renderEditable
      },
    ];
    const data = [
      {
        position: 'Developer',
        criteria: 'I want to fuck you',
        weight: 0.2
      },
      {
        position: 'Developer',
        criteria: 'I want to suck you',
        weight: 0.4
      },
      {
        position: 'Developer',
        criteria: 'I want to kick you',
        weight: 0.5
      },
      {
        position: 'Developer',
        criteria: 'I want to fuck you',
        weight: 0.6
      },
      {
        position: 'Developer',
        criteria: 'I want to fuck you',
        weight: 0.7
      },
      {
        position: 'Reporter',
        criteria: 'I want to fuck you',
        weight: 0.2
      },
      {
        position: 'Reporter',
        criteria: 'I want to suck you',
        weight: 0.4
      },
      {
        position: 'Reporter',
        criteria: 'I want to kick you',
        weight: 0.5
      },
      {
        position: 'Reporter',
        criteria: 'I want to fuck you',
        weight: 0.6
      },
      {
        position: 'Reporter',
        criteria: 'I want to fuck you',
        weight: 0.7
      },
    ];

    return (
      <PageBoardStyled backlog>
        <ElementHeaderStyled padding={'0'}>
          <TitleElementStyled noPadding fontSize={'20px'}>
            KPI
          </TitleElementStyled>
        </ElementHeaderStyled>
        <PageBoardItemStyled activity margin={'0'}>
          <ReactTable
            data={data}
            columns={columns}
            getNoDataProps={() => NoDataProps({ loading: false })}
            NoDataComponent={NoDataComponent}
            defaultPageSize={2}
            pivotBy={['position']}
            className="-striped -highlight"
          />
        </PageBoardItemStyled>
        <SockJsClient
          url={WEB_SOCKET_URL}
          topics={['/topic/status']}
          onMessage={this.onMessageReceive}
          debug={true}
        />
      </PageBoardStyled>
    );
  }
}

KPIManagement.propTypes = {};

export default KPIManagement;
