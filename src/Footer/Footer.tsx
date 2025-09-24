import { IconBrandFacebook, IconBrandInstagram, IconBrandLinkedin, IconBrandTiktok, IconBrandX } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { Text } from '@mantine/core';

const Footer = () => {
    return <div className="pb-5 pt-5 flex flex-col bg-red-950">
        <div className="flex flex-wrap gap-5 max-[400px]:gap-3 justify-around items-center w-full">
            <div className="w-1/3 max-[600px]:w-[80%] flex flex-col gap-2">
                <div className="max-[600px]:text-center gap-5">
                    <Text
                        className="!text-3xl max-[750px]:!text-2xl max-[600px]:!text-3xl max-[500px]:!text-2xl"
                        fw={1000}
                        variant="gradient"
                        gradient={{ from: 'yellow', to: 'rgba(255, 255, 255, 1)', deg: 214 }}
                    >
                        Uni Connect
                    </Text>

                    <div className="text-base max-[500px]:text-sm max-[700px]:text-justify max-[600px]:text-center text-blue-100">Showcase your profile, upgrade your skills, earn certifications.</div>
                </div>

                <div className="flex gap-5 max-[750px]:gap-2 text-red-500 [&>div]:bg-gray-300 [&>div]:p-2 [&>div]:rounded-full [&>div]:cursor-pointer max-[400px]:[&>div]:p-1.5 [&>div:hover]:bg-yellow-700 [&>div:hover]:text-white justify-around">
                    <div><IconBrandFacebook stroke={2} /></div>
                    <div><IconBrandInstagram stroke={2} /></div>
                    <div><IconBrandX stroke={2} /></div>
                    <div><IconBrandTiktok stroke={2} /></div>
                    <div><IconBrandLinkedin stroke={2} /></div>
                </div>
            </div>

            <div className="flex gap-15 justify-around max-[750px]:gap-10 max-[700px]:gap-6 max-[600px]:w-[90%]">

                <div className="text-white">
                    <div className="text-2xl max-[700px]:text-xl font-semibold mb-4 max-[400px]:mb-3 text-yellow-500">Product</div>
                    <div className="text-sm max-[400px]:text-xs">
                        <Link to={`/find-job`}>
                            <div className="hover:text-blue-400 cursor-pointer mb-1">Find job</div>
                        </Link >
                        <Link to={`/find-talents`}>
                            <div className="hover:text-blue-400 cursor-pointer mb-1">Find Talent</div>
                        </Link>
                    </div>
                </div>

                <div className="text-white">
                    <div className="text-2xl max-[700px]:text-xl font-semibold mb-4 max-[400px]:mb-3 text-yellow-500">Company</div>
                    <div className="text-sm max-[400px]:text-xs">
                        <Link to={`/about-us`}>
                            <div className="hover:text-blue-400 cursor-pointer mb-1">About Us</div>
                        </Link>
                        <div className="hover:text-blue-400 cursor-pointer mb-1">Contact Us</div>
                    </div>

                </div>

                <div className="text-white">
                    <div className="text-2xl max-[700px]:text-xl font-semibold mb-4 max-[400px]:mb-3 text-yellow-500">Support</div>
                    <div className="text-sm max-[400px]:text-xs">
                        <div className="hover:text-blue-400 cursor-pointer mb-1">Help & support</div>
                        <div className="hover:text-blue-400 cursor-pointer mb-1">Feedback</div>
                    </div>

                </div>
            </div>
        </div>
        <div className="w-full text-center text-white text-xs mt-6">
            © {new Date().getFullYear()} USJ Connect. All rights reserved.
        </div>
    </div>

}

export default Footer;