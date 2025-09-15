import { ActionIcon, TagsInput } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconCheck, IconPencil, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { useSelector } from "react-redux";

const Skills = () => {
    const [edit, setEdit] = useState(false);
    const profile = useSelector((state: any) => state.profile);
    const [skills, setSkills] = useState(['JavaScript', 'React', 'Node.js', 'CSS', 'HTML']);
    const isTab = useMediaQuery('(max-width: 550px)');
    const isMobile = useMediaQuery('(max-width: 400px)');

    const handleClick = () => {
        if (!edit) {
            setEdit(true);
            setSkills(profile?.skills);
        } else {
            setEdit(false);
        }
    }

    const handleSave = () => {
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
                        {edit ? <IconX /> : <IconPencil />}
                    </ActionIcon>
                </div>
            </div>
            {
                edit ?
                    <TagsInput value={skills} onChange={setSkills} placeholder="Add Skill" splitChars={[',', ' ', '|']} /> :
                    <div className="flex flex-wrap gap-2">
                        {profile.skills?.map((skill: any, index: number) => (
                            <div
                                key={index}
                                className="bg-blue-400 text-sm max-[400px]:text-xs font-medium bg-opacity-15 rounded-3xl text-white px-3 py-1 max-[400px]:px-1.5 max-[400px]:py-0.5"
                            >
                                {skill}
                            </div>
                        ))}
                    </div>
            }
        </div>
    )
}

export default Skills;