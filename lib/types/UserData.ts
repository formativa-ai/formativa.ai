import {FetchUserAttributesOutput} from "aws-amplify/auth";

export type UserAttributes = {
    email: string,
    email_verified: boolean,
    phone_number: string,
    phone_number_verified: boolean,
    family_name: string,
    given_name: string,
    birthdate: string,
    sub: string
}

export let GuestUser: FetchUserAttributesOutput = {
    given_name: "Guest",
    family_name: "",
    email: "guest@email"
}