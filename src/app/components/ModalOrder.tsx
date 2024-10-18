import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { clearCart } from '../redux/feature/cart/cartSlice';
import { useAppDispatch } from '../redux/hook';
import { increment } from '../redux/feature/updateComponent/updateComponentSlice';

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


interface Props {
    code: string,
    openModalOrder: boolean,
    setOpenModalOrder: React.Dispatch<React.SetStateAction<boolean>>
    setOpenModalConfirmBuy: React.Dispatch<React.SetStateAction<boolean>>
}

export function ModalOrder({ code, openModalOrder, setOpenModalOrder, setOpenModalConfirmBuy }: Props) {

    const dispatch = useAppDispatch();
    const handleClose = () => {
        setOpenModalOrder(false)
        setOpenModalConfirmBuy(false)
        dispatch(clearCart());
        dispatch(increment());
    };



    return (
        <div>
            <Modal
                open={openModalOrder}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Orden
                    </Typography>
                    Código de la orden: {code}
                </Box>
            </Modal>
        </div>
    );
}
