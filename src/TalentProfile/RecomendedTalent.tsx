import { useParams } from "react-router-dom";
import TalentCard from "../FindTalent/TalentCard";
import { useMediaQuery } from "@mantine/hooks";
import { Divider } from "@mantine/core";

const RecommendTalent = (props: any) => {
  const { id } = useParams();
  const matches = useMediaQuery('(max-width: 900px)');

  return <div className="w-2/6 max-[900px]:w-full">
    {matches && <Divider />}
    <div className="text-xl max-[450px]:text-lg font-semibold mb-5 max-[900px]:mt-3">Recommended Talent</div>
    <div className="grid gap-5 grid-cols-1 max-[900px]:grid-cols-3 max-[800px]:grid-cols-2 max-[600px]:grid-cols-1">
      {props?.talents.map((talent: any, index: any) => index < 4 && id != talent.id && <TalentCard key={index} {...talent} />)}
    </div>
  </div>;
}

export default RecommendTalent;