import { Avatar, Button, Divider } from "@mantine/core";
import { IconBriefcase, IconMapPin } from "@tabler/icons-react";
import ExpCard from "./ExpCard";
import CertiCard from "./CertiCard";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProfile } from "../Services/ProfileService";

const Profile = () => {
    const { id } = useParams();
    const [profile, setProfile] = useState<any>({});

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        getProfile(id).then((res) => {
            console.log("res profile ", res)
            setProfile(res);
        }).catch((err) => {
            console.log(err);
        })
    }, [id]);


    return <div className="w-4/6 max-[900px]:w-full">
        <div className="relative">
            <img className="rounded-t-2xl" src="/Profile/banner2.jpg" alt="" />
            <div className="flex items-center justify-center absolute left-1/20 -bottom-1/4">
                <Avatar className="!w-48 !h-48 max-[700px]:!w-40 max-[700px]:!h-40 max-[600px]:!w-30 max-[600px]:!h-30 max-[500px]:!w-26 max-[500px]:!h-26 border-white border-8 max-[700px]:border-5 max-[500px]:border-3 rounded-full" src={profile.picture ? `data:image/jpeg;base64,${profile.picture}` : "/Profile/avatar.jpg"} alt="" />
            </div>
        </div>
        <div className="px-3 mt-22 max-[700px]:mt-18 max-[600px]:mt-15 max-[500px]:mt-12">
            <div className="text-3xl max-[600px]:text-2xl max-[500px]:text-xl font-semibold flex justify-between">{profile?.name}<Button
                color="blue" variant="light">Message</Button></div>
            <div className="text-xl max-[600px]:text-lg max-[500px]:text-base flex gap-1 items-center"><IconBriefcase className="h-5 w-5 max-[500px]:h-4 max-[500px]:w-4" stroke={1.5} /> {profile?.jobTitle} &bull; {profile?.company}</div>
            <div className="text-lg max-[600px]:text-base max-[500px]:text-sm flex gap-1 items-center text-mine-shaft-300">
                <IconMapPin className="h-5 w-5 max-[500px]:h-4 max-[500px]:w-4" stroke={1.5} /> {profile?.location}
            </div>
            <div className="text-lg max-[600px]:text-base max-[500px]:text-sm flex gap-1 items-center text-mine-shaft-300">
                <IconBriefcase className="h-5 w-5 max-[500px]:h-4 max-[500px]:w-4" stroke={1.5} />Experience {profile?.totalExp} Years
            </div>
        </div>
        <Divider className="mx-2 my-6 max-[500px]:my-3" />
        <div className="px-3">
            <div className="text-2xl max-[600px]:text-xl max-[500px]:text-lg max-[400px]:text-base font-semibold mb-3 max-[500px]:mb-1 flex justify-between">About</div>
            <div className="text-base max-[400px]:text-sm text-justify">{profile?.about}</div>
        </div>
        <Divider className="mx-2 my-6 max-[500px]:my-3" />
        <div className="px-3">
            <div className="text-2xl max-[600px]:text-xl max-[500px]:text-lg max-[400px]:text-base font-semibold mb-3 max-[500px]:mb-1 flex justify-between">Skills</div>
            <div className="flex flex-wrap gap-2">

                {
                    profile?.skills?.map((skill: any, index: any) => <div key={index} className="bg-blue-400 text-sm font-medium bg-opacity-15 rounded-3xl text-white px-3 py-1">{skill}</div>)
                }

            </div>
        </div>
        <Divider className="mx-2 my-6 max-[500px]:my-3" />
        <div className="px-3">
            <div className="text-2xl max-[600px]:text-xl max-[500px]:text-lg max-[400px]:text-base font-semibold mb-3 max-[500px]:mb-1 flex justify-between">Experience</div>
            <div className="flex flex-col gap-8">
                {
                    profile?.experience?.map((exp: any, index: any) => <ExpCard key={index} {...exp} />)
                }
            </div>

        </div>
        <Divider className="mx-2 my-6 max-[500px]:my-3" />
        <div className="px-3">
            <div className="text-2xl max-[600px]:text-xl max-[500px]:text-lg max-[400px]:text-base font-semibold mb-3 max-[500px]:mb-1 flex justify-between">Certifications</div>
            <div className="flex flex-col gap-8">
                {
                    profile?.certifications?.map((certi: any, index: any) => <CertiCard key={index} {...certi} />)
                }
            </div>
        </div>
    </div>;
};

export default Profile;