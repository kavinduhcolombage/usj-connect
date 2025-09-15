import { useParams } from "react-router-dom";
import JobCard from "../FindJob/JobCard";
import { useEffect, useState } from "react";
import { getAllJobs } from "../Services/JobService";
import { Divider } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

const RecommendedJobs = () => {
  const { id } = useParams();
  const [jobList, setJobList] = useState<any>(null);
  const matches = useMediaQuery('(max-width: 900px)');

  useEffect(() => {
    getAllJobs().then((res) => {
      setJobList(res);
    }).catch((err) => {
      console.error("Error fetching jobs:", err);
    })
  }, []);

  return <div className="max-[900px]:w-full">
    {matches && <Divider />}
    <div className="text-xl max-[450px]:text-lg font-semibold mb-5 max-[900px]:mt-3">Recommended Jobs</div>
    <div className="grid gap-5 grid-cols-1 max-[900px]:grid-cols-3 max-[800px]:grid-cols-2 max-[600px]:grid-cols-1">
      {jobList?.map((job: any, index: number) => index < 5 && id != job.id && <JobCard key={index} {...job} />)}
    </div>
  </div>;
}

export default RecommendedJobs;