import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from 'antd';

const { Title } = Typography;

export default function CustomTitle({ title }) {
  return (
    <Title>{title}</Title>
  );
}

CustomTitle.propTypes = {
  title: PropTypes.string.isRequired,
};
