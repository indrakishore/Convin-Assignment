import React from 'react';
import { Button, Form, Input } from 'antd';

const AddForm = ({ formData = {}, onFormSubmit }) => {
  const onFinish = (values) => {
    onFormSubmit(values);
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      initialValues={{
        title: formData.title || '',
        description: formData.description || '',
        videoUrl: formData.videoUrl || ''
      }}
    >
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: 'Please input title!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true, message: 'Please input description!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Video URL"
        name="videoUrl"
        rules={[{ required: true, message: 'Please input video URL!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddForm;