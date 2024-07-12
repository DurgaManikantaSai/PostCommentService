
import React, { useState } from 'react';
import { Card, Form, Input, Button, Alert } from 'antd';
import { loginUser, registerUser } from '../lib/api';
import { useNavigate, useLocation } from 'react-router-dom';
import useStore from '../store/store';

const AuthCard = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState(null);
    const setUser = useStore(state => state.setUser);
    const navigate = useNavigate();
    const location = useLocation();
    const [form] = Form.useForm(); // Ant Design form instance

    const onSubmit = async (values) => {
        try {
            setError(null); // Clear any previous errors
            if (isLogin) {
                const { user, token } = await loginUser(values);
                setUser(user); // Set the user in global state or context
                localStorage.setItem('token', token); // Store the token in localStorage

                // Check for redirect path
                const params = new URLSearchParams(location.search);
                const redirect = params.get('redirect');
                if (redirect) {
                    navigate(redirect);
                } else {
                    navigate('/posts'); // Default navigation after login
                }
            } else {
                await registerUser(values);
                navigate('/auth'); // After successful registration, navigate to login page
            }
            form.resetFields(); // Reset form fields after successful submission
        } catch (error) {
            console.error(error);
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message); // Display the error message from the server
            } else {
                setError('Something went wrong. Please try again.');
            }
        }
    };

    const switchMode = () => {
        setIsLogin(prev => !prev);
        form.resetFields(); // Reset form fields when switching between login and signup
        setError(null); // Clear any previous errors
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Card title={isLogin ? 'Login' : 'Sign Up'} style={{ width: 300 }}>
                {error && <Alert message={error} type="error" showIcon />}
                <Form form={form} name="auth_form" onFinish={onSubmit}>
                    {!isLogin && (
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input placeholder="Username" />
                        </Form.Item>
                    )}
                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input placeholder="Email" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password placeholder="Password" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            {isLogin ? 'Login' : 'Sign Up'}
                        </Button>
                    </Form.Item>
                </Form>
                {isLogin ? (
                    <Button type="link" onClick={switchMode}>
                        Create an account
                    </Button>
                ) : (
                    <Button type="link" onClick={switchMode}>
                        Already have an account? Login
                    </Button>
                )}
            </Card>
        </div>
    );
};

export default AuthCard;
