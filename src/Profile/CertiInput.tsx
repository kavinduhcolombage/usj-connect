import { Button, TextInput } from "@mantine/core";
import SelectInput from "./SelectInput";
import fields from "../Data/Profile";
import { MonthPickerInput } from '@mantine/dates';
import { isNotEmpty, useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../Slices/ProfileSlice";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import { updateProfile } from "../Services/ProfileService";
import { useState } from "react";

const CertiInput = (props: any) => {
    const select = fields;
    const profile = useSelector((state: any) => state.profile);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const form = useForm({
        mode: 'controlled',
        validateInputOnChange: true,
        initialValues: {
            title: '',
            issuer: '',
            issueDate: new Date(),
            certificateId: ''
        },
        validate: {
            title: isNotEmpty("Title is required"),
            issuer: isNotEmpty("Issuer is required"),
            certificateId: isNotEmpty("Certificate ID is required"),
        }
    });

    console.log("profile in certi input:", profile);

    const handleSave = async () => {
        form.validate();
        if (!form.isValid()) return;
        setLoading(true);
        let certi = [...profile.certifications];
        certi.push({...form.getValues()});
        certi[certi.length - 1].issueDate = certi[certi.length - 1].issueDate.toISOString();
        let updatedProfile = { ...profile, certifications: certi };
        try {
            await updateProfile(updatedProfile);
            dispatch(changeProfile(updatedProfile));
            props.setEdit(false);
            console.log("Updated Profile:", updatedProfile);
            setLoading(false);
            notifications.show({
                title: `Certificate ${props.add ? "Added" : "Updated"} Succesfully.`,
                message: `Certificate ${props.add ? "Added" : "Updated"}...`,
                withCloseButton: true,
                icon: <IconCheck />,
                color: 'teal',
                withBorder: true,
                className: "!border-blue-500 !bg-blue-50 !text-blue-800 !shadow-lg !rounded-lg !p-4 !w-[400px]",
            })
        } catch (error) {
            console.error("Error updating profile:", error);
            setLoading(false);
            notifications.show({
                title: "Error",
                message: "Failed to update profile.",
                icon: <IconX />,
                color: "red",
            });
        }
    }

    return <div className="flex flex-col gap-3">
        <div className="text-lg font-semibold">Add Certificate</div>
        <div className="flex gap-10 max-[600px]:gap-5 [&>*]:w-1/2 max-[450px]:[&>*]:w-full max-[450px]:flex-wrap max-[450px]:gap-2">
            <TextInput {...form.getInputProps("title")} label="Title" placeholder="Enter Title" withAsterisk />
            <SelectInput form={form} name="issuer" {...select[1]} />
        </div>
        <div className="flex gap-10 max-[600px]:gap-5 [&>*]:w-1/2 max-[450px]:[&>*]:w-full max-[450px]:flex-wrap max-[450px]:gap-2">
            <MonthPickerInput {...form.getInputProps("issueDate")} withAsterisk maxDate={new Date()} label="Issuer Date" placeholder="Pick date" />
            <TextInput {...form.getInputProps("certificateId")} label="Certificate ID" placeholder="Enter ID" withAsterisk />
        </div>
        <div className="flex gap-5 justify-end">
            <Button loading={loading} onClick={handleSave} color="blue" variant="outline">Save</Button>
            <Button onClick={() => props.setEdit(false)} color="red.8" variant="light">Cancel</Button>
        </div>

    </div>

}

export default CertiInput;