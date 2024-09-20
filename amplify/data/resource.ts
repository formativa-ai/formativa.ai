import { type ClientSchema, a, defineData } from '@aws-amplify/backend';


const schema = a.schema({
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
