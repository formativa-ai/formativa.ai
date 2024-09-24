/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getChat = /* GraphQL */ `
  query GetChat($id: ID!) {
    getChat(id: $id) {
      createdAt
      id
      messages {
        nextToken
        __typename
      }
      owner
      threadId
      updatedAt
      __typename
    }
  }
`;
export const getMessage = /* GraphQL */ `
  query GetMessage($id: ID!) {
    getMessage(id: $id) {
      chat {
        createdAt
        id
        owner
        threadId
        updatedAt
        __typename
      }
      chatId
      content
      createdAt
      id
      owner
      role
      updatedAt
      __typename
    }
  }
`;
export const getPersonalDataProfile = /* GraphQL */ `
  query GetPersonalDataProfile($id: ID!) {
    getPersonalDataProfile(id: $id) {
      createdAt
      id
      owner
      personalityType
      picture
      skills {
        nextToken
        __typename
      }
      strongInterestsResult {
        artistic
        conventional
        createdAt
        enterprising
        id
        investigative
        owner
        personalDataProfileId
        realistic
        social
        updatedAt
        __typename
      }
      updatedAt
      userType
      __typename
    }
  }
`;
export const getPersonalDataProfileSkills = /* GraphQL */ `
  query GetPersonalDataProfileSkills($id: ID!) {
    getPersonalDataProfileSkills(id: $id) {
      createdAt
      id
      owner
      personalDataProfile {
        createdAt
        id
        owner
        personalityType
        picture
        updatedAt
        userType
        __typename
      }
      personalDataProfileId
      skill {
        createdAt
        id
        owner
        skillName
        updatedAt
        __typename
      }
      skillId
      updatedAt
      __typename
    }
  }
`;
export const getSkill = /* GraphQL */ `
  query GetSkill($id: ID!) {
    getSkill(id: $id) {
      PersonalDataProfiles {
        nextToken
        __typename
      }
      createdAt
      id
      owner
      skillName
      updatedAt
      __typename
    }
  }
`;
export const getStrongInterestsResult = /* GraphQL */ `
  query GetStrongInterestsResult($id: ID!) {
    getStrongInterestsResult(id: $id) {
      artistic
      conventional
      createdAt
      enterprising
      id
      investigative
      owner
      personalDataProfile {
        createdAt
        id
        owner
        personalityType
        picture
        updatedAt
        userType
        __typename
      }
      personalDataProfileId
      realistic
      social
      updatedAt
      __typename
    }
  }
`;
export const listChats = /* GraphQL */ `
  query ListChats(
    $filter: ModelChatFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listChats(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        createdAt
        id
        owner
        threadId
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const listMessages = /* GraphQL */ `
  query ListMessages(
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        chatId
        content
        createdAt
        id
        owner
        role
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const listPersonalDataProfileSkills = /* GraphQL */ `
  query ListPersonalDataProfileSkills(
    $filter: ModelPersonalDataProfileSkillsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPersonalDataProfileSkills(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        createdAt
        id
        owner
        personalDataProfileId
        skillId
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const listPersonalDataProfiles = /* GraphQL */ `
  query ListPersonalDataProfiles(
    $filter: ModelPersonalDataProfileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPersonalDataProfiles(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        createdAt
        id
        owner
        personalityType
        picture
        updatedAt
        userType
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const listSkills = /* GraphQL */ `
  query ListSkills(
    $filter: ModelSkillFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSkills(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        createdAt
        id
        owner
        skillName
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const listStrongInterestsResults = /* GraphQL */ `
  query ListStrongInterestsResults(
    $filter: ModelStrongInterestsResultFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStrongInterestsResults(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        artistic
        conventional
        createdAt
        enterprising
        id
        investigative
        owner
        personalDataProfileId
        realistic
        social
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
