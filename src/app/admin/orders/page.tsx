import { ArrowBack } from "@/app/components/ArrowBack";
import { TableOrders } from "./components/TableOrders";

export default function Page() {
    return (

        <>
            <ArrowBack page="admin" />
            <section className="w-full p-3 md:p-10 flex flex-col gap-20 items-center justify-center">

                <h1 className="text-2xl md:text-3xl font-bold">Ordenes</h1>


                <main className="flex flex-col gap-5">

                    <div className="flex gap-3">
                        <h3 className="text-lg md:text-2xl font-bold">Listado de Ordenes</h3>

                    </div>

                    <div className="hidden min-[650px]:block">
                        <TableOrders />

                    </div>
                </main>


            </section>
        </>
    )
}