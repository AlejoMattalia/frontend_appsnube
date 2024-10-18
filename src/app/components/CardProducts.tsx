import { Product } from "../interface/products";
import React, { useState } from "react";
import { ModalProductDetail } from "./ModalProductDetail";
import { ButtonAddCart } from "./ButtonAddCart";
import { QuantitySelect } from "./QuantitySelect"; // Importa el nuevo componente

export const CardProducts = ({ product }: { product: Product }) => {
  const [quantity, setQuantity] = useState<number>(1);

  return (
    <article className="w-full max-w-[300px] h-[550px] p-3 flex flex-col gap-3 bg-darkGray rounded-xl transition-all duration-500">
      <div className="w-full h-full max-h-[300px] overflow-hidden">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover rounded-xl transform transition-transform duration-500 hover:scale-110"
        />
      </div>

      <div className="w-full">
        <h3 className="font-bold h-[50px]">{product.name}</h3>

        <div className="flex items-center justify-between mt-5 mb-8 w-full">
          <p className="text-2xl font-bold">${product.price}</p>

          {/* Usar el componente QuantitySelect */}
          <QuantitySelect quantity={quantity} setQuantity={setQuantity} stock={+product.stock} />
        </div>

        <ModalProductDetail product={product}/>     
        <ButtonAddCart product={product} mt="mt-2" quantity={quantity}/>
      </div>
    </article>
  );
};
