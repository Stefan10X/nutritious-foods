import { Link } from "react-router-dom";
import { currencyFormat } from "../../app/util/util";
import { useAppSelector } from "../../app/store/configureStore";

interface Props {
  subtotal?: number;
  isBasket?: boolean;
}

const BasketSummary = ({ subtotal, isBasket = true }: Props) => {
  const { basket } = useAppSelector((state) => state.basket);
  if (subtotal === undefined)
    subtotal =
      basket?.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      ) ?? 0;
  const deliveryFee = subtotal > 1500 ? 0 : 250;
  const total = subtotal + deliveryFee;

  return (
    <div className="flex justify-end ">
      <div className="flex w-[55%] flex-col bg-white text-sm shadow-lg lg:w-[45%] lg:text-lg">
        <div className="flex justify-between border-b p-2 lg:p-3">
          <div>Subtotal</div>
          <div>{currencyFormat(subtotal)}</div>
        </div>
        <div className="flex justify-between border-b p-2 lg:p-3">
          <div>Delivery fee</div>
          <div>{currencyFormat(deliveryFee)}</div>
        </div>
        <div className="flex justify-between border-b p-2 lg:p-3">
          <div>Total</div>
          <div>{currencyFormat(total)}</div>
        </div>

        <div className="p-2 lg:p-3">
          *Orders over €15 qualify for free delivery
        </div>
        {isBasket && (
          <Link to="/checkout">
            <button className="w-full rounded-md border-2 bg-blue-500 px-4 py-2 text-base font-bold text-white hover:bg-blue-600 disabled:bg-gray-500 dark:border-gray-600 dark:text-black">
              Checkout
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default BasketSummary;
