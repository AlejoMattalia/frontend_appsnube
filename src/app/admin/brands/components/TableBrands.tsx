'use client';

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ModalDeleteBrand } from './ModalDeleteBrand';
import CircularProgress from '@mui/material/CircularProgress'
import { ModalUpdateBrands } from './ModalUpdateBrand';
import { useGetBrands } from '@/app/hook/useGetBrands';

export function TableBrands() {

  const {brands, loading}  = useGetBrands()
    

    // const updateCompnent = useAppSelector(state => state.updateComponent.value);

    // React.useEffect(() => {
    //     const getBrands = async () => {

    //         setLoading(true);

    //         try {
    //             const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}api/brand/get_brands`, {
    //                 headers: {
    //                     'Authorization': `${token}`
    //                 }
    //             });
    //             setBrands(response.data.brands);
    //         } catch (err) {
    //             console.log(err);
    //             if (err && typeof err === 'object' && 'response' in err && err.response && typeof err.response === 'object' && 'data' in err.response && err.response.data && typeof err.response.data === 'object' && 'message' in err.response.data) {
    //                 Toastify({
    //                     text: (err.response.data as { message: string }).message,
    //                     duration: 3000,
    //                     close: true,
    //                     gravity: "top",
    //                     position: "right",
    //                     stopOnFocus: true,
    //                     style: {
    //                         background: "red",
    //                     },
    //                 }).showToast();
    //             }
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     if (token) {
    //         getBrands();
    //     }
    // }, [token, updateCompnent]);

    return (
        <>
            {loading ? (
                <div className='flex items-center justify-center h-[200px]'>
                    <CircularProgress />
                </div>
            ) : (
                <TableContainer component={Paper} sx={{ maxWidth: 650 }}>
                    <Table sx={{ minWidth: 650, maxWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Id</TableCell>
                                <TableCell align="center">Logo</TableCell>
                                <TableCell align="center">Nombre</TableCell>
                                <TableCell align="center">Editar</TableCell>
                                <TableCell align="center">Eliminar</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {brands.length > 0 ? (
                                brands.map((brand) => (
                                    <TableRow key={brand.id}>
                                        <TableCell align="center">{brand.id}</TableCell>
                                        <TableCell align="center" >
                                            <div className='w-full flex items-center justify-center'>
                                                <div className='w-[45px] h-[45px] flex items-center justify-center'>
                                                    <img src={brand.logo_url} alt={brand.name}  className='w-full h-full object-cover'/>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell align="center">{brand.name}</TableCell>
                                        <TableCell align="center">
                                            <ModalUpdateBrands brand={brand} />
                                        </TableCell>
                                        <TableCell align="center">
                                            <ModalDeleteBrand name={brand.name} id={brand.id} />
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} align="center">No hay marcas disponibles</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </>
    );
}
