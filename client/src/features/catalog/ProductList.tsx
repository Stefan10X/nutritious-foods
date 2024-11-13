import { Product } from "../../app/models/product";
import { useAppSelector } from "../../app/store/configureStore";

import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";

interface Props {
  products: Product[];
}

const ProductList = ({ products }: Props) => {
  const { productsLoaded } = useAppSelector((state) => state.catalog);
  return (
    <div
      className="mx-auto grid w-[85%] grid-cols-1 justify-items-center gap-4 
    md:grid-cols-2 md:gap-6 2xl:grid-cols-3"
    >
      {products.map((product) => (
        <div key={product.id}>
          {!productsLoaded ? (
            <ProductCardSkeleton />
          ) : (
            <ProductCard key={product.id} product={product} />
          )}
        </div>
      ))}
    </div>
  );
};

export default ProductList;
