import { useState } from "react";
import fields from "../Data/Profile";
import { ActionIcon, NumberInput } from "@mantine/core";
import { IconBriefcase, IconCheck, IconMapPin, IconPencil, IconX } from "@tabler/icons-react";
import SelectInput from "./SelectInput";
import { useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../Slices/ProfileSlice";
import { notifications } from "@mantine/notifications";
import { updateProfile } from "../Services/ProfileService";
import { useMediaQuery } from "@mantine/hooks";

const Info = () => {
    const select = fields;
    const [edit, setEdit] = useState(false);
    const dispatch = useDispatch();
    const profile = useSelector((state: any) => state.profile);
    const isTab = useMediaQuery('(max-width: 550px)');
    const isMobile = useMediaQuery('(max-width: 400px)');

    const handleClick = () => {
        if (!edit) {
            setEdit(true);
            form.setValues({ 'jobTitle': profile.jobTitle, 'company': profile.company, 'location': profile.location, 'totalExp': profile.totalExp });
        } else {
            setEdit(false);
        }
    }

    const handleSave = async () => {
        setEdit(false);
        let updatedProfile = { ...profile, ...form.getValues() };
        try {
            await updateProfile(updatedProfile);
            dispatch(changeProfile(updatedProfile));
            console.log("Updated Profile:", updatedProfile);
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
    }

    const form = useForm({
        mode: 'controlled',
        initialValues: { jobTitle: '', company: '', location: '', totalExp: 0 }
    });

    return (<>
        <div className="text-3xl max-[600px]:text-2xl max-[500px]:text-xl font-semibold flex justify-between">
            {profile.name}
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
            edit ? <>
                <div className="flex gap-10 max-[600px]:gap-5 [&>*]:w-1/2 max-[450px]:[&>*]:w-full max-[450px]:flex-wrap max-[450px]:gap-2 mb-2">
                    <SelectInput form={form} name="jobTitle" {...select[0]} />
                    <SelectInput form={form} name="company" {...select[1]} />
                </div>
                <div className="flex gap-10 max-[600px]:gap-5 [&>*]:w-1/2 max-[450px]:[&>*]:w-full max-[450px]:flex-wrap max-[450px]:gap-2 mb-2">
                    <SelectInput form={form} name="location" {...select[2]} />
                    <NumberInput label="Experience" withAsterisk hideControls clampBehavior="strict" min={0} max={70} {...form.getInputProps('totalExp')} />
                </div>

            </> : <>
                <div className="text-xl max-[600px]:text-lg max-[500px]:text-base flex gap-1 items-center">
                    <IconBriefcase className="h-5 w-5 max-[500px]:h-4 max-[500px]:w-4" stroke={1.5} /> {profile.jobTitle} &bull; {profile.company}
                </div>
                <div className="text-lg max-[600px]:text-base max-[500px]:text-sm flex gap-1 items-center text-mine-shaft-300">
                    <IconMapPin className="h-5 w-5 max-[500px]:h-4 max-[500px]:w-4" stroke={1.5} /> {profile.location}
                </div>
                <div className="text-lg max-[600px]:text-base max-[500px]:text-sm flex gap-1 items-center text-mine-shaft-300">
                    <IconBriefcase className="h-5 w-5 max-[500px]:h-4 max-[500px]:w-4" stroke={1.5} />Experience : {profile.totalExp} Years
                </div>
            </>
        }
    </>
    )
}

export default Info;