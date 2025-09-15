import { Menu, Avatar, Indicator, Switch } from '@mantine/core';
import {
    IconMessageCircle,
    IconUserCircle,
    IconFileText,
    IconMoon,
    IconMoonStars,
    IconSun,
    IconLogout2,
} from '@tabler/icons-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from '../Slices/UserSlice';
import { removejwt } from '../Slices/JwtSlice';

const ProfileMenu = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.user);
    const navigate = useNavigate();
    const [checked, setChecked] = useState(false);
    const [opened, setOpened] = useState(false);
    const profile = useSelector((state: any) => state.profile);
    const handleLogout = () => {
        dispatch(removeUser());
        dispatch(removejwt());
        navigate('/');
    }
    const handleProfileClick = () => {
        if (user?.id) {
            navigate(`/profile`, { state: { userId: user.id } }); // Navigate to profile page with user ID
        }
    };
    return (
        <Menu trigger="hover" openDelay={100} closeDelay={100} shadow="md" width={200} opened={opened} onChange={setOpened}>
            <Menu.Target>
                <div className='flex items-center gap-2 cursor-pointer'>
                    <div className='text-lg hidden md:flex'>{user.name}</div>
                    <Indicator inline size={11} offset={4} position="bottom-end" color="green" withBorder>
                        <Avatar
                            size={45}
                            src={profile.picture ? `data:image/jpeg;base64,${profile.picture}` : ""}
                            alt="profile photo"
                        />
                    </Indicator>
                </div>
            </Menu.Target>

            <Menu.Dropdown className='!border-blue-500 !rounded-2xl !shadow-2xl !shadow-blue-950' onChange={() => setOpened(true)}>
                <Link to="/profile">
                    <Menu.Item onClick={handleProfileClick} className="hover:!text-blue-600" leftSection={<IconUserCircle size={14} />}>
                        Profile
                    </Menu.Item>
                </Link>

                <Menu.Item className="hover:!text-blue-600" leftSection={<IconMessageCircle size={14} />}>
                    Messages
                </Menu.Item>
                <Menu.Item className="hover:!text-blue-600" leftSection={<IconFileText size={14} />}>
                    Resume
                </Menu.Item>
                <Menu.Item
                    className="hover:!text-blue-600"
                    leftSection={<IconMoon size={14} />}
                    rightSection={
                        <Switch checked={checked}
                            onChange={(event) => setChecked(event.currentTarget.checked)}
                            size="md"
                            color="dark.4"
                            onLabel={<IconSun size={16} stroke={2.5} color="var(--mantine-color-yellow-4)" />}
                            offLabel={<IconMoonStars size={16} stroke={2.5} color="var(--mantine-color-blue-6)" />}
                        />
                    }
                >
                    Dark mode
                </Menu.Item>

                <Menu.Divider />
                <Menu.Item
                    onClick={handleLogout}
                    color="red"
                    leftSection={<IconLogout2 size={14} />}
                >
                    Logout
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
}

export default ProfileMenu;