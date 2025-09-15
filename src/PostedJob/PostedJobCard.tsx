import { Link, useParams } from "react-router-dom";
import { timeAgo } from "../Services/Utilities";

const PostedJobcard = (props: any) => {
    const { id } = useParams();
    return (
        <Link to={`/posted-job/${props.id}`} className={` rounded-xl p-2 border-1 border-blue-600 border-l-blue-700 cursor-pointer hover:shadow-lg hover:border-2 ${props.id == id ? "bg-blue-500 text-white" : "bg-white"}`}>
            <div className="text-sm font-semibold">{props.jobTitle || "No Title"}</div>
            <div className={`text-xs font-medium ${props.id == id ? "text-white" : "text-blue-900"}`}>{props.location || "No Location"}</div>
            <div className={`text-xs ${props.id == id ? "text-white" : "text-blue-800"}`}>{props.jobStatus == "DRAFT" ? "Drafted" : props.jobStatus == "CLOSED" ? "Closed" : "Posted"} {timeAgo(props.postTime)}</div>
        </Link>
    )
}

export default PostedJobcard;