import { talents } from "../Data/TalentData";
import TalentCard from "../FindTalent/TalentCard";

const CompanyEmployees = () => {
    return (
        <div className="mt-10 grid gap-5 grid-cols-2 max-[1000px]:grid-cols-2 max-[800px]:grid-cols-2 max-[600px]:grid-cols-1">
            {
                talents.map((talent, index) => <TalentCard key={index} {...talent} />
                )
            }
        </div>
    )
}

export default CompanyEmployees;