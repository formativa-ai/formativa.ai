import React from "react";

interface UserProfileProps {
    setEditingProfile?: (value: (((prevState: boolean) => boolean) | boolean)) => void
}

export default function UserProfile() {
    const [editingProfile, setEditingProfile] = React.useState(false);
    const handleEditUserProfile = () => {
        setEditingProfile(true);
    }

    return (
        <main className="mx-10 my-20">

        </main>)
}