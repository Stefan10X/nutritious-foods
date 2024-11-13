import { BasketItem } from "../../app/models/basket";
import { Order } from "../../app/models/order";
import BasketSummary from "../basket/BasketSummary";
import BasketTable from "../basket/BasketTable";

interface Props {
  order: Order;
  setSelectedOrder: (id: number) => void;
}

export default function OrderDetailed({ order, setSelectedOrder }: Props) {
  const subtotal =
    order.orderItems.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0,
    ) ?? 0;
  return (
    <>
      <div className="mx-auto flex  justify-between lg:w-[70%]">
        <h1 className="text-xl font-bold lg:text-2xl ">
          Order# {order.id} - Completed
        </h1>

        <button
          onClick={() => setSelectedOrder(0)}
          className="text-md mb-4 w-36  p-1 font-bold text-blue-500 lg:w-44 lg:text-xl"
        >
          Back to orders
        </button>
      </div>

      <div className=" mx-auto lg:w-[70%]">
        <BasketTable
          items={order.orderItems as BasketItem[]}
          isBasket={false}
        />

        <BasketSummary subtotal={subtotal} isBasket={false} />
      </div>
    </>
  );
}
