import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';
import { useTokenFromCookies } from '@/app/hook/useGetToken';
import { useAppDispatch } from '@/app/redux/hook';
import axios from 'axios';
import Toastify from "toastify-js";
import { increment } from '@/app/redux/feature/updateComponent/updateComponentSlice';

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

export function ModalDeleteProduct({ id }: { id: number }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const token = useTokenFromCookies();
    const dispatch = useAppDispatch();

    const deleteBrand = async () => {
        try {
            const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}api/product/delete_product/${id}`, {
                headers: {
                    Authorization: `${token}`
                }
            });

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

            dispatch(increment());
            setOpen(false);
        } catch (err) {
            console.log(err);
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
            <DeleteIcon color='error' sx={{ cursor: 'pointer' }} onClick={handleOpen} />
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Eliminar producto
                    </Typography>
                    <div className='flex items-center gap-3 mt-5'>
                        <Button variant='contained' fullWidth onClick={() => setOpen(false)}>Cancelar</Button>
                        <Button color="error" variant='outlined' fullWidth onClick={deleteBrand}>Eliminar</Button>
                    </div>

                </Box>
            </Modal>
        </div>
    );
}
