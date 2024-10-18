
import { createSlice } from '@reduxjs/toolkit'
import Toastify from "toastify-js";

export interface ProductWithQuantity {
    quantity: number;
    product_id: number;
    price: number;
    name: string;
    image_url: string;
    stock: number
}

export interface cartState {
    value: ProductWithQuantity[]; // Cambiar a la nueva interfaz que incluye quantity
}

const initialState: cartState = {
    value: []
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const existingProduct = state.value.find(item => item.product_id === action.payload.id);

            if (existingProduct) {
                // Calcula la nueva cantidad
                const newQuantity = existingProduct.quantity + action.payload.quantity;

                // Verifica que no exceda el stock
                if (newQuantity > existingProduct.stock) {
                    existingProduct.quantity = +existingProduct.stock; // Limita al stock máximo

                    Toastify({
                        text: "Stock no disponible",
                        duration: 3000,
                        close: true,
                        gravity: "top",
                        position: "right",
                        stopOnFocus: true,
                        style: {
                            background: "red",
                        },
                    }).showToast();
                } else {
                    existingProduct.quantity = newQuantity;

                    Toastify({
                        text: "Modificaste la cantidad",
                        duration: 3000,
                        close: true,
                        gravity: "top",
                        position: "right",
                        stopOnFocus: true,
                        style: {
                            background: "#25D366",
                        },
                    }).showToast();
                }
            } else {
                // Si no existe en el carrito, verifica que la cantidad no exceda el stock
                const quantityToAdd = action.payload.quantity > action.payload.stock ? action.payload.stock : action.payload.quantity;
                state.value.push({ ...action.payload, quantity: quantityToAdd });

                Toastify({
                    text: "Agregado al carrito",
                    duration: 3000,
                    close: true,
                    gravity: "top",
                    position: "right",
                    stopOnFocus: true,
                    style: {
                        background: "#25D366",
                    },
                }).showToast();
            }
        },
        removeFromCart: (state, action) => {
            // Elimina un solo producto según el ID
            state.value = state.value.filter((item) => item.product_id !== action.payload);
        },
        clearCart: (state) => {
            // Elimina todos los productos del carrito
            state.value = [];
        }
    },
})

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions
export default cartSlice.reducer
