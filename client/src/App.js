import React from 'react';
import { Layout } from 'antd';

import CustomHeader from './components/organisms/CustomHeader';
import Container from './components/organisms/Container';
import CustomTitle from './components/atoms/CustomTitle';
import ServiceHeader from './components/organisms/ServiceHeader';
import ImageUploader from './components/organisms/ImageUploader';
import Space from './components/atoms/Space';


const App = () => (
  <Layout className="layout">
    <CustomHeader />
    <Container>
      <ServiceHeader title="Online Image Text Detection Service" subtitle="based on CRAFT model" />
      <Space />
      <ImageUploader />
    </Container>
  </Layout>
);

export default App;
