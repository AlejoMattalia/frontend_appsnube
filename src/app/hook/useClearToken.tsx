'use client';

import { useEffect } from 'react';
import Cookies from 'js-cookie';

export const useClearToken = () => {
  useEffect(() => {
    const handleBeforeUnload = () => {
      // Aquí puedes definir la lógica de limpieza
      Cookies.remove('token');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);
};
