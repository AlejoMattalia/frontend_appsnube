// NavBar.tsx
'use client';

import React, { useEffect, useState } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useRouter } from 'next/navigation';
import { Badge, BadgeProps, IconButton, styled } from '@mui/material';
import Cart from './Cart';
import { useAppSelector } from '../redux/hook';

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}));

export const NavBar = () => {
    const router = useRouter();
    const [openCart, setOpenCart] = useState(false);

 

    useEffect(() => {
        if (openCart) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [openCart]);

    const cart = useAppSelector((state) => state.cart.value);


    return (
        <>
            <nav className='w-full h-16 bg-darkGray flex items-center justify-between p-5 gap-5 z-40'> {/* Added z-40 */}
                <p className='font-bold text-lg cursor-pointer' onClick={() => router.push('/')}>Productos</p>
                <div className='flex items-center gap-5'>
                    <p className='ml-4 text-white cursor-pointer' onClick={() => router.push('/admin')}>Administrador</p>
                    <IconButton aria-label="cart" onClick={() => setOpenCart(!openCart)}>
                        <StyledBadge badgeContent={cart.length} color="primary">
                            <ShoppingCartIcon color='primary' />
                        </StyledBadge>
                    </IconButton>
                </div>
            </nav>
            
            {/* Overlay div */}
            {openCart && (
                <div
                    onClick={() => setOpenCart(false)} // Close cart on click
                    style={{ height: "calc(100vh - 64px)" }}
                    className="fixed  w-screen bottom-0 left-0 bg-black opacity-90 z-30" // Changed z-index to 30
                />
            )}
            
            <Cart isOpen={openCart} />
        </>
    );
}
