import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card, Upload, message, Typography, Button, Spin,
} from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import Space from '../atoms/Space';

const uniqid = require('uniqid');

const { Dragger } = Upload;
const { Text } = Typography;

const useStyles = makeStyles({
  btnContainer: {
    float: 'right',
    marginTop: 20,
  },
  submitBtn: {
    marginLeft: 10,
  },
  preview: {
    width: '100%',
  },
});

export default function ImageUploader() {
  const classes = useStyles();
  const history = useHistory();
  const [analysisId] = useState(uniqid());
  const [fileList, setFileList] = useState([]);
  const [preview, setPreview] = useState(null);
  const [spinning, setSpinning] = useState(false);

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
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
      console.log(info);
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.fileList);
        setFileList(info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
        setFileList(info.fileList);
        setPreview(info.file.response.url);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <Spin tip="Processing..." spinning={spinning}>
      <Card>
        <Text type="secondary">{`Analysis ID: ${analysisId}`}</Text>
        <Space spaceSize={5} />
        {fileList.length === 0 && (
        <Dragger {...props}>
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
        { fileList.length > 0 && (
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
