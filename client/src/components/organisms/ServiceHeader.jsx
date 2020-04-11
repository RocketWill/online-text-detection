import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { PageHeader, Typography } from 'antd';

const { Title } = Typography;

const useStyles = makeStyles({
  extraContainer: {
    display: 'flex', 
    alignItems: 'baseline', 
    marginBottom: -10
  },
  title: {
    marginLeft: 10,
  },
});

export default function ServiceHeader({ title, subtitle, extra }) {
  const classes = useStyles();
  if(extra) {
    title = (
      <div className={classes.extraContainer}>
        {extra}
        <Title className={classes.title} level={4}>{title}</Title>
      </div>
    )
  }
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
  extra: PropTypes.node
};

ServiceHeader.defaultProps = {
  subtitle: '',
  extra: null,
};
