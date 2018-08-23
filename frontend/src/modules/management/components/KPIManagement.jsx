import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactTable from 'react-table';
import Editable from 'react-x-editable';
import NoDataProps from '../../../components/table/NoDataProps';
import { INPUT_TEXT } from '../../../utils/enums';
import LoadingComponent from '../../../components/table/LoadingComponent';
import {
  ElementHeaderStyled,
  PageBoardItemStyled,
  PageBoardStyled,
  TitleElementStyled,
  TableBlockStyled
} from '../../../stylesheets/GeneralStyled';
import { loadAllKPI, updateKPI } from '../actions/kpi';
import CustomInput from '../../../components/editable/CustomInput';
import NoDataComponent from '../../../components/table/NoDataComponent';

class KPIManagement extends Component {

  componentWillMount() {
    const { loadAllKPI } = this.props;

    loadAllKPI();
  }

  componentWillReceiveProps(nextProps) {
    const { data } = nextProps;

    if (JSON.stringify(data) !== JSON.stringify(this.props.data)) {
      data.map(element => this.setState({ [element.id]: element }));
    }
  }

  handleSubmit = (kpi, e) => {
    const { updateKPI } = this.props;
    const newKPI = Object.assign(kpi, {
      weight: e.value
    });

    updateKPI(newKPI);
  };

  renderEditable = (cell) => {
    return (
      <Editable
        name={'weight'}
        dataType={'custom'}
        mode={'inline'}
        value={cell.value}
        showButtons={true}
        display={(value) => (
          <TableBlockStyled hover>
            {value}
          </TableBlockStyled>
        )}
        customComponent={(props, state) => (
          <CustomInput
            {...props}
            {...state}
            renderType={INPUT_TEXT}
          />
        )}
        handleSubmit={(e) => this.handleSubmit(cell.original, e)}
      />
    )
  };

  render() {
    const { loading, data } = this.props;
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
        Header: 'Role',
        accessor: 'role',
        ...styleColumn
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
      }
    ];

    return (
      <PageBoardStyled backlog>
        <ElementHeaderStyled padding={'0'}>
          <TitleElementStyled noPadding fontSize={'20px'}>
            KPI
          </TitleElementStyled>
        </ElementHeaderStyled>
        <PageBoardItemStyled activity margin={'10px 0'}>
          <ReactTable
            data={data}
            columns={columns}
            loading={loading}
            LoadingComponent={LoadingComponent}
            getNoDataProps={() => NoDataProps({ loading })}
            NoDataComponent={NoDataComponent}
            defaultPageSize={2}
            pivotBy={['role']}
            collapseOnDataChange={false}
            className="-striped -highlight"
          />
        </PageBoardItemStyled>
      </PageBoardStyled>
    );
  }
}

KPIManagement.propTypes = {
  loadAllKPI: PropTypes.func.isRequired,
  updateKPI: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  data: state.management.kpiData,
  loading: state.management.isLoading
});

const mapDispatchToProps = dispatch => bindActionCreators({
  loadAllKPI: loadAllKPI,
  updateKPI: updateKPI
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(KPIManagement);
