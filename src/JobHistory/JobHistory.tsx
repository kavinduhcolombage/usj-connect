import { Tabs } from "@mantine/core";
import Card from "./Card";
import { useEffect, useState } from "react";
import { getAllJobs } from "../Services/JobService";
import { useSelector } from "react-redux";

const JobHistory = () => {
    const [activeTab, setActiveTab] = useState<any>('APPLIED');
    const [jobList, setJobList] = useState<any>([]);
    const [showList, setShowList] = useState<any>([]);
    const profile = useSelector((state: any) => state.profile);
    const user = useSelector((state: any) => state.user);

    const handleTabChange = (value: string | null) => {
        setActiveTab(value);
        if (value == "SAVED") {
            setShowList(jobList.filter((job: any) => profile.savedJobs?.includes(job.id)));
        } else {
            setShowList(jobList.filter((job: any) => {
                let found = false;
                job.applicants?.forEach((applicant: any) => {
                    if (applicant.applicantId == user.id && applicant.applicationStatus == value) {
                        found = true;
                    }
                })
                return found;
            }));
        }
    }

    useEffect(() => {
        getAllJobs().then((res) => {
            setJobList(res);
            setShowList(res.filter((job: any) => {
                let found = false;
                job.applicants?.forEach((applicant: any) => {
                    if (applicant.applicantId == user.id && applicant.applicationStatus == "APPLIED") {
                        found = true;
                    }
                })
                return found;
            }));
        }).catch((err) => {
            console.error("Error fetching job history:", err);
        })
    }, []);

    return (
        <div className="">
            <div className="text-2xl max-[600px]:text-xl font-semibold mb-5">Job History</div>
            <div>
                <Tabs variant="outline" value={activeTab} onChange={handleTabChange} radius="md">
                    <Tabs.List className="[&_button]:!text-lg max-[600px]:[&_button]:!text-base max-[500px]:[&_button]:!font-medium font-semibold mb-5 [&_button[data-active='true']]:!text-blue-500 max-[500px]:[&_button]:!px-1.5 max-[500px]:[&_button]:!py-2">
                        <Tabs.Tab value="APPLIED">Applied</Tabs.Tab>
                        <Tabs.Tab value="SAVED">Saved</Tabs.Tab>
                        <Tabs.Tab value="OFFERED">Offered</Tabs.Tab>
                        <Tabs.Tab value="INTERVIEWING">In Progress</Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value={activeTab} className="[&>div]:w-full">
                        <div className="mt-10 grid gap-5 grid-cols-4 max-[1000px]:grid-cols-3 max-[800px]:grid-cols-2 max-[600px]:grid-cols-1">
                            {
                                showList.map((item: any, index: any) => (
                                    <Card key={index} {...item} {...{ [activeTab.toLowerCase()]: true }} />
                                ))
                            }
                        </div>
                    </Tabs.Panel>
                </Tabs>
            </div>
        </div>

    )
}

export default JobHistory;