import { useNavigate, useParams } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../layouts/Header";
import PostedJob from "../PostedJob/PostedJob";
import PostedJobDesc from "../PostedJob/PostedJobDesc";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getJobPostedBy } from "../Services/JobService";
import { Button, Drawer, Loader, LoadingOverlay } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";

const PostedJobPage = () => {
    const { id } = useParams();
    const user = useSelector((State: any) => State.user);
    const [jobList, setJobList] = useState<any[]>([]);
    const [job, setJob] = useState<any>({});
    const navigate = useNavigate();
    const [opened, { open, close }] = useDisclosure(false);
    const matches = useMediaQuery('(max-width: 1000px)');
    const [loading1, setLoading1] = useState(true);
    const [loading2, setLoading2] = useState(true);
    const [reload, setReload] = useState(0);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setLoading2(true);
        getJobPostedBy(user.id).then((res) => {
            setJobList(res);
            if (res && res.length > 0 && Number(id) == 0) navigate(`/posted-job/${res[0].id}`);
            setJob(res.find((item: any) => item.id == id));
            setLoading1(false); // loading finished
            setLoading2(false); // loading finished
        }).catch((err) => {
            console.error("Error fetching posted jobs:", err);
        })
    }, [id]);

    useEffect(() => {
        if (jobList.length > 0) {
            setJob(null);
        }
    }, [reload]);

    return (
        <div>
            <Header />
            <div style={{ position: 'relative' }}>
                <LoadingOverlay visible={loading1} zIndex={1000} overlayProps={{ radius: "sm", blur: 4 }} loaderProps={{ color: "red", type: "bars" }} />
                <div className="bg-gray-100 min-h-[100vh] font-['poppins']">
                    {matches && <Button size="sm" autoContrast onClick={open} className="mt-5 ml-5">
                        All Jobs
                    </Button>}
                    <Drawer opened={opened} size={250} overlayProps={{ backgroundOpacity: 0.5, blur: 4 }} onClose={close} title="All Jobs">
                        <PostedJob job={job} jobList={jobList} />
                    </Drawer>
                    <div className="flex gap-3 justify-around px-5">
                        {!matches && <div className="w-2/10">
                            <PostedJob job={job} jobList={jobList} onTabChanged={() => setReload(prev => prev + 1)}/>
                        </div>}

                        {loading2 ? (
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                minHeight: '100vh',
                                width: '75%'
                            }}>
                                <Loader color="red" />
                            </div>
                        ) : (
                            <PostedJobDesc {...job} />
                        )
                        }

                    </div>
                </div>
            </div>









            <Footer />
        </div>

    )
}

export default PostedJobPage;