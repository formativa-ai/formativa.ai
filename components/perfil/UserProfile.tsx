interface UserProfileProps {
    setEditingProfile?: (value: (((prevState: boolean) => boolean) | boolean)) => void
}

export default function UserProfile({setEditingProfile}: UserProfileProps) {

    const handleEditUserProfile = () => {
        setEditingProfile(true);
    }
    return (
        <main>
            User Profile
            <div onClick={handleEditUserProfile}>
                button
            </div>
        </main>)
}