import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import { useFormik } from 'formik';
import { SelectBrandComponent } from './SelectBrand';
import axios from 'axios';
import { useTokenFromCookies } from '@/app/hook/useGetToken';
import { useAppDispatch } from '@/app/redux/hook';
import { increment } from '@/app/redux/feature/updateComponent/updateComponentSlice';
import Toastify from "toastify-js";
import { Product } from '@/app/interface/products';
import EditIcon from '@mui/icons-material/Edit';

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

export function ModalUpdateProduct({ product }: { product: Product }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
    resetForm(); // Resetear el formulario cuando se abre el modal
  };
  const handleClose = () => setOpen(false);

  // Convierte product.brand_id a string al inicializar el estado
  const [brand, setBrand] = React.useState<string>(String(product.brand_id)); // Setea el brand id inicial

  const token = useTokenFromCookies();
  const dispatch = useAppDispatch();

  const { handleChange, handleSubmit, values, errors, resetForm } = useFormik({
    initialValues: {
      name: product.name || "", // Inicializa con el nombre del producto
      price: product.price || null, // Inicializa con el precio del producto
      description: product.description || "", // Inicializa con la descripción del producto
      stock: product.stock || null, // Inicializa con el stock del producto
      image_url: product.image_url || "", // Inicializa con la imagen del producto
    },
    onSubmit: async (values) => {
      try {
        const newValues = {
          name: values.name,
          price: values.price,
          description: values.description,
          stock: values.stock,
          image_url: values.image_url,
          brand_id: +brand,
        }
        const res = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}api/product/update_product/${product.id}`, newValues, {
          headers: {
            Authorization: `${token}`,
          },
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
        resetForm(); // Reinicia el formulario después de enviar
        handleClose();

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
    },
  });

  // Actualiza los valores cuando se abre el modal
  React.useEffect(() => {
    if (open) {
      resetForm({
        values: {
          name: product.name || "",
          price: product.price || null,
          description: product.description || "",
          stock: product.stock || null,
          image_url: product.image_url || "",
        },
      });
      setBrand(String(product.brand_id) || ""); // Convierte a string
    }
  }, [open, product]);

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
            Actualizar producto
          </Typography>

          <form action="" onSubmit={handleSubmit} className='flex flex-col gap-3 mt-5'>
            <TextField id="outlined-basic" label="Nombre" variant="outlined" name='name' onChange={handleChange} value={values.name} error={!!errors.name} helperText={errors.name} />
            <TextField id="outlined-basic" label="Precio" variant="outlined" name='price' onChange={handleChange} value={values.price} error={!!errors.price} helperText={errors.price} type='number' />
            <TextField id="outlined-basic" label="Stock" variant="outlined" name='stock' onChange={handleChange} value={values.stock} error={!!errors.stock} helperText={errors.stock} type='number' />

            <SelectBrandComponent brand={brand} setBrand={setBrand} />
            <TextField id="outlined-basic" label="Imagen url" variant="outlined" name='image_url' onChange={handleChange} value={values.image_url} error={!!errors.image_url} helperText={errors.image_url} />

            <TextField id="outlined-multiline-static" label="Descripción" variant="outlined" name='description' onChange={handleChange} value={values.description} error={!!errors.description} helperText={errors.description} multiline rows={4} />

            <Button type='submit' variant="contained">Actualizar producto</Button>
          </form>

        </Box>
      </Modal>
    </div>
  );
}
