import { useAuthenticator } from "@aws-amplify/ui-react";
import {
    confirmUserAttribute,
    ConfirmUserAttributeInput,
    fetchUserAttributes,
    FetchUserAttributesOutput, updateUserAttributes,
    UpdateUserAttributesOutput
} from "aws-amplify/auth";
import EditUserAttributes from "@/components/perfil/EditUserAttributes";
import React, {useEffect, useState} from "react";
import NotificationBanners from "@/components/ui/NotificationList";
import {NotificationType} from "@/lib/types/NotificationType";
import { Amplify } from 'aws-amplify';
import outputs from '@/amplify_outputs.json';
import {SkillCreateForm} from "@/ui-components";
import ConfirmationCodeModal from "@/components/perfil/CodeConfirmationModal";
import UserProfileDetails from "@/components/perfil/UserProfileDetails";
import {StrongInterestsResult} from "@/lib/types/PersonalDataProfile";
import {downloadData, getUrl} from "aws-amplify/storage";
Amplify.configure(outputs);

interface UserProfileProps {
    setEditingProfile?: (value: (((prevState: boolean) => boolean) | boolean)) => void
}

export default function UserProfile() {
    const { signOut } = useAuthenticator((context) => [context.user]);
    const [editingProfile, setEditingProfile] = React.useState(false);
    const [notificationList, setNotificationList] = useState<NotificationType[]>([]);
    const [userAttributes , setUserAttributes] = useState<FetchUserAttributesOutput>({});
    const [codeDeliveryDetails, setCodeDeliveryDetails] = useState({});
    const [showConfirmationCodeModal, setShowConfirmationCodeModal] = useState(false);
    const [profilePictureUrl, setProfilePictureUrl] = useState<string>();

    useEffect(() => {
        const fetchUserPoolAttributes = async () => {
            try {
                setUserAttributes(await fetchUserAttributes());
            } catch (error) {
                setNotificationList([...notificationList, {message: `Hubo un error actualizando tus atributos personales.`, category: 'error'}]);
            }
        };

        fetchUserPoolAttributes();
    }, [editingProfile]);



    useEffect(() => {
        const fetchImage = async () => {
            const result = await getUrl({
                path: userAttributes.picture,
            });
            setProfilePictureUrl(result.url.href);
        }
        if(userAttributes.picture)
            fetchImage();
    }, [userAttributes.picture]);


    return (
        <main>
            {editingProfile?
                <EditUserAttributes
                    profilePictureUrl={profilePictureUrl}
                    userAttributes={userAttributes}
                    setUserAttributes={setUserAttributes}
                    notificationList={notificationList}
                    setNotificationList={setNotificationList}
                    codeDeliveryDetails={codeDeliveryDetails}
                    setCodeDeliveryDetails={setCodeDeliveryDetails}
                    showConfirmationCodeModal={showConfirmationCodeModal}
                    setShowConfirmationCodeModal={setShowConfirmationCodeModal}
                    editingProfile={editingProfile}
                    setEditingProfile={setEditingProfile}
                />
                :
                <UserProfileDetails
                    profilePictureUrl={profilePictureUrl}
                    setEditingProfile={setEditingProfile}
                    userAttributes={userAttributes}/>
            }
            <NotificationBanners notificationList={notificationList} setNotificationList={setNotificationList}/>
        </main>)
}