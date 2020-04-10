import React from 'react';
import PropTypes from 'prop-types';

export default function Space({ spaceSize }) {
  return (
    <div style={{ marginBottom: spaceSize }} />
  );
}

Space.propTypes = {
  spaceSize: PropTypes.number,
};

Space.defaultProps = {
  spaceSize: 20,
};
