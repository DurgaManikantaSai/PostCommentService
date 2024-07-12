import React, { useState, useEffect } from 'react';
import { List, Card, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { EditorState, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import useStore from '../store/store';
import { fetchPosts } from '../lib/api';

const PostList = () => {
    const posts = useStore(state => state.posts);
    const setPosts = useStore(state => state.setPosts);
    const navigate = useNavigate();

    useEffect(() => {
        const loadPosts = async () => {
            try {
                const data = await fetchPosts();
                setPosts(data);
            } catch (error) {
                console.error('Failed to load posts:', error);
            }
        };
        loadPosts();
    }, [setPosts]);

    return (
        <div style={{ padding: '20px', margin: '0 20px' }}>
            <List
                grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 2,
                    md: 3,
                    lg: 3,
                    xl: 3,
                    xxl: 3
                }}
                dataSource={posts}
                renderItem={post => (
                    <List.Item>
                        <Card
                            title={post.title}
                            style={{
                                width: '90%',
                                height: '250px',
                                overflow: 'hidden',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'flex-start',
                                marginBottom: '20px',
                                position: 'relative'
                            }}
                            bodyStyle={{
                                padding: '10px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                height: '100%',
                            }}
                        >
                            <div style={{ flex: '1 1 auto', overflow: 'hidden', marginBottom: '10px' }}>
                                {post.content && (
                                    <Editor
                                        editorState={EditorState.createWithContent(convertFromRaw(JSON.parse(post.content)))}
                                        readOnly={true}
                                        toolbarHidden={true}
                                        wrapperStyle={{ height: '100%' }}
                                        editorStyle={{ height: '100%', overflow: 'hidden' }}
                                    />
                                )}
                            </div>
                            <Button
                                type="primary"
                                style={{
                                    position: 'absolute',
                                    bottom: '10px',
                                    left: '10px',
                                    right: '10px',
                                    backgroundColor: '#1890ff',
                                    cursor: 'pointer',
                                    opacity: 1,
                                    zIndex: 1, // Ensure button is above other content
                                }}
                                onClick={() => navigate(`/posts/${post._id}`)}
                            >
                                Read More
                            </Button>
                        </Card>
                    </List.Item>
                )}
            />
        </div>
    );
};

export default PostList;
