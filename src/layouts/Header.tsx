
import { Burger, Button, Drawer } from '@mantine/core';
import { Settings } from 'tabler-icons-react';
import NavLinks from './NavLinks';
import ProfileMenu from './ProfileMenu';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getProfile } from '../Services/ProfileService';
import { setProfile } from '../Slices/ProfileSlice';
import NotiMenu from './NotiMenu';
import { useDisclosure } from '@mantine/hooks';
import { IconX } from '@tabler/icons-react';
import { jwtDecode } from 'jwt-decode';
import { setUser } from '../Slices/UserSlice';
import { setupResponseInterceptor } from '../Interceptor/AxiosInterceptor';
import { removejwt } from '../Slices/JwtSlice';

const links = [
    { name: 'Home', url: '/' },
    { name: 'Find Job', url: '/find-job' },
    { name: 'Find Talents', url: '/find-talents' },
    { name: 'Post Job', url: '/post-job/0' },
    { name: 'Posted Job', url: '/posted-job/0' },
    { name: 'Job History', url: '/job-history' },
]

const Header = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.user);
    const [opened, { open, close }] = useDisclosure(false);
    const navigate = useNavigate();
    const token = useSelector((state: any) => state.jwt);

    useEffect(() => {
        setupResponseInterceptor(navigate, dispatch);
    }, [navigate])

    useEffect(() => {
        if (token != "") {
            try {
                const decoded = jwtDecode(localStorage.getItem("token") || "");
                dispatch(setUser({ ...decoded, email: decoded.sub }));
            } catch (error) {
                console.log(error);
                dispatch(removejwt());
            }

        }
        if (user) {
            getProfile(user.profileId).then((res) => {
                dispatch(setProfile(res));
            }).catch((err) => console.log(err));
        }
    }, [token, navigate]);

    return <div className="w-full bg-red-800 px-6 h-25 text-white p-4 flex justify-between items-center">

        <div className='flex items-center gap-2 cursor-pointer'>
            <img className='h-13 max-[400px]:h-10' src="/usj1.png" alt="" />
            <div className='text-2xl max-[400px]:text-xl font-semibold text-yellow-300'>USJ Connect</div>
        </div>

        <div className='md:flex hidden'>
            {NavLinks()}
        </div>

        <div className='flex gap-5 items-center justify-around'>
            {user ? <ProfileMenu /> : <Link to="/login">
                <Button className='!p-1' variant='subtle' color='yellow'>Login</Button>
            </Link>}
            <div className='bg-gray-900 p-1.5 rounded-full cursor-pointer hidden md:flex hover:text-blue-500'>
                <Settings size={25} />
            </div>
            <div className='hidden md:flex'>
                {
                    user ? <NotiMenu /> : <></>
                }
            </div>

            <div className='md:hidden flex'>
                <Burger color='yellow' opened={opened} onClick={open} aria-label="Toggle navigation" />
            </div>

            <Drawer size="70%" overlayProps={{ backgroundOpacity: 0.5, blur: 4 }} position='right' opened={opened} onClose={close} closeButtonProps={{ icon: <IconX size={30} />, }}>
                <div className='flex flex-col gap-6 items-center'>
                    {
                        links.map((link, index) => (
                            <div key={index} className={`${location.pathname === link.url ? 'border-red-700 text-red-700' : 'border-transparent'} border-b-[3px] h-full flex items-center`}>
                                <Link className='hover:text-gray-600 text-xl' to={link.url}>{link.name}</Link>
                            </div>
                        ))
                    }
                </div>
            </Drawer>

        </div>

    </div>
}

export default Header;