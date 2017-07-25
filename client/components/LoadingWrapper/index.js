import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node,
  loading: PropTypes.bool,
  loader: PropTypes.node,
  error: PropTypes.shape({
    message: PropTypes.string
  })
};

function LoadingWrapper({ children, loading, loader, error }) {
  if (loading) {
    return loader || <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return children;
}

LoadingWrapper.propTypes = propTypes;
export default LoadingWrapper;
