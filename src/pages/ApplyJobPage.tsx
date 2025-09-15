import { useNavigate, useParams } from "react-router-dom";
import Header from "../layouts/Header";
import { Button } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import Footer from "../Footer/Footer";
import ApplyJobComp from "../ApplyJob/ApplyJobComp";
import { useEffect, useState } from "react";
import { getJob } from "../Services/JobService";

const ApplyJObPage = () => {
    const navigate = useNavigate();
    const {id } = useParams();
    const [job, setJob]= useState<any>(null);

    useEffect(()=>{
        window.scrollTo({ top: 0, behavior: 'smooth' });
        getJob(id).then((res)=>{
            setJob(res);
            console.log("Job details fetched successfully:", res);
        }).catch((err)=>{
            console.error("Error fetching job details:", err);
        });
    },[id]);

    return <div className="bg-gray-100 min-h-[100vh] font-['poppins']">
    <Header />
    <Button leftSection={<IconArrowLeft size={20} />} className="!text-blue-700" my="md" variant="light" onClick={() => navigate(-1)}>Back</Button>
    <ApplyJobComp {...job}/>

    <Footer />
</div>
}

export default ApplyJObPage;
