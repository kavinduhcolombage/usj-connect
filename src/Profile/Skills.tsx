import { ActionIcon, TagsInput } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconCheck, IconPencil, IconPlus, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../Services/ProfileService";
import { changeProfile } from "../Slices/ProfileSlice";
import { notifications } from "@mantine/notifications";

const Skills = () => {
    const [edit, setEdit] = useState(false);
    const profile = useSelector((state: any) => state.profile);
    const [skills, setSkills] = useState(['JavaScript', 'React', 'Node.js', 'CSS', 'HTML']);
    const isTab = useMediaQuery('(max-width: 550px)');
    const isMobile = useMediaQuery('(max-width: 400px)');
    const dispatch = useDispatch();

    const handleClick = () => {
        if (!edit) {
            setEdit(true);
            setSkills(profile?.skills);
        } else {
            setEdit(false);
        }
    }

    const handleSave = async () => {
        let updatedProfile = { ...profile, skills: skills };
        try {
            await updateProfile(updatedProfile);
            dispatch(changeProfile(updatedProfile));
            notifications.show({
                title: 'Updated Succesfully.',
                message: 'profile updated...',
                withCloseButton: true,
                icon: <IconCheck />,
                color: 'teal',
                withBorder: true,
                className: "!border-blue-500 !bg-blue-50 !text-blue-800 !shadow-lg !rounded-lg !p-4 !w-[400px]",
            })
        } catch (error) {
            console.error("Error updating profile:", error);
            notifications.show({
                title: "Error",
                message: "Failed to update profile.",
                icon: <IconX />,
                color: "red",
            });
        }
        setEdit(false);
    }

    return (
        <div className="px-3">
            <div className="text-2xl max-[600px]:text-xl max-[500px]:text-lg max-[400px]:text-base font-semibold mb-3 max-[500px]:mb-1 flex justify-between">
                Skills
                <div className="flex gap-2">
                    {
                        edit && <ActionIcon onClick={handleSave} size="lg" color="green.8" variant="subtle">
                            <IconCheck />
                        </ActionIcon>
                    }
                    <ActionIcon onClick={handleClick} size={isMobile ? "sm" : isTab ? "md" : "lg"} color={edit ? "red.8" : "blue"} variant="subtle">
                        {edit ? <IconX /> : (profile?.skills && profile.skills.length > 0 ? <IconPencil /> : <IconPlus />)}
                    </ActionIcon>
                </div>
            </div>
            {
                edit ? <TagsInput value={skills} onChange={setSkills} placeholder="Add Skill" splitChars={[',', ' ', '|']} /> :
                    <div className="flex flex-wrap gap-2">
                        {
                            profile?.skills && profile.skills.length > 0 ? (
                                profile.skills?.map((skill: any, index: number) => (
                                    <div
                                        key={index}
                                        className="bg-red-700 text-sm max-[400px]:text-xs font-medium bg-opacity-15 rounded-3xl text-yellow-300 px-3 py-1 max-[400px]:px-1.5 max-[400px]:py-0.5"
                                    >
                                        {skill}
                                    </div>
                                ))
                            ) : <div className="w-full py-8 text-gray-500 text-center">
                                Add skills
                            </div>

                        }
                    </div>
            }
        </div>
    )
}

export default Skills;