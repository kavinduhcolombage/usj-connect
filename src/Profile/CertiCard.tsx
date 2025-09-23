import { ActionIcon } from "@mantine/core";
import { formatDate } from "../Services/Utilities";
import { IconCheck, IconTrash, IconX } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../Slices/ProfileSlice";
import { notifications } from "@mantine/notifications";
import { updateProfile } from "../Services/ProfileService";

const CertiCard = (props: any) => {
    const profile = useSelector((state: any) => state.profile);
    const dispatch = useDispatch();

    const handleDelete = async () => {
        let certi = [...profile.certifications];
        certi.splice(props.index, 1);
        let updatedProfile = { ...profile, certifications: certi };
        try {
            await updateProfile(updatedProfile);
            dispatch(changeProfile(updatedProfile));
            notifications.show({
                title: 'Removed Successfully.',
                message: 'profile updated...',
                withCloseButton: true,
                icon: <IconCheck />,
                color: 'teal',
                withBorder: true,
                className: "!border-blue-500 !bg-blue-50 !text-blue-800 !shadow-lg !rounded-lg !p-4 !w-[400px]",
            })
        } catch (error) {
            console.error("Error updating profile:", error);
            notifications.show({
                title: "Error",
                message: "Failed to update profile.",
                icon: <IconX />,
                color: "red",
            });
        }


    }

    return <div className="flex justify-between">
        <div className="flex gap-2 items-center">
            <div className="p-2 bg-mine-shaft-800 rounded-md">
                <img className="h-12" src={`/CompanyLogo/${props.issuer}.png`} alt="" />
            </div>
            <div className="flex flex-col">
                <div className="font-medium text-xl max-[600px]:text-lg max-[500px]:text-base">{props.title}</div>
                <div className="text-sm max-[400px]:text-xs text-mine-shaft-300">{props.issuer}</div>
            </div>
        </div>
        <div className="flex items-center gap-3">
            <div className="flex flex-col items-end">
                <div className="text-sm max-[400px]:text-xs text-mine-shaft-300">{formatDate(props.issueDate)}</div>
                <div className="text-sm max-[400px]:text-xs text-mine-shaft-300">ID : {props.certificateId}</div>
            </div>
            {props.edit && <ActionIcon onClick={handleDelete} size="lg" color="red" variant="subtle">
                <IconTrash stroke={1.5} />
            </ActionIcon>}
        </div>

    </div>

}

export default CertiCard;