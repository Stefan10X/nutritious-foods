import ProductList from "./ProductList";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { setPageNumber, setProductParams } from "./catalogSlice";
import ProductSearch from "./ProductSearch";
import RadioButtonGroup from "../../app/components/RadioButtonGroup";
import CheckboxButtons from "../../app/components/CheckboxButtons";
import AppPagination from "../../app/components/AppPagination";
import useProducts from "../../app/hooks/useProducts";

const Catalog = () => {
  const { products, meats, sideDishes, filtersLoaded, metaData } =
    useProducts();

  const { productParams } = useAppSelector((state) => state.catalog);

  const dispatch = useAppDispatch();

  const handlePageClick = () => {
    window.scrollTo(0, 0);
  };

  if (!filtersLoaded) return <LoadingComponent name="catalog" />;

  const onPageChange = (page: number) => {
    dispatch(setPageNumber({ pageNumber: page }));
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between gap-7 lg:gap-0">
        <div className="sticky top-20 z-10 flex h-[70%] w-[40%] flex-col gap-6 lg:relative lg:top-0 lg:w-[20%] lg:gap-10">
          <ProductSearch />
          <RadioButtonGroup
            selectedValue={productParams.orderBy}
            onChange={(value) => dispatch(setProductParams({ orderBy: value }))}
            options={[
              { value: "name", label: "Name" },
              { value: "price", label: "Price" },
              { value: "calories", label: "Calories" },
              { value: "proteins", label: "Proteins" },
            ]}
          />
          <CheckboxButtons
            items={meats}
            checked={productParams.meats}
            onChange={(items: string[]) =>
              dispatch(setProductParams({ meats: items }))
            }
          />

          <CheckboxButtons
            items={sideDishes}
            checked={productParams.sideDishes}
            onChange={(items: string[]) =>
              dispatch(setProductParams({ sideDishes: items }))
            }
          />
        </div>
        <div className="flex w-[80%] flex-col justify-between">
          <ProductList products={products} />
        </div>
      </div>
      <div
        className="sticky bottom-0 z-0  border-t bg-gray-100"
        onClick={() => handlePageClick()}
      >
        {metaData && (
          <AppPagination metaData={metaData} onPageChange={onPageChange} />
        )}
      </div>
    </div>
  );
};

export default Catalog;
