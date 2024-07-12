
import axios from 'axios';
import { message } from 'antd'; // Import message from Ant Design for displaying alerts

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000', // Replace with your backend URL
});

axiosInstance.interceptors.response.use(
    (response) => {
        // Handle and transform responses here if needed
        return response;
    },
    (error) => {
        // Handle errors
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            const { status } = error.response;
            if (status === 401) {
                // Unauthorized error handling
                message.error('Invalid email or password. Please try again.'); // Display error message using Ant Design message component
            } else {
                // Other error handling
                message.error('Something went wrong. Please try again.');
            }
        } else if (error.request) {
            // The request was made but no response was received
            message.error('Network error. Please check your connection.');
        } else {
            // Something happened in setting up the request that triggered an Error
            message.error('Unknown error occurred.');
        }
        return Promise.reject(error); // Reject the promise to propagate the error further
    }
);

export default axiosInstance;
