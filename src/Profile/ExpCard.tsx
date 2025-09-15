import { Button } from "@mantine/core";
import { formatDate } from "../Services/Utilities";
import { useState } from "react";
import ExpInput from "./ExpInput";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../Slices/ProfileSlice";
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";

const ExpCard = (props: any) => {
    const dispatch = useDispatch();
    const [edit, setEdit] = useState(false);
    const profile = useSelector((state: any) => state.profile);

    const handleDelete = () => {
        let exp = [...profile.experience];
        exp.splice(props.index, 1);
        let updatedProfile = { ...profile, experience: exp };
        dispatch(changeProfile(updatedProfile));
        notifications.show({
            title: 'Removed Succesfully.',
            message: 'profile updated...',
            withCloseButton: true,
            icon: <IconCheck />,
            color: 'teal',
            withBorder: true,
            className: "!border-blue-500 !bg-blue-50 !text-blue-800 !shadow-lg !rounded-lg !p-4 !w-[400px]",
        })
    }

    return !edit ? <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
                <div className="p-2 bg-mine-shaft-800 rounded-md">
                    <img className="h-10" src={`/CompanyLogo/${props.company}.png`} alt="" />
                </div>
                <div className="flex flex-col">
                    <div className="font-medium text-xl max-[600px]:text-lg max-[500px]:text-base"> {props.title} </div>
                    <div className="text-sm max-[500px]:text-xs text-mine-shaft-300">{props.company} &bull; {props.location}</div>
                </div>
            </div>
            <div className="text-base max-[500px]:text-xs text-mine-shaft-300">
                {formatDate(props.startDate)} - {props.working ? "Present" : formatDate(props.endDate)}
            </div>
        </div>
        <div className="text-base text-justify">
            {props.description}
        </div>
        {props.edit && <div className="flex gap-5 justify-end">
            <Button onClick={() => setEdit(true)} color="blue" variant="outline">Edit</Button>
            <Button onClick={handleDelete} color="red.8" variant="light">Delete</Button>
        </div>}
    </div> : <ExpInput {...props} setEdit={setEdit} />
}

export default ExpCard;