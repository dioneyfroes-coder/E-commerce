"use client";

import { useState, useEffect } from 'react';

export default function Custom500() {
  const [errorMessage, setErrorMessage] = useState('Ocorreu um erro no servidor');

  useEffect(() => {
    // Aqui você pode fazer uma chamada para um endpoint de log ou obter a mensagem de erro de outra forma.
    // Para este exemplo, vamos definir uma mensagem de erro padrão.
    setErrorMessage('Ocorreu um erro inesperado. Tente novamente mais tarde.');
  }, []);

  return (
    <div>
      <h1>500 - Ocorreu um erro no servidor</h1>
      <p>{errorMessage}</p>
    </div>
  );
}
