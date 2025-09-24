import AboutUs from "../AboutUs/AboutUs";
import Footer from "../Footer/Footer";
import Header from "../layouts/Header";
import Team from "../AboutUs/Team";
import SupportSection from "../AboutUs/SupportSection";

const AboutUsPage = () => {
    return (
        <>
            <Header />
            <div className="bg-gray-100 min-h-[100vh] font-['poppins'] mb-10">
                <AboutUs />
                <Team />
                <SupportSection />
            </div>
            <Footer />
        </>
    )
}

export default AboutUsPage;