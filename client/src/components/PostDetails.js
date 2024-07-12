import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, List, Form, Input, Button, Alert } from 'antd';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import useStore from '../store/store';
import { fetchPostDetails, addComment } from '../lib/api';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const PostDetails = () => {
    const { id } = useParams();
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [commentEditorState, setCommentEditorState] = useState(() => EditorState.createEmpty());
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const user = useStore(state => state.user);

    useEffect(() => {
        const loadPostDetails = async () => {
            try {
                const data = await fetchPostDetails(id);
                setPost(data);
                setComments(data.comments ? data.comments.map(comment => ({
                    ...comment,
                    content: EditorState.createWithContent(convertFromRaw(JSON.parse(comment.content)))
                })) : []);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setError('Failed to load post details. Please try again.');
                setLoading(false);
            }
        };
        loadPostDetails();
    }, [id]);

    const onFinish = async () => {
        try {
            const content = JSON.stringify(convertToRaw(commentEditorState.getCurrentContent()));
            const data = await addComment({
                content: content,
                userId: user._id,
                postId: id
            });
            const newComment = {
                ...data,
                content: EditorState.createWithContent(convertFromRaw(JSON.parse(data.content)))
            };
            setComments(prevComments => [...prevComments, newComment]);
            setCommentEditorState(EditorState.createEmpty());
        } catch (error) {
            console.error(error);
            setError('Failed to add comment. Please try again.');
        }
    };

    if (loading) {
        return <div>Loading post details...</div>;
    }

    return (
        <div style={{ padding: '20px' }}>
            <Card title={post.title}>
                {post.content && (
                    <Editor
                        editorState={EditorState.createWithContent(convertFromRaw(JSON.parse(post.content)))}
                        readOnly={true}
                        toolbarHidden={true}
                    />
                )}
                <List
                    header={<div>Comments</div>}
                    dataSource={comments}
                    renderItem={comment => (
                        <List.Item>
                            <List.Item.Meta
                                title={comment.userId}
                                description={
                                    <Editor
                                        editorState={comment.content}
                                        readOnly={true}
                                        toolbarHidden={true}
                                    />
                                }
                            />
                        </List.Item>
                    )}
                />
                {user && (
                    <Form name="comment_form" onFinish={onFinish}>
                        <Form.Item
                            name="body"
                            rules={[{ required: true, message: 'Please input your comment!' }]}
                        >
                            <Editor
                                editorState={commentEditorState}
                                onEditorStateChange={setCommentEditorState}
                                wrapperClassName="demo-wrapper"
                                editorClassName="demo-editor"
                                placeholder="Write a comment..."
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">Comment</Button>
                        </Form.Item>
                    </Form>
                )}
                {error && <Alert message={error} type="error" showIcon />}
            </Card>
        </div>
    );
};

export default PostDetails;
