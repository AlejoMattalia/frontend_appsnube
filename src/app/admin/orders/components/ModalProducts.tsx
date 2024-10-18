import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

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

export function ModalProducts({ products }: { products: [] }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    console.log(products)

    return (
        <div>
            <p className='text-center underline text-blue-500 text-xs cursor-pointer' onClick={handleOpen}>Productos</p>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Productos de la orden
                    </Typography>

                    <div className='w-full flex items-center justify-between mt-3'>
                        <p>Nombre</p>
                        <p>Cantidad</p>
                    </div>

                    {
                        products &&
                        products.map((product: { product_id: number; quantity: number; product: { name: string; }; }, index: number) => (
                            <div key={product.product_id} className='flex items-center justify-between mt-1'>
                                <p>{index + 1}- {product.product.name}</p>
                                <p>{product.quantity}</p>
                            </div>
                        ))
                    }

                </Box>
            </Modal>
        </div>
    );
}
