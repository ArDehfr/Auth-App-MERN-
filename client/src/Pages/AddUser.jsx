import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Select, Card, Typography, notification } from 'antd';

const { Option } = Select;

const AddUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("User");
  const navigate = useNavigate();

  const saveUser = async (values) => {
    try {
      await axios.post('http://localhost:5000/api/user', {
        name: values.name,
        email: values.email,
        password: values.password,
        role: values.role
      });
      openNotificationWithIcon('success', 'User Added', 'The user have been successfully added');
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      openNotificationWithIcon('error', 'Add User Failed', 'Failed to add user');
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
          <strong>Add User</strong>
        </Typography.Title>
        <Form 
          layout="vertical" 
          onFinish={saveUser} 
          initialValues={{ role: 'user' }}
          autoComplete='off'
        >
          <Form.Item label="Name" name="name" required>
            <Input 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
            />
          </Form.Item>
          <Form.Item label="Email" name="email" required>
            <Input 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item label="Password" name="password" required>
            <Input.Password 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item label="Role" name="role" required>
            <Select value={role} onChange={(value) => setRole(value)}>
              <Option value="user">User</Option>
              <Option value="admin">Admin</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button className='profile-btn' type="primary" htmlType="submit">Save</Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default AddUser;
