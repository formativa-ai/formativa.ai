import {FetchUserAttributesOutput} from "aws-amplify/auth";
import Badge from "@/app/_elements/Badges";
import {StrongInterestsResult} from "@/lib/types/PersonalDataProfile";
import {useEffect} from "react";
import {downloadData} from "@aws-amplify/storage";

interface UserProfileDetailsProps {
    userAttributes?: FetchUserAttributesOutput,
    setEditingProfile?: (value: (((prevState: boolean) => boolean) | boolean)) => void,
    profilePictureUrl?: string
}

export default function UserProfileDetails({
                                               userAttributes,
                                               setEditingProfile,
                                               profilePictureUrl
                                           }: UserProfileDetailsProps) {


    return (
        <div className="flex flex-col">
            <div className="flex flex-col items-center">
                <h1 className="text-2xl font-bold">Perfil</h1>
                <div className="flex flex-col items-center">
                    <img src={profilePictureUrl? profilePictureUrl: "/blank-profile.webp"} alt="profile" className="rounded-full w-20 h-20"/>
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
                    Strong Interests
                    {userAttributes["custom:realistic"] &&
                        <Badge badgeType={"interest"}
                               content={{interest: "Realistic", score: userAttributes["custom:realistic"]}}/>
                    }

                    {userAttributes["custom:investigative"] &&
                        <Badge badgeType={"interest"}
                               content={{interest: "Investigative", score: userAttributes["custom:investigative"]}}/>
                    }

                    {userAttributes["custom:artistic"] &&
                        <Badge badgeType={"interest"}
                               content={{interest: "Artistic", score: userAttributes["custom:artistic"]}}/>
                    }

                    {userAttributes["custom:social"] &&
                        <Badge badgeType={"interest"}
                               content={{interest: "Social", score: userAttributes["custom:social"]}}/>
                    }

                    {userAttributes["custom:enterprising"] &&
                        <Badge badgeType={"interest"}
                               content={{interest: "Enterprising", score: userAttributes["custom:enterprising"]}}/>
                    }

                    {userAttributes["custom:conventional"] &&
                        <Badge badgeType={"interest"}
                               content={{interest: "Conventional", score: userAttributes["custom:conventional"]}}/>
                    }
                    {/*<p>{userAttributes?.*/}
                </div>
            </div>
            <button
                type="submit"
                onClick={() => setEditingProfile(true)}
                className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
                Editar Perfil
            </button>
        </div>
    )
}