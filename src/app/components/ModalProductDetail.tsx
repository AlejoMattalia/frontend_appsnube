import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Product } from '../interface/products';
import CloseIcon from '@mui/icons-material/Close';
import { ButtonAddCart } from './ButtonAddCart';
import { QuantitySelect } from './QuantitySelect';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "90%",
    height: "90%",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    overflow: "auto",
};

export function ModalProductDetail({ product }: { product: Product }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [quantity, setQuantity] = React.useState<number>(1);


    return (
        <div>
            <Button variant="outlined" size="small" fullWidth onClick={handleOpen}>Ver mas</Button>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className='absolute top-3 right-3'>
                        <CloseIcon onClick={handleClose} sx={{ cursor: "pointer", fontSize: "30px" }} />
                    </div>
                    <section className='w-full flex flex-col md:flex-row justify-center items-center md:items-start gap-10'>
                        <img src={product.image_url} alt="" className='w-full md:max-w-[50%] mt-5 md:mt-0 border' />

                        <div className='w-full md:max-w-[50%] md:mt-8'>

                            <div className='flex items-center justify-between gap-5 mb-10'>
                                <h1 className='font-bold text-2xl '>{product.name}</h1>
                                <img src={product.brand?.logo_url} alt="Marca" className='w-[50px]' />
                            </div>
                            <p className=' font-bold mb-1'>Descripción:</p>
                            <p className='text-sm'>{product.description}</p>


                            <p className='font-bold mt-10 text-4xl'>${product.price}</p>
                            <p className='font-bold mt-2 text-lg'>Stock: <span className='font-normal'>{product.stock}</span></p>

                            <div className='mt-10'>
                                <QuantitySelect quantity={quantity} setQuantity={setQuantity} stock={+product.stock} />
                            </div>

                            <ButtonAddCart product={product} mt="mt-5" quantity={quantity} />
                        </div>
                    </section>
                </Box>
            </Modal>
        </div>
    );
}
