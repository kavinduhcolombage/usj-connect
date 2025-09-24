import { TextInput, Checkbox, PasswordInput, Anchor, Button, Radio, Group, LoadingOverlay } from '@mantine/core';
import { IconAt, IconCheck, IconLock, IconX } from '@tabler/icons-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../Services/UserService';
import { signupValidation } from '../Services/FormValidation';
import { notifications } from '@mantine/notifications';
import { type User } from '../types/User';

const form = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "STUDENT",

}

const SignUp = () => {
    const [accepted, setAccepted] = useState(false);
    const [acceptedError, setAcceptedError] = useState('');
    const [data, setData] = useState<User>(form);
    const [formError, setformError] = useState<{ [key: string]: string }>(form); // State for error message
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement> | string) => {
        if (typeof (event) == "string") {
            setData({ ...data, role: event });
            return;
        }
        const name = event.target.name;
        const value = event.target.value;
        setData({ ...data, [name]: value });
        setformError({ ...formError, [name]: signupValidation(name, value) }); // Reset error message for the field being changed
        if (name == "password" && data.confirmPassword !== "") {
            if (value !== data.confirmPassword) {
                setformError({ ...formError, confirmPassword: "passwords do not match" });
            } else {
                setformError({ ...formError, confirmPassword: "" });
            }
        }
        if (name === "confirmPassword") {
            if (value !== data.password) {
                setformError({ ...formError, [name]: "passwords do not match" });
            } else {
                setformError({ ...formError, [name]: "" });
            }
        }

    }

    const handleSubmit = () => {
        let valid = true;
        const newFormErrror: { [key: string]: string } = {};
        for (const key in data) {
            if (key === "role") continue;
            if (key !== "confirmPassword") newFormErrror[key] = signupValidation(key, data[key as keyof User] || "");
            else if (data[key] !== data["password"]) newFormErrror[key] = "passwords do not match";
            if (newFormErrror[key] !== "" && newFormErrror[key] !== undefined) valid = false;
        }
        setformError(newFormErrror);
        if (!accepted) {
            setAcceptedError("You must accept the terms & conditions.");
            valid = false;
        } else {
            setAcceptedError('');
        }
        if (valid === true) {
            setLoading(true);
            registerUser(data).then((res) => {
                console.log(res);
                setData(form);
                notifications.show({
                    title: 'Registration Successful',
                    message: 'Redirecting to login page...',
                    withCloseButton: true,
                    icon: <IconCheck />,
                    color: 'teal',
                    withBorder: true,
                    className: "!border-blue-500 !bg-blue-50 !text-blue-800 !shadow-lg !rounded-lg !p-4 !w-[400px]",
                })
                setTimeout(() => {
                    setLoading(false);
                    navigate("/login");
                }, 3000)
            }).catch((err) => {
                setLoading(false);
                console.log(err);
                notifications.show({
                    title: 'Registration Failed',
                    message: err.response.data.errorMessage,
                    withCloseButton: true,
                    icon: <IconX />,
                    color: 'red',
                    withBorder: true,
                    className: "!border-red-500 !bg-blue-50 !text-blue-800 !shadow-lg !rounded-lg !p-4 !w-[400px]",
                })
            })
        }

    }

    return <><LoadingOverlay
        visible={loading}
        zIndex={1000}
        className='translate-x-1/2'
        overlayProps={{ radius: 'sm', blur: 2 }}
        loaderProps={{ color: 'blue', type: 'bars' }}
    /><div className="w-1/2 max-[650px]:w-full px-15 max-[800px]:px-10 max-[650px]:py-10 max-[650px]:mt-5 flex flex-col items-center justify-center gap-5">
            <div className="text-2xl font-semibold ">Create Account</div>
            <div className='flex flex-col gap-2.5 w-full'>
                <div>
                    <TextInput
                        value={data.name}
                        name="name"
                        onChange={handleChange}
                        error={formError.name}
                        withAsterisk
                        label="Full Name"
                        placeholder="Your Name"
                    />
                </div>
                <div>
                    <TextInput
                        value={data.email}
                        name='email'
                        onChange={handleChange}
                        error={formError.email}
                        withAsterisk
                        leftSection={<IconAt size={16} />}
                        label="Email"
                        placeholder="Your email"
                    />
                </div>
                <div>
                    <PasswordInput value={data.password} name='password' error={formError.password} onChange={handleChange} withAsterisk leftSection={<IconLock size={18} stroke={1.5} />} label="Password" placeholder="Password" />
                </div>
                <div>
                    <PasswordInput value={data.confirmPassword} name='confirmPassword' error={formError.confirmPassword} onChange={handleChange} withAsterisk leftSection={<IconLock size={18} stroke={1.5} />} label="Confirm Password" placeholder="Password" />
                </div>
                <Radio.Group
                    value={data.role}
                    onChange={handleChange}
                    name="role"
                    label="Select your Type"
                    withAsterisk
                >
                    <Group className='!flex !justify-evenly max-[650px]:!justify-around !py-4'>
                        <Radio className='' value="STUDENT" label="Student" color='red' />
                        <Radio className='' value="COMPANY" label="Company" color='red' />
                    </Group>
                </Radio.Group>
                <div>
                    <Checkbox
                        checked={accepted}
                        onChange={(event) => {
                            setAccepted(event.currentTarget.checked);
                            if (event.currentTarget.checked) setAcceptedError('');
                        }}
                        label={<>I accept{' '}<Anchor className='!text-red-500 hover:underline'>terms & Conditions</Anchor></>}
                        color='red'
                    />
                    <div className="text-red-500 text-sm my-1">{acceptedError}</div>
                </div>
                <Button className='!text-yellow-300 !bg-red-600' loading={loading} variant="filled" size="md" radius="md" onClick={handleSubmit}>Sign Up</Button>

                <div className='mx-auto'>Have an account ? <Link to="/login" className='text-red-500 hover:underline'>Login</Link></div>

            </div>
        </div></>
}

export default SignUp;