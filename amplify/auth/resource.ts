import {defineAuth} from "@aws-amplify/backend";

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
    loginWith: {
        email: true,
    },
    userAttributes: {
        givenName: { // Primer nombre
            mutable: true,
            required: true,
        },
        middleName: { // Segundo nombre
            mutable: true,
            required: false,
        },
        familyName: { // Primer apellido
            mutable: true,
            required: true,
        },
        birthdate: {
            mutable: true,
            required: true,
        },
        phoneNumber: {
            mutable: true,
            required: true,
        },
        nickname: {
            mutable: true,
            required: false,
        },
        preferredUsername: {
            mutable: true,
            required: true,
        },
        website: {
            mutable: true,
            required: false,
        }
    }
});

