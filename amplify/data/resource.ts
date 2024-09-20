import { type ClientSchema, a, defineData } from '@aws-amplify/backend';


const schema = a.schema({
  Chat: a
    .model({
      threadId: a.string(),
      // owner: a.string().authorization(allow => [allow.owner().to(['read', 'delete'])])
    })
      .authorization(allow => [allow.owner().to(['create', 'read', 'update'])]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
  },
});
