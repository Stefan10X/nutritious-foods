/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useAppDispatch } from "../../app/store/configureStore";
import { setProductParams } from "./catalogSlice";

const ProductSearch = () => {
  const dispatch = useAppDispatch();
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | undefined>();

  const debouncedSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;

    clearTimeout(timeoutId);

    const newTimeoutId = setTimeout(() => {
      dispatch(setProductParams({ searchTerm }));
    }, 1000);

    setTimeoutId(newTimeoutId);
  };

  return (
    <form className="mx-auto flex w-full items-center">
      <div className="relative w-full">
        <input
          type="text"
          id="simple-search"
          className="block w-full rounded-lg  border border-gray-300 bg-gray-50 p-2.5 ps-4 text-gray-900 placeholder:text-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white  dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 lg:ps-10 lg:text-lg xl:placeholder:text-lg"
          placeholder="Search foods"
          onChange={debouncedSearch}
        />
      </div>
    </form>
  );
};

export default ProductSearch;
