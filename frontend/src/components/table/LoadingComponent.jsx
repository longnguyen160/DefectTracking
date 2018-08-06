import React from 'react';
import PropTypes from 'prop-types';
import LoadingIcon from '../icon/LoadingIcon';

const LoadingComponent = (props) => {
  const { loading } = props;

  return loading && (
    <div className='-loading -active'>
      <div className="-loading-inner">
        <LoadingIcon />
      </div>
    </div>
  );
};

LoadingComponent.propTypes = {
  loading: PropTypes.bool.isRequired
};

export default LoadingComponent;
