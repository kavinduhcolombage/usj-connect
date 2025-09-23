import { ActionIcon } from "@mantine/core";
import { IconPencil, IconPlus, IconX } from "@tabler/icons-react";
import ExpCard from "./ExpCard";
import ExpInput from "./ExpInput";
import { useState } from "react";
import { useSelector } from "react-redux";

const Experience = () => {
    const profile = useSelector((state: any) => state.profile);
    const [edit, setEdit] = useState(false);
    const [addExp, setAddExp] = useState(false);

    const handleClick = () => {
        setEdit(!edit);
    }

    return (
        <div className="px-3">
            <div className="text-2xl max-[600px]:text-xl max-[500px]:text-lg max-[400px]:text-base font-semibold mb-3 max-[500px]:mb-1 flex justify-between items-center">
                <span>Experience</span>
                {!addExp && (
                    profile?.experience && profile.experience.length > 0 ? (
                        <div className="flex gap-2">
                            {!edit && <ActionIcon onClick={() => setAddExp(true)} size="lg" color="blue" variant="subtle">
                                <IconPlus />
                            </ActionIcon>}
                            <ActionIcon onClick={handleClick} size="lg" color={edit ? "red.8" : "blue"} variant="subtle">
                                {edit ? <IconX /> : <IconPencil />}
                            </ActionIcon>
                        </div>
                    ) : (
                        <div className="flex justify-end w-full">
                            <ActionIcon onClick={() => setAddExp(true)} size="lg" color="blue" variant="subtle">
                                <IconPlus />
                            </ActionIcon>
                        </div>
                    )
                )}
            </div>
            <div className="flex flex-col gap-8">
                {addExp && <ExpInput add setEdit={setAddExp} />}
                {
                    profile?.experience && profile.experience.length > 0 ? (
                        profile.experience.map((exp: any, index: number) => (
                            <ExpCard key={index} index={index} {...exp} edit={edit} />
                        ))
                    ) : (
                        <div className="text-center py-8 text-gray-500">Add experience</div>
                    )
                }
            </div>
        </div>
    )
}

export default Experience;