import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Layout } from 'antd';

const { Content } = Layout;
const useStyles = makeStyles((theme) => ({
  container: {
    padding: '20px 100px',
    minHeight: '100vh',
    maxWidth: 1400,
    minWidth: 500,
    margin: '0 auto',
    width: '100%',
  },
  siteLayoutContent: {
    marginTop: 90,
    padding: 24,
    minHeight: 500,
  },
  [theme.breakpoints.down('sm')]: {
    container: { padding: '10px 10px' },
  },
}));


export default function Container({ children }) {
  const classes = useStyles();
  return (
    <Content className={classes.container}>
      <div className={classes.siteLayoutContent}>
        {children}
      </div>
    </Content>
  );
}

Container.propTypes = {
  children: PropTypes.node,
};

Container.defaultProps = {
  children: undefined,
};
