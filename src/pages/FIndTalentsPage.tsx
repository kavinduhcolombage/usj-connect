
import { Divider } from "@mantine/core";
import SearchBar from "../FindTalent/SearchBar";
import Talents from "../FindTalent/Talents";
import Footer from "../Footer/Footer"
import Header from "../layouts/Header"

const FindTalentsPage = () => {
    return (
        <div>
            <Header />
            <div className="bg-gray-100 min-h-[100vh] font-['poppins']">
                <SearchBar />
                <Divider/>
                <Talents />
            </div>
            <Footer />
        </div>


    )
}

export default FindTalentsPage;