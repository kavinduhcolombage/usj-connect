import { IconBookmark, IconBookmarkFilled, IconCalendarMonth, IconClockHour3 } from "@tabler/icons-react"
import { Button, Divider, Text } from '@mantine/core';
import { Link } from "react-router-dom";
import { timeAgo } from "../Services/Utilities";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../Services/ProfileService";
import { changeProfile } from "../Slices/ProfileSlice";

const Card = (props: any) => {
    const dispatch = useDispatch();
    const profile = useSelector((state: any) => state.profile);

    const handleSaveJob = async () => {
        let savedJobs: any = [...(profile.savedJobs || [])];
        if (savedJobs?.includes(props.id)) {
            savedJobs = savedJobs?.filter((jobId: string) => jobId !== props.id);
        } else {
            savedJobs = [...savedJobs, props.id];
        }
        let updatedProfile = { ...profile, savedJobs: savedJobs };
        try {
            await updateProfile(updatedProfile);
            dispatch(changeProfile(updatedProfile));
        } catch (error) {
            console.error("Error saving job:", error);
        }
    }

    return <div className="flex flex-col gap-2 bg-gray-400 p-4 rounded-xl hover:shadow-[0_0_5px_1px_blue] !shadow-blue-400 cursor-pointer">
        <div className="flex justify-between">
            <div className="flex gap-3 items-center">
                <div className="p-2 bg-gray-300 rounded-md">
                    <img className="h-7" src={`/CompanyLogo/${props.company}.png`} alt="Logo" />
                </div>
                <div>
                    <div className="font-semibold">{props.jobTitle}</div>
                    <div className="text-sm">{props.company} &#x2022; {props.applicants ? props.applicants.length : 0} applicants</div>
                </div>
            </div>
            {
                profile?.savedJobs?.includes(props.id) ? <IconBookmarkFilled onClick={handleSaveJob} className="cursor-pointer hover:text-blue-800 text-blue-600" stroke={1.5} /> : <IconBookmark onClick={handleSaveJob} className="cursor-pointer hover:text-blue-500" stroke={1.5} />
            }
        </div>
        <div className="flex gap-2 [&>div]:py-1 [&>div]:px-2 [&>div]:bg-gray-200 [&>div]:text-blue-500 [&>div]:rounded-lg text-xs">
            <div>{props.experience}</div>
            <div>{props.jobType}</div>
            <div>{props.location}</div>
        </div>
        <Text className="text-xs text-justify" lineClamp={3}>
            {props.description}
        </Text>
        <Divider size="xs" mx="md" />
        <div className="flex justify-between">
            <div className="font-semibold">
                Rs.{props.packageOffered}
            </div>
            <div className="flex gap-2 text-sm items-center">
                <IconClockHour3 className="h-5 w-5" stroke={1.5} />
                {props.applied || props.interviewing ? "Applied " : props.offered ? "Interviewed " : "Posted "}{timeAgo(props.postTime)}
            </div>
        </div>
        {
            (props.offered || props.interviewing) && <Divider size="xs" mx="md" />
        }
        {
            props.offered && <div className="flex gap-2">
                <Button className="!text-blue-700" variant="outline" fullWidth>Accept</Button>
                <Button className="!text-blue-700" variant="light" fullWidth>Reject</Button>
            </div>
        }
        {
            props.interviewing && <div className="flex gap-2 text-sm items-center">
                <IconCalendarMonth className="text-blue-500 w-5 h-5" stroke={1.5} />August 25, 2025 &bull; <span className="text-gray-800">10:00AM</span>
            </div>
        }
        <Link to={`/jobs/${props.id}`}>
            <Button fullWidth color="blue" variant="outline">View Job</Button>
        </Link>
    </div>
}

export default Card;