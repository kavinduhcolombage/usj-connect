import { useNavigate, useParams } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../layouts/Header";
import PostedJob from "../PostedJob/PostedJob";
import PostedJobDesc from "../PostedJob/PostedJobDesc";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getJobPostedBy } from "../Services/JobService";
import { Button, Drawer } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";

const PostedJobPage = () => {
    const { id } = useParams();
    const user = useSelector((State: any) => State.user);
    const [jobList, setJobList] = useState<any[]>([]);
    const [job, setJob] = useState<any>({});
    const navigate = useNavigate();
    const [opened, { open, close }] = useDisclosure(false);
    const matches = useMediaQuery('(max-width: 1000px)');

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        getJobPostedBy(user.id).then((res) => {
            setJobList(res);
            if (res && res.length > 0 && Number(id) == 0) navigate(`/posted-job/${res[0].id}`);
            setJob(res.find((item: any) => item.id == id));
        }).catch((err) => {
            console.error("Error fetching posted jobs:", err);
        })
    }, [id]);

    return (
        <div>
            <Header />
            <div className="bg-gray-100 min-h-[100vh] font-['poppins']">
                {matches && <Button size="sm" autoContrast onClick={open} className="mt-5 ml-5">
                    All Jobs
                </Button>}
                <Drawer opened={opened} size={250} overlayProps={{ backgroundOpacity: 0.5, blur: 4 }} onClose={close} title="All Jobs">
                    <PostedJob job={job} jobList={jobList} />
                </Drawer>
                <div className="flex gap-3 justify-around px-5">
                    {!matches &&<div className="w-2/10">
                        <PostedJob job={job} jobList={jobList} />
                    </div>}
                    

                    <PostedJobDesc {...job} />
                </div>
            </div>
            <Footer />
        </div>

    )
}

export default PostedJobPage;