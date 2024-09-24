import {ModelField} from "@aws-amplify/datastore";

export type PersonalDataProfile = {
    id: string | null;
    picture: string | null;
    personalityType: 'INTJ' | 'INTP' | 'ENTJ' | 'ENTP' | 'INFJ' | 'INFP' | 'ENFJ' | 'ENFP' | 'ISTJ' | 'ISFJ' | 'ESTJ' | 'ESFJ' | 'ISTP' | 'ISFP' | 'ESTP' | 'ESFP' | null;
    userType: 'STUDENT' | 'TEACHER' | 'EMPLOYER' | null;
    skills: string[] | null;
    strongInterestsResult: StrongInterestsResult | null,
    owner: string | null;
    createdAt: string | null;
    updatedAt: string | null;
}

export type StrongInterestsResult = {
    Realistic: StrongInterest| null;
    Investigative: StrongInterest | null;
    Artistic: StrongInterest | null;
    Social: StrongInterest | null;
    Enterprising: StrongInterest | null;
    Conventional: StrongInterest | null;
}

export type StrongInterest = {
    interest: 'Realistic' | 'Investigative' | 'Artistic' | 'Social' | 'Enterprising' | 'Conventional' | null;
    score: number | null;
}
