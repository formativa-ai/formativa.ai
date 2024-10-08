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
export const getPersonalityType = /* GraphQL */ `
  query GetPersonalityType($id: ID!) {
    getPersonalityType(id: $id) {
      createdAt
      id
      owner
      personalityType
      programasParticulares {
        nextToken
        __typename
      }
      updatedAt
      weigth
      __typename
    }
  }
`;
export const getProgramaParticular = /* GraphQL */ `
  query GetProgramaParticular($id: ID!) {
    getProgramaParticular(id: $id) {
      createdAt
      id
      nombreDePrograma
      owner
      personalityTypes {
        nextToken
        __typename
      }
      updatedAt
      __typename
    }
  }
`;
export const getProgramaParticularPersonalityType = /* GraphQL */ `
  query GetProgramaParticularPersonalityType($id: ID!) {
    getProgramaParticularPersonalityType(id: $id) {
      createdAt
      id
      owner
      personalityType {
        createdAt
        id
        owner
        personalityType
        updatedAt
        weigth
        __typename
      }
      personalityTypeId
      programaParticular {
        createdAt
        id
        nombreDePrograma
        owner
        updatedAt
        __typename
      }
      programaParticularId
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
export const listPersonalityTypes = /* GraphQL */ `
  query ListPersonalityTypes(
    $filter: ModelPersonalityTypeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPersonalityTypes(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        createdAt
        id
        owner
        personalityType
        updatedAt
        weigth
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const listProgramaParticularPersonalityTypes = /* GraphQL */ `
  query ListProgramaParticularPersonalityTypes(
    $filter: ModelProgramaParticularPersonalityTypeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProgramaParticularPersonalityTypes(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        createdAt
        id
        owner
        personalityTypeId
        programaParticularId
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const listProgramaParticulars = /* GraphQL */ `
  query ListProgramaParticulars(
    $filter: ModelProgramaParticularFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProgramaParticulars(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        createdAt
        id
        nombreDePrograma
        owner
        updatedAt
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
