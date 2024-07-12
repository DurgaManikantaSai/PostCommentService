import React, { useState } from 'react';
import { Form, Input, Button, Card, message } from 'antd'; // Added message for displaying feedback
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import useStore from '../store/store';
import { createPost } from '../lib/api';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
    const user = useStore(state => state.user);
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

    const onEditorStateChange = (newEditorState) => {
        setEditorState(newEditorState);
    };

    const onFinish = async (values) => {
        try {
            const contentState = editorState.getCurrentContent();
            const content = JSON.stringify(convertToRaw(contentState));

            await createPost({ ...values, author: user.username, content });

            // Display success message and navigate
            message.success('Post created successfully!');
            navigate('/posts');
        } catch (error) {
            console.error(error);
            setError('Failed to create post. Please try again.');
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Card title="Create a Post" style={{ width: 600 }}>
                <Form name="post_form" onFinish={onFinish}>
                    <Form.Item
                        name="title"
                        rules={[{ required: true, message: 'Please input the title!' }]}
                    >
                        <Input placeholder="Title" />
                    </Form.Item>
                    <Form.Item
                        name="content"
                        rules={[{ required: true, message: 'Please input the content!' }]}
                    >
                        <Editor
                            editorState={editorState}
                            toolbar={{
                                options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'image', 'remove', 'history'],
                                inline: { options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace'] },
                                list: { options: ['unordered', 'ordered'] },
                                textAlign: { options: ['left', 'center', 'right', 'justify'] },
                                link: { options: ['link'] },
                                embedded: { options: ['embedded'] },
                                emoji: { options: ['emoji'] },
                                image: { uploadEnabled: true, alignmentEnabled: true, previewImage: true },
                            }}
                            onEditorStateChange={onEditorStateChange}
                            placeholder="Write your post content..."
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Create Post
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default CreatePost;
