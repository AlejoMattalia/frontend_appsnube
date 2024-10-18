import { useEffect, useState } from "react";
import { Brand } from "../interface/brands";
import Toastify from "toastify-js";
import axios from "axios";
import { useAppSelector } from "../redux/hook";

export const useGetBrands = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState<boolean>(false); // Estado de loading

  const updateCompnent = useAppSelector(state => state.updateComponent.value);

  useEffect(() => {
    const fetchBrands = async () => {
      setLoading(true); // Activar el loading
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}api/brand/get_brands`);
        setBrands(response.data.brands);
      } catch (err) {
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
      } finally {
        setLoading(false); // Desactivar el loading
      }
    };


    fetchBrands();

  }, [updateCompnent]);

  return { brands, loading }; // Retornar brands y loading
};
