import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from 'antd';

const { Text } = Typography;

export default function Description({ type, text }) {
  return (
    <Text type={type}>{text}</Text>
  );
}

Description.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string.isRequired,
};

Description.defaultProps = {
  type: '',
};
