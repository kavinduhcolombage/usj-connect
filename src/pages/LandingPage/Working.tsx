import { useMediaQuery } from "@mantine/hooks";

const Working = () => {
    const matches = useMediaQuery('(max-width: 500px)');
    return <div className="mt-5 pb-5">
        <div className="text-4xl max-[850px]:text-3xl text-center font-semibold mb-3">How to  <span className="text-red-700">Apply</span></div>
        <div className="text-lg max-[850px]:text-base max-[500px]:text-sm mx-auto text-center w-1/2 max-[700px]:w-2/3 max-[500px]:w-3/4 max-[400px]:pb-2">Explore diverse job opportunities tailored to your skills. Start your career journey today!</div>

        <div className="flex px-16 max-[900px]:px-8 max-[500px]:py-2 max-[600px]:px-4 max-[400px]:px-0 justify-between items-center relative">

            <img className="w-80 h-120 max-[850px]:w-70 max-[850px]:h-100 max-[750px]:w-50 max-[750px]:h-80 max-[700px]:w-40 max-[700px]:h-60 max-[500px]:w-33 max-[500px]:h-42 ml-10 max-[1000px]:ml-1 max-[500px]:ml-0" src="/images/boy.png" alt="working photo" />

            <div className="flex flex-col gap-7 max-[600px]:gap-3 w-[55%] max-[750px]:w-[65%] max-[500px]:w-[70%] max-[400px]:pr-3">
                <div className="flex items-center justify-around gap-4">
                    <div className="p-2.5 bg-blue-300 rounded-full">
                        <img className="h-12 w-18 max-[850px]:h-9 max-[850px]:w-15 max-[700px]:h-5 max-[700px]:w-10 max-[500px]:h-4 max-[500px]:w-4" src="/images/Resume.png" alt="build resume" />
                    </div>
                    <div>
                        <div className="text-yellow-700 text-xl max-[850px]:text-lg max-[750px]:text-base max-[500px]:text-sm font-semibold">Build your resume</div>
                        <div className="text-base max-[850px]:text-sm max-[700px]:text-xs">{matches ? "Create a resume showing skills and experience." : "Create a professional resume that highlights your skills, experience, and achievements to stand out to employers."}</div>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="p-2.5 bg-blue-300 rounded-full">
                        <img className="h-12 w-18 max-[850px]:h-9 max-[850px]:w-15 max-[700px]:h-5 max-[700px]:w-10 max-[500px]:h-4 max-[500px]:w-4" src="/images/job.png" alt="job" />
                    </div>
                    <div>
                        <div className="text-yellow-700 text-xl max-[850px]:text-lg max-[750px]:text-base max-[500px]:text-sm font-semibold">Apply for job</div>
                        <div className="text-base max-[850px]:text-sm max-[700px]:text-xs">{matches ? "Search and apply for your dream job with ease." : "Search and apply for your dream job using our user-friendly platform with thousands of active listings."}</div>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="p-2.5 bg-blue-300 rounded-full">
                        <img className="h-12 w-18 max-[850px]:h-9 max-[850px]:w-15 max-[700px]:h-5 max-[700px]:w-10 max-[500px]:h-4 max-[500px]:w-4" src="/images/hired.png" alt="hired" />
                    </div>
                    <div>
                        <div className="text-yellow-700 text-xl max-[850px]:text-lg max-[750px]:text-base max-[500px]:text-sm font-semibold">Get Hired</div>
                        <div className="text-base max-[850px]:text-sm max-[700px]:text-xs">{matches ? "Get interview calls and job offers from top companies." : "Receive interview calls and secure job offers from top companies looking for talent like you."}</div>
                    </div>
                </div>
            </div>
        </div>


    </div>

}

export default Working;