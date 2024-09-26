import {FetchUserAttributesOutput} from "aws-amplify/auth";
import Badge from "@/app/_elements/Badges";

interface UserProfileDetailsProps {
    userAttributes?: FetchUserAttributesOutput,
    setEditingProfile?: (value: (((prevState: boolean) => boolean) | boolean)) => void
}

export default function UserProfileDetails({userAttributes, setEditingProfile}: UserProfileDetailsProps) {
    return (
        <div className="flex flex-col">
            <div className="flex flex-col items-center">
                <h1 className="text-2xl font-bold">Perfil</h1>
                <div className="flex flex-col items-center">
                    <img src={userAttributes?.profile} alt="profile" className="rounded-full w-20 h-20"/>
                    <h2 className="text-lg font-bold">{userAttributes?.given_name} {userAttributes?.family_name}</h2>
                </div>
                <div className="flex flex-col items-center">
                    <p>{userAttributes?.email}</p>
                    <p>{userAttributes?.phone_number}</p>
                </div>
                <div className="flex flex-col items-center">
                    <p>{userAttributes?.birthdate}</p>
                    <p>{userAttributes["custom:entityName"]}</p>
                    <p>{userAttributes["custom:entityType"]}</p>
                    <p>{userAttributes["custom:userType"]}</p>
                    {userAttributes["custom:personalityType"] &&
                        <Badge badgeType={"personalityType"} content={userAttributes["custom:personalityType"]}/>
                    }
                    {/*<p>{userAttributes?.*/}
                </div>
            </div>
            <button onClick={() => setEditingProfile(true)} className="bg-blue-500 text-white rounded-md p-2 mt-2">
                Editar Perfil
            </button>
        </div>
    )
}