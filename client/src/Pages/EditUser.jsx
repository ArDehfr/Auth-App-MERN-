import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Input, Button, Select, Card, Typography, notification } from 'antd';

const { Option } = Select;

const EditUser = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getUserById();
  }, []);

  const getUserById = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/user/${id}`);
      form.setFieldsValue({
        name: response.data.name,
        email: response.data.email,
        role: response.data.role,
      });
    } catch (error) {
      console.error('Failed to fetch user:', error);
      openNotificationWithIcon('error', 'Fetch Failed', 'Failed to fetch user details.');
    }
  };

  const saveUser = async (values) => {
    try {
      await axios.patch(`http://localhost:5000/api/user/${id}`, {
        name: values.name,
        email: values.email,
        role: values.role,
      });
      openNotificationWithIcon('success', 'User Updated', 'The user details have been successfully updated.');
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      openNotificationWithIcon('error', 'Update Failed', 'Failed to update user details.');
    }
  };

  const openNotificationWithIcon = (type, message, description) => {
    notification[type]({
      message: message,
      description: description,
    });
  };

  return (
    <div>
      <Card className='card-container'>
        <Typography.Title className='add'>
          <strong>Edit User</strong>
        </Typography.Title>
        <Form
          form={form}
          layout="vertical"
          onFinish={saveUser}
          autoComplete='off'
        >
          <Form.Item label="Name" name="name" required>
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item label="Email" name="email" required>
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item label="Role" name="role" required>
            <Select>
              <Option value="user">User</Option>
              <Option value="admin">Admin</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button className='profile-btn' type="primary" htmlType="submit">Update</Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default EditUser;
