import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card, Upload, message, Typography, Button, Spin, Tag,
} from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import Space from '../atoms/Space';

const uniqid = require('uniqid');

const { Dragger } = Upload;
const { Text } = Typography;

const useStyles = makeStyles({
  dragger: {
    height: '300px !important',
  },
  btnContainer: {
    float: 'right',
    marginTop: 20,
  },
  submitBtn: {
    marginLeft: 10,
  },
  preview: {
    maxWidth: 600,
    minWidth: 500,
    width: '100%',
    margin: '0 auto',
    display: 'block',
  },
  previewTag: {
    marginLeft: 10,
  },
});

export default function ImageUploader() {
  const classes = useStyles();
  const history = useHistory();
  const [analysisId] = useState(uniqid());
  const [fileList, setFileList] = useState([]);
  const [preview, setPreview] = useState(null);
  const [spinning, setSpinning] = useState(false);
  const API_URL = process.env.REACT_APP_API_URL

  const handleCancel = () => {
    setFileList([]);
  };
  const handleSubmit = () => {
    setSpinning(true);
    setTimeout(() => history.push(`/result/${analysisId}`), 1000);
  };

  const props = {
    name: 'file',
    multiple: false,
    beforeUpload(file, fList) {
      if (fileList.length > 0) {
        message.error('Could only upload one image for now.');
        return false;
      }
      return true;
    },
    action: `${API_URL}/upload/`,
    data: {analysis_id: analysisId},
    onChange(info) {
      console.log(info)
      const { status } = info.file;
      if (status !== 'uploading') {
        setFileList(info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
        setFileList(info.fileList);
        setPreview(`${API_URL}${info.file.response.image}`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <Spin tip="Processing..." spinning={spinning}>
      <Card>
        <Text type="secondary">{`Analysis ID: ${analysisId}`}</Text>
        {fileList.length > 0 && <Tag className={classes.previewTag} color="blue">Preview</Tag>}
        <Space spaceSize={5} />
        {fileList.length === 0 && (
        <Dragger {...props} className={classes.dragger}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Click or drag image to this area to upload</p>
          <p className="ant-upload-hint">
            Support for a single upload. Strictly prohibit from uploading company data or other
            band image
          </p>
        </Dragger>
        )}
        { fileList.length > 0 && preview && (
        <>
          <img className={classes.preview} src={preview} alt="preview" />
          <div className={classes.btnContainer}>
            <Button size="large" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="primary" size="large" className={classes.submitBtn} onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        </>
        ) }
      </Card>
    </Spin>
  );
}
