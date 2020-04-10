import React, { useState } from 'react';
import { Typography } from 'antd';

const uniqid = require('uniqid');

const { Text } = Typography;

export default function AnalysisId() {
  const [analysisId] = useState(uniqid());
  return (
    <Text type="secondary">{`Analysis ID: ${analysisId}`}</Text>
  );
}
