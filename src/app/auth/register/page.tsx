'use client'

import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
    InputAdornment,
    TextField,
    FormControl,
    InputLabel,
    OutlinedInput,
    IconButton,
    Checkbox,
    FormControlLabel,
} from "@mui/material";
import axios from 'axios';
import { useFormik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import Toastify from "toastify-js";
import Cookies from "js-cookie";
import { useAppDispatch } from '@/app/redux/hook';
import { setUser } from '@/app/redux/feature/user/userSlice';
import { useRouter } from 'next/navigation';

export default function Page() {
    const [showPassword, setShowPassword] = useState(false);

    const dispatch = useAppDispatch();
    const router = useRouter();

    // Funciones para mostrar y ocultar la contraseña
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    // Esquema de validación con Yup
    const validationSchema = Yup.object({
        name: Yup.string().required('El nombre es obligatorio'),
        email: Yup.string()
            .email('Correo electrónico inválido')
            .required('El correo electrónico es obligatorio'),
        password: Yup.string()
            .min(8, 'La contraseña debe tener al menos 8 caracteres')
            .required('La contraseña es obligatoria'),
    });

    // Configuración de Formik
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            role: 'user', // Por defecto es 'user'
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}api/auth/register`, values);

                console.log(res.data);

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

                Cookies.set('token', res.data.token);

                // Manejo del rol admin en las cookies
                if (res.data.user.role === 'admin') {
                    Cookies.set('admin', "true");
                }

                dispatch(setUser(res.data.user));
                router.push('/');
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

    // Manejar el cambio del checkbox
    const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { checked } = event.target;
        formik.setFieldValue('role', checked ? 'admin' : 'user'); // Cambia a 'admin' o 'user' según el checkbox
    };

    return (
        <section className="min-h-screen flex items-center justify-center p-3">
            <div className="flex flex-col w-full max-w-[600px] bg-darkGray p-10 rounded-xl">
                <h1 className="text-3xl font-bold mb-10">Registrarse</h1>
                <form className='flex flex-col gap-5 w-full' onSubmit={formik.handleSubmit}>
                    <TextField
                        label="Nombre"
                        id="name"
                        name="name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PersonIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        label="Email"
                        id="email"
                        name="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <EmailIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <FormControl variant="outlined" error={formik.touched.password && Boolean(formik.errors.password)}>
                        <InputLabel htmlFor="outlined-adornment-password">Contraseña</InputLabel>
                        <OutlinedInput
                            id="password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Contraseña"
                        />
                        {formik.touched.password && formik.errors.password && (
                            <p className="text-[#f44336] text-[0.75rem] relative left-[14px] mt-0.5">{formik.errors.password}</p>
                        )}
                    </FormControl>
                    <div>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={formik.values.role === 'admin'}
                                    onChange={handleRoleChange}
                                />
                            }
                            label="Administrador"
                        />
                    </div>
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                        Registrarse
                    </button>

                    <p className='text-sm'>
                        ¿Ya ténes una cuenta?{' '}
                        <span onClick={() => router.push('/auth/login')} className="text-blue-500 cursor-pointer">
                            Iniciar sesión
                        </span>
                    </p>
                </form>
            </div>
        </section>
    );
}
