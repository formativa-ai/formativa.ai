import {StrongInterest} from "@/lib/types/PersonalDataProfile";

export default function Badge({badgeType, text}: {
    badgeType: "personalityType" | "userType" | "skill" | "interest" | "default";
    text: any;
}) {
    const getBadge = () => {
        switch (badgeType) {
            case 'personalityType':
                return <PersonalityBadge personalityType={text}/>;
            case 'userType':
                return <UserTypeBadge userType={text}/>;
            case 'skill':
                return <SkillBadge skill={text}/>;
            case 'interest':
                return <StrongInterestBadge interest={text}/>;
            default:
                return null
        }
    };

    return (
        <>
            {getBadge()}
        </>
    );
}

const StrongInterestBadge = ({ interest }:{interest: StrongInterest}) => {
    const colorMapping: { [key: string]: string} = {
        Realistic: "inline-flex ml-3 mt-3 items-center rounded-md bg-red-400/10 px-2 py-1 text-xs font-medium text-red-400 ring-1 ring-inset ring-red-400/20",
        Investigative: "inline-flex ml-3 mt-3 items-center rounded-md bg-blue-400/10 px-2 py-1 text-xs font-medium text-blue-400 ring-1 ring-inset ring-blue-400/20",
        Artistic: "inline-flex ml-3 mt-3 items-center rounded-md bg-teal-400/10 px-2 py-1 text-xs font-medium text-teal-400 ring-1 ring-inset ring-teal-400/20",
        Social: "inline-flex ml-3 mt-3 items-center rounded-md bg-indigo-400/10 px-2 py-1 text-xs font-medium text-indigo-400 ring-1 ring-inset ring-indigo-400/20",
        Enterprising: "inline-flex ml-3 mt-3 items-center rounded-md bg-orange-400/10 px-2 py-1 text-xs font-medium text-orange-400 ring-1 ring-inset ring-orange-400/20",
        Conventional: "inline-flex ml-3 mt-3 items-center rounded-md bg-yellow-400/10 px-2 py-1 text-xs font-medium text-yellow-400 ring-1 ring-inset ring-yellow-400/20",
    };

    return (
        <span className={colorMapping[interest.interest]}>
            {interest.interest} | {interest.score}
        </span>
    );
};

const SkillBadge = ({ skill }) => {
    const getSkillIcon = (skill) => {
        switch (skill) {
            default:
                return <span className="mr-1">💡</span>;
        }
    };

    return (
        <span className="inline-flex ml-3 mt-3 items-center rounded-md bg-blue-400/10 px-2 py-1 text-xs font-medium text-green-400 ring-1 ring-inset ring-green-400/20">
            {getSkillIcon(skill)}
            {skill.charAt(0).toUpperCase() + skill.slice(1)}
        </span>
    );
};

const UserTypeBadge = ({ userType }) => {
    const getUserTypeIcon = (type) => {
        switch (type.toLowerCase()) {
            case 'student':
            case 'estudiante':
                return <span className="mr-1">🎓</span>;
            case 'empleador':
            case 'employer':
                return <span className="mr-1">💼</span>;
            case 'instructor':
                return <span className="mr-1">📚</span>;
            default:
                return <span className="mr-1">❓</span>;
        }
    };

    return (
        <span className="ml-3 mt-3 inline-flex items-center rounded-md bg-red-400/10 px-2 py-1 text-xs font-medium text-red-400 ring-1 ring-inset ring-red-400/20">
            {getUserTypeIcon(userType)}
            {userType.charAt(0).toUpperCase() + userType.slice(1).toLowerCase()}
        </span>
    );
};

const PersonalityBadge = ({personalityType}: { personalityType: string }) => {
    const getPersonalityTypeIcon = (personalityType) => {
        switch (personalityType) {
            case 'INTJ':
                return <>🧠</>;
            case 'INTP':
                return <>🔍</>;
            case 'ENTJ':
                return <>🦁</>;
            case 'ENTP':
                return <>🗣️</>;
            case 'INFJ':
                return <>🌿</>;
            case 'INFP':
                return <>💖</>;
            case 'ENFJ':
                return <>🌟</>;
            case 'ENFP':
                return <>🌈</>;
            case 'ISTJ':
                return <>🗂️</>;
            case 'ISFJ':
                return <>🛡️</>;
            case 'ESTJ':
                return <>📋</>;
            case 'ESFJ':
                return <>🎉</>;
            case 'ISTP':
                return <>🛠️</>;
            case 'ISFP':
                return <>🎨</>;
            case 'ESTP':
                return <>🚀</>;
            case 'ESFP':
                return <>🎭</>;
            default:
                return <>❓</>;
        }
    };

    return (
        <span className="inline-flex ml-3 mt-3 items-center rounded-md bg-gray-400/10 px-2 py-1 text-xs font-medium text-blue-400 ring-1 ring-inset ring-blue-400/20">
            {<span className="mr-1">{getPersonalityTypeIcon(personalityType)}</span>} {personalityType}
        </span>
    )
}