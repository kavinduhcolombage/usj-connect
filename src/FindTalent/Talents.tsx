import { useEffect, useRef, useState } from "react";
import Sort from "../FindJob/Sort";
import TalentCard from "./TalentCard";
import { getAllProfile } from "../Services/ProfileService";
import { useDispatch, useSelector } from "react-redux";
import { resetFilter } from "../Slices/FilterSlice";
import { LoadingOverlay } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconX } from "@tabler/icons-react";


const Talents = () => {
    const [talents, setTalents] = useState<any>([]);
    const filter = useSelector((state: any) => state.filter);
    const sort = useSelector((state: any) => state.sort);
    const [filteredTalents, setFilteredTalents] = useState<any>([]);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const user = useSelector((state: any) => state.user);
    const notificationShown = useRef(false);

    useEffect(() => {
        dispatch(resetFilter());
        setLoading(true);
        if (user) {
            getAllProfile().then((res) => {
                setTalents(res);
            }).catch((err) => {
                console.log(err);
            }).finally(() => {
                setLoading(false);
            });
        } else {
            setLoading(false);
            if (!notificationShown.current) {
                notifications.show({
                    position: 'top-center',
                    withCloseButton: true,
                    autoClose: 5000,
                    title: "Need to Login",
                    message: 'Please log in to access this feature.',
                    color: 'blue',
                    icon: <IconX />,
                    className: 'my-notification-class',
                    loading: false,
                });
                notificationShown.current = true;
            }
        }

    }, []);

    useEffect(() => {
        if (sort == "Experience(low to high)") {
            setTalents([...talents].sort((a: any, b: any) => a.totalExp - b.totalExp));
        }
        else if (sort == "Experience(high to low)") {
            setTalents([...talents].sort((a: any, b: any) => b.totalExp - a.totalExp));
        }
    }, [sort]);

    useEffect(() => {
        console.log("talents", talents);
        let filterTalent = talents;

        if (filter.name) filterTalent = filterTalent.filter((talent: any) => talent.name.toLowerCase().includes(filter.name.toLowerCase()));

        if (filter["Job Title"] && filter["Job Title"].length > 0) {
            filterTalent = filterTalent.filter((talent: any) => filter["Job Title"]?.some((title: any) => talent.jobTitle?.toLowerCase().includes(title.toLowerCase())));
        }

        if (filter.Location && filter.Location.length > 0) {
            filterTalent = filterTalent.filter((talent: any) => filter.Location?.some((location: any) =>
                talent.location?.toLowerCase().includes(location.toLowerCase())));
        }

        if (filter.Skills && filter.Skills.length > 0) {
            filterTalent = filterTalent.filter((talent: any) => filter.Skills?.some((skill: any) => talent.skills?.some((talentSkill: any) => talentSkill.toLowerCase().includes(skill.toLowerCase()))));
        }

        if (filter.exp && filter.exp.length > 0) {
            filterTalent = filterTalent.filter((talent: any) => filter.exp[0] <= talent.totalExp && talent.totalExp <= filter.exp[1]);
        }

        setFilteredTalents(filterTalent);
    }, [filter, talents]);

    return <div className="p-5 relative">
        <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} loaderProps={{ color: "blue", type: "bars" }} />
        <div className="flex justify-between">
            <div className="text-2xl font-semibold max-[500px]:text-xl">Talents</div>
            <Sort />
        </div>
        <div className="mt-10 grid gap-5 grid-cols-4 max-[1000px]:grid-cols-3 max-[800px]:grid-cols-2 max-[600px]:grid-cols-1">
            {
                filteredTalents?.length ? filteredTalents.map((talent: any, index: any) => <TalentCard key={index} {...talent} />) : <div className="text-2xl font-semibold">No Talent Found</div>
            }
        </div>


    </div>
}

export default Talents;