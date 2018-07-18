import React from 'react';
import PropTypes from 'prop-types';
import LoadingIcon from '../icon/LoadingIcon';

const NoDataComponent = (props) => {
  const { loading } = props;

  return (
    <div className="rt-noData">
      {
        loading ?
          <LoadingIcon />
        : 'No data'
      }
    </div>
  );
};

NoDataComponent.propTypes = {
  loading: PropTypes.bool.isRequired
};

export default NoDataComponent;
