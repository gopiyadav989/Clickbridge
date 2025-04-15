import axios from 'axios';

const API_URL = 'http://localhost:5001/api';


// ClickHouse API calls
export const connectToClickHouse = async (connectionConfig) => {
    try {
        const response = await axios.post(`${API_URL}/clickhouse/connect`, connectionConfig);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || error.message;
    }
};

export const getClickHouseTables = async (connectionConfig) => {
    try {
        const response = await axios.post(`${API_URL}/clickhouse/tables`, connectionConfig);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || error.message;
    }
};



// Flat File API calls
export const uploadFlatFile = async (file) => {
    try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await axios.post(`${API_URL}/flatfile/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || error.message;
    }
};