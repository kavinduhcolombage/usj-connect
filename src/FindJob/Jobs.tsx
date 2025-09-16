import { useEffect, useRef, useState } from "react";
import JobCard from "./JobCard";
import Sort from "./Sort";
import { getAllJobs } from "../Services/JobService";
import { useDispatch, useSelector } from "react-redux";
import { resetFilter } from "../Slices/FilterSlice";
import { resetSort } from "../Slices/SortSlice";
import { LoadingOverlay } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconX } from "@tabler/icons-react";

const Jobs = () => {
    const [jobList, setJobList] = useState<any[]>([]);
    const filter = useSelector((state: any) => state.filter);
    const [filteredJobs, setFilteredJobs] = useState<any>([]);
    const sort = useSelector((state: any) => state.sort);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const user = useSelector((state: any) => state.user);
    const notificationShown = useRef(false);

    useEffect(() => {
        dispatch(resetFilter());
        dispatch(resetSort());
        setLoading(true);
        if (user) {
            getAllJobs().then((res) => {
                setJobList(res.filter((job: any) => job.jobStatus == "ACTIVE"));
            }).catch((err) => {
                console.error("Error fetching jobs:", err);
            }).finally(() => {
                setLoading(false);
            });
        } else {
            setLoading(false);
            if (!notificationShown.current) {
                notifications.show({
                    position: 'top-center',
                    withCloseButton: true,
                    autoClose: 5000,
                    title: "Need to Login",
                    message: 'Please log in to access this feature.',
                    color: 'blue',
                    icon: <IconX />,
                    className: 'my-notification-class',
                    loading: false,
                });
                notificationShown.current = true;
            }
        }

    }, []);

    useEffect(() => {
        if (sort == "Most Recent") {
            setJobList([...jobList].sort((a: any, b: any) => new Date(b.postTime).getTime() - new Date(a.postTime).getTime()));
        }
        else if (sort == "Salary(low to high)") {
            setJobList([...jobList].sort((a: any, b: any) => a.packageOffered - b.packageOffered));
        }
        else if (sort == "Salary(high to low)") {
            setJobList([...jobList].sort((a: any, b: any) => b.packageOffered - a.packageOffered));
        }
    }, [sort]);

    useEffect(() => {
        let filtered = jobList;

        if (filter["Job Title"] && filter["Job Title"].length > 0) {
            filtered = filtered.filter((job: any) => filter["Job Title"]?.some((title: any) => job.jobTitle?.toLowerCase().includes(title.toLowerCase())));
        }

        if (filter.Location && filter.Location.length > 0) {
            filtered = filtered.filter((job: any) => filter.Location?.some((location: any) =>
                job.location?.toLowerCase().includes(location.toLowerCase())));
        }

        if (filter.Experience && filter.Experience.length > 0) {
            filtered = filtered.filter((job: any) => filter.Experience?.some((x: any) => job.experience?.toLowerCase().includes(x.toLowerCase())));
        }

        if (filter["Job Type"] && filter["Job Type"].length > 0) {
            filtered = filtered.filter((job: any) => filter["Job Type"]?.some((type: any) => job.jobType?.toLowerCase().includes(type.toLowerCase())));
        }

        if (filter.salary && filter.salary.length > 0) {
            filtered = filtered.filter((job: any) => filter.salary[0] <= job.packageOffered && job.packageOffered <= filter.salary[1]);
        }

        setFilteredJobs(filtered);
    }, [filter, jobList]);


    return <div className="relative p-5">
        <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} loaderProps={{ color: "red", type: "bars" }} />
        <div className="flex justify-between">
            <div className="text-2xl font-semibold max-[500px]:text-xl">Recommended job</div>
            <Sort sort="job" />
        </div>
        <div className="mt-10 grid gap-5 grid-cols-4 max-[1000px]:grid-cols-3 max-[800px]:grid-cols-2 max-[600px]:grid-cols-1">
            {
                filteredJobs && filteredJobs.length > 0 ? (filteredJobs?.map((job: any, index: any) => (
                    <JobCard key={index} {...job} />
                ))) : <div>No jobs found.</div>
            }
        </div>
    </div>
}

export default Jobs;