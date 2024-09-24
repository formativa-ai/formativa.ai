import {StrongInterest, StrongInterestsResult} from "@/lib/types/PersonalDataProfile";

export default function Badge({badgeType, content}: {
    badgeType: "personalityType" | "userType" | "skill" | "interest" | "default";
    content: any;
}) {
    const getBadge = () => {
        switch (badgeType) {
            case 'personalityType':
                return <PersonalityBadge personalityType={content}/>;
            case 'userType':
                return <UserTypeBadge userType={content}/>;
            case 'skill':
                return <SkillBadge skill={content}/>;
            case 'interest':
                return <StrongInterestBadge interest={content}/>;
            default:
                return <DefaultBadge content={content}/>;
        }
    };

    return (
        <>
            {getBadge()}
        </>
    );
}

const StrongInterestBadge = ({ interest }:{interest: StrongInterest}) => {
    const badgeStyle : { [key:string] : {color: string,icon: string} } = {
        Realistic: {
            color: "inline-flex ml-3 mt-3 items-center rounded-md bg-red-400/10 px-2 py-1 text-xs font-medium text-red-400 ring-1 ring-inset ring-red-400/20",
            icon: '🔨',
        },
        Investigative: {
            color: "inline-flex ml-3 mt-3 items-center rounded-md bg-blue-400/10 px-2 py-1 text-xs font-medium text-blue-400 ring-1 ring-inset ring-blue-400/20",
            icon: '🔍',
        },
        Artistic: {
            color: "inline-flex ml-3 mt-3 items-center rounded-md bg-teal-400/10 px-2 py-1 text-xs font-medium text-teal-400 ring-1 ring-inset ring-teal-400/20",
            icon: '🎨',
        },
        Social: {
            color: "inline-flex ml-3 mt-3 items-center rounded-md bg-indigo-400/10 px-2 py-1 text-xs font-medium text-indigo-400 ring-1 ring-inset ring-indigo-400/20",
            icon: '👥',
        },
        Enterprising: {
            color: "inline-flex ml-3 mt-3 items-center rounded-md bg-orange-400/10 px-2 py-1 text-xs font-medium text-orange-400 ring-1 ring-inset ring-orange-400/20",
            icon: '📈',
        },
        Conventional: {
            color: "inline-flex ml-3 mt-3 items-center rounded-md bg-yellow-400/10 px-2 py-1 text-xs font-medium text-yellow-400 ring-1 ring-inset ring-yellow-400/20",
            icon: '📊',
        },
    };
    if(!interest) return null
    return (
        <span className={badgeStyle[interest?.interest]?.color}>
            {interest?.interest} | {interest?.score}
        </span>
    );
};

const DefaultBadge = ({ content }:{content: string}) => {
    const badgeStyle : { [key:string] : {color: string,icon: string} } = {}

    return (
        <span className="inline-flex ml-3 mt-3 items-center rounded-md bg-blue-400/10 px-2 py-1 text-xs font-medium text-green-400 ring-1 ring-inset ring-green-400/20">
            {'💡' + ' ' + content.charAt(0).toUpperCase() + content.slice(1)}
        </span>
    );
};

const SkillBadge = ({ skill }:{skill: string}) => {
    const badgeStyle : { [key:string] : {color: string,icon: string} } = {}

    return (
        <span className="inline-flex ml-3 mt-3 items-center rounded-md bg-blue-400/10 px-2 py-1 text-xs font-medium text-green-400 ring-1 ring-inset ring-green-400/20">
            {'💡' + ' ' + skill.charAt(0).toUpperCase() + skill.slice(1)}
        </span>
    );
};

const UserTypeBadge = ({ userType }:{ userType: string }) => {
    const badgeStyle : { [key: string] : { color: string,icon: string } } = {
        STUDENT: {
            color: 'bg-blue-400/10 text-blue-400 ring-blue-400/20',
            icon: '🎓',
        },
        EMPLOYER: {
            color: 'bg-blue-400/10 text-blue-400 ring-blue-400/20',
            icon: '💼',
        },
        INSTRUCTOR: {
            color: 'bg-blue-400/10 text-blue-400 ring-blue-400/20',
            icon: '📚',
        },
        OTHER : {
            color: 'bg-gray-400/10 text-gray-400 ring-gray-400/20',
            icon: '🌐',
        }

    }

    return (
        <span className={"inline-flex ml-3 mt-3 items-center rounded-md px-2 py-1 text-xs font-medium  ring-1 ring-inset " + (badgeStyle[userType]? badgeStyle[userType].color : badgeStyle['OTHER'].color)}>
            {(badgeStyle[userType]? badgeStyle[userType].icon : badgeStyle['OTHER'].icon) + ' ' + userType?.charAt(0).toUpperCase() + userType?.slice(1).toLowerCase()}
        </span>
    );
};

const PersonalityBadge = ({personalityType}: { personalityType: 'INTJ' | 'INTP' | 'ENTJ' | 'ENTP' | 'INFJ' | 'INFP' | 'ENFJ' | 'ENFP' | 'ISTJ' | 'ISFJ' | 'ESTJ' | 'ESFJ' | 'ISTP' | 'ISFP' | 'ESTP' | 'ESFP'}) => {

    const badgeStyle : { [key:string] : {color: string,icon: string} } = {
        INTJ: {
            color: 'bg-blue-400/10 text-blue-400 ring-blue-400/20',
            icon: '🧠',
        },
        INTP: {
            color: 'bg-blue-400/10 text-blue-400 ring-blue-400/20',
            icon: '🔍',
        },
        ENTJ: {
            color: 'bg-blue-400/10 text-blue-400 ring-blue-400/20',
            icon: '🦁',
        },
        ENTP: {
            color: 'bg-blue-400/10 text-blue-400 ring-blue-400/20',
            icon: '🗣️',
        },
        INFJ: {
            color: 'bg-green-400/10 text-green-400 ring-green-400/20',
            icon: '🌿',
        },
        INFP: {
            color: 'bg-green-400/10 text-green-400 ring-green-400/20',
            icon: '💖',
        },
        ENFJ: {
            color: 'bg-green-400/10 text-green-400 ring-green-400/20',
            icon: '🌟',
        },
        ENFP: {
            color: 'bg-green-400/10 text-green-400 ring-green-400/20',
            icon: '🌈',
        },
        ISTJ: {
            color: 'bg-red-400/10 text-red-400 ring-red-400/20',
            icon: '🗂️',
        },
        ISFJ: {
            color: 'bg-red-400/10 text-red-400 ring-red-400/20',
            icon: '🛡️',
        },
        ESTJ: {
            color: 'bg-red-400/10 text-red-400 ring-red-400/20',
            icon: '📋',
        },
        ESFJ: {
            color: 'bg-red-400/10 text-red-400 ring-red-400/20',
            icon: '🎉',
        },
        ISTP: {
            color: 'bg-yellow-400/10 text-yellow-400 ring-yellow-400/20',
            icon: '🛠️',
        },
        ISFP: {
            color: 'bg-yellow-400/10 text-yellow-400 ring-yellow-400/20',
            icon: '🎨',
        },
        ESTP: {
            color: 'bg-yellow-400/10 text-yellow-400 ring-yellow-400/20',
            icon: '🚀',
        },
        ESFP: {
            color: 'bg-yellow-400/10 text-yellow-400 ring-yellow-400/20',
            icon: '🎭',
        },
    }

    return (
        <span className={"inline-flex ml-3 mt-3 items-center rounded-md px-2 py-1 text-xs font-medium  ring-1 ring-inset " + badgeStyle[personalityType]?.color}>
            {badgeStyle[personalityType]?.icon + ' ' + personalityType}
        </span>
    )
}