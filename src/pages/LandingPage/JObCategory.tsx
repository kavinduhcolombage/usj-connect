const JobCategory = () => {
    return <div className="mt-10 max-[850px]:mt-5 pb-5">
        <div className="text-4xl max-[850px]:text-3xl text-center font-semibold mb-3">Browse <span className="text-red-700">Job</span> Category</div>
        <div className="text-lg max-[850px]:text-base mx-auto text-center w-1/2 max-[550px]:w-2/3">Explore diverse job opportunities tailored to your skills. Start your career journey today!</div>

        <div className="grid grid-cols-4 max-[740px]:grid-cols-2 mx-10 my-5 max-[500px]:mx-5 max-[500px]:my-2 gap-2">
            <div className="flex flex-col items-center justify-center px-2">
                <div className="p-2 rounded-full">
                    <img className="h-15 w-15 max-[500px]:h-11 max-[500px]:w-11" src="/JobCategory/Sales.png" alt="" />
                </div>
                <div className="text-red-900 text-lg max-[850px]:text-base font-semibold">Business Analysis</div>
                <div className="text-sm max-[850px]:text-xs text-center">Understand business needs and drive smart solutions for success.</div>
                <div className="text-red-500 text-lg max-[850px]:text-base">1k+ job posted</div>
            </div>
            <div className="flex flex-col items-center justify-center px-2">
                <div className="p-2 rounded-full">
                    <img className="h-15 w-15 max-[500px]:h-11 max-[500px]:w-11" src="/JobCategory/WebDevelop.png" alt="" />
                </div>
                <div className="text-red-900 text-lg max-[850px]:text-base font-semibold">Web Developers</div>
                <div className="text-sm max-[850px]:text-xs text-center">Craft responsive, modern websites with clean, efficient code.</div>
                <div className="text-red-500 text-lg max-[850px]:text-base">1k+ job posted</div>
            </div>
            <div className="flex flex-col items-center justify-center px-2">
                <div className="p-2 rounded-full">
                    <img className="h-15 w-15 max-[500px]:h-11 max-[500px]:w-11" src="/JobCategory/Finance.png" alt="" />
                </div>
                <div className="text-red-900 text-lg max-[850px]:text-base font-semibold">Finance</div>
                <div className="text-sm max-[850px]:text-xs text-center">Manage budgets, analyze trends, and guide smart investments.</div>
                <div className="text-red-500 text-lg max-[850px]:text-base">1k+ job posted</div>
            </div>
            <div className="flex flex-col items-center justify-center px-2">
                <div className="p-2 rounded-full">
                    <img className="h-15 w-15 max-[500px]:h-11 max-[500px]:w-11" src="/JobCategory/HR.png" alt="" />
                </div>
                <div className="text-red-900 text-lg max-[850px]:text-base font-semibold">Human Resource</div>
                <div className="text-sm max-[850px]:text-xs text-center">Empower people, shape culture, and build strong teams.</div>
                <div className="text-red-500 text-lg max-[850px]:text-base">1k+ job posted</div>
            </div>
        </div>


    </div>

}

export default JobCategory;