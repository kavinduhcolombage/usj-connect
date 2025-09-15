import { Box } from "@mantine/core";

const logos = [
    '/CompanyLogo/99x.png',
    '/CompanyLogo/WSO2.png',
    '/CompanyLogo/Ifs.png',
    '/CompanyLogo/SyscoLab.png',
    '/CompanyLogo/Virtusa.png',
    '/CompanyLogo/Azure.png',
    '/CompanyLogo/LSEG.png',
    '/CompanyLogo/Google.png',
    '/CompanyLogo/99x.png',
    '/CompanyLogo/WSO2.png',
    '/CompanyLogo/Ifs.png',
    '/CompanyLogo/SyscoLab.png',
    '/CompanyLogo/Virtusa.png',
    '/CompanyLogo/Azure.png',
    '/CompanyLogo/LSEG.png',  
];

const Companies = () => {
    return <div className="mt-5 pb-5">
        <div className="text-4xl max-[600px]:text-3xl text-center font-semibold mb-10">Trusted by <span className="text-red-700">1000+</span> Companies</div>

        <Box
                w="100%" // Full width of the marquee container
                h={120} // Height of the marquee container
                pos="relative"
                style={{ overflow: "hidden", whiteSpace: "nowrap" }} // Ensure horizontal scrolling
            >
                <Box
                    style={{
                        display: "inline-block", // Ensure inline layout for horizontal scrolling
                        animation: "scroll-left 15s linear infinite", // Horizontal scrolling animation
                    }}
                >
                    {/* Render logos twice for seamless looping */}
                    {logos.concat(logos).map((src, i) => (
                        <img
                            key={i}
                            src={src}
                            width={100}
                            height={100}
                            alt="logo"
                            style={{ display: "inline-block", marginRight: "24px" }}
                        />
                    ))}
                </Box>

                <style>
                    {`
                        @keyframes scroll-left {
                            0% { transform: translateX(0); }
                            100% { transform: translateX(-100%); }
                        }
                    `}
                </style>
            </Box>
    </div>
}

export default Companies;
