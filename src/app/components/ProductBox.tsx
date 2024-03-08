import Image from "next/image";
import { useCart } from "./CartContext";

interface ProductProps {
  label: string;
  collection: string;
  category: string;
  price: number;
  image: string;
}

const ProductBox: React.FC<ProductProps> = ({
  label,
  collection,
  category,
  price,
  image,
}) => {
  const { addToCart } = useCart();
  return (
    <div>
      <div className="flex flex-col items-center max-w-[400px]">
        <div className="group w-full relative h-80">
          <Image
            layout="fill"
            objectFit="cover"
            className="object-cover rounded transition group-hover:opacity-50"
            alt=""
            src={image}
          ></Image>
          <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() =>
                addToCart({ label, collection, category, price, image })
              }
            >
              Add to cart
            </button>
            <button>View Details</button>
          </div>
        </div>
        <div className="flex flex-col w-full">
          <div className="text-neutral-500 font-light text-lg">
            {collection}
          </div>
          <div className="text-rose-500 font-bold text-xl">{label}</div>

          <div className="text-neutral-800 text-lg font-bold">${price}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductBox;
