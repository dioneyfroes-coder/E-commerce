// src/utils/validate.ts

// Função para validar o RG
export const validateRG = (rg: string): boolean => {
  const rgRegex = /^\d{7}(\d{2})?$/;
  return rgRegex.test(rg);
};

// Função para validar o CPF
export const validateCPF = (cpf: string): boolean => {
  cpf = cpf.replace(/[^\d]+/g, '');

  if (cpf.length !== 11 || 
      /^(\d)\1{10}$/.test(cpf)) {
    return false;
  }

  let sum;
  let remainder;
  sum = 0;

  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  }
  
  remainder = (sum * 10) % 11;

  if ((remainder === 10) || (remainder === 11)) {
    remainder = 0;
  }

  if (remainder !== parseInt(cpf.substring(9, 10))) {
    return false;
  }

  sum = 0;

  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  }
  
  remainder = (sum * 10) % 11;

  if ((remainder === 10) || (remainder === 11)) {
    remainder = 0;
  }

  if (remainder !== parseInt(cpf.substring(10, 11))) {
    return false;
  }

  return true;
};
