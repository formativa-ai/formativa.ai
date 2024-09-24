/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateChat = /* GraphQL */ `
  subscription OnCreateChat(
    $filter: ModelSubscriptionChatFilterInput
    $owner: String
  ) {
    onCreateChat(filter: $filter, owner: $owner) {
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
export const onCreateMessage = /* GraphQL */ `
  subscription OnCreateMessage(
    $filter: ModelSubscriptionMessageFilterInput
    $owner: String
  ) {
    onCreateMessage(filter: $filter, owner: $owner) {
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
export const onCreatePersonalDataProfile = /* GraphQL */ `
  subscription OnCreatePersonalDataProfile(
    $filter: ModelSubscriptionPersonalDataProfileFilterInput
    $owner: String
  ) {
    onCreatePersonalDataProfile(filter: $filter, owner: $owner) {
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
export const onCreatePersonalDataProfileSkills = /* GraphQL */ `
  subscription OnCreatePersonalDataProfileSkills(
    $filter: ModelSubscriptionPersonalDataProfileSkillsFilterInput
    $owner: String
  ) {
    onCreatePersonalDataProfileSkills(filter: $filter, owner: $owner) {
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
export const onCreateSkill = /* GraphQL */ `
  subscription OnCreateSkill(
    $filter: ModelSubscriptionSkillFilterInput
    $owner: String
  ) {
    onCreateSkill(filter: $filter, owner: $owner) {
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
export const onCreateStrongInterestsResult = /* GraphQL */ `
  subscription OnCreateStrongInterestsResult(
    $filter: ModelSubscriptionStrongInterestsResultFilterInput
    $owner: String
  ) {
    onCreateStrongInterestsResult(filter: $filter, owner: $owner) {
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
export const onDeleteChat = /* GraphQL */ `
  subscription OnDeleteChat(
    $filter: ModelSubscriptionChatFilterInput
    $owner: String
  ) {
    onDeleteChat(filter: $filter, owner: $owner) {
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
export const onDeleteMessage = /* GraphQL */ `
  subscription OnDeleteMessage(
    $filter: ModelSubscriptionMessageFilterInput
    $owner: String
  ) {
    onDeleteMessage(filter: $filter, owner: $owner) {
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
export const onDeletePersonalDataProfile = /* GraphQL */ `
  subscription OnDeletePersonalDataProfile(
    $filter: ModelSubscriptionPersonalDataProfileFilterInput
    $owner: String
  ) {
    onDeletePersonalDataProfile(filter: $filter, owner: $owner) {
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
export const onDeletePersonalDataProfileSkills = /* GraphQL */ `
  subscription OnDeletePersonalDataProfileSkills(
    $filter: ModelSubscriptionPersonalDataProfileSkillsFilterInput
    $owner: String
  ) {
    onDeletePersonalDataProfileSkills(filter: $filter, owner: $owner) {
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
export const onDeleteSkill = /* GraphQL */ `
  subscription OnDeleteSkill(
    $filter: ModelSubscriptionSkillFilterInput
    $owner: String
  ) {
    onDeleteSkill(filter: $filter, owner: $owner) {
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
export const onDeleteStrongInterestsResult = /* GraphQL */ `
  subscription OnDeleteStrongInterestsResult(
    $filter: ModelSubscriptionStrongInterestsResultFilterInput
    $owner: String
  ) {
    onDeleteStrongInterestsResult(filter: $filter, owner: $owner) {
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
export const onUpdateChat = /* GraphQL */ `
  subscription OnUpdateChat(
    $filter: ModelSubscriptionChatFilterInput
    $owner: String
  ) {
    onUpdateChat(filter: $filter, owner: $owner) {
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
export const onUpdateMessage = /* GraphQL */ `
  subscription OnUpdateMessage(
    $filter: ModelSubscriptionMessageFilterInput
    $owner: String
  ) {
    onUpdateMessage(filter: $filter, owner: $owner) {
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
export const onUpdatePersonalDataProfile = /* GraphQL */ `
  subscription OnUpdatePersonalDataProfile(
    $filter: ModelSubscriptionPersonalDataProfileFilterInput
    $owner: String
  ) {
    onUpdatePersonalDataProfile(filter: $filter, owner: $owner) {
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
export const onUpdatePersonalDataProfileSkills = /* GraphQL */ `
  subscription OnUpdatePersonalDataProfileSkills(
    $filter: ModelSubscriptionPersonalDataProfileSkillsFilterInput
    $owner: String
  ) {
    onUpdatePersonalDataProfileSkills(filter: $filter, owner: $owner) {
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
export const onUpdateSkill = /* GraphQL */ `
  subscription OnUpdateSkill(
    $filter: ModelSubscriptionSkillFilterInput
    $owner: String
  ) {
    onUpdateSkill(filter: $filter, owner: $owner) {
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
export const onUpdateStrongInterestsResult = /* GraphQL */ `
  subscription OnUpdateStrongInterestsResult(
    $filter: ModelSubscriptionStrongInterestsResultFilterInput
    $owner: String
  ) {
    onUpdateStrongInterestsResult(filter: $filter, owner: $owner) {
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
