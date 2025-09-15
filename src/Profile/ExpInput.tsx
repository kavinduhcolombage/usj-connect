import { Button, Checkbox, Textarea } from "@mantine/core";
import SelectInput from "./SelectInput";
import { useEffect } from "react";
import fields from "../Data/Profile";
import { MonthPickerInput } from '@mantine/dates';
import { isNotEmpty, useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../Slices/ProfileSlice";
import { IconCheck, IconX } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { updateProfile } from "../Services/ProfileService";

const ExpInput = (props: any) => {
    const select = fields;
    const profile = useSelector((State: any) => State.profile);
    const dispatch = useDispatch();

    const form = useForm({
        mode: 'controlled',
        validateInputOnChange: true,
        initialValues: {
            title: '',
            company: '',
            location: '',
            description: '',
            startDate: new Date(),
            endDate: new Date(),
            working: false
        },
        validate: {
            title: isNotEmpty("Title is required"),
            company: isNotEmpty("Company is required"),
            location: isNotEmpty("Location is required"),
            description: isNotEmpty("Description is required"),
        }
    });

    useEffect(() => {
        if (!props.add) {
            form.setValues({
                title: props.title,
                company: props.company,
                location: props.location,
                description: props.description,
                startDate: new Date(props.startDate),
                endDate: new Date(props.endDate),
                working: props.working
            });
        }
    }, []);

    const handleSave = async () => {
        form.validate();
        if (!form.isValid()) return;
        let exp = [...profile.experience];
        if (props.add) {
            exp.push({...form.getValues()});
            exp[exp.length - 1].startDate = exp[exp.length - 1].startDate.toISOString();
            exp[exp.length - 1].endDate = exp[exp.length - 1].endDate.toISOString();
        } else {
            exp[props.index] = { ...form.getValues() };
            exp[props.index].startDate = exp[props.index].startDate.toISOString();
            exp[props.index].endDate = exp[props.index].endDate.toISOString();
        }
        let updatedProfile = { ...profile, experience: exp };
        console.log("Updated Profile in ExpInput:", updatedProfile);
        try {
            await updateProfile(updatedProfile);
            dispatch(changeProfile(updatedProfile));
            props.setEdit(false);
            console.log("Updated Profile:", updatedProfile);
            notifications.show({
                title: `${props.add ? "Added" : "Updated"} Succesfully.`,
                message: `Experiance ${props.add ? "Added" : "Updated"}...`,
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

    return <div className="flex flex-col gap-3">
        <div className="text-lg font-semibold">{props.add ? "Add" : "Edit"} Experience</div>
        <div className="flex gap-10 max-[600px]:gap-5 [&>*]:w-1/2 max-[450px]:[&>*]:w-full max-[450px]:flex-wrap max-[450px]:gap-2">
            <SelectInput form={form} name="title" {...select[0]} />
            <SelectInput form={form} name="company" {...select[1]} />
        </div>
        <SelectInput form={form} name="location" {...select[2]} />

        <Textarea {...form.getInputProps('description')} withAsterisk label="Summary" size="md" placeholder="Tell about your Experiance..." autosize minRows={3} />

        <div className="flex gap-10 max-[600px]:gap-5 [&>*]:w-1/2 max-[450px]:[&>*]:w-full max-[450px]:flex-wrap max-[450px]:gap-2">
            <MonthPickerInput {...form.getInputProps("startDate")} withAsterisk maxDate={form.getValues().endDate || undefined} label="Start date" placeholder="Pick date"
            />
            <MonthPickerInput {...form.getInputProps("endDate")} disabled={form.getValues().working} withAsterisk minDate={form.getValues().startDate || undefined}
                maxDate={new Date()} label="End date" placeholder="Pick date"
            />
        </div>
        <Checkbox checked={form.getValues().working} onChange={(e) => form.setFieldValue("working", e.currentTarget.checked)} autoContrast label="Currently Working Here" />

        <div className="flex gap-5 justify-end">
            <Button onClick={handleSave} color="green.8" variant="outline">Save</Button>
            <Button onClick={() => props.setEdit(false)} color="red.8" variant="light">Cancel</Button>
        </div>
    </div>

}

export default ExpInput;