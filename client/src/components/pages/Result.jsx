import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Row, Col, Card, Button,
} from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

import ServiceHeader from '../organisms/ServiceHeader';
import Space from '../atoms/Space';

const axios = require('axios');
const useStyles = makeStyles((theme) => ({
  button: {
    margin: '0 auto',
    display: 'block',
  },
  image: {
    width: '100%',
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
  const [fetching, setFetching] = useState(true);
  const [response, setResponse] = useState(null);

  useEffect(() => {
    axios.post('http://127.0.0.1:5000/text-detection/', {
      analysis_id: id
    })
    .then(res => res.data)
    .then((res) => setResponse(res))
    .then(() => setFetching(false))
    .catch(err => console.error(err))
  }, [])

  return (
    <div>
      {`Hello Result ${id}`}
      <ServiceHeader title="Please wait a minute..." />
      <Space />
      <Row gutter={16}>
        <Col xs={24} sm={24} md={24} xl={12}>
          <Card title="Before" extra={<a href="#">More</a>} loading={fetching}>
            {response && response['images']['original'] && <img className={classes.image} src={`http://127.0.0.1:5000${response.images.original}`} alt="original" /> }
          </Card>
        </Col>
        <Col xs={24} sm={24} md={24} xl={12}>
          <Card
            title="After"
            extra={(
              <Button type="secondary" icon={<DownloadOutlined />} size="small">
                Download
              </Button>
)}
            className={classes.bottomCard}
            loading={fetching}
          >
            {response && response['images']['processed'] && <img className={classes.image} src={`http://127.0.0.1:5000${response.images.processed}`} alt="processed" /> }
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
