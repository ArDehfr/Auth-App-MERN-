import React from 'react'
import {Alert, Button, Card, Flex, Form, Input, Spin, Typography} from 'antd';
import { Link } from 'react-router-dom';
import registerImage from '../assets/register.png';
import useSignup from '../hooks/useSignup.js';

const Register = () => {
    const {loading, error, registerUser} = useSignup();
    const handleRegister = (values) => {
        registerUser(values)
    };
  return (
    <Card className='form-container'>
        <Flex gap="large" align='center'>
            {/* Form */}
        <Flex vertical flex={1}>
            <Typography.Title level={3} strong className='title'>
                Create an Account
            </Typography.Title>
            <Typography.Text type='secondary' strong className='slogan'>
                Start your journey here!
            </Typography.Text>
            <Form layout='vertical' onFinish={handleRegister} autoComplete='off'>
                <Form.Item 
                label="Username" 
                name="name" 
                rules={[
                    {
                        required: true,
                        message: 'Please input your name!'
                    },
                ]}>
                    <Input size='large' placeholder='Enter Your Name' />
                </Form.Item>

                <Form.Item 
                label="Email" 
                name="email" 
                rules={[
                    {
                        required: true,
                        message: 'Please input your email!'
                    },
                    {
                        type: 'email',
                        message: 'The input is not valid email'
                    },
                ]}>
                    <Input size='large' placeholder='Enter Your Email' />
                </Form.Item>

                <Form.Item 
                label="Password" 
                name="password" 
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!'
                    },
                ]}>
                    <Input.Password size='large' placeholder='Enter Your Password' />
                </Form.Item>

                <Form.Item 
                label="Confirm Password" 
                name="passwordConfirm" 
                rules={[
                    {
                        required: true,
                        message: 'Please confirm your password!'
                    },
                ]}>
                    <Input.Password size='large' placeholder='Confirm Your Password' />
                </Form.Item>

                {
                    error && <Alert description={error} type='error' showIcon closable className='alert' />
                }

                <Form.Item>
                    <Button 
                    type={`${loading ? '' : 'primary'}`} 
                    htmlType='submit' 
                    size='large' 
                    className='btn'>
                        {loading ? <Spin /> : 'Create Account'}
                    </Button>
                </Form.Item>
                <Form.Item>
                    <Link to="/login">
                        <Button size='large' className='btn'>
                            Sign in
                        </Button>
                    </Link>
                </Form.Item>
            </Form>
        </Flex>
            {/* Img */}
            <Flex flex={1}>
                <img src={registerImage} className='auth-image' />
            </Flex>
        </Flex>
    </Card>
  )
}

export default Register