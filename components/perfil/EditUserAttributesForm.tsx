import {useAuthenticator} from "@aws-amplify/ui-react";
import React, {useEffect, useState} from "react";
import {NotificationType} from "@/lib/types/NotificationType";
import {
    confirmUserAttribute,
    ConfirmUserAttributeInput,
    fetchUserAttributes,
    FetchUserAttributesOutput,
    updateUserAttributes,
    UpdateUserAttributesOutput
} from "aws-amplify/auth";
import ConfirmationCodeModal from "@/components/perfil/CodeConfirmationModal";

interface EditUserAttributesFormProps {
    notificationList?: NotificationType[],
    setNotificationList?: (value: (((prevState: NotificationType[]) => NotificationType[]) | NotificationType[])) => void,
    userAttributes?: FetchUserAttributesOutput,
    setUserAttributes?: (value: (((prevState: FetchUserAttributesOutput) => FetchUserAttributesOutput) | FetchUserAttributesOutput)) => void,
    codeDeliveryDetails?: {},
    setCodeDeliveryDetails?: (value: (((prevState: {}) => {}) | {})) => void,
    showConfirmationCodeModal?: boolean,
    setShowConfirmationCodeModal?: (value: (((prevState: boolean) => boolean) | boolean)) => void,
    editingProfile?: boolean,
    setEditingProfile?: (value: (((prevState: boolean) => boolean) | boolean)) => void
}

export default function EditUserAttributesForm({
                                                   notificationList,
                                                   setNotificationList,
                                                   userAttributes,
                                                   setUserAttributes,
                                                   codeDeliveryDetails,
                                                   setCodeDeliveryDetails,
                                                   showConfirmationCodeModal,
                                                   setShowConfirmationCodeModal,
                                                   editingProfile,
                                                   setEditingProfile
                                               }: EditUserAttributesFormProps) {

    const handleSuccessfulProfileUpdate = () => {
        setEditingProfile(false);
        setNotificationList([...notificationList, {
            message: `Tu perfil fue actualizado exitosamente.`,
            category: 'success'
        }]);
    }


    async function handleUpdateUserAttributes() {
        try {
            console.log(userAttributes)
            await updateUserAttributes({
                userAttributes: {
                    given_name: userAttributes.given_name,
                    family_name: userAttributes.family_name,
                    email: userAttributes.email,
                    middle_name: userAttributes.middle_name? userAttributes.middle_name : '',
                    gender: userAttributes.gender? userAttributes.gender : '',
                    birthdate: userAttributes.birthdate? userAttributes.birthdate : '',
                    phone_number: userAttributes.phone_number? userAttributes.phone_number : '',
                    website: userAttributes.website? userAttributes.website : '',
                    preferred_username: userAttributes.preferred_username? userAttributes.preferred_username : '',
                    picture: userAttributes.picture? userAttributes.picture : '',
                    profile: userAttributes.profile? userAttributes.profile : '',
                    "custom:entityType": userAttributes["custom:entityType"]? userAttributes["custom:entityType"] : 'Universidad',
                    "custom:entityName": userAttributes["custom:entityName"]? userAttributes["custom:entityName"] : '',
                    // "custom:govId": userAttributes["custom:govId"]? userAttributes["custom:govId"] : '',
                    "custom:personalityType": userAttributes["custom:personalityType"]? userAttributes["custom:personalityType"] : '',
                    "custom:userType": userAttributes["custom:userType"]? userAttributes["custom:userType"] : '',
                },
            }).then(output => handleUpdateUserAttributeNextSteps(output));
        } catch (error) {
            console.log(error)
            setNotificationList([...notificationList, {
                message: "Failed to update attribute. Please try again.",
                category: 'alert'
            }]);
        }
    }

    function handleUpdateUserAttributeNextSteps(output: UpdateUserAttributesOutput) {
        console.log(output)
        const {
            given_name,
            middle_name,
            family_name,
            email,
            gender,
            birthdate,
            phone_number,
            website,
            preferred_username,
        } = output;

        if (!email.isUpdated) {
            let nextStep = email.nextStep;
            switch (nextStep.updateAttributeStep) {
                case 'CONFIRM_ATTRIBUTE_WITH_CODE':
                    setCodeDeliveryDetails(nextStep.codeDeliveryDetails);
                    setShowConfirmationCodeModal(true);
                    break;
                case 'DONE':
                    handleSuccessfulProfileUpdate();
                    break;
            }
        } else {
            handleSuccessfulProfileUpdate();
        }
    }

    async function handleConfirmUserAttribute({
                                                  userAttributeKey,
                                                  confirmationCode,
                                              }: ConfirmUserAttributeInput) {
        try {
            await confirmUserAttribute({userAttributeKey, confirmationCode});
            // Update the user attributes state to reflect the confirmed email
            const updatedAttributes = await fetchUserAttributes();
            setUserAttributes(updatedAttributes);
            // Close the modal
            setShowConfirmationCodeModal(false);
            handleSuccessfulProfileUpdate();
        } catch (error) {
            setShowConfirmationCodeModal(false);
            setNotificationList([...notificationList, {
                message: "Failed to confirm attribute. Please try again.",
                category: 'alert'
            }]);
        }
    }


    return (
        <div>
            Editing Profile
            <br></br>
            <button onClick={handleUpdateUserAttributes}>Save</button>
            <ConfirmationCodeModal
                isOpen={showConfirmationCodeModal}
                onClose={() => setShowConfirmationCodeModal(false)}
                onConfirm={handleConfirmUserAttribute}
                codeDeliveryDetails={codeDeliveryDetails}
            />
        </div>
    )
}