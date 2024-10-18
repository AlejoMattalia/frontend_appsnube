'use client'

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { SelectBrandComponent } from './SelectBrand';
import axios from 'axios';
import { useTokenFromCookies } from '@/app/hook/useGetToken';
import { useAppDispatch } from '@/app/redux/hook';
import { increment } from '@/app/redux/feature/updateComponent/updateComponentSlice';
import Toastify from "toastify-js";

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

export function ModalCreateProduct() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [brand, setBrand] = React.useState('')

  const token = useTokenFromCookies();
  const dispatch = useAppDispatch();


  const { handleChange, handleSubmit, values, errors, resetForm } = useFormik({
    initialValues: {
      name: "",
      price: null,
      description: "",
      stock: null,
      image_url: "",
      brand_id: ""
    },

    validationSchema: Yup.object({
      name: Yup.string().required("El nombre es obligatorio"),
      price: Yup.number().required("El precio es obligatorio"),
      description: Yup.string().required("La descripción es obligatoria"),
      stock: Yup.number().required("El stock es obligatorio"),
      image_url: Yup.string().required("La imagen es obligatoria"),
    }),
    onSubmit: async (values) => {

      try {
        values.brand_id = brand

        console.log(values)

        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}api/product/create_product`, values, {
          headers: {
            Authorization: `${token}`,
          }
        })

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
        console.log(err)
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
  })

  return (
    <div>
      <Button onClick={handleOpen} variant="contained" size='small'>Agregar producto</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Agregar producto
          </Typography>

          <form action="" onSubmit={handleSubmit} className='flex flex-col gap-3 mt-5'>

            <TextField id="outlined-basic" label="Nombre" variant="outlined" name='name' onChange={handleChange} value={values.name} error={!!errors.name} helperText={errors.name} />
            <TextField id="outlined-basic" label="Precio" variant="outlined" name='price' onChange={handleChange} value={values.price} error={!!errors.price} helperText={errors.price} type='number' />
            <TextField id="outlined-basic" label="Stock" variant="outlined" name='stock' onChange={handleChange} value={values.stock} error={!!errors.stock} helperText={errors.stock} type='number' />

            <SelectBrandComponent brand={brand} setBrand={setBrand} />
            <TextField id="outlined-basic" label="Imagen url" variant="outlined" name='image_url' onChange={handleChange} value={values.image_url} error={!!errors.image_url} helperText={errors.image_url} />

            <TextField id="outlined-multiline-static" label="Descripción" variant="outlined" name='description' onChange={handleChange} value={values.description} error={!!errors.description} helperText={errors.description} multiline rows={4} />

            <Button type='submit' variant="contained">Agregar producto</Button>
          </form>

        </Box>
      </Modal>
    </div>
  );
}
