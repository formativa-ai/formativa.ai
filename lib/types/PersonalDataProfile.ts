export type PersonalDataProfile = {
    createdAt: string | null;
    id: string | null;
    personalityType: 'INTJ' | 'INTP' | 'ENTJ' | 'ENTP' | 'INFJ' | 'INFP' | 'ENFJ' | 'ENFP' | 'ISTJ' | 'ISFJ' | 'ESTJ' | 'ESFJ' | 'ISTP' | 'ISFP' | 'ESTP' | 'ESFP' | null;
    userType: 'STUDENT' | 'TEACHER' | 'EMPLOYER' | null;
    skills: string[] | null;
    owner: string | null;
    updatedAt: string | null;
}
