import { Indicator, Menu, Notification } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Bell } from "tabler-icons-react";
import { getNotifications, readNotification } from "../Services/NotiService";
import { useNavigate } from "react-router-dom";

const NotiMenu = () => {
    const [opened, setOpened] = useState(false);
    const user = useSelector((state: any) => state.user);
    const [notifications, setNotifications] = useState<any>([]);
    const navigate = useNavigate();

    const unread = (index: number) => {
        let notis = [...notifications];
        notis = notis.filter((_noti: any, i: number) => i != index);
        setNotifications(notis);
        readNotification(notifications[index].id).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        getNotifications(user.id).then((res) => {
            setNotifications(res);
        }).catch((err) => {
            console.log(err);
        })
    }, [user]);

    return (
        <Menu trigger="hover" openDelay={100} closeDelay={100} shadow="md" width={400} opened={opened} onChange={setOpened}>
            <Menu.Target>
                <div className='bg-gray-900 p-1.5 rounded-full flex items-center justify-center cursor-pointer hover:text-blue-500'>
                    <Indicator disabled={notifications.length <= 0} inline processing color="blue">
                        <Bell
                            size={25}
                            strokeWidth={1.8}
                        />
                    </Indicator>
                </div>
            </Menu.Target>

            <Menu.Dropdown onChange={() => setOpened(true)}>
                <div className="flex flex-col gap-1">
                    {
                        notifications.map((noti: any, index: number) => <Notification onClick={() => {
                            navigate(noti.route);
                            unread(index);
                            setOpened(false);
                        }} key={index} className="hover:!bg-gray-300 cursor-pointer" onClose={() => unread(index)} icon={<IconCheck size={20} />} color="teal" title={noti.action} mt="md">
                            {noti.message}
                        </Notification>)
                    }
                    {
                        notifications.length == 0 && <div className="text-center p-2">No Notifications</div>
                    }

                </div>

            </Menu.Dropdown>
        </Menu>
    )
}

export default NotiMenu;