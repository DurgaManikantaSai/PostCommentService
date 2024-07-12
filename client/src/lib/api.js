
import axios from 'axios';

const API_URL = 'http://localhost:5000';

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
};

// Create an instance of axios
const api = axios.create({
    baseURL: API_URL
});

// Add a response interceptor
api.interceptors.response.use(
    response => response,
    error => {
        if (error.response.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login'; // Redirect to login page
        }
        return Promise.reject(error);
    }
);

export const loginUser = async (values) => {
    const response = await api.post('/api/auth/signin', values);
    return response.data;
};

export const registerUser = async (values) => {
    const response = await api.post('/api/auth/signup', values);
    return response.data;
};

export const fetchUserDetails = async () => {
    const response = await api.get('/api/users', getAuthHeaders());
    return response.data;
}

export const fetchPosts = async () => {
    const response = await api.get('/api/posts/', getAuthHeaders());
    return response.data;
};

export const fetchPostDetails = async (id) => {
    const response = await api.get(`/api/posts/${id}`, getAuthHeaders());
    return response.data;
};

export const createPost = async (values) => {
    const response = await api.post('/api/posts', values, getAuthHeaders());
    return response.data;
};

export const addComment = async (values) => {
    const response = await api.post(`api/comments`, values, getAuthHeaders());
    console.log(response);
    console.log(response.data);
    return response.data;
};
