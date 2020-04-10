import React from 'react';
import PropTypes from 'prop-types';
import { PageHeader } from 'antd';

export default function ServiceHeader({ title, subtitle }) {
  return (
    <PageHeader
      title={title}
      subTitle={subtitle}
      style={{ border: '1px solid rgb(235, 237, 240)', backgroundColor: '#ffffff' }}
    />
  );
}

ServiceHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
};

ServiceHeader.defaultProps = {
  subtitle: '',
};
