import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { CircularProgress, Pagination, TextField } from '@mui/material';
import { ModalUpdateProduct } from './ModalUpdateProducts';
import { ModalDeleteProduct } from './ModalDeleteProduct';
import { ModalDescription } from './ModalDescription';
import { useGetProducts } from '@/app/hook/useGetProducts';

export function TableProducts() {
  const { products, loading, currentPage, totalPages, handlePageChange } = useGetProducts();
  const [searchTerm, setSearchTerm] = React.useState('');

  // Función para normalizar texto (quitar acentos y convertir a minúsculas)
  const normalizeText = (text: string) => {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  };

  // Filtrar productos basados en el término de búsqueda
  const filteredProducts = products.filter(product =>
    normalizeText(product.name).includes(normalizeText(searchTerm))
  );

  return (
    <>
      {loading ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <>
          <TextField
            id="outlined-basic"
            label="Buscar por nombre"
            variant="outlined"
            sx={{ width: '100%', maxWidth: 300, mb: 2 }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size='small'
          />

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 900 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Id</TableCell>
                  <TableCell align="center">Imagen</TableCell>
                  <TableCell align="center">Nombre</TableCell>
                  <TableCell align="center">Precio</TableCell>
                  <TableCell align="center">Stock</TableCell>
                  <TableCell align="center">Marca</TableCell>
                  <TableCell align="center">Descripción</TableCell>
                  <TableCell align="center">Editar</TableCell>
                  <TableCell align="center">Eliminar</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="center">{product.id}</TableCell>
                    <TableCell align="center">
                      <div className='w-full flex items-center justify-center'>
                        <div className='w-[45px] h-[45px] flex items-center justify-center'>
                          <img src={product.image_url} alt={product.name} className='w-full h-full object-cover' />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell align="center" style={{ maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {product.name}
                    </TableCell>
                    <TableCell align="center">${product.price}</TableCell>
                    <TableCell align="center">{product.stock}</TableCell>
                    <TableCell align="center">{product.brand?.name}</TableCell>
                    <TableCell align="center"><ModalDescription description={product.description} /></TableCell>
                    <TableCell align="center"><ModalUpdateProduct product={product} /></TableCell>
                    <TableCell align="center"><ModalDeleteProduct id={product.id} /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Pagination
            sx={{ mt: 3 }}
            color='primary'
            count={totalPages} // Usar totalPages del backend
            page={currentPage} // Usar currentPage del backend
            onChange={handlePageChange}
          />
        </>
      )}
    </>
  );
}
