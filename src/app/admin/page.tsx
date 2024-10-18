'use client'

import { Button } from "@mui/material";
import { ArrowBack } from "../components/ArrowBack";
import { ModalCreateProduct } from "./components/ModalCreateProduct";
import { TableProducts } from "./components/TableProducts";
import { useRouter } from "next/navigation";

export default function Page() {

    const router = useRouter();


    return (
        <>
            <ArrowBack page="" />
            <section className="w-full p-10 flex flex-col gap-20 items-center justify-center">

                <div className="flex gap-3 w-full justify-between items-center max-w-[900px]">
                    <h1 className="text-2xl md:text-3xl font-bold">Administrador</h1>
                    <div className="flex gap-3">
                        <Button variant="contained" onClick={() => router.push('/admin/brands')} size="small">Marcas</Button>
                        <Button variant="contained" onClick={() => router.push('/admin/orders')} size="small">Ordenes</Button>
                    </div>
                </div>


                <main className="flex flex-col gap-5">

                    <div className="flex gap-3">
                        <h3 className="text-lg md:text-2xl font-bold">Listado de Productos</h3>

                        <ModalCreateProduct />
                    </div>

                    <div className="hidden min-[900px]:block">
                        <TableProducts />

                    </div>
                </main>


            </section>

            <div className="min-[900px]:hidden mt-5 p-3">
                <TableProducts />
            </div>
        </>
    );
}