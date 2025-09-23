import { ActionIcon, Button, Divider } from "@mantine/core";
import { IconBookmark, IconBookmarkFilled, IconCheck } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { card } from "../Data/JobDescriptionData";
import { timeAgo } from "../Services/Utilities";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../Services/ProfileService";
import { changeProfile } from "../Slices/ProfileSlice";
import { useEffect, useState } from "react";
import { postJob } from "../Services/JobService";
import { notifications } from "@mantine/notifications";

const JobDescription = (props: any) => {
    const profile = useSelector((state: any) => state.profile);
    const user = useSelector((state: any) => state.user);
    const dispatch = useDispatch();
    const [applied, setApplied] = useState(false);

    console.log("job description props", props);

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

    const handleClose = () => {
        postJob({ ...props, jobStatus: "CLOSED" }).then((res) => {
            console.log(res);
            notifications.show({
                title: "Closed Succesfully",
                message: "closed",
                withCloseButton: true,
                icon: <IconCheck />,
                color: 'teal',
                withBorder: true,
                className: "!border-blue-500 !bg-blue-50 !text-blue-800 !shadow-lg !rounded-lg !p-4 !w-[400px]",
            })

        }).catch((err) => {
            console.log(err);
        })

    }

    useEffect(() => {
        if (props.applicants?.filter((applicant: any) => applicant.applicantId == user.id).length > 0) {
            setApplied(true);
        } else {
            setApplied(false);
        }
    }, [props]);

    return <div className="w-2/3 max-[900px]:w-full px-5 py-3">
        <div className="flex flex-wrap justify-between">
            <div className="flex gap-3 items-center">
                <div className="p-3 bg-gray-300 rounded-xl">
                    <img className="h-14" src={`/CompanyLogo/${props.company}.png`} alt="Company Logo" />
                </div>
                <div>
                    <div className="font-semibold text-2xl max-[500px]:text-xl">{props.jobTitle}</div>
                    <div className="text-lg max-[500px]:text-base flex gap-1 max-[950px]:flex-wrap">
                        <div>{props.company} &bull;</div>
                        <div>{timeAgo(props.postTime)} &bull;</div>
                        <div>{props.applicants ? props.applicants.length : 0} Applicants</div>
                        {/* {props.company} &bull; {timeAgo(props.postTime)} &bull;  {props.applicants ? props.applicants.length : 0} Applicants */}
                    </div>
                </div>
            </div>
            <div className="flex min-[500px]:flex-col gap-2 items-center max-[500px]:my-5 max-[500px]:w-full justify-between">
                {
                    (props.edit || !applied) && <Link to={props.edit ? `/post-job/${props.id}` : `/apply-job/${props.id}`} className="max-[500px]:w-2/3">
                        <Button className="max-[500px]:!w-full !text-blue-700 !bg-blue-200 hover:!border-blue-600" size="sm" variant="light">{props.closed ? "Reopen" : props.edit ? "edit" : "Apply"}</Button>
                    </Link>
                }
                {
                    !props.edit && applied && <Button color="green.8" size="sm" variant="light">Applied</Button>
                }
                {
                    props.edit && !props.closed ? <Button onClick={handleClose} color="red" className="!text-red-500 !bg-red-200 hover:!border-red-700" size="sm" variant="outline">Close</Button> : profile?.savedJobs?.includes(props.id) ? <IconBookmarkFilled onClick={handleSaveJob} className="cursor-pointer hover:text-blue-800 text-blue-600 max-[500px]:mr-5" stroke={1.5} /> : <IconBookmark onClick={handleSaveJob} className="cursor-pointer hover:text-blue-500 max-[500px]:mr-5" stroke={1.5} />
                }
            </div>
        </div>
        <Divider className="my-10 max-[500px]:my-5" />

        <div className="flex justify-around">
            {
                card.map((item: any, index: number) => <div key={index} className="flex flex-col items-center gap-1">
                    <ActionIcon radius="xl" aria-label="Settings" variant="lght" className="!h-12 !w-12 max-[500px]:!h-9 max-[500px]:!w-9 !bg-blue-200 !text-blue-700 hover:!border-blue-600">
                        <item.icon className="h-4/5 w-4/5" stroke={1.5} />
                    </ActionIcon>
                    <div className="text-sm max-[500px]:text-xs">{item.name}</div>
                    <div className="font-semibold max-[400px]:font-medium text-base max-[500px]:text-sm">{item.id == "packageOffered" && <>Rs.</>} {props ? props[item.id] : "NA"} </div>
                </div>)
            }
        </div>
        <Divider className="my-10 max-[500px]:my-5" />
        <div>
            <div className="text-xl max-[500px]:text-lg font-semibold mb-5">Required Skills</div>
            <div className="flex flex-wrap gap-2">
                {
                    props?.skillsRequired?.map((item: any, index: number) => <ActionIcon key={index} aria-label="Settings" radius="xl" p="xs" variant="lght" className="!h-fit !w-fit font-medium !text-sm !bg-blue-200 !text-blue-700 hover:!border-blue-600">{item}

                    </ActionIcon>)
                }

            </div>
        </div>
        <Divider className="my-10 max-[500px]:my-5" />
        <div>
            <div className="text-xl max-[500px]:text-lg font-semibold mb-5">About Job</div>
            {props.description}
        </div>
        <Divider className="my-10 max-[500px]:my-5" />
        <div>
            <div className="text-xl max-[500px]:text-lg font-semibold mb-5">About Company</div>
            <div className="flex justify-between mb-5 max-[450px]:flex-wrap">
                <div className="flex gap-3 items-center">
                    <div className="p-3 bg-gray-300 rounded-xl">
                        <img className="h-14" src={`/CompanyLogo/${props.company}.png`} alt="Company Logo" />
                    </div>
                    <div className="flex flex-col">
                        <div className="font-medium text-lg max-[450px]:text-base">{props.company}</div>
                        <div className="text-lg max-[450px]:text-base">10k+ Employees</div>
                    </div>
                </div>
                <div className="flex flex-col gap-2 items-center max-[450px]:w-full max-[450px]:mt-5">
                    <Link to={`/company/${props.company}`} className="max-[450px]:w-full">
                        <Button className="max-[450px]:!w-full !text-blue-700 !bg-blue-200 hover:!border-blue-600" size="sm" variant="light">Company Page</Button>
                    </Link>
                </div>
            </div>
            <div className="text-justify">{props.about}</div>
        </div>
    </div>
}

export default JobDescription;