import React from 'react';
import PropTypes from 'prop-types';
import LoadingIcon from '../icon/LoadingIcon';

const LoadingComponent = (props) => {
  const { loading, filter } = props;

  return loading && (
    <div className={`-loading${filter ? ' -loading-filter' : ''} -active`}>
      <div className="-loading-inner">
        <LoadingIcon />
      </div>
    </div>
  );
};

LoadingComponent.propTypes = {
  loading: PropTypes.bool.isRequired,
  filter: PropTypes.bool
};

export default LoadingComponent;
