import { useNavigate } from "react-router-dom";
import Header from "../layouts/Header";
import { Button } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import Footer from "../Footer/Footer";
import Company from "../CompanyProfile/Company";
import SimilarCompanies from "../CompanyProfile/SimilarCompanies";

const CompanyPage = () => {
    const navigate = useNavigate();
    return (
        <div className="bg-gray-100 min-h-[100vh] font-['poppins']">
            <Header />
            <Button leftSection={<IconArrowLeft size={20} />} className="!text-blue-700" my="md" variant="light" onClick={() => navigate(-1)}>Back</Button>

            <div className="flex gap-5 p-4 pb-10 justify-around">
                <Company />
                <SimilarCompanies />
            </div>
            <Footer />
        </div>
    )
}

export default CompanyPage;