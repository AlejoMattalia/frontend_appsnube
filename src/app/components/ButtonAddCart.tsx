import React from 'react'
import { Product } from '../interface/products'
import { useAppDispatch } from '../redux/hook'
import { addToCart } from '../redux/feature/cart/cartSlice'

export const ButtonAddCart = ({ product, mt, quantity}: { product: Product, mt?: string, quantity: number }) => {

    const dispatch = useAppDispatch()

    const handleAddToCart = () => {
        const data = {
            product_id: product.id,
            price: product.price,
            name: product.name,
            image_url: product.image_url,
            stock: product.stock,
            quantity
        }

        if(quantity > 0 && product) {
            dispatch(addToCart(data))            
        }
    }

    return (
        <div>
            <button className={`text-lg font-bold text-darkGray bg-white p-1 rounded-md w-full md:max-w-80 cursor-pointer ${mt}`} onClick={handleAddToCart}>
                Agregar al carrito
            </button>
        </div>
    )
}
