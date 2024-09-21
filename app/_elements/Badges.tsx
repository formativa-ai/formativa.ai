export default function Badge({badgeType, text}: {
    badgeType: "personalityType" | "userType" | "skill" | "interest" | "default";
    text: string
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

const StrongInterestBadge = ({ interest }) => {
    const getUserTypeIcon = (interest) => {
        switch (interest) {
            case 'estudiante':
                return <span className="mr-1">🎓</span>;
            case 'empleador':
                return <span className="mr-1">💼</span>;
            case 'instructor':
                return <span className="mr-1">📚</span>;
            default:
                return <span className="mr-1">❓</span>;
        }
    };

    return (
        <span className="inline-flex ml-3 mt-3 items-center rounded-md bg-green-400/10 px-2 py-1 text-xs font-medium text-green-400 ring-1 ring-inset ring-green-400/20">
            {getUserTypeIcon(interest)}
            {interest.charAt(0).toUpperCase() + interest.slice(1)}
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
        <span className="inline-flex ml-3 mt-3 items-center rounded-md bg-green-400/10 px-2 py-1 text-xs font-medium text-green-400 ring-1 ring-inset ring-green-400/20">
            {getSkillIcon(skill)}
            {skill.charAt(0).toUpperCase() + skill.slice(1)}
        </span>
    );
};

const UserTypeBadge = ({ userType }) => {
    const getUserTypeIcon = (type) => {
        console.log(type.toLowerCase())
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
                return <span className="mr-1">🧠</span>;
            case 'INTP':
                return <span className="mr-1">🔍</span>;
            case 'ENTJ':
                return <span className="mr-1">🦁</span>;
            case 'ENTP':
                return <span className="mr-1">🗣️</span>;
            case 'INFJ':
                return <span className="mr-1">🌿</span>;
            case 'INFP':
                return <span className="mr-1">💖</span>;
            case 'ENFJ':
                return <span className="mr-1">🌟</span>;
            case 'ENFP':
                return <span className="mr-1">🌈</span>;
            case 'ISTJ':
                return <span className="mr-1">🗂️</span>;
            case 'ISFJ':
                return <span className="mr-1">🛡️</span>;
            case 'ESTJ':
                return <span className="mr-1">📋</span>;
            case 'ESFJ':
                return <span className="mr-1">🎉</span>;
            case 'ISTP':
                return <span className="mr-1">🛠️</span>;
            case 'ISFP':
                return <span className="mr-1">🎨</span>;
            case 'ESTP':
                return <span className="mr-1">🚀</span>;
            case 'ESFP':
                return <span className="mr-1">🎭</span>;
            default:
                return <span className="mr-1">❓</span>;
        }
    };

    return (
        <span className="inline-flex ml-3 mt-3 items-center rounded-md bg-gray-400/10 px-2 py-1 text-xs font-medium text-blue-400 ring-1 ring-inset ring-blue-400/20">
            {getPersonalityTypeIcon(personalityType)}
            {personalityType}
        </span>
    )
}