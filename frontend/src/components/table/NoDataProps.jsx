import React from 'react';
import PropTypes from 'prop-types';

const NoDataProps = (props) => ({
  loading: props.loading,
});

NoDataProps.propTypes = {
  loading: PropTypes.bool.isRequired
};

export default NoDataProps;
