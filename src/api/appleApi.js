import axios from 'axios';

const axiosInstance = axios.create({
    baseURL:'https://itunes.apple.com'
});

export default axiosInstance;