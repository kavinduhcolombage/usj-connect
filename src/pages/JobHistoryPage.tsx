import Footer from "../Footer/Footer";
import JobHistory from "../JobHistory/JobHistory";
import Header from "../layouts/Header";

const JobHistoryPage = () => {
    return (
        <div>
            <Header />
            <div className="bg-gray-100 min-h-[100vh] font-['poppins']">
                <div className="p-5">
                    <JobHistory />
                </div>
            </div>
            <Footer />
        </div>

    )
}

export default JobHistoryPage;