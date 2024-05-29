import { useState } from "react";

interface Option {
  value: string;
  label: string;
}

interface Props {
  options: Option[];
  selectedValue: string;
  onChange: (value: string) => void;
}

const RadioButtonGroup: React.FC<Props> = ({
  options,
  selectedValue,
  onChange,
}) => {
  const [inverse, setInverse] = useState(true);

  const handleInvert = () => {
    setInverse(!inverse);

    const newValue = inverse
      ? selectedValue + "Desc"
      : selectedValue.replace("Desc", "");
    onChange(newValue);
  };

  return (
    <div className="flex flex-col rounded-lg border bg-white p-2 shadow-lg">
      {options.map(({ value, label }) => {
        const isChecked =
          value === selectedValue || value + "Desc" === selectedValue;

        return (
          <div
            className="flex items-center gap-3 p-[0.1rem] lg:p-2"
            key={value}
          >
            <input
              name="default-checkbox"
              type="checkbox"
              onChange={() => onChange(value)}
              value={value}
              checked={isChecked}
              className="h-5 w-5 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
            />
            <div className="flex w-56 justify-between">
              <div className="font-medium text-gray-600 dark:text-gray-300 lg:text-xl">
                {label}
              </div>
              <button onClick={handleInvert}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
                  />
                </svg>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RadioButtonGroup;
