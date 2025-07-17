import axios from 'axios';

export const imageUpload = async (imageData) => {


    const formData = new FormData();
    formData.append('image', imageData);

    try {
        const response = await axios.post(
            `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
            formData
        );

        return response.data.data.display_url; // Return the URL of the uploaded image
    } catch (error) {
        console.error('Image upload failed:', error.response ? error.response.data : error.message);
    }
}