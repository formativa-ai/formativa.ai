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

    RIASEC: a
        .model({
            acronym: a.enum(['Investigative','Enterprising','Conventional','Artistic','Social','Realist']),
            careers: a.hasMany('CareerRIASEC', 'RIASECId')
        })
        .authorization(allow => [allow.authenticated()]),

    CareerRIASEC: a
        .model({
            RIASECId: a.id().required(),
            careerId: a.id().required(),
            weight: a.integer().default(10),
            riasec: a.belongsTo('RIASEC','RIASECId'),
            career: a.belongsTo('Career','careerId')
        })
        .authorization(allow => [allow.authenticated()]),

    PersonalityType: a
        .model({
            acronym: a.enum(['INTJ' , 'INTP' , 'ENTJ' , 'ENTP' , 'INFJ' , 'INFP' , 'ENFJ' , 'ENFP' , 'ISTJ' , 'ISFJ' , 'ESTJ' , 'ESFJ' , 'ISTP' , 'ISFP' , 'ESTP' , 'ESFP']),
            careers: a.hasMany('CareerPersonalityType', 'personalityTypeId')
        })
        .authorization(allow => [allow.authenticated()]),

    CareerPersonalityType: a
        .model({
            personalityTypeId: a.id().required(),
            careerId: a.id().required(),
            weight: a.integer().default(10),
            personalityType: a.belongsTo('PersonalityType','personalityTypeId'),
            career: a.belongsTo('Career','careerId')
        })
        .authorization(allow => [allow.authenticated()]),

    Career: a
        .model({
            careerEntries: a.hasMany('UniversityCareersOffered','careerId'),
            personalityTypes: a.hasMany('CareerPersonalityType','careerId'),
            riasecs: a.hasMany('CareerRIASEC','careerId'),
            name: a.string()
        })
        .authorization(allow => [allow.authenticated()]),

    UniversityCareersOffered: a
        .model({
            name: a.string(),
            university: a.belongsTo('University', 'universityId'),
            universityId: a.id().required(),
            careerId: a.id().required(),
            career: a.belongsTo('Career','careerId')
        })
        .authorization(allow => [allow.authenticated()]),

    University: a
        .model({
            name: a.string(),
            location: a.string(),
            careersOffered: a.hasMany('UniversityCareersOffered','universityId'),
        })
        .authorization(allow => [allow.authenticated()]),

    City: a
        .model({
            name: a.string(),
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
