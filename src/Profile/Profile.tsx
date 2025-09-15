import { Avatar, Divider, FileInput, Overlay } from "@mantine/core";
import { IconCheck, IconEdit, IconX } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../Slices/ProfileSlice";
import Info from "./Info";
import About from "./About";
import Experience from "./Experience";
import Certificate from "./Certificate";
import { useHover } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { updateProfile } from "../Services/ProfileService";
import Skills from "./Skills";

const Profile = () => {
    const { hovered, ref } = useHover();
    const dispatch = useDispatch();
    const profile = useSelector((state: any) => state.profile);

    const handleFileChange = async (image: any) => {
        let picture: any = await getBase64(image);
        console.log("Picture in Profile:", picture);
        let updatedProfile = { ...profile, picture: picture.split(',')[1] };
        try {
            await updateProfile(updatedProfile);
            dispatch(changeProfile(updatedProfile));
            notifications.show({
                title: 'Profile Picture Updated',
                message: 'Your profile picture has been updated successfully."',
                withCloseButton: true,
                icon: <IconCheck />,
                color: 'teal',
                withBorder: true,
                className: "!border-blue-500 !bg-blue-50 !text-blue-800 !shadow-lg !rounded-lg !p-4 !w-[400px]",
            })
        } catch (error) {
            console.error("Error updating profile:", error);
            notifications.show({
                title: "Error",
                message: "Failed to update profile.",
                icon: <IconX />,
                color: "red",
            });
        }
    }

    const getBase64 = (file: any) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        })
    }

    if (profile == null) {
        return <div>No profile data available.</div>;
    }

    return (
        <div className="w-4/5 pt-3 max-[1000px]:w-full max-[1000px]:p-5 max-[500px]:p-3 mx-auto font-['poppins']">
            {/* Profile Banner and Avatar */}
            <div className="relative">
                <img className="rounded-t-2xl" src="/Profile/banner2.jpg" alt="Profile Banner" />
                <div ref={ref} className="flex items-center justify-center absolute left-1/20 -bottom-1/4">
                    <Avatar className="!w-48 !h-48 max-[700px]:!w-40 max-[700px]:!h-40 max-[600px]:!w-30 max-[600px]:!h-30 max-[500px]:!w-26 max-[500px]:!h-26 border-white border-8 max-[700px]:border-5 max-[500px]:border-3 rounded-full" src={profile.picture ? `data:image/jpeg;base64,${profile.picture}` : "/Profile/avatar.jpg"} alt="" />
                    {hovered && <Overlay className="!rounded-full" backgroundOpacity={0.75} />}
                    {hovered && <IconEdit className="absolute z-[300] w-16 h-16" />}
                    {hovered && <FileInput onChange={handleFileChange} className="absolute z-[301] [&_*]:!rounded-full [&_*]:!h-full h-full w-full" size="lg" radius="xl" variant="transparent" accept="image/png,image/jpeg" />}
                </div>
            </div>

            {/* Profile Header */}
            <div className="px-3 mt-22 max-[700px]:mt-18 max-[600px]:mt-15 max-[500px]:mt-12">
                <Info />
            </div>

            <Divider className="mx-2 my-6 max-[500px]:my-3" />
            < About />

            <Divider className="mx-2 my-6 max-[500px]:my-3" />

            {/* Skills Section */}
            <Skills />

            <Divider className="mx-2 my-6 max-[500px]:my-3" />

            {/* Experience Section */}
            < Experience />
            <Divider className="mx-2 my-6 max-[500px]:my-3" />

            {/* Certifications Section */}
            <Certificate />

        </div>
    );
};

export default Profile;
