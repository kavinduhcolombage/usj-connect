import { IconCalendarMonth, IconCheck, IconHeart, IconMapPin, IconX } from "@tabler/icons-react"
import { Avatar, Button, Divider, Modal, Text } from '@mantine/core';
import { Link, useParams } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useRef, useState } from "react";
import { getProfile } from "../Services/ProfileService";
import { DateInput, TimeInput } from "@mantine/dates";
import { changeAppStatus } from "../Services/JobService";
import { notifications } from "@mantine/notifications";
import { formatInterviewTime, openBase64PDF } from "../Services/Utilities";

const TalentCard = (props: any) => {
    const { id } = useParams();
    const ref = useRef<HTMLInputElement>(null);
    const [opened, { open, close }] = useDisclosure(false);
    const [app, { open: openApp, close: closeApp }] = useDisclosure(false);
    const [date, setDate] = useState<Date | null>(null);
    const [time, setTime] = useState<any>(null);
    const [profile, setProfile] = useState<any>({});

    const handleOffer = (status: string) => {

        let interview: any = { id, applicantId: profile?.id, applicationStatus: status };
        if (status == "INTERVIEWING") {
            const [hours, minutes] = time.split(":").map(Number);
            date?.setHours(hours, minutes);
            interview = { ...interview, interviewTime: date }
        }
        changeAppStatus(interview).then((res) => {
            console.log("response", res);
            if (status == "INTERVIEWING") {
                notifications.show({
                    title: 'Updated Succesfully.',
                    message: 'Application status changed to Interviewing.',
                    withCloseButton: true,
                    icon: <IconCheck />,
                    color: 'teal',
                    withBorder: true,
                    className: "!border-blue-500 !bg-blue-50 !text-blue-800 !shadow-lg !rounded-lg !p-4 !w-[400px]",
                });
            } else if (status == "OFFERED") {
                notifications.show({
                    title: 'Updated Succesfully.',
                    message: 'Application status changed to Offered.',
                    withCloseButton: true,
                    icon: <IconCheck />,
                    color: 'teal',
                    withBorder: true,
                    className: "!border-blue-500 !bg-blue-50 !text-blue-800 !shadow-lg !rounded-lg !p-4 !w-[400px]",
                });
            } else {
                notifications.show({
                    title: 'Updated Succesfully.',
                    message: 'Application Rejected//',
                    withCloseButton: true,
                    icon: <IconCheck />,
                    color: 'teal',
                    withBorder: true,
                    className: "!border-blue-500 !bg-blue-50 !text-blue-800 !shadow-lg !rounded-lg !p-4 !w-[400px]",
                });
            }


            window.location.reload();
        }).catch((error) => {
            console.error("Error changing application status:", error);
            notifications.show({
                title: "Error",
                message: "Failed to change application status.",
                icon: <IconX />,
                color: "red",
            });
        })
    }

    const handleDateChange = (value: string | null) => {
        setDate(value ? new Date(value) : null);
    };

    useEffect(() => {
        if (props.applicantId) getProfile(props.applicantId).then((res) => {
            setProfile(res);
        }).catch((error) => {
            console.log(error);
        })
        else {
            setProfile(props);
        }
    }, [props]);

    return <div className="flex flex-col gap-2 bg-gray-400 p-4 rounded-xl hover:shadow-[0_0_5px_1px_blue] !shadow-blue-400">
        <div className="flex justify-between">
            <div className="flex gap-3 items-center">
                <div className="p-2 bg-gray-300 rounded-full">
                    <Avatar size="lg" src={profile?.picture ? `data:image/jpeg;base64,${profile?.picture}` : ""} alt="Profile Photo" />
                </div>
                <div>
                    <div className="font-semibold text-lg">{props.name}</div>
                    <div className="text-sm">{profile?.jobTitle} &bull; {profile?.company} </div>
                </div>
            </div>
            <IconHeart className="cursor-pointer" />
        </div>
        <div className="flex gap-2 [&>div]:py-1 [&>div]:px-2 [&>div]:bg-gray-200 [&>div]:text-blue-500 [&>div]:rounded-lg text-xs">
            {
                profile?.skills?.map((skill: any, index: any) =>
                    index < 4 && <div key={index} className="p-2 py-1 text-blue-500 rounded-lg text-xs">{skill}</div>
                )
            }

        </div>
        <Text className="text-xs text-justify" lineClamp={3}>
            {profile?.about}
        </Text>
        <Divider size="xs" mx="md" />
        {
            props.invited ? <div className="flex gap-2 text-sm items-center">
                <IconCalendarMonth stroke={1.5} />Interview : {formatInterviewTime(props.interviewTime)}
            </div> : <div className="flex justify-between">
                <div className="font-semibold">
                    Exp: {profile?.totalExp ? profile?.totalExp : 0} Years
                </div>
                <div className="flex gap-2 text-sm items-center">
                    <IconMapPin className="h-5 w-5" stroke={1.5} />
                    {profile?.location}
                </div>
            </div>
        }

        <div className="flex [&>*]:w-1/2 [&>*]:p-1">
            {
                !props.invited && <>
                    <Link to={`/talent-profile/${profile?.id}`}>
                        <Button className="!text-blue-700" variant="outline" fullWidth>Profile</Button>
                    </Link>
                    <div>
                        {props.posted ? <Button onClick={open} rightSection={<IconCalendarMonth className="w-5 h-5" />} className="!text-blue-700" variant="light" fullWidth>Shedule</Button> : <Button className="!text-blue-700" variant="light" fullWidth>Message</Button>}
                    </div>
                </>
            }
            {
                props.invited && <>
                    <div>
                        <Button className="!text-blue-700" onClick={() => handleOffer("OFFERED")} variant="outline" fullWidth>Accept</Button>
                    </div>
                    <div>
                        <Button className="!text-blue-700" variant="light" onClick={() => handleOffer("REJECTED")} fullWidth autoContrast>Reject</Button>
                    </div>
                </>
            }

        </div>
        {
            (props.invited || props.posted) && <Button className="!text-blue-700" variant="filled" onClick={openApp} fullWidth autoContrast >View Application</Button>
        }
        <Modal opened={app} onClose={closeApp} title="Application Details" centered>
            <div className="flex flex-col gap-4">
                <div>
                    Email: &emsp;<a className='text-blue-500 hover:underline cursor-pointer' href={`mailto:${props.email}`}>{props.email}</a>
                </div>
                <div>
                    Website: &emsp;<a target="_blank" className='text-blue-500 hover:underline cursor-pointer' href={props.Website}>{props.website}</a>
                </div>
                <div>
                    Resume: &emsp;<span className='text-blue-500 hover:underline cursor-pointer' onClick={() => openBase64PDF(props.resume)}>{props.name}</span>
                </div>
                <div>
                    Cover Letter: &emsp;<div >{props.coverLetter}</div>
                </div>
            </div>
        </Modal>
        <Modal opened={opened} onClose={close} title="Shedule Interview" centered>
            <div className="flex flex-col gap-4">
                <DateInput value={date} onChange={handleDateChange} minDate={new Date()} label="Date" placeholder="Enter Date" />
                <TimeInput label="Time" value={time} ref={ref} minTime="" onClick={() => ref.current?.showPicker()} onChange={(event) => setTime(event.currentTarget.value)} />
                <Button onClick={() => handleOffer("INTERVIEWING")} className="!text-blue-700" variant="light" fullWidth>Shedule</Button>
            </div>
        </Modal>
    </div>
}

export default TalentCard;