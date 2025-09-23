import { Button, NumberInput, TagsInput, Textarea } from "@mantine/core";
import { fields } from "../Data/PostJob";
import SelectInput from "./SelectInput";
import { isNotEmpty, useForm } from "@mantine/form";
import { getJob, postJob } from "../Services/JobService";
import { useNavigate, useParams } from "react-router-dom";
import { IconArrowLeft, IconCheck, IconX } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const PostJob = () => {
    const navigate = useNavigate();
    const select = fields;
    const user = useSelector((state: any) => state.user);
    const { id } = useParams();
    const [loading, setLoading] = useState(false);

    const form = useForm({
        mode: 'controlled',
        validateInputOnChange: true,
        initialValues: {
            jobTitle: '',
            company: '',
            experience: '',
            jobType: '',
            location: '',
            packageOffered: '',
            skillsRequired: [],
            about: '',
            description: ''
        },
        validate: {
            jobTitle: isNotEmpty('Title is required'),
            company: isNotEmpty('Company is required'),
            experience: isNotEmpty('Experience is required'),
            jobType: isNotEmpty('Job Type is required'),
            location: isNotEmpty('Location is required'),
            packageOffered: isNotEmpty('Salary is required'),
            skillsRequired: isNotEmpty('Skills are required'),
            about: isNotEmpty('About is required'),
            description: isNotEmpty('Description is required')
        }

    })
    const handlePost = () => {
        form.validate();
        if (!form.isValid()) return;        
        setLoading(true);
        postJob({ ...form.getValues(), id, postedBy: user.id, jobStatus: "ACTIVE" }).then((res) => {
            setLoading(false);
            notifications.show({
                title: "Success",
                message: "Job Posted Successfully",
                withCloseButton: true,
                icon: <IconCheck />,
                color: 'teal',
                withBorder: true,
                className: "!border-blue-500 !bg-blue-50 !text-blue-800 !shadow-lg !rounded-lg !p-4 !w-[400px]",
            })
            navigate(`/posted-job/${res.id}`);
        }).catch((err) => {
            console.log(err);
            setLoading(false);
            notifications.show({
                title: "Error Occurred",
                message: err.code ? "something went wrong, please try again later" : err.message,
                withCloseButton: true,
                icon: <IconX />,
                color: 'red',
                withBorder: true,
                className: "!border-red-500 !bg-red-50 !text-red-800 !shadow-lg !rounded-lg !p-4 !w-[400px]",
            })
        });
    }

    const handleDraft = () => {
        postJob({ ...form.getValues(), postedBy: user.id, jobStatus: "DRAFT" }).then((res) => {
            console.log(res);
            notifications.show({
                title: "Success",
                message: "Job Saved Successfully",
                withCloseButton: true,
                icon: <IconCheck />,
                color: 'teal',
                withBorder: true,
                className: "!border-blue-500 !bg-blue-50 !text-blue-800 !shadow-lg !rounded-lg !p-4 !w-[400px]",
            })
            navigate(`/posted-job/${res.id}`);
        }).catch((err) => {
            console.log(err);
            notifications.show({
                title: "Error Occurred",
                message: err.code ? "something went wrong, please try again later" : err.message,
                withCloseButton: true,
                icon: <IconX />,
                color: 'red',
                withBorder: true,
                className: "!border-red-500 !bg-red-50 !text-red-800 !shadow-lg !rounded-lg !p-4 !w-[400px]",
            })
        });
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        if (id !== "0") {
            getJob(id).then((res) => {
                console.log("backend response", res);
                form.setValues(res);
            }).catch((err) => {
                console.log(err);
            })
        } else {
            form.reset();
        }
    }, [id]);


    return <>
        {id !== "0" && <Button leftSection={<IconArrowLeft size={20} />} className="!text-blue-700" my="md" variant="light" onClick={() => navigate(-1)}>Back</Button>}
        <div className="w-4/5 mx-auto">
            <div className="text-2xl font-semibold mb-5 mt-5">Post a job</div>
            <div className="flex flex-col gap-5 pb-12 max-[500px]:gap-3">
                <div className="flex max-[500px]:flex-wrap max-[500px]:[&>*]:w-full gap-10 max-[600px]:gap-5 max-[500px]:gap-3 [&>*]:w-1/2">
                    <SelectInput form={form} name="jobTitle" {...select[0]} />
                    <SelectInput form={form} name="company" {...select[1]} />
                </div>
                <div className="flex max-[500px]:flex-wrap max-[500px]:[&>*]:w-full gap-10 max-[600px]:gap-5 max-[500px]:gap-3 [&>*]:w-1/2">
                    <SelectInput form={form} name="experience" {...select[2]} />
                    <SelectInput form={form} name="jobType" {...select[3]} />
                </div>
                <div className="flex max-[500px]:flex-wrap max-[500px]:[&>*]:w-full gap-10 max-[600px]:gap-5 max-[500px]:gap-3 [&>*]:w-1/2">
                    <SelectInput form={form} name="location" {...select[4]} />
                    <NumberInput {...form.getInputProps('packageOffered')} label="Salary(in LKR)" withAsterisk min={1} max={100000} placeholder="Enter Salary"
                        hideControls />
                </div>
                <TagsInput {...form.getInputProps('skillsRequired')} withAsterisk label="Skills Required" placeholder="Enter skill" clearable splitChars={[',', ' ', '|']} acceptValueOnBlur />

                <Textarea {...form.getInputProps('about')} withAsterisk autosize minRows={2} maxRows={3} label="About" placeholder="Enter about job here..." />

                <Textarea {...form.getInputProps('description')} withAsterisk autosize minRows={3} label="Job Description" placeholder="Enter job description here..." />

                <div className="flex gap-5">
                    <Button loading={loading} className="!text-blue-700 !bg-blue-200 hover:!border-blue-600" onClick={handlePost} variant="light">Publish job </Button>
                    <Button className="!text-blue-700" onClick={handleDraft} variant="outline">Save as draft</Button>
                </div>
            </div>
        </div>
    </>




}

export default PostJob;