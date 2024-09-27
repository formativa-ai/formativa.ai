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
import {parsePhoneNumberFromString} from "libphonenumber-js";
import {deleteUser} from 'aws-amplify/auth';
import DeleteAccountModal from "@/components/perfil/DeleteAccountModal";


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

    const [showAccountDeleteModal, setShowAccountDeleteModal] = useState(false);

    const handleSuccessfulProfileUpdate = () => {
        setEditingProfile(false);
        setNotificationList([{
            message: `Tu perfil fue actualizado exitosamente.`,
            category: 'success'
        }]);
    }

    async function handleDeleteUser() {
        try {
            await deleteUser();
        } catch (error) {
            setNotificationList([...notificationList, {
                message: "No se pudo eliminar la cuenta. Por favor, inténtalo mas tarde.",
                category: 'alert'
            }]);
        }
        setShowAccountDeleteModal(false);
    }

    function validateAttributes() {
        if (!userAttributes.given_name || !userAttributes.family_name || !userAttributes.email) {
            throw new Error("Porfavor ingrese su nombre, apellido y correo electrónico.");
        }

        if (userAttributes.phone_number && userAttributes.phone_number.length < "+123".length) {
            throw new Error("Porfavor ingrese un número de teléfono válido.");
        }

        try {
            const parsedNumber = parsePhoneNumberFromString(userAttributes.phone_number);

            if (parsedNumber && !parsedNumber.isValid()) {
                throw new Error();
            }
        } catch (error) {
            throw new Error("Porfavor ingrese un número de teléfono válido.");
        }
    }

    async function handleUpdateUserAttributes() {
        try {
            validateAttributes()
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
            setNotificationList([...notificationList, {
                message: error.message,
                category: 'alert'
            }]);
        }
    }

    function handleUpdateUserAttributeNextSteps(output: UpdateUserAttributesOutput) {
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
            <DeleteAccountForm setShowAccountDeleteModal={setShowAccountDeleteModal}/>
            <ConfirmationCodeModal
                isOpen={showConfirmationCodeModal}
                onClose={() => setShowConfirmationCodeModal(false)}
                onConfirm={handleConfirmUserAttribute}
                codeDeliveryDetails={codeDeliveryDetails}
            />
            <DeleteAccountModal open={showAccountDeleteModal} setOpen={setShowAccountDeleteModal} handleDeleteUser={handleDeleteUser}/>
        </div>
    )
}


interface DeleteAccountFormProps {
    setShowAccountDeleteModal?: (value: (((prevState: boolean) => boolean) | boolean)) => void
}

function DeleteAccountForm({setShowAccountDeleteModal}: DeleteAccountFormProps) {
    return (
        <div className="mt-20">
            <p className="text-center font-mono font-bold text-red-800">Zona de Peligro</p>
            <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">

                <div>
                    <h2 className="text-base font-semibold leading-7 text-white">Borrar Cuenta</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-400">
                        Ya no quieres usar nuestra plataforma? Puedes eliminar tu cuenta aquí.
                        Una vez que elimines tu cuenta, todos tus datos serán eliminados y no
                        podrás recuperar tu cuenta.
                    </p>
                </div>

                <div className="flex items-start md:col-span-2">
                    <button
                        type="submit"
                        onClick={(e) => setShowAccountDeleteModal(true)}
                        className="rounded-md border-2 border-red-500 bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500"
                    >
                        Si, borrar mi cuenta
                    </button>
                </div>
            </div>
        </div>
    );
}

