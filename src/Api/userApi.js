import axios from "axios";

export const updateUserProfile = async (email, profileData) => {
    const res = await axios.put(
        `http://localhost:3000/profile/${email}`,
        profileData
    );

    return res.data;
};

// save or update user in db

