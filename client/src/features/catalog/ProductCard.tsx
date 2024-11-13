import { Link } from "react-router-dom";
import { Product } from "../../app/models/product";
import { Spinner } from "flowbite-react";
import { currencyFormat } from "../../app/util/util";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync } from "../basket/basketSlice";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const { status } = useAppSelector((state) => state.basket);
  const dispatch = useAppDispatch();

  return (
    <div className="flex h-80 w-48 flex-col gap-1  rounded-lg border border-gray-200 p-2 shadow-lg lg:h-[370px] lg:w-80 lg:gap-4 lg:text-xl">
      <div className="flex h-16 items-center self-center text-base font-bold text-blue-700 lg:h-10 lg:text-lg">
        {product.name}
      </div>

      <img
        src={product.pictureUrl}
        alt="avatar"
        className="h-24 w-full lg:h-40"
      />

      <div className="px-3 lg:px-6">
        <div className="text-xl font-semibold text-fuchsia-600 lg:text-2xl">
          {currencyFormat(product.price)}
        </div>
        <div className="text-base text-gray-500">
          {product.calories} Kcal / {product.proteins} g protein
        </div>

        <div className="mt-2 flex justify-between">
          <button
            className="h-10 rounded-md border-2 bg-blue-500 px-2 py-1 text-sm text-white hover:bg-blue-600 dark:border-gray-600 dark:text-black lg:h-12 lg:px-4 lg:py-2 lg:text-base"
            onClick={() =>
              dispatch(addBasketItemAsync({ productId: product.id }))
            }
          >
            <div className="flex justify-center gap-2">
              {status === "pendingAddItem" + product.id && (
                <Spinner size="sm" />
              )}
              {status === "pendingAddItem" + product.id
                ? "Adding"
                : "Add to cart"}
            </div>
          </button>

          <Link to={`/${product.id}`}>
            <button className="h-10 rounded-md border-2 bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600 dark:border-gray-600 dark:text-black lg:h-12 lg:text-base">
              View
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
