import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button } from '@mui/material';
import { useAppSelector } from '../redux/hook';
import axios from 'axios';
import Toastify from "toastify-js";
import { ModalOrder } from './ModalOrder';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "100%",
    maxWidth: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    maxHeight: "90vh",
    overflow: "auto"
};

export function ModalConfirmBuy() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const user = useAppSelector((state) => state.user);
    const cart = useAppSelector((state) => state.cart.value)

    const [openModalOrder, setOpenModalOrder] = React.useState(false);
    const [code, setCode] = React.useState('');

    const buyProduct = async () => {
        try {
            const data = {
                user_id: user.id,
                products: cart,
                total: cart.reduce((acc, cur) => acc + cur.price * cur.quantity, 0)
            };

            // Crear la orden
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}api/order/create_order`, data);

            // Actualizar el stock de cada producto en el carrito
            const updateStockPromises = cart.map(async (product) => {
                const newStock = product.stock - product.quantity; // Restar la cantidad comprada al stock actual
                return await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}api/product/update_stock/${product.product_id}`, { stock: newStock });
            });

            // Esperar a que todas las actualizaciones de stock se completen
            await Promise.all(updateStockPromises);

            Toastify({
                text: res.data.message,
                duration: 3000,
                close: true,
                gravity: "top",
                position: "right",
                stopOnFocus: true,
                style: {
                    background: "#25D366",
                },
            }).showToast();

            // Guardar el código de referencia de la orden y abrir el modal de confirmación
            setCode(res.data.order.reference);
            setOpenModalOrder(true);


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
    }

    return (
        <div>
            <Button variant="contained" fullWidth onClick={handleOpen}>Comprar</Button>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        ¿Confirmar compra?
                    </Typography>
                    <div className='flex items-center gap-3 mt-5'>
                        <Button variant='outlined' fullWidth onClick={() => setOpen(false)}>Cancelar</Button>
                        <Button variant='contained' fullWidth onClick={buyProduct}>compra</Button>
                    </div>
                </Box>
            </Modal>

            <ModalOrder code={code} openModalOrder={openModalOrder} setOpenModalOrder={setOpenModalOrder} setOpenModalConfirmBuy={setOpen} />
        </div>
    );
}
