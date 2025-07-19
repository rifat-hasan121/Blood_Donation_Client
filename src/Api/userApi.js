import axios from "axios";

export const updateUserProfile = async (email, profileData) => {
    const res = await axios.put(
        `https://assaingment-12-server-iota.vercel.app/profile/${email}`,
        profileData
    );

    return res.data;
};

// save or update user in db

