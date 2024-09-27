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
import UserDetailsForm from "@/components/perfil/UserDetailsForm";
import ChangePasswordForm from "@/components/perfil/ChangePasswordForm";
import ConfirmationCodeModal from "@/components/perfil/CodeConfirmationModal";
import {PsychometricAssessmentResults} from "@/components/perfil/PsychometricAssessmentResults";

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
    setEditingProfile?: (value: (((prevState: boolean) => boolean) | boolean)) => void,
    profilePictureUrl?: string
}


export default function EditUserAttributes({
                                               notificationList,
                                               setNotificationList,
                                               userAttributes,
                                               setUserAttributes,
                                               codeDeliveryDetails,
                                               setCodeDeliveryDetails,
                                               showConfirmationCodeModal,
                                               setShowConfirmationCodeModal,
                                               editingProfile,
                                               setEditingProfile,
                                               profilePictureUrl
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
                    middle_name: userAttributes.middle_name ? userAttributes.middle_name : '',
                    gender: userAttributes.gender ? userAttributes.gender : '',
                    birthdate: userAttributes.birthdate ? userAttributes.birthdate : '',
                    phone_number: userAttributes.phone_number ? userAttributes.phone_number : '',
                    website: userAttributes.website ? userAttributes.website : '',
                    preferred_username: userAttributes.preferred_username ? userAttributes.preferred_username : '',
                    picture: userAttributes.picture ? userAttributes.picture : '',
                    profile: userAttributes.profile ? userAttributes.profile : '',
                    "custom:entityType": userAttributes["custom:entityType"] ? userAttributes["custom:entityType"] : '',
                    "custom:entityName": userAttributes["custom:entityName"] ? userAttributes["custom:entityName"] : '',
                    "custom:personalityType": userAttributes["custom:personalityType"] ? userAttributes["custom:personalityType"] : '',
                    "custom:userType": userAttributes["custom:userType"] ? userAttributes["custom:userType"] : 'Estudiante',
                    "custom:realistic": userAttributes["custom:realistic"] ? userAttributes["custom:realistic"] : '0',
                    "custom:investigative": userAttributes["custom:investigative"] ? userAttributes["custom:investigative"] : '0',
                    "custom:artistic": userAttributes["custom:artistic"] ? userAttributes["custom:artistic"] : '0',
                    "custom:social": userAttributes["custom:social"] ? userAttributes["custom:social"] : '0',
                    "custom:enterprising": userAttributes["custom:enterprising"] ? userAttributes["custom:enterprising"] : '0',
                    "custom:conventional": userAttributes["custom:conventional"] ? userAttributes["custom:conventional"] : '0',
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
        <div className="divide-y divide-white/5">
            <UserDetailsForm
                profilePictureUrl={profilePictureUrl}
                setNotificationList={setNotificationList}
                notificationList={notificationList}
                setEditingProfile={setEditingProfile}
                userAttributes={userAttributes}
                setUserAttributes={setUserAttributes}
                handleUpdateUserAttributes={handleUpdateUserAttributes}
            />
            <PsychometricAssessmentResults
                setEditingProfile={setEditingProfile}
                userAttributes={userAttributes}
                setUserAttributes={setUserAttributes}
                handleUpdateUserAttributes={handleUpdateUserAttributes}
            />
            {/*<ChangePasswordForm />*/}
            {/*<ManageOtherSessionsForm/>*/}
            <DeleteAccountForm/>
            <ConfirmationCodeModal
                isOpen={showConfirmationCodeModal}
                onClose={() => setShowConfirmationCodeModal(false)}
                onConfirm={handleConfirmUserAttribute}
                codeDeliveryDetails={codeDeliveryDetails}
            />
        </div>
    )
}


function DeleteAccountForm() {
    return (
        <div className="mt-20">
            <p className="text-center font-mono font-bold text-red-800">Zona de Peligro</p>
            <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">

                <div>
                    <h2 className="text-base font-semibold leading-7 text-white">Delete account</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-400">
                        No longer want to use our service? You can delete your account here. This action is not
                        reversible.
                        All information related to this account will be deleted permanently.
                    </p>
                </div>

                <div className="flex items-start md:col-span-2">
                    <button
                        type="submit"
                        className="rounded-md border-2 border-red-500 bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500"
                    >
                        Yes, delete my account
                    </button>
                </div>
            </div>
        </div>
    );
}