import { Badge, Tabs } from "@mantine/core";
import JobDescription from "../JobDescription/JobDescription";
import TalentCard from "../FindTalent/TalentCard";
import { useEffect, useState } from "react";

const PostedJobDesc = (props: any) => {
    const [tab, setTab] = useState("overview");
    const [arr, setArr] = useState<any>([]);

    const handleTabChnage = (value: any) => {
        setTab(value);
        if (value == "applicants") {
            setArr(props.applicants?.filter((applicant: any) => applicant.applicationStatus == "APPLIED"));
        } else if (value == "invited") {
            setArr(props.applicants?.filter((applicant: any) => applicant.applicationStatus == "INTERVIEWING"));
        } else if (value == "offered") {
            setArr(props.applicants?.filter((applicant: any) => applicant.applicationStatus == "OFFERED"));
        } else if (value == "rejected") {
            setArr(props.applicants?.filter((applicant: any) => applicant.applicationStatus == "REJECTED"));
        }
    }

    useEffect(() => {
        handleTabChnage("overview");
    }, [props]);

    return (
        <div className="mt-5 max-[600px]:mt-2 w-3/4 max-[1000px]:w-full min-[600px]:px-5">
            {(Object.keys(props).length > 0) ? <>
                <div className="text-2xl max-[600px]:text-xl font-semibold flex items-center">{props.jobTitle}<Badge size="sm" variant="light" color="blue" ml="sm">{props.jobStatus}</Badge></div>
                <div className="text-lg max-[600px]:text-base font-medium mb-5">{props.location || "No Location"}</div>
                <div>
                    <Tabs variant="outline" value={tab} onChange={handleTabChnage}>
                        <Tabs.List className="[&_button]:!text-lg max-[600px]:[&_button]:!text-base max-[500px]:[&_button]:!font-medium font-semibold mb-5 [&_button[data-active='true']]:!text-blue-500 max-[500px]:[&_button]:!px-1.5 max-[500px]:[&_button]:!py-2">
                            <Tabs.Tab value="overview">Overview</Tabs.Tab>
                            <Tabs.Tab value="applicants">Applicants</Tabs.Tab>
                            <Tabs.Tab value="invited">Invited</Tabs.Tab>
                            <Tabs.Tab value="offered">Offered</Tabs.Tab>
                            <Tabs.Tab value="rejected">Rejected</Tabs.Tab>
                        </Tabs.List>

                        <Tabs.Panel value="overview" className="[&>div]:w-full [&>div]:pb-5">
                            <JobDescription {...props} edit={true} closed={props.jobStatus == "CLOSED"} />
                        </Tabs.Panel>

                        <Tabs.Panel value="applicants">
                            <div className="mt-10 grid gap-5 grid-cols-3 max-[1000px]:grid-cols-3 max-[800px]:grid-cols-2 max-[600px]:grid-cols-1">
                                {
                                    arr?.length ? arr.map((applicant: any, index: any) => <TalentCard key={index} {...applicant} posted={true} />) : <div className="text-2xl font-semibold">No Applicants</div>
                                }
                                
                            </div>
                        </Tabs.Panel>
                        <Tabs.Panel value="invited">
                            <div className="mt-10 grid gap-5 grid-cols-3 max-[1000px]:grid-cols-3 max-[800px]:grid-cols-2 max-[600px]:grid-cols-1">
                                {
                                    arr?.length ? arr.map((applicant: any, index: any) => <TalentCard key={index} {...applicant} invited={true} />) : <div className="text-2xl font-semibold">No Invited Candidates</div>
                                }
                            </div>
                        </Tabs.Panel>
                        <Tabs.Panel value="offered">
                            <div className="mt-10 grid gap-5 grid-cols-3 max-[1000px]:grid-cols-3 max-[800px]:grid-cols-2 max-[600px]:grid-cols-1">
                                {
                                    arr?.length ? arr.map((applicant: any, index: any) => <TalentCard key={index} {...applicant} offered />) : <div className="text-2xl font-semibold">No Offered Candidates</div>
                                }
                            </div>
                        </Tabs.Panel>
                        <Tabs.Panel value="rejected">
                            <div className="mt-10 grid gap-5 grid-cols-3 max-[1000px]:grid-cols-3 max-[800px]:grid-cols-2 max-[600px]:grid-cols-1">
                                {
                                    arr?.length ? arr.map((applicant: any, index: any) => <TalentCard key={index} {...applicant} offered />) : <div className="text-2xl font-semibold">No Rejected Candidates</div>
                                }
                            </div>
                        </Tabs.Panel>
                    </Tabs>
                </div>
            </> : <div className="flex items-center justify-center text-lg h-full font-semibold">No Job details availble, Select Valid JOB</div>}
        </div>
    )
}

export default PostedJobDesc;