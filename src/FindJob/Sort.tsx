import { useState } from 'react';
import { ActionIcon, Combobox, useCombobox } from '@mantine/core';
import { IconAdjustments } from '@tabler/icons-react';
import { useDispatch } from 'react-redux';
import { updateSort } from '../Slices/SortSlice';

const opt = ['Relevance', 'Most Recent', 'Salary(low to high)', 'Salary(high to low)'];
const talentSort = ['Relevance', 'Experience(low to high)', 'Experience(high to low)'];

const Sort = (props: any) => {
  const dispatch = useDispatch();
  const [selectedItem, setSelectedItem] = useState<string | null>('Relevance');
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const options = props.sort == "job" ? opt.map((item) => (
    <Combobox.Option className='!text-md' value={item} key={item}>
      {item}
    </Combobox.Option>
  )) : talentSort.map((item) => (
    <Combobox.Option className='!text-xs' value={item} key={item}>
      {item}
    </Combobox.Option>
  ))

  return (
    <Combobox
      store={combobox}
      width={200}
      position="bottom-start"
      onOptionSubmit={(val) => {
        setSelectedItem(val);
        dispatch(updateSort(val));
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>

        <div onClick={() => combobox.toggleDropdown()} className='cursor-pointer border border-red-800 flex items-center px-2 py-1 rounded-lg gap-2 text-base max-[500px]:text-sm max-[500px]:px-1 max-[500px]:py-0'>
          {selectedItem}<ActionIcon color='blue' variant='transparent' aria-label='Settings'>
            <IconAdjustments color='red' style={{ width: '70%', height: '70%' }} stroke={1.5} />
          </ActionIcon>
        </div>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>{options}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
export default Sort;