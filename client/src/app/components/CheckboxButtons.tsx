import { useState } from "react";

interface Props {
  items: string[];
  checked?: string[];
  onChange: (items: string[]) => void;
}

const CheckboxButtons = ({ items, checked, onChange }: Props) => {
  const [checkedItems, setCheckedItems] = useState(checked || []);

  function handleChecked(value: string) {
    const currentIndex = checkedItems.findIndex((item) => item === value);
    let newChecked: string[] = [];
    if (currentIndex === -1) newChecked = [...checkedItems, value];
    else newChecked = checkedItems.filter((item) => item !== value);
    setCheckedItems(newChecked);
    onChange(newChecked);
  }

  return (
    <div className="flex flex-col rounded-lg border bg-white p-2 shadow-lg">
      {items.map((item) => (
        <div className="flex items-center gap-3 p-[0.1rem] lg:p-2" key={item}>
          <input
            name="default-checkbox"
            type="checkbox"
            checked={checkedItems.includes(item)}
            onChange={() => handleChecked(item)}
            className="h-5 w-5 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
          />
          <div className="font-medium text-gray-600 dark:text-gray-300 lg:text-xl">
            {item}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CheckboxButtons;
