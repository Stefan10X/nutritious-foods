import { Spinner } from "flowbite-react";
import { currencyFormat } from "../../app/util/util";
import { addBasketItemAsync, removeBasketItemAsync } from "./basketSlice";
import { BasketItem } from "../../app/models/basket";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";

interface Props {
  items: BasketItem[];
  isBasket?: boolean;
}

export default function BasketTable({ items, isBasket = true }: Props) {
  const { status } = useAppSelector((state) => state.basket);
  const dispatch = useAppDispatch();

  return (
    <table className="w-full text-left text-xs text-gray-500 shadow-md  lg:text-lg">
      <thead className=" bg-gray-50 uppercase text-gray-700 ">
        <tr>
          <th scope="col" className=" p-1 lg:w-1 lg:px-6 lg:py-3">
            Image
          </th>
          <th scope="col" className="w-[35%] p-1  lg:px-6 lg:py-3">
            Product name
          </th>
          <th scope="col" className="w-[10%] p-1  lg:px-6 lg:py-3">
            Price
          </th>
          <th scope="col" className="w-[10%] p-1 lg:px-6 lg:py-3">
            Quantity
          </th>
          <th scope="col" className="w-[10%] p-1  lg:py-3">
            Subtotal
          </th>
          {isBasket && <th scope="col" className="w-[5%] p-1 lg:py-3 "></th>}
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr
            key={item.productId}
            className="h-20 border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 odd:dark:bg-gray-900 even:dark:bg-gray-800"
          >
            <td className="p-1 lg:px-6 lg:py-4">
              <img src={item.pictureUrl} alt="thumbnail" className="w-64" />
            </td>
            <td
              scope="row"
              className="w-20 p-1 text-gray-900 dark:text-white  lg:px-6  lg:py-4"
            >
              {item.name}
            </td>

            <td className="p-1 lg:px-6 lg:py-4">
              {currencyFormat(item.price)}
            </td>

            <td className="p-1  lg:gap-2 lg:px-6 lg:py-4">
              <div className="flex w-20 items-center justify-center">
                {isBasket &&
                  (!(
                    status ===
                    "pendingRemoveItem" + item.productId + "rem"
                  ) ? (
                    <svg
                      onClick={() =>
                        dispatch(
                          removeBasketItemAsync({
                            productId: item.productId,
                            quantity: 1,
                            name: "rem",
                          }),
                        )
                      }
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-5 w-5 cursor-pointer fill-red-500 lg:h-6 lg:w-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.25 12a.75.75 0 0 1 .75-.75h14a.75.75 0 0 1 0 1.5H5a.75.75 0 0 1-.75-.75Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <Spinner className="w-5 lg:w-6" color="failure" size="sm" />
                  ))}

                <div className="w-4 text-center lg:w-5">{item.quantity}</div>

                {isBasket &&
                  (!(status === "pendingAddItem" + item.productId) ? (
                    <svg
                      onClick={() =>
                        dispatch(
                          addBasketItemAsync({ productId: item.productId }),
                        )
                      }
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-5 w-5 cursor-pointer fill-red-600 lg:h-6 lg:w-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <Spinner className="w-5 lg:w-6" color="failure" size="sm" />
                  ))}
              </div>
            </td>

            <td className="p-1 lg:px-6 lg:py-4">
              €{((item.price / 100) * item.quantity).toFixed(2)}
            </td>
            {isBasket && (
              <td className="p-1 lg:px-6 lg:py-4">
                {!(status === "pendingRemoveItem" + item.productId + "del") ? (
                  <svg
                    onClick={() =>
                      dispatch(
                        removeBasketItemAsync({
                          productId: item.productId,
                          quantity: item.quantity,
                          name: "del",
                        }),
                      )
                    }
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5 cursor-pointer fill-red-500 lg:h-6 lg:w-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <Spinner
                    className="mx-auto w-5 lg:w-6"
                    color="failure"
                    size="sm"
                  />
                )}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
