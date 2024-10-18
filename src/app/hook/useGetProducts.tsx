import { useEffect, useState } from "react";
import axios from "axios";
import Toastify from "toastify-js";
import { useTokenFromCookies } from "./useGetToken"; // Asumo que este hook ya está hecho
import { useAppSelector } from "../redux/hook"; // Para manejar el estado del componente
import { Product } from "../interface/products";


export const useGetProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1); // Controlado por el backend
  const [totalPages, setTotalPages] = useState<number>(1); // Recibido del backend

  const token = useTokenFromCookies();
  const updateCompnent = useAppSelector((state) => state.updateComponent.value);

  useEffect(() => {
    const getProducts = async (page: number) => {
      setLoading(true);
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}api/product/get_products/${page}`);

        console.log(response.data.products);

        setProducts(response.data.products || []);
        setTotalPages(response.data.totalPages || 1); // Establecer totalPages según el backend
        setCurrentPage(response.data.currentPage || 1); // Establecer currentPage según el backend
      } catch (err) {
        console.log(err);
        if (
          err &&
          typeof err === "object" &&
          "response" in err &&
          err.response &&
          typeof err.response === "object" &&
          "data" in err.response &&
          err.response.data &&
          typeof err.response.data === "object" &&
          "message" in err.response.data
        ) {
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
      } finally {
        setLoading(false);
      }
    };


    getProducts(currentPage); // Llamar a getProducts con la página actual

  }, [token, updateCompnent, currentPage]);

  // Función para manejar el cambio de página
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value); // Cambiar la página cuando el usuario interactúe con la paginación
  };

  return {
    products,
    loading,
    currentPage,
    totalPages,
    handlePageChange,
  };
};
