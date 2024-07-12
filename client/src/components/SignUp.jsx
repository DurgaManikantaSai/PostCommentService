import React, { useState } from 'react';
import { Card, Form, Input, Button, Alert } from 'antd';
import { registerUser } from '../lib/api';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false); // State to manage signup success message
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const onSubmit = async (values) => {
        try {
            setError(null); // Clear any previous errors
            await registerUser(values);
            setSuccess(true); // Set success state to true
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
            <Card title="Sign Up" style={{ width: 300 }}>
                {error && <Alert message={error} type="error" showIcon />}
                {success && (
                    <Alert
                        message="Signup successful! Please proceed to login."
                        type="success"
                        showIcon
                        closable
                        onClose={() => setSuccess(false)}
                    />
                )}
                <Form form={form} name="signup_form" onFinish={onSubmit}>
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input placeholder="Username" />
                    </Form.Item>
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
                            Sign Up
                        </Button>
                    </Form.Item>
                </Form>
                <Button type="link" onClick={() => navigate('/login')}>
                    Already have an account? Login
                </Button>
            </Card>
        </div>
    );
};

export default SignUp;
