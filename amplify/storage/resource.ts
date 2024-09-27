import { defineStorage } from "@aws-amplify/backend";

export const storage = defineStorage({
    name: "amplify-gen2-files",
    access: (allow) => ({
        "images/profile-picture/*": [
            allow.guest.to(["read"]),
            allow.authenticated.to(["write", "read", "delete"]),
        ], //https://docs.amplify.aws/nextjs/build-a-backend/data/working-with-files/#:~:text=authorization%2C%20see%20the-,API%20documentation,-.
    }),
});