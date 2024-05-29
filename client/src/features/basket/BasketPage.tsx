import BasketSummary from "./BasketSummary";
import { useAppSelector } from "../../app/store/configureStore";
import { Link } from "react-router-dom";
import BasketTable from "./BasketTable";

const BasketPage = () => {
  const { basket } = useAppSelector((state) => state.basket);

  if (!basket || basket!.items.length === 0)
    return (
      <div>
        <Link to="/">
          <div className="text-md mb-4 w-36  p-1 font-bold text-blue-500 lg:w-44 lg:text-xl">
            Back to catalog
          </div>
        </Link>
        <h1 className="mt-20 text-center text-xl font-bold lg:text-3xl">
          Your basket is empty
        </h1>
      </div>
    );

  return (
    <div className=" mx-auto lg:w-[70%]">
      <Link to="/">
        <div className="text-md mb-4 w-36  p-1 font-bold text-blue-500 lg:w-44 lg:text-xl">
          Back to catalog
        </div>
      </Link>
      <BasketTable items={basket!.items} />

      <BasketSummary />
    </div>
  );
};

export default BasketPage;
