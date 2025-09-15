import { TextInput, NumberInput, FileInput, Textarea, Button, LoadingOverlay } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { IconCheck, IconPaperclip, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { getBase64 } from "../Services/Utilities";
import { applyJob } from "../Services/JobService";
import { useNavigate, useParams } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import { useSelector } from "react-redux";

const ApplicationForm = () => {
    const [submit, setSubmit] = useState(false);
    const { id } = useParams();
    const user = useSelector((state: any) => state.user);
    const navigate = useNavigate();

    const form = useForm({
        mode: 'controlled',
        validateInputOnBlur: true,
        initialValues: {
            name: '',
            email: '',
            phone: '',
            website: '',
            resume: null,
            coverLetter: ''
        },
        validate: {
            name: isNotEmpty("Name is required"),
            email: isNotEmpty("Email is required"),
            phone: isNotEmpty("Phone number is required"),
            website: isNotEmpty("Personal website is required"),
            resume: isNotEmpty("Resume is required")
        }
    })

    const handleSubmit = async () => {
        form.validate();
        if (!form.isValid()) return;
        setSubmit(true);
        let resume: any = await getBase64(form.getValues().resume);
        let applicant = { ...form.getValues(), applicantId: user.id, resume: resume.split(',')[1] };
        applyJob(id, applicant).then((res) => {
            console.log(res)
            notifications.show({
                title: 'Applied succesfully',
                message: 'apply to job successfully."',
                withCloseButton: true,
                icon: <IconCheck />,
                color: 'teal',
                withBorder: true,
                className: "!border-blue-500 !bg-blue-50 !text-blue-800 !shadow-lg !rounded-lg !p-4 !w-[400px]",
            })
            setSubmit(false);
            navigate("/job-history");
        }).catch((err) => {
            console.log(err);
            let errMsg;
            if (err.code == "ERR_BAD_RESPONSE") {
                errMsg = err.response.data.errorMessage;
            } else if (err.code == "ERR_NETWORK") {
                errMsg = "Network Error Occred";
            } else {
                errMsg = "Something went wrong";
            }
            notifications.show({
                title: "Error",
                message: errMsg,
                withCloseButton: true,
                icon: <IconX />,
                color: 'red',
                withBorder: true,
                className: "!border-red-500 !bg-red-50 !text-red-800 !shadow-lg !rounded-lg !p-4 !w-[400px]",
            })
            setSubmit(false);
        })
    };

    return <div className="max-[500px]:p-5">
        <LoadingOverlay className="!fixed" visible={submit} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} loaderProps={{ color: "blue", type: "bars" }} />
        <div className="text-xl max-[500px]:text-lg font-semibold mb-5">Submit Your Application</div>
        <div className="flex flex-col gap-5 p-2 max-[450px]:gap-2">
            <div className="flex [&>*]:w-1/2 gap-10 max-[500px]:gap-5 max-[450px]:gap-2  max-[450px]:flex-col max-[450px]:[&>*]:w-full">
                <TextInput {...form.getInputProps("name")} label="Full Name" withAsterisk placeholder="Enter Name" />
                <TextInput {...form.getInputProps("email")} label="Email" withAsterisk placeholder="Enter email" />
            </div>
            <div className="flex gap-10 [&>*]:w-1/2 max-[500px]:gap-5 max-[450px]:gap-2  max-[450px]:flex-col max-[450px]:[&>*]:w-full">
                <NumberInput {...form.getInputProps("phone")} hideControls label="Contact Number" withAsterisk placeholder="Enter Phone Number" />
                <TextInput {...form.getInputProps("website")} label="Personal Website" withAsterisk placeholder="Enter URL" />
            </div>
            <FileInput {...form.getInputProps("resume")} leftSection={<IconPaperclip stroke={1.5} />} label="Resume" withAsterisk placeholder="Upload your resume" accept=".pdf,.doc,.docx" />
            <Textarea {...form.getInputProps("coverLetter")} label="Cover Letter" placeholder="Write your cover letter here..." autosize minRows={4} maxRows={8} />
            <Button className="!text-blue-700 !bg-blue-200 hover:!border-blue-600" variant="light" onClick={handleSubmit}>Submit Application</Button>
        </div>
    </div>
}

export default ApplicationForm;