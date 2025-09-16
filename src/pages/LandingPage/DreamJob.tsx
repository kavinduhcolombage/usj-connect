import { Avatar, TextInput } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons-react';


const DreamJob = () => {
    const matches = useMediaQuery('(max-width: 650px)');

    return (<div className="flex pb-20 pt-5 items-center px-20 max-[1050px]:pb-10 max-[950px]:pb-8 max-[950px]:px-15 max-[650px]:px-10 max-[500px]:px-6 max-[450px]:px-3 max-[850px]:flex-wrap max-[850px]:gap-0 min-h-[88vh] max-[500px]:min-h-[84vh]">
        <div className="flex flex-col w-[50%] max-[850px]:w-full max-[850px]:h-full justify-center">
            <div className="text-6xl max-[1050px]:text-5xl max-[850px]:text-3xl max-[850px]:text-center font-semibold">Find Your <span className='text-red-800'>Internship</span></div>
            <div className='text-2xl max-[850px]:text-xl max-[850px]:text-center'>Good Life Good Company</div>
            <div className='flex items-end gap-2 max-[850px]:justify-center max-[500px]:pt-2'>
                <TextInput
                    size={matches ? 'xs' : 'sm'}
                    className='w-[50%] max-[850px]:text-center'
                    label="Search Your Dream Job"
                    placeholder="search job"
                />
                <div className='pb-1 cursor-pointer hover:text-blue-500'>
                    <IconSearch size={matches ? 25 : 30} stroke={2} />
                </div>
            </div>
        </div>
        <div className="w-[50%] max-[850px]:w-full flex items-center justify-center mx-10 max-[450px]:mx-5">
            <div className="relative">
                <img className='h-100 max-[1050px]:h-80 max-[650px]:h-60 max-[500px]:ml-15 max-[450px]:ml-25 max-[400px]:ml-30' src="/images/women.png" alt="girl photo" />
                <div className='absolute -right-1/5 max-[1050px]:-right-2/5 max-[950px]:-right-2/6 max-[650px]:-right-1/2 max-[500px]:-right-1/3 max-[450px]:right-2/5 w-fit top-[55%] max-[450px]:top-[65%] border border-red-500 rounded-lg p-2 backdrop-blur-md'>
                    <div className='text-center mb-1 text-sm max-[650px]:text-xs'>10k+ got jobs</div>
                    <Avatar.Group spacing={matches ? "xs" : "sm"}>
                        <Avatar size={matches ? "sm" : "md"} src="/images/1.jpeg" />
                        <Avatar size={matches ? "sm" : "md"} src="/images/2.jpeg" />
                        <Avatar size={matches ? "sm" : "md"} src="/images/3.jpeg" />
                        <Avatar size={matches ? "sm" : "md"}>+5k</Avatar>
                    </Avatar.Group>
                </div>
                <div className='absolute -left-1/2 max-[1050px]:-left-3/5 w-fit top-[18%] max-[650px]:top-[14%] max-[500px]:top-[6%] max-[900px]:hidden max-[850px]:flex max-[650px]:-left-2/3 max-[500px]:-left-1/4 max-[450px]:-left-1/7 max-[400px]:-left-1/15 border border-red-500 rounded-lg p-2 max-[500px]:p-1 backdrop-blur-md gap-2 max-[1050px]:gap-1 flex flex-col'>
                    <div className='flex gap-2 max-[500px]:gap-1 items-center'>
                        <div className='w-10 h-10 max-[1050px]:w-8 max-[1050px]:h-8 p-1 bg-gray-100 rounded-lg'>
                            <img src="/CompanyLogo/Microsoft.png" alt="" />
                        </div>
                        <div className='text-sm max-[650px]:text-xs'>
                            <div>Software Engineer</div>
                            <div className='text-xs max-[650px]:text-[10px]'>Colombo</div>
                        </div>
                    </div>
                    <div className='flex gap-2 justify-around text-yellow-700 text-xs max-[650px]:text-[10px] p-1'>
                        <span>1 day ago</span>
                        <span>100+ Applications</span>
                    </div>
                </div>
                <div className='absolute -left-1/5 max-[1050px]:-left-1/4 w-fit top-[70%] border border-red-500 rounded-lg p-2 max-[500px]:p-1 max-[450px]:hidden backdrop-blur-md gap-2 max-[1050px]:gap-1 flex flex-col'>
                    <div className='flex gap-2 max-[500px]:gap-1 items-center'>
                        <div className='w-10 h-10 max-[1050px]:w-8 max-[1050px]:h-8 p-1 bg-gray-100 rounded-lg'>
                            <img src="/CompanyLogo/Amazon Web Services.png" alt="" />
                        </div>
                        <div className='text-sm max-[650px]:text-xs'>
                            <div>DevOps Engineer</div>
                            <div className='text-xs max-[650px]:text-[10px]'>Kandy</div>
                        </div>
                    </div>
                    <div className='flex gap-2 justify-around text-yellow-700 text-xs max-[650px]:text-[10px] p-1'>
                        <span>1 day ago</span>
                        <span>100+ Applications</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default DreamJob;