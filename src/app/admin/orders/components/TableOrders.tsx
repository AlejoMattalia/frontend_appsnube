'use client'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import { useTokenFromCookies } from '@/app/hook/useGetToken';
import Toastify from "toastify-js";
import axios from 'axios';
import { ModalProducts } from './ModalProducts';

// Define the type for orders
interface Order {
    id: number;
    reference: string;
    user: {
        name: string;
        email: string;
    };
    total: number;
    orderItems: []; // or array if it's an array of products
}

export function TableOrders() {
    const token = useTokenFromCookies();
    const [orders, setOrders] = useState<Order[]>([]); // Use the Order[] type here

    useEffect(() => {
        const getOrders = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}api/order/list_orders`, {
                    headers: {
                        'Authorization': `${token}`
                    }
                });

                setOrders(res.data.orders);
            } catch (err) {
                if (err && typeof err === 'object' && 'response' in err && err.response && typeof err.response === 'object' && 'data' in err.response && err.response.data && typeof err.response.data === 'object' && 'message' in err.response.data) {
                    Toastify({
                        text: (err.response.data as { message: string }).message,
                        duration: 3000,
                        close: true,
                        gravity: "top",
                        position: "right",
                        stopOnFocus: true,
                        style: {
                            background: "red",
                        },
                    }).showToast();
                }
            }
        };

        if (token) {
            getOrders();
        }
    }, [token]);

    console.log(orders)

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Id</TableCell>
                        <TableCell align="center">Referencia</TableCell>
                        <TableCell align="center">Nombre</TableCell>
                        <TableCell align="center">Total</TableCell>
                        <TableCell align="center">Productos</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders.map((order) => (
                        <TableRow
                            key={order.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="center">{order.id}</TableCell>
                            <TableCell align="center">{order.reference}</TableCell>
                            <TableCell align="center">{order.user.name}</TableCell>
                            <TableCell align="center">${order.total}</TableCell>
                            <TableCell align="center"><ModalProducts products={order.orderItems} /></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
