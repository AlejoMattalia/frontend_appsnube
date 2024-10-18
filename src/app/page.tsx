'use client';

import { CircularProgress, Pagination, TextField } from "@mui/material";
import { CardProducts } from "./components/CardProducts";
import { useGetProducts } from "./hook/useGetProducts";
import { useState } from "react";

export default function Home() {
  const { products, loading, currentPage, totalPages, handlePageChange } = useGetProducts();
  const [searchTerm, setSearchTerm] = useState("");

  // Filtrar productos según el término de búsqueda
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="w-full p-3 md:p-10 flex flex-col mb-20 items-center justify-center">
      <h1 className="text-2xl md:text-3xl font-bold mt-10">Venta de productos</h1>

      <div className="w-full flex flex-col md:flex-row md:justify-center items-center mt-10 md:mt-20 mb-8 gap-10">

      <TextField
          id="outlined-basic"
          label="Buscar"
          variant="outlined" // Cambié a "outlined" para mejor visibilidad
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
        

      </div>

      <div className="flex gap-5 w-full justify-center items-center flex-wrap">
        {loading ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <CircularProgress />
          </div>
        ) : (
          filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <CardProducts key={product.id} product={product} />
            ))
          ) : (
            <p>No se encontraron productos.</p>
          )
        )}
      </div>
    </section>
  );
}
