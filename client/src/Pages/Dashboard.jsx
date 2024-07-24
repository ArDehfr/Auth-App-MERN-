import { Avatar, Button, Card, Typography, Table, Tag, notification } from 'antd';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { UserOutlined } from '@ant-design/icons';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/user/${id}`);
      getUsers();
      openNotificationWithIcon('success', 'User Deleted', 'The user has been successfully deleted.');
    } catch (error) {
      console.log(error);
      openNotificationWithIcon('error', 'Deletion Failed', 'Failed to delete the user.');
    }
  };

  const openNotificationWithIcon = (type, message, description) => {
    notification[type]({
      message: message,
      description: description,
    });
  };

  const { userData, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role) => (
        <Tag color={role === 'admin' ? 'volcano' : 'green'}>
          {role.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <span>
          <Link to={`/edit/${record._id}`}>
            <Button type="primary" style={{ marginRight: 8 }}>Edit</Button>
          </Link>
          <Button onClick={() => deleteUser(record._id)} type="primary" danger>Delete</Button>
        </span>
      ),
    },
  ];

  return (
    <div className='dashboard'>
      <Card className='profile-card'>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
          <Avatar size={150} icon={<UserOutlined />} className='avatar' />
          <Typography.Title level={2} strong className='username'>
            {userData.name}
          </Typography.Title>
          <Typography.Text type='secondary'>
            Email: {userData.email}
          </Typography.Text>
          <Typography.Text type='secondary'>
            Role: <Tag color={userData.role === 'admin' ? 'volcano' : 'green'}>
              {userData.role.toUpperCase()}
            </Tag>
          </Typography.Text>
          <Button size='large' type='primary' className='profile-btn' onClick={handleLogout}>
            Log Out
          </Button>
        </div>
      </Card>

      {userData.role === 'admin' && (
        <Card className='admin'>
          <Link to="/add">
            <Button size='large' className='add-btn' type='primary' style={{ marginBottom: 16 }}>Add User</Button>
          </Link>
          <Table
            columns={columns}
            dataSource={users}
            rowKey="_id"
            pagination={{
              defaultPageSize: 5,
              showSizeChanger: true,
              pageSizeOptions: ['5', '10', '20', '50'],
            }}
          />
        </Card>
      )}
    </div>
  );
};

export default Dashboard;
