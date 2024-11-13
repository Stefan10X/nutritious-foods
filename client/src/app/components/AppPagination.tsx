/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pagination } from "flowbite-react";
import { MetaData } from "../models/pagination";
import { setPageNumber } from "../../features/catalog/catalogSlice";

interface Props {
  metaData: MetaData;
  onPageChange: (page: number) => void;
}

const AppPagination = ({ metaData, onPageChange }: Props) => {
  const { currentPage, totalCount, totalPages, pageSize } = metaData;

  function handlePageChange(page: number) {
    setPageNumber(page);
    onPageChange(page);
  }

  return (
    <div className=" flex flex-col items-center justify-between p-1 lg:flex-row lg:p-2">
      <div className="lg:p-2">
        Displaying {(currentPage - 1) * pageSize + 1}-
        {currentPage * pageSize > totalCount
          ? totalCount
          : currentPage * pageSize}{" "}
        of {totalCount} items
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => handlePageChange(page)}
        showIcons
      />
    </div>
  );
};

export default AppPagination;
