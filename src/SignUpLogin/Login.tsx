import { TextInput, PasswordInput, Button, LoadingOverlay } from '@mantine/core';
import { IconAt, IconCheck, IconLock, IconX } from '@tabler/icons-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginValidation } from '../Services/FormValidation';
import { notifications } from '@mantine/notifications';
import { type User } from '../types/User';
import { useDispatch } from 'react-redux';
import { setUser } from '../Slices/UserSlice';
import { setJwt } from '../Slices/JwtSlice';
import { loginUser } from '../Services/AuthService';
import { jwtDecode } from "jwt-decode";

const form = {
    email: "",
    password: "",

}

const Login = () => {
    // const [value, setValue] = useState('react');
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const [formError, setformError] = useState<{ [key: string]: string }>(form);
    const [data, setData] = useState<Pick<User, "email" | "password">>({
        email: "",
        password: "",
    });
    const navigate = useNavigate();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target);
        setformError({ ...formError, [event.target.name]: "" })
        if (event.target.value === "") {
            setformError({ ...formError, [event.target.name]: `${event.target.name} is required` });
        }
        setData({ ...data, [event.target.name]: event.target.value })
    }

    const handleSubmit = () => {

        let valid = true;
        const newFormErrror: { [key: string]: string } = {};
        for (const key in data) {
            if (key === "email" || key === "password") {
                newFormErrror[key] = loginValidation(key, data[key]);
                if (newFormErrror[key] !== "" && newFormErrror[key] !== undefined) valid = false
            }

        }
        setformError(newFormErrror);
        if (valid === true) {
            setLoading(true);
            loginUser(data).then((res) => {
                notifications.show({
                    title: 'Login Succesfully.',
                    message: 'Redirecting to home page...',
                    withCloseButton: true,
                    icon: <IconCheck />,
                    color: 'teal',
                    withBorder: true,
                    className: "!border-blue-500 !bg-blue-50 !text-blue-800 !shadow-lg !rounded-lg !p-4 !w-[400px]",
                });
                dispatch(setJwt(res.jwt));
                const decoded = jwtDecode(res.jwt);
                dispatch(setUser({...decoded, emailL:decoded.sub}));
                setTimeout(() => {
                    setLoading(false);
                    

                    navigate("/");
                }, 3000)
            }).catch((err) => {
                setLoading(false);
                console.log(err);
                notifications.show({
                    title: 'Login Failed',
                    message: err.code === "ERR_NETWORK" ? "An error occurred while logging in. Please try again." : err.response.data.errorMessage,
                    // message: "some error occured",
                    withCloseButton: true,
                    icon: <IconX />,
                    color: 'red',
                    withBorder: true,
                    className: "!border-red-500 !bg-blue-50 !text-blue-800 !shadow-lg !rounded-lg !p-4 !w-[400px]",
                })
            });
        }
    }


    return <><LoadingOverlay
        visible={loading}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 2 }}
        loaderProps={{ color: 'red', type: 'bars' }}
    /><div className="w-1/2 max-[650px]:w-full px-15 max-[800px]:px-6 flex flex-col items-center justify-center gap-5">
            <div className="text-2xl font-semibold ">Log in to your Account</div>
            <div className='flex flex-col gap-2.5'>
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
                <Button className='!text-yellow-300 !bg-red-600' loading={loading} variant="filled" size="md" radius="md" color='red' onClick={handleSubmit}>Log In</Button>

                <div className='mx-auto'>Don't have an account ? <Link to="/signup" className='text-red-500 hover:underline'>Sign Up</Link></div>

            </div>
        </div></>
}

export default Login;