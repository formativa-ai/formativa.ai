/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createChat = /* GraphQL */ `
  mutation CreateChat(
    $condition: ModelChatConditionInput
    $input: CreateChatInput!
  ) {
    createChat(condition: $condition, input: $input) {
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
export const createMessage = /* GraphQL */ `
  mutation CreateMessage(
    $condition: ModelMessageConditionInput
    $input: CreateMessageInput!
  ) {
    createMessage(condition: $condition, input: $input) {
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
export const createPersonalDataProfile = /* GraphQL */ `
  mutation CreatePersonalDataProfile(
    $condition: ModelPersonalDataProfileConditionInput
    $input: CreatePersonalDataProfileInput!
  ) {
    createPersonalDataProfile(condition: $condition, input: $input) {
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
export const createPersonalDataProfileSkills = /* GraphQL */ `
  mutation CreatePersonalDataProfileSkills(
    $condition: ModelPersonalDataProfileSkillsConditionInput
    $input: CreatePersonalDataProfileSkillsInput!
  ) {
    createPersonalDataProfileSkills(condition: $condition, input: $input) {
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
export const createProgramaParticular = /* GraphQL */ `
  mutation CreateProgramaParticular(
    $condition: ModelProgramaParticularConditionInput
    $input: CreateProgramaParticularInput!
  ) {
    createProgramaParticular(condition: $condition, input: $input) {
      createdAt
      id
      nombreDePrograma
      owner
      personalityType
      updatedAt
      __typename
    }
  }
`;
export const createSkill = /* GraphQL */ `
  mutation CreateSkill(
    $condition: ModelSkillConditionInput
    $input: CreateSkillInput!
  ) {
    createSkill(condition: $condition, input: $input) {
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
export const deleteChat = /* GraphQL */ `
  mutation DeleteChat(
    $condition: ModelChatConditionInput
    $input: DeleteChatInput!
  ) {
    deleteChat(condition: $condition, input: $input) {
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
export const deleteMessage = /* GraphQL */ `
  mutation DeleteMessage(
    $condition: ModelMessageConditionInput
    $input: DeleteMessageInput!
  ) {
    deleteMessage(condition: $condition, input: $input) {
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
export const deletePersonalDataProfile = /* GraphQL */ `
  mutation DeletePersonalDataProfile(
    $condition: ModelPersonalDataProfileConditionInput
    $input: DeletePersonalDataProfileInput!
  ) {
    deletePersonalDataProfile(condition: $condition, input: $input) {
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
export const deletePersonalDataProfileSkills = /* GraphQL */ `
  mutation DeletePersonalDataProfileSkills(
    $condition: ModelPersonalDataProfileSkillsConditionInput
    $input: DeletePersonalDataProfileSkillsInput!
  ) {
    deletePersonalDataProfileSkills(condition: $condition, input: $input) {
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
export const deleteProgramaParticular = /* GraphQL */ `
  mutation DeleteProgramaParticular(
    $condition: ModelProgramaParticularConditionInput
    $input: DeleteProgramaParticularInput!
  ) {
    deleteProgramaParticular(condition: $condition, input: $input) {
      createdAt
      id
      nombreDePrograma
      owner
      personalityType
      updatedAt
      __typename
    }
  }
`;
export const deleteSkill = /* GraphQL */ `
  mutation DeleteSkill(
    $condition: ModelSkillConditionInput
    $input: DeleteSkillInput!
  ) {
    deleteSkill(condition: $condition, input: $input) {
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
export const updateChat = /* GraphQL */ `
  mutation UpdateChat(
    $condition: ModelChatConditionInput
    $input: UpdateChatInput!
  ) {
    updateChat(condition: $condition, input: $input) {
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
export const updateMessage = /* GraphQL */ `
  mutation UpdateMessage(
    $condition: ModelMessageConditionInput
    $input: UpdateMessageInput!
  ) {
    updateMessage(condition: $condition, input: $input) {
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
export const updatePersonalDataProfile = /* GraphQL */ `
  mutation UpdatePersonalDataProfile(
    $condition: ModelPersonalDataProfileConditionInput
    $input: UpdatePersonalDataProfileInput!
  ) {
    updatePersonalDataProfile(condition: $condition, input: $input) {
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
export const updatePersonalDataProfileSkills = /* GraphQL */ `
  mutation UpdatePersonalDataProfileSkills(
    $condition: ModelPersonalDataProfileSkillsConditionInput
    $input: UpdatePersonalDataProfileSkillsInput!
  ) {
    updatePersonalDataProfileSkills(condition: $condition, input: $input) {
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
export const updateProgramaParticular = /* GraphQL */ `
  mutation UpdateProgramaParticular(
    $condition: ModelProgramaParticularConditionInput
    $input: UpdateProgramaParticularInput!
  ) {
    updateProgramaParticular(condition: $condition, input: $input) {
      createdAt
      id
      nombreDePrograma
      owner
      personalityType
      updatedAt
      __typename
    }
  }
`;
export const updateSkill = /* GraphQL */ `
  mutation UpdateSkill(
    $condition: ModelSkillConditionInput
    $input: UpdateSkillInput!
  ) {
    updateSkill(condition: $condition, input: $input) {
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
