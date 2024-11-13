/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import LoadingComponent from "../../app/layout/LoadingComponent";
import { Spinner } from "flowbite-react";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import {
  addBasketItemAsync,
  removeBasketItemAsync,
} from "../basket/basketSlice";
import { fetchProductAsync, productSelectors } from "./catalogSlice";

const ProductDetails = () => {
  const { basket, status } = useAppSelector((state) => state.basket);
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const product = useAppSelector((state) =>
    productSelectors.selectById(state, parseInt(id!)),
  );
  const { status: productStatus } = useAppSelector((state) => state.catalog);
  const [quantity, setQuantity] = useState(0);
  const item = basket?.items.find((i) => i.productId === product?.id);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleInputChange(event: any) {
    if (event.target.value >= 0) {
      setQuantity(parseInt(event.target.value));
    }
  }

  function hanldeUpdateCart() {
    if (!item || quantity > item.quantity) {
      const updatedQuantity = item ? quantity - item.quantity : quantity;
      dispatch(
        addBasketItemAsync({
          productId: product?.id!,
          quantity: updatedQuantity,
        }),
      );
    } else {
      const updatedQuantity = item.quantity - quantity;
      dispatch(
        removeBasketItemAsync({
          productId: product?.id!,
          quantity: updatedQuantity,
        }),
      );
    }
  }

  useEffect(() => {
    if (item) setQuantity(item.quantity);
    if (!product && id) dispatch(fetchProductAsync(parseInt(id)));
  }, [id, item, dispatch, product]);

  if (productStatus.includes("pending"))
    return <LoadingComponent name="product" />;

  if (!product)
    return (
      <div>
        <Link to="/">
          <div className="text-md mb-4 w-36  p-1 font-bold text-blue-500 lg:w-44 lg:text-xl">
            Back to catalog
          </div>
        </Link>
        <h1 className="mt-20 text-center text-xl font-bold lg:text-3xl">
          Product not found
        </h1>
      </div>
    );

  return (
    <div className="mx-auto text-sm text-gray-800 lg:w-[45%] lg:text-lg">
      <div className="flex flex-col justify-center  gap-2 text-lg font-bold">
        <Link to="/">
          <div className="text-md w-36 p-1  font-bold text-blue-500 lg:w-44 lg:text-xl">
            Back to catalog
          </div>
        </Link>
        <div className="text-xl leading-10 lg:text-3xl">{product.name}</div>
        <img
          src={product.pictureUrl}
          alt="picture"
          className="w-80 lg:mt-4 lg:block lg:w-[620px]"
        />

        <div className="grid grid-cols-2  lg:w-[620px]">
          <div className="flex w-40 items-center justify-between gap-2 border-b-2 p-1 lg:w-[310px] lg:gap-20 lg:p-2">
            <div className="w-20 font-semibold text-gray-500 lg:w-24">
              Calories
            </div>
            <div>{product.calories}</div>
          </div>
          <div className="flex w-40 items-center justify-between gap-2 border-b-2 p-1 lg:w-[310px] lg:gap-20 lg:p-2">
            <div className="w-20 font-semibold text-gray-500 lg:w-24">
              Proteins
            </div>
            <div>{product.proteins}</div>
          </div>
          <div className="flex w-40 items-center justify-between gap-2 border-b-2 p-1 lg:w-[310px] lg:gap-20 lg:p-2">
            <div className="w-20 font-semibold text-gray-500 lg:w-24">
              Carbohidrates
            </div>
            <div>{product.carbohidrates}</div>
          </div>
          <div className="flex w-40 items-center justify-between gap-2 border-b-2 p-1 lg:w-[310px] lg:gap-20 lg:p-2">
            <div className="w-20 font-semibold text-gray-500 lg:w-24">Fats</div>
            <div>{product.fats}</div>
          </div>
          <div className="flex w-40 items-center justify-between gap-2 border-b-2 p-1 lg:w-[310px] lg:gap-20 lg:p-2">
            <div className="w-16 font-semibold text-gray-500 lg:w-24">
              Price
            </div>
            <div className="text-fuchsia-600">
              €{(product.price / 100).toFixed(2)}
            </div>
          </div>

          <div className="flex w-40 items-center justify-between gap-2 border-b-2 p-1 lg:w-[310px] lg:gap-20 lg:p-2">
            <div className="w-40 font-semibold text-gray-500 lg:w-24">
              Grams
            </div>
            <div>{product.grams}</div>
          </div>
          <div className="flex w-40 items-center justify-between gap-6 border-b-2 p-1 lg:w-[310px] lg:gap-20 lg:p-2">
            <div className="w-16 font-semibold text-gray-500 lg:w-24">Meat</div>
            <div>{product.meat}</div>
          </div>
          <div className="flex w-40  items-center justify-between gap-6 border-b-2 p-1 lg:w-[310px] lg:gap-20 lg:p-2">
            <div className="w-16 font-semibold text-gray-500 lg:w-24">
              Side Dish
            </div>
            <div>{product.sideDish}</div>
          </div>
        </div>

        <div className="flex w-80 items-center gap-6 border-b-2 p-1 text-sm lg:w-[620px] lg:gap-20 lg:p-2 lg:text-base">
          <div className="text-md w-16 font-semibold text-gray-500 lg:w-24 lg:text-lg">
            Ingredients
          </div>
          <div>{product.ingredients}</div>
        </div>

        <div className="flex gap-4">
          <input
            type="number"
            className=" w-24 rounded-md border-2 border-gray-200 text-base font-normal placeholder:text-xs lg:w-32 lg:text-xl"
            placeholder="Add item"
            value={quantity}
            onChange={handleInputChange}
          />
          <button
            disabled={item?.quantity === quantity || (!item && quantity === 0)}
            onClick={hanldeUpdateCart}
            className=" w-56 rounded-md border-2 bg-blue-500 px-4 py-2 text-base text-white  hover:bg-blue-600 disabled:bg-gray-500 dark:border-gray-600 lg:h-14 lg:w-52 lg:text-xl"
          >
            <div className="flex justify-center gap-2">
              {status.includes("pending") && <Spinner size="sm" />}
              {status.includes("pending")
                ? item
                  ? "Updating"
                  : "Adding"
                : item
                  ? "Update Quantity"
                  : "Add to cart"}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
