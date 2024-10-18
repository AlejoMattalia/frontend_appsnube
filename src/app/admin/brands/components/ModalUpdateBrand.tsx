'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import { useFormik } from 'formik';
import Toastify from "toastify-js";
import { useTokenFromCookies } from '@/app/hook/useGetToken';
import axios from 'axios';
import { useAppDispatch } from '@/app/redux/hook';
import { increment } from '@/app/redux/feature/updateComponent/updateComponentSlice';
import EditIcon from '@mui/icons-material/Edit';
import { Brand } from '@/app/interface/brands';

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

export function ModalUpdateBrands({brand}: {brand: Brand}) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        resetForm(); // Resetea el formulario al abrir
        setOpen(true);
    };
    const handleClose = () => setOpen(false);

    const token = useTokenFromCookies();
    const dispatch = useAppDispatch();

    const { handleChange, handleSubmit, values, errors, resetForm } = useFormik({
        initialValues: {
            name: brand.name,      // Valor inicial con brand.name
            logo_url: brand.logo_url, // Valor inicial con brand.logo_url
        },
        onSubmit: async (values) => {
            try {
                const res = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}api/brand/update_brand/${brand.id}`, values, {
                    headers: {
                        Authorization: `${token}`,
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
                resetForm();
                handleClose();
            }
            catch (err) {
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
    });

    // Efecto para actualizar los valores del formulario cuando cambia el brand
    React.useEffect(() => {
        if (open) {
            resetForm({ values: { name: brand.name, logo_url: brand.logo_url } });
        }
    }, [open, brand]);

    return (
        <div>
            <EditIcon color='primary' sx={{ cursor: 'pointer' }} onClick={handleOpen} />

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Editar marca {brand.name}
                    </Typography>

                    <form onSubmit={handleSubmit} className='flex flex-col gap-3 w-full mt-5'>
                        <TextField
                            id="outlined-basic"
                            label="Nombre"
                            variant="outlined"
                            name="name"
                            value={values.name}
                            onChange={handleChange}
                            error={!!errors.name}
                            helperText={errors.name}
                        />
                        <TextField
                            id="outlined-basic"
                            label="Logo url"
                            variant="outlined"
                            name="logo_url"
                            value={values.logo_url}
                            onChange={handleChange}
                            error={!!errors.logo_url}
                            helperText={errors.logo_url}
                        />
                        <Button type="submit" variant="contained">Editar marca</Button>
                    </form>

                </Box>
            </Modal>
        </div>
    );
}