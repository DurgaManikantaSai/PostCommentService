import React, { useState } from 'react';
import { Card, Form, Input, Button, Alert } from 'antd';
import { loginUser } from '../lib/api';
import { useNavigate, useLocation } from 'react-router-dom';
import useStore from '../store/store';

const Login = () => {
    const [error, setError] = useState(null);
    const setUser = useStore(state => state.setUser);
    const navigate = useNavigate();
    const location = useLocation();
    const [form] = Form.useForm();

    const onSubmit = async (values) => {
        try {
            setError(null); // Clear any previous errors
            const { userWithoutPassword, token } = await loginUser(values);

            setUser(userWithoutPassword); // Set the user in global state or context
            localStorage.setItem('token', token); // Store the token in localStorage

            // Check for redirect path
            const params = new URLSearchParams(location.search);
            const redirect = params.get('redirect');
            if (redirect) {
                navigate(redirect);
            } else {
                navigate('/posts'); // Default navigation after login
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

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Card title="Login" style={{ width: 300 }}>
                {error && <Alert message={error} type="error" showIcon />}
                <Form form={form} name="login_form" onFinish={onSubmit}>
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
                            Login
                        </Button>
                    </Form.Item>
                </Form>
                <Button type="link" onClick={() => navigate('/signup')}>
                    Create an account
                </Button>
            </Card>
        </div>
    );
};

export default Login;
