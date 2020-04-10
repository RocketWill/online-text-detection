import React from 'react';
import ServiceHeader from '../organisms/ServiceHeader';
import Space from '../atoms/Space';
import ImageUploader from '../organisms/ImageUploader';

export default function Main() {
  return (
    <>
      <ServiceHeader title="Online Image Text Detection Service" subtitle="based on CRAFT model" />
      <Space />
      <ImageUploader />
    </>
  );
}
