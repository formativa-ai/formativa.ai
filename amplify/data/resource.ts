import { type ClientSchema, a, defineData } from '@aws-amplify/backend';


const schema = a.schema({
    // Chat object model to store Messages in a thread, identified by chatId
    Chat: a
        .model({
            threadId: a.string().required(),
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
        })
        .authorization(allow => [allow.owner()]),

    PersonalityType: a
        .model({
            acronym: a.enum(['INTJ' , 'INTP' , 'ENTJ' , 'ENTP' , 'INFJ' , 'INFP' , 'ENFJ' , 'ENFP' , 'ISTJ' , 'ISFJ' , 'ESTJ' , 'ESFJ' , 'ISTP' , 'ISFP' , 'ESTP' , 'ESFP']),
            weight: a.integer().default(1),
            careerId: a.id(),
            career: a.belongsTo('Career', 'careerId'),
        })
        .authorization(allow => [allow.authenticated()]),

    UniversityCareer: a
        .model({
            universityId: a.id().required(),
            careerId: a.id().required(),
            university: a.belongsTo('University', 'universityId'),
            career: a.belongsTo('Career', 'careerId'),
        })
        .authorization(allow => [allow.authenticated()]),

    University: a
        .model({
            name: a.string(),
            location: a.string(),
            careers: a.hasMany('UniversityCareer', 'universityId'),
        })
        .authorization(allow => [allow.authenticated()]),

    Career: a
        .model({
            nameAtUniversity: a.string(),
            commonNameId: a.id(),
            commonName: a.belongsTo('CareerCommonName','commonNameId'),
            personalityTypes: a.hasMany('PersonalityType', 'careerId'),
            universities: a.hasMany('UniversityCareer', 'careerId'),
        })
        .authorization(allow => [allow.authenticated()]),

    CareerCommonName: a
        .model({
            careerEntries: a.hasMany('Career','commonNameId'),
            name: a.string()
        })
        .authorization(allow => [allow.authenticated()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
  },
});
