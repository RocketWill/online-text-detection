import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Layout } from 'antd';
import logoImg from '../../assets/wattman_logo.png';

const { Header } = Layout;
const useStyles = makeStyles({
  header: {
    height: 90,
    width: '100%',
    backgroundColor: '#0B3771',
    display: 'flex',
    alignItems: 'center',
    position: 'fixed',
    zIndex: 1,
  },
  container: {
    maxWidth: 1200,
    width: '100%',
    margin: '0 auto',
  },
  logo: {
    width: 150,
  },
});

export default function CustomHeader() {
  const classes = useStyles();
  return (
    <Header className={classes.header}>
      <div className={classes.container}>
        <Link to="/"><img src={logoImg} className={classes.logo} alt="wattman logo" /></Link>
      </div>
    </Header>
  );
}
