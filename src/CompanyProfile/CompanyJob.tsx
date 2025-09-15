import { jobList } from "../Data/JobsData";
import JobCard from "../FindJob/JobCard";

const Companyjob = () => {
    return (
        <div className="mt-10 flex flex-wrap gap-5">
            {
                jobList.map((job, index) => (
                    <JobCard key={index} {...job} />
                ))
            }
        </div>
    )
}

export default Companyjob;