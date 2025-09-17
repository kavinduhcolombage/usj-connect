import { useState } from "react";
import { searchFields } from "../Data/TalentData";
import { Button, Collapse, Input, RangeSlider } from "@mantine/core";
import MultiInput from "../FindJob/MultiInput";
import { IconUserCircle } from "@tabler/icons-react";
import { useDispatch } from "react-redux";
import { updateFilter } from "../Slices/FilterSlice";
import React from "react";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";

const SearchBar = () => {
    const [value, setValue] = useState<[number, number]>([0, 50]);
    const [name, setName] = useState('');
    const dispatch = useDispatch();
    const matches = useMediaQuery('(max-width: 500px)');
    const [opened, { toggle }] = useDisclosure(false);

    const handleChange = (name: any, event: any) => {
        if (name == "exp") dispatch(updateFilter({ exp: event }));
        else {
            dispatch(updateFilter({ name: event.target.value }));
            setName(event.target.value);
        }
    }

    return <>
        <div className="flex justify-end p-4">
            {
                matches && <Button className="!text-red-700 !border-red-700" onClick={toggle} radius="xl" variant="outline">{opened ? "Close" : "Filter"}</Button>
            }
        </div>

        <Collapse in={(opened || !matches)}>
            <div className="flex flex-wrap px-8 py-5 justify-start max-[1000px]:gap-y-4">
                <div className="flex items-center w-1/5 max-[1000px]:w-1/4 max-[900px]:w-1/3 max-[700px]:w-1/2">
                    <div className="text-yellow-400 bg-gray-400 rounded-full p-1 mr-2"><IconUserCircle size={20} /></div>
                    <Input defaultValue={name} onChange={(e) => handleChange("name", e)} className="[&_input]:!placeholder-gray-500" variant="unstyled" placeholder="Talent Name" />
                </div>
                {
                    searchFields.map((item, index) => {
                        return <React.Fragment key={index}>
                            <div className="w-1/5 max-[1000px]:w-1/4 max-[900px]:w-1/3 max-[700px]:w-1/2">
                                <MultiInput title={item.title} icon={item.icon} options={item.options} />
                            </div>
                        </React.Fragment>
                    })
                }
                <div className="w-1/5 max-[1000px]:w-1/4 max-[900px]:w-1/3 max-[700px]:w-full">
                    <div className="flex justify-between text-gray-500 text-sm">
                        <div>Expereiance (Year)</div>
                        <div>{value[0]} - {value[1]}</div>
                    </div>
                    <RangeSlider color="yellow" minRange={1} onChangeEnd={(e) => handleChange("exp", e)} size="xs" min={0} max={50} value={value} onChange={setValue} />
                </div>
            </div>
        </Collapse>

    </>
}

export default SearchBar;


