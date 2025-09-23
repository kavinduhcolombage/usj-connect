import Footer from "../Footer/Footer";
import Header from "../layouts/Header";
import PostJob from "../PostJob/PostJob";

const PostJobPage = () => {
    return (
        <div className="bg-gray-100 min-h-[100vh] font-['poppins']">
            <Header />
            <PostJob/>
            <Footer />
        </div>

    )
}

export default PostJobPage;