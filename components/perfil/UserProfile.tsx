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
import {undefined} from "zod";
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
    const [strongInterests, setStrongInterests] = useState<StrongInterestsResult>();

    useEffect(() => {
        const fetchUserPoolAttributes = async () => {
            try {
                setUserAttributes(await fetchUserAttributes());
                setStrongInterests({
                    Artistic: {
                        interest: "Artistico",
                        score: parseInt(userAttributes["custom:artistic"])
                    },
                    Conventional: {
                        interest: "Convencional",
                        score: parseInt(userAttributes["custom:conventional"])
                    },
                    Enterprising: {
                        interest: "Emprendedor",
                        score: parseInt(userAttributes["custom:enterprising"])
                    },
                    Investigative: {
                        interest: "Investigativo",
                        score: parseInt(userAttributes["custom:investigative"])
                    },
                    Realistic: {
                        interest: "Realista",
                        score: parseInt(userAttributes["custom:realistic"])
                    },
                    Social: {
                        interest: "Social",
                        score: parseInt(userAttributes["custom:social"])
                    },
                })

            } catch (error) {
                setNotificationList([...notificationList, {message: `Hubo un error actualizando tus atributos personales.`, category: 'error'}]);
            }
        };

        fetchUserPoolAttributes();
    }, []);


    return (
        <main className="mx-10 my-20">
            {editingProfile?
                <EditUserAttributes
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
                <UserProfileDetails strongInterests={strongInterests} setStrongInterests={setStrongInterests} setEditingProfile={setEditingProfile} userAttributes={userAttributes}/>
            }
            <div onClick={signOut} className="cursor-pointer">
                Sign Out
            </div>
            <NotificationBanners notificationList={notificationList} setNotificationList={setNotificationList}/>
        </main>)
}