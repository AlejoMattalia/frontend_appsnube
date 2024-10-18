'use client';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';
import { clearCart, removeFromCart } from '../redux/feature/cart/cartSlice';
import { ModalConfirmBuy } from './ModalConfirmBuy';

const Cart = ({ isOpen }: { isOpen: boolean }) => {
    const cart = useAppSelector((state) => state.cart.value);
    const dispatch = useAppDispatch();


    return (
        <section
            style={{ height: "calc(100vh - 64px)" }}
            className={`fixed bottom-0 right-0 w-full  max-w-96 bg-darkGray z-30 transition-transform duration-1000 ease-in-out transform ${isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
        >
            <div className="w-full h-full flex flex-col items-start justify-between">
                <h1 className="text-white p-4 text-2xl font-bold">Carrito</h1>

                <main className='w-full h-[90vh] overflow-y-auto flex flex-col gap-5 p-3'>

                    {cart.length > 0 &&
                        cart.map((product) => (

                            <main key={product.product_id} className='w-full h-28 flex'>
                                <div className='w-full max-w-[120px] h-full '>
                                    <img src={product.image_url} alt="" className='w-full h-full object-cover' />
                                </div>

                                <section className='px-3 w-full flex flex-col items-start justify-between gap-'>
                                    <div className='w-full flex items-start justify-between gap-3'>
                                        <h3 className="text-sm">{product.name}</h3>
                                        <DeleteIcon color='error' onClick={() => dispatch(removeFromCart(product.product_id))} sx={{ cursor: "pointer" }}/>
                                    </div>

                                    <div>
                                        <p className='text-xs'><span className='font-bold'>Precio:</span> ${product.price}</p>
                                        <p className='text-xs'><span className='font-bold'>Cantidad:</span> {product.quantity}</p>
                                        <p className='text-xs'><span className='font-bold'>Total:</span> ${product.price * product.quantity}</p>
                                    </div>
                                </section>
                            </main>

                        ))}

                </main>

                <div className='w-full p-3 flex flex-col gap-3 pb-10'>
                    <p className='text-white text-lg font-bold'>Total: <span className='font-normal'>${cart.reduce((total, product) => total + product.price * product.quantity, 0)}</span></p>
                    <Button variant="outlined" color="error" size='small' fullWidth onClick={() => dispatch(clearCart())}>Vaciar carrito</Button>
                        <ModalConfirmBuy />
                </div>

            </div>
        </section>
    );
}

export default Cart;
