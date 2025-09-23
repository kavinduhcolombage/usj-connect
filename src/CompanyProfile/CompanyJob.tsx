import { jobList } from "../Data/JobsData";
import JobCard from "../FindJob/JobCard";

const Companyjob = () => {
    return (
        <div className="mt-10 grid gap-5 grid-cols-2 max-[1000px]:grid-cols-2 max-[800px]:grid-cols-2 max-[600px]:grid-cols-1">
            {
                jobList.map((job, index) => (
                    <JobCard key={index} {...job} />
                ))
            }
        </div>
    )
}

export default Companyjob;