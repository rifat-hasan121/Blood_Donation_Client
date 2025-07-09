export const updateUserProfile = async (email, profileData) => {
    const res = await fetch(`http://localhost:5000/api/users/${email}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(profileData),
    });

    if (!res.ok) {
        throw new Error("Failed to update profile");
    }

    return res.json();
};
  