import { Button, Collapse, Divider, RangeSlider } from "@mantine/core";
import { dropdownData } from "../Data/JobsData";
import MultiInput from "./MultiInput";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateFilter } from "../Slices/FilterSlice";
import React from "react";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";

const SearchBar = () => {
    const matches = useMediaQuery('(max-width: 500px)');
    const [opened, { toggle }] = useDisclosure(false);
    const [value, setValue] = useState<[number, number]>([0, 1000000]);
    const dispatch = useDispatch();

    const handleChange = (event: any) => {
        dispatch(updateFilter({ salary: event }));
    }

    return <>
        <div className="flex justify-end p-4">
            {
                matches && <Button className="!text-red-700 !border-red-700" onClick={toggle} radius="xl" variant="outline">{opened ? "Close" : "Filter"}</Button>
            }
        </div>

        <Collapse in={(opened || !matches)}>
            {matches && <Divider />}
            <div className="flex px-8 py-5 flex-wrap max-[1000px]:gap-y-4 justify-start">
                {
                    dropdownData.map((item, index) => {
                        return <React.Fragment key={index}><div key={index} className="w-1/5 max-[1000px]:w-1/4 max-[900px]:w-1/3 max-[700px]:w-1/2">
                            <MultiInput {...item} />
                        </div></React.Fragment>
                    })
                }

                <div className="w-1/5 max-[1000px]:w-1/4 max-[900px]:w-1/3 max-[700px]:w-full">
                    <div className="flex justify-between text-gray-500 text-sm mb-1">
                        <div>Salary</div>
                        <div>Rs.{value[0]} - Rs.{value[1]}</div>
                    </div>
                    <RangeSlider color="yellow" min={0} max={1000000} onChangeEnd={handleChange} size="xs" value={value} step={1000} onChange={setValue} />
                </div>
            </div>
        </Collapse>
        <Divider />
    </>
}

export default SearchBar;