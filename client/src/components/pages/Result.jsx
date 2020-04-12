import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Row, Col, Card, Button, Spin, Typography
} from 'antd';
import { DownloadOutlined, LoadingOutlined } from '@ant-design/icons';

import ServiceHeader from '../organisms/ServiceHeader';
import Space from '../atoms/Space';
import errorImg from '../../assets/error.jpg';

const { Text } = Typography;

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
  const [originalImg, setOriginalImg] = useState(null);
  const [processedImg, setProcessedImg] = useState(null);
  const API_URL = process.env.REACT_APP_API_URL

  const spinIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const handleDownload = (e) => {
    window.open({processedImg})
  }

  const checkResponseData = useCallback((res) => {
    if(res.status !== 'Done') {
      setOriginalImg(errorImg);
      setProcessedImg(errorImg);
    }
    else {
      setOriginalImg(`${API_URL}${res.images.original}`)
      setProcessedImg(`${API_URL}${res.images.processed}`)
    }
  }, [API_URL])

  useEffect(() => {
    axios.post(`${API_URL}/text-detection/`, {
      analysis_id: id
    })
    .then(res => res.data)
    .then(res => checkResponseData(res))
    .then(() => setFetching(false))
    .catch(err => console.error(err))
  }, [API_URL, id, checkResponseData])

  return (
    <div>
      <Text type="secondary">{`Analysis ID: ${id}`}</Text>
      <Space spaceSize={5} />
      {fetching && <ServiceHeader title="Trying to load information for you, please wait..." extra={<Spin indicator={spinIcon} />} />}
      {!fetching && <ServiceHeader title="Text detection result"/>}
      <Space />
      <Row gutter={16}>
        <Col xs={24} sm={24} md={24} xl={12}>
          <Card title="Before" loading={fetching}>
            {originalImg && <img className={classes.image} src={originalImg} alt="original" /> }
          </Card>
        </Col>
        <Col xs={24} sm={24} md={24} xl={12}>
          <Card
            title="After"
            extra={(
              <Button type="secondary" icon={<DownloadOutlined />} size="small" onClick={handleDownload} disabled={fetching}>
                Download
              </Button>
)}
            className={classes.bottomCard}
            loading={fetching}
          >
            {processedImg && <img className={classes.image} src={processedImg} alt="processed" /> }
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
