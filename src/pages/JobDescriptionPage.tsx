
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../Footer/Footer"
import Header from "../layouts/Header"
import { Button } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import JobDescription from "../JobDescription/JobDescription";
import RecommendedJobs from "../JobDescription/RecomendedJobs";
import { useEffect, useState } from "react";
import { getJob } from "../Services/JobService";

const JobDescriptionPage = () => {
    const { id } = useParams();
    const [job, setjob] = useState<any>(null);
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        getJob(id).then((res) => {
            setjob(res);
        }).catch((err) => {
            console.error("Error fetching job details:", err);
        })
    }, [id]);

    return (
        <div className="bg-gray-100 min-h-[100vh] font-['poppins']">
            <Header />
            <Button leftSection={<IconArrowLeft size={20} />} className="!text-blue-700" my="md" variant="light" onClick={() => navigate(-1)}>Back</Button>
            <div className="flex gap-5 p-5 pb-10 justify-around max-[900px]:flex-wrap max-[900px]:justify-start">
                <JobDescription {...job} />
                <RecommendedJobs />
            </div>
            <Footer />
        </div>

    )
}

export default JobDescriptionPage;