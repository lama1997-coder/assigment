import axios from 'axios';

export const getUploadedFiles = async () => {
    try {
        const token = localStorage.getItem('token');
        console.log(token)

        const response = await axios.get('http://64.226.83.77:3000/api/files/view', { headers: { "Authorization": `Bearer ${token}` } });

        console.log(response)
        return response.data.file
    } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
            console.log(error.response.data.message);
            return []
        } else {
            console.log('An error occurred. Please try again.');
            return []

        }
    }

};
export const uploadFile = async (formData) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post('http://64.226.83.77:3000/api/files/upload', formData, {
            headers: {
                "Authorization": `Bearer ${token}`, 'Content-Type': 'multipart/form-data',
            },
        });
        return response.data
    } catch (error) {
        console.error('Error uploading file:', error);
    }


}
