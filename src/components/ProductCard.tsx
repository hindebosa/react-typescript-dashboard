import React, { PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";
import { Product } from "../types";

interface ProductCardProps {
  currentColor: string;
  product: Product;
}

const ProductCard: React.FC<PropsWithChildren<ProductCardProps>> = ({
  currentColor,
  product,
}) => {
  const navigate = useNavigate();

  return (
    <div
      className="md:w-full overflow-auto cursor-pointer"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <div
        className=" rounded-2xl md:w-400 p-4 m-3"
        style={{ backgroundColor: currentColor }}
      >
        <div className="flex justify-between items-center ">
          <p className="font-semibold text-white text-2xl">{product.name}</p>
          <div>
            <p className="text-2xl text-white font-semibold mt-8">
              ${product.amount}
            </p>
            <p className="text-gray-200">Price per 1000kgs</p>
          </div>
        </div>
        <div className="flex justify-between items-center ">
          <div>
            <p className="text-gray-200">Adress</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
