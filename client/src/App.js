
import React , {useEffect} from 'react';
import { Link, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { Button } from 'antd';
import PostList from './components/PostList';
import Login from './components/Login';
import Signup from './components/SignUp';
import PostDetails from './components/PostDetails';
import CreatePost from './components/CreatePost';
import useStore from './store/store';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
    const user = useStore(state => state.user);
    const setUser = useStore(state => state.setUser);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setUser({ token }); // Assuming you have a token property in the user object
        }
    }, [setUser]);

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
                <Link to="/posts">
                    <Button type="primary">Home</Button>
                </Link>
                <div style={{display: 'flex', justifyContent: 'space-around', width: '30%'}}>
                    <Link to="/create-post">
                        <Button type="primary">Create Post</Button>
                    </Link>
                    {user && user.token ? (
                        <Button type="primary" onClick={() => {
                            localStorage.removeItem('token');
                            setUser(null);
                            navigate('/');
                        }}>Logout</Button>
                    ) : (
                        <>
                            <Link to="/login">
                                <Button type="primary">Login</Button>
                            </Link>
                            <Link to="/signup">
                                <Button type="primary">Signup</Button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
            <Routes>
                <Route path="/" element={<PostList />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/posts" element={<PostList />} />
                <Route path="/posts/:id" element={<PostDetails />} />
                <Route
                    path="/create-post"
                    element={user ? <CreatePost /> : <Navigate to="/login" replace />}
                />

            </Routes>
        </>
    );
};

export default App;
