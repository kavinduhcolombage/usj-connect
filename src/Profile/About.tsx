import { ActionIcon, Textarea } from "@mantine/core";
import { IconCheck, IconPencil, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../Slices/ProfileSlice";
import { notifications } from "@mantine/notifications";
import { updateProfile } from "../Services/ProfileService";
import { useMediaQuery } from "@mantine/hooks";

const About = () => {
    const dispatch = useDispatch();
    const [edit, setEdit] = useState(false);
    const profile = useSelector((state: any) => state.profile);
    const [about, setAbout] = useState("");
    const isTab = useMediaQuery('(max-width: 550px)');
    const isMobile = useMediaQuery('(max-width: 400px)');

    const handleClick = () => {
        if (!edit) {
            setEdit(true);
            setAbout(profile?.about);

        } else {
            setEdit(false);
        }
    }

    const handleSave = async () => {
        setEdit(false);
        let updatedProfile = { ...profile, about: about };
        try {
            await updateProfile(updatedProfile);
            dispatch(changeProfile(updatedProfile));
            console.log("Updated Profile:", updatedProfile);
            notifications.show({
                title: 'Updated Succesfully.',
                message: 'About updated...',
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
    }

    return (
        <div className="px-3">
            <div className="text-2xl max-[600px]:text-xl max-[500px]:text-lg max-[400px]:text-base font-semibold mb-3 max-[500px]:mb-1 flex justify-between">
                About
                <div className="flex gap-2">
                    {edit && <ActionIcon onClick={handleSave} size="lg" color="green.8" variant="subtle">
                        <IconCheck />
                    </ActionIcon>}
                    <ActionIcon onClick={handleClick} size={isMobile ? "sm" : isTab ? "md" : "lg"} color={edit ? "red.8" : "blue"} variant="subtle">
                        {edit ? <IconX /> : <IconPencil />}
                    </ActionIcon>
                </div>
            </div>
            {
                edit ? <Textarea size="md" value={about} placeholder="Enter about your self.." autosize minRows={3} onChange={(event) => setAbout(event.currentTarget.value)} /> : <div className="text-base max-[400px]:text-sm text-justify">{profile?.about}</div>
            }
        </div>
    )
}

export default About;