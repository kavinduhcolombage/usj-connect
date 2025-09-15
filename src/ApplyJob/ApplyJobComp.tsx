import { Divider } from "@mantine/core";
import ApplicationForm from "./ApplicationForm";
import { timeAgo } from "../Services/Utilities";

const ApplyJobComp = (props: any) => {

    return <div className="w-2/3 min-[500px]:mx-auto max-[500px]:w-full">
        <div className="flex justify-between max-[500px]:p-3">
            <div className="flex gap-2 items-center">
                <div className="p-3 rounded-xl">
                    <img className="h-14" src={`/CompanyLogo/${props.company}.png`} alt="Company Logo" />
                </div>
                <div className="flex flex-col gap-1">
                    <div className="font-semibold text-2xl max-[500px]:text-xl">{props.jobTitle}</div>
                    <div className="text-lg max-[500px]:text-base">{props.company} &bull; {timeAgo(props.postTime)} &bull; {props.applicants ? props.applicants.length : 0} applicants</div>
                </div>
            </div>
        </div>
        <Divider className="min-[500px]:my-6" />
        <ApplicationForm />
    </div>

}

export default ApplyJobComp;