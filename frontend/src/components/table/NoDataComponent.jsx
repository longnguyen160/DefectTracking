import React from 'react';
import PropTypes from 'prop-types';
import LoadingIcon from '../icon/LoadingIcon';

const NoDataComponent = (props) => {
  const { loading } = props;

  if (loading) {
    return null;
  }

  return (
    <div className="rt-noData">
      No data
    </div>
  );
};

NoDataComponent.propTypes = {
  loading: PropTypes.bool.isRequired
};

export default NoDataComponent;
