import { ActionIcon } from "@mantine/core";
import { IconPencil, IconPlus, IconX } from "@tabler/icons-react";
import { useState } from "react";
import CertiCard from "./CertiCard";
import CertiInput from "./CertiInput";
import { useSelector } from "react-redux";

const Certificate = () => {
    const [edit, setEdit] = useState(false);
    const [addCerti, setAddCerti] = useState(false);
    const profile = useSelector((state: any) => state.profile)

    const handleClick = () => {
        setEdit(!edit);
    }

    return (
        <div className="px-3 pb-5">
            <div className="text-2xl max-[600px]:text-xl max-[500px]:text-lg max-[400px]:text-base font-semibold mb-3 max-[500px]:mb-1 flex justify-between items-center">
                <span>Certifications</span>
                {!addCerti && (
                    profile?.certifications && profile.certifications.length > 0 ? (
                        <div className="flex gap-2">
                            {!edit && <ActionIcon onClick={() => setAddCerti(true)} size="lg" color="blue" variant="subtle">
                                <IconPlus />
                            </ActionIcon>}
                            <ActionIcon onClick={handleClick} size="lg" color={edit ? "red.8" : "blue"} variant="subtle">
                                {edit ? <IconX /> : <IconPencil />}
                            </ActionIcon>
                        </div>
                    ): <div className="flex justify-end w-full">
                        <ActionIcon onClick={() => setAddCerti(true)} size="lg" color="blue" variant="subtle">
                            <IconPlus />
                        </ActionIcon>
                    </div>
                )



                }
            </div>
            <div className="flex flex-col gap-8">
                {addCerti && <CertiInput add setEdit={setAddCerti} />}
                {
                    profile?.certifications && profile.certifications.length > 0 ?
                        (profile?.certifications?.map((certi: any, index: number) => (
                            <CertiCard key={index} index={index} edit={edit} {...certi} />
                        ))) : (
                            <div className="text-center py-8 text-gray-500">Add certification</div>
                        )
                }
            </div>
        </div>
    )
}

export default Certificate;