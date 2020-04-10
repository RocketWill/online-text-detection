import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Row, Col, Card, Button,
} from 'antd';
import ServiceHeader from '../organisms/ServiceHeader';
import Space from '../atoms/Space';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: '0 auto',
    display: 'block',
  },
  [theme.breakpoints.down('md')]: {
    bottomCard: {
      marginTop: 20,
    },
  },
}));

export default function Result() {
  const classes = useStyles();
  const { id } = useParams();
  return (
    <div>
      {`Hello Result ${id}`}
      <ServiceHeader title="Please wait a minute..." />
      <Space />
      <Row gutter={16}>
        <Col xs={24} sm={24} md={24} xl={12}>
          <Card title="Before" extra={<a href="#">More</a>} loading>
            Before
          </Card>
        </Col>
        <Col xs={24} sm={24} md={24} xl={12}>
          <Card title="After" extra={<a href="#">More</a>} className={classes.bottomCard}>
            After
          </Card>
        </Col>
      </Row>
      <Space />
      <Button className={classes.button} type="primary" size="large">
        <Link to="/">Back to main page</Link>
      </Button>
    </div>
  );
}
