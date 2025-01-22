// api.js
import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Adjust this to your backend URL

export const sendMessage = async (senderId, receiverId, message, images) => {
  const formData = new FormData();
  formData.append('senderId', senderId);
  formData.append('receiverId', receiverId);
  formData.append('message', message);
  
  if (images) {
    images.forEach(image => {
      formData.append('image', image); // Assuming images is an array
    });
  }

  try {
    const response = await axios.post(`${API_URL}/sendMsg`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error || 'Failed to send message');
  }
};
