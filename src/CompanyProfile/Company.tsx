import { Avatar, Divider, Tabs } from "@mantine/core";
import { IconMapPin } from "@tabler/icons-react";
import AboutComp from "./AboutComp";
import Companyjob from "./CompanyJob";
import CompanyEmployees from "./CompanyEmployees";

const Company = () => {
    return (
        <div className="w-3/4 p-7">
            {/* <div className="relative">
                <img className="rounded-t-2xl" src="/Profile/banner2.jpg" alt="" />
                <img className="w-36 h-36 rounded-3xl -bottom-1/4 p-2 absolute left-5 border-mine-shaft-950 bg-white" src="/CompanyLogo/Google.png" alt="" />
            </div> */}
            <div className="relative">
                <img className="rounded-t-2xl" src="/Profile/banner2.jpg" alt="" />
                <div className="flex items-center justify-center absolute left-1/15 -bottom-1/8">
                    <img className="!w-40 !h-40 max-[700px]:!w-40 max-[700px]:!h-40 max-[600px]:!w-30 max-[600px]:!h-30 max-[500px]:!w-26 max-[500px]:!h-26 border-white border-8 max-[700px]:border-5 max-[500px]:border-3 rounded-2xl" src="/CompanyLogo/Google.png" alt="" />
                </div>
            </div>
            <div className="px-3 mt-18">
                <div className="text-3xl font-semibold flex justify-between">name<Avatar.Group>
                    <Avatar src="https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg?semt=ais_hybrid&w=740" />
                    <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSy4mrp6VqEE2DSos0eHpGcRHQErgL4EsqtjeL5kzCZ83zrpTxc8jQ6DAeygXwyoCwqk04&usqp=CAU" />
                    <Avatar src="https://static.vecteezy.com/system/resources/previews/004/899/680/non_2x/beautiful-blonde-woman-with-makeup-avatar-for-a-beauty-salon-illustration-in-the-cartoon-style-vector.jpg" />
                    <Avatar>+10k</Avatar>
                </Avatar.Group></div>
                <div className="text-lg flex gap-1 items-center text-mine-shaft-300">
                    <IconMapPin className="h-5 w-5" stroke={1.5} /> location
                </div>
            </div>
            <Divider mx="xs" my="xl" />
            <div>
                <Tabs variant="outline" defaultValue="about">
                    <Tabs.List className="[&_button]:!text-lg font-semibold mb-5 [&_button[data-active='true']]:!text-blue-500">
                        <Tabs.Tab value="about">About</Tabs.Tab>
                        <Tabs.Tab value="jobs">Jobs</Tabs.Tab>
                        <Tabs.Tab value="employees">Employees</Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="about"><AboutComp /></Tabs.Panel>
                    <Tabs.Panel value="jobs"><Companyjob /></Tabs.Panel>
                    <Tabs.Panel value="employees"><CompanyEmployees /></Tabs.Panel>
                </Tabs>
            </div>
        </div>
    )
}
export default Company;