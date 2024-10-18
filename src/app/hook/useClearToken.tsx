'use client';

import { useEffect } from 'react';
import Cookies from 'js-cookie';

export const useClearToken = () => {
  useEffect(() => {
    const handleBeforeUnload = () => {
      // Elimina el token cuando se cierra la pestaña o se actualiza la página
      Cookies.remove('token');
    };

    const handleVisibilityChange = () => {
      // Elimina el token cuando se cambia a otra pestaña o ventana
      if (document.visibilityState === 'hidden') {
        Cookies.remove('token');
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);
};
