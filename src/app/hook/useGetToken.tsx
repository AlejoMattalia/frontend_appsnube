import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export const useTokenFromCookies = () => {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        // Obtén el token de las cookies
        const storedToken = Cookies.get('token'); // Reemplaza 'token' con el nombre de tu cookie

        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    return token;
};
