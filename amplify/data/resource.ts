import { type ClientSchema, a, defineData } from '@aws-amplify/backend';


const schema = a.schema({

    // PersonalDataProfile object model to store attributes like personality type, etc
    PersonalDataProfile: a
        .model({
            picture: a.string(),
            personalityType: a.enum(['INTJ' , 'INTP' , 'ENTJ' , 'ENTP' , 'INFJ' , 'INFP' , 'ENFJ' , 'ENFP' , 'ISTJ' , 'ISFJ' , 'ESTJ' , 'ESFJ' , 'ISTP' , 'ISFP' , 'ESTP' , 'ESFP']),
            userType: a.enum(['STUDENT', 'TEACHER', 'EMPLOYER']),
            skills: a.hasMany('PersonalDataProfileSkills', 'personalDataProfileId'),
            owner: a.string().authorization(allow => [allow.owner().to(['read', 'delete'])]) // this prevents the user from assigning this entry to another user
        })
        .authorization(allow => [allow.owner()]),

    // This is a join table to store the many-to-many relationship between PersonalDataProfile and Skills
    PersonalDataProfileSkills: a
        .model({
            personalDataProfileId: a.id().required(),
            skillId: a.id().required(),
            personalDataProfile: a.belongsTo('PersonalDataProfile', 'personalDataProfileId'),
            skill: a.belongsTo('Skill', 'skillId'),
        })
        .authorization(allow => [allow.owner()]),

    // Skill object model to store a list of skills
    Skill: a
        .model({
            PersonalDataProfiles: a.hasMany('PersonalDataProfileSkills', 'skillId'),
            skillName: a.string().authorization(allow => [allow.owner().to(['read', 'create'])]),  //TODO: add custom rule to allow only admins to create skills, then update 'create' permissions here
            owner: a.string().authorization(allow => [allow.owner().to(['read', 'delete'])]) // this prevents the user from assigning this entry to another user
        })
        .authorization(allow => [allow.owner()]),

    // Chat object model to store Messages in a thread, identified by chatId
    Chat: a
        .model({
            threadId: a.string(),
            messages: a.hasMany('Message', 'chatId'),
            owner: a.string().authorization(allow => [allow.owner().to(['read', 'delete'])])
        })
        .authorization(allow => [allow.owner()]),

    // Message object belongs to a Chat identified by chatId
    Message: a
        .model({
            chatId: a.id().required(),
            content: a.string(),
            role: a.string(),
            chat: a.belongsTo('Chat', 'chatId'),
            owner: a.string().authorization(allow => [allow.owner().to(['read', 'delete'])])
        })
        .authorization(allow => [allow.owner()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
  },
});
