import { ActionIcon } from "@mantine/core";
import { IconExternalLink } from "@tabler/icons-react";

const CompanyCard = (props:any) => {
    return <div>
        <div className="flex justify-between items-center rounded-lg p-2">
            <div className="flex gap-3 items-center">
                <div className="p-2 bg-gray-300 rounded-md">
                    <img className="h-7" src={`/CompanyLogo/${props.name}.png`} alt="Company Logo" />
                </div>
                <div>
                    <div className="font-semibold">{props.name}</div>
                    <div className="text-sm">{props.employees} Employees</div>
                </div>
            </div>
            <ActionIcon color='blue' variant='subtle'>
            <IconExternalLink />
          </ActionIcon>
        </div>
    </div>
}

export default CompanyCard;