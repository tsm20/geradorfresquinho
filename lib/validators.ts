/**
 * Validadores de números de identificação portugueses
 */

// Validador de NIF (Número de Identificação Fiscal)
export function validateNIF(nif: string): boolean {
  // Verifica se tem 9 dígitos e se é um número
  if (!/^\d{9}$/.test(nif)) {
    return false;
  }

  // Verifica se o primeiro dígito é válido
  const firstDigit = Number.parseInt(nif[0]);
  const validFirstDigits = [1, 2, 3, 5, 6, 8, 9];
  if (!validFirstDigits.includes(firstDigit)) {
    return false;
  }

  // Calcula o dígito de controle
  let sum = 0;
  for (let i = 0; i < 8; i++) {
    sum += Number.parseInt(nif[i]) * (9 - i);
  }

  const checkDigit = 11 - (sum % 11);
  const finalCheckDigit = checkDigit >= 10 ? 0 : checkDigit;

  // Verifica se o dígito de controle está correto
  return Number.parseInt(nif[8]) === finalCheckDigit;
}

// Validador de Cartão de Cidadão
export function validateCC(cc: string): boolean {
  // Verifica se tem o formato correto: 8 dígitos + 1 dígito de controle + 2 caracteres alfanuméricos
  if (!/^\d{9}[0-9A-Z]{2}$/.test(cc)) {
    return false;
  }

  // Calcula o dígito de controle
  let sum = 0;
  for (let i = 0; i < 8; i++) {
    let value = Number.parseInt(cc[i]);
    if (i % 2 === 0) {
      value *= 2;
      if (value > 9) {
        value -= 9;
      }
    }
    sum += value;
  }

  const checkDigit = (10 - (sum % 10)) % 10;

  // Verifica se o dígito de controle está correto
  return Number.parseInt(cc[8]) === checkDigit;
}

// Validador de Número de Segurança Social
export function validateNSS(nss: string): boolean {
  // Verifica se tem 11 dígitos
  if (!/^\d{11}$/.test(nss)) {
    return false;
  }

  // Calcula o dígito de controle
  const weights = [2, 3, 4, 5, 6, 7, 8, 9, 2, 3];
  let sum = 0;

  for (let i = 0; i < 10; i++) {
    sum += Number.parseInt(nss[i]) * weights[i];
  }

  const checkDigit = 11 - (sum % 11);
  const finalCheckDigit = checkDigit >= 10 ? 0 : checkDigit;

  // Verifica se o dígito de controle está correto
  return Number.parseInt(nss[10]) === finalCheckDigit;
}

// Validador de IBAN português
export function validateIBAN(iban: string): boolean {
  // Remove espaços e converte para maiúsculas
  iban = iban.replace(/\s/g, "").toUpperCase();

  // Verifica se começa com PT e tem o comprimento correto (25 caracteres)
  if (!/^PT\d{23}$/.test(iban)) {
    return false;
  }

  // Move os primeiros 4 caracteres para o final
  const rearranged = iban.substring(4) + iban.substring(0, 4);

  // Converte letras para números: A=10, B=11, ..., Z=35
  const ibanNumeric = rearranged
    .split("")
    .map((char) => {
      const code = char.charCodeAt(0);
      if (code >= 65 && code <= 90) {
        return (code - 55).toString();
      }
      return char;
    })
    .join("");

  // Calcula o módulo 97
  let remainder = 0;
  for (let i = 0; i < ibanNumeric.length; i++) {
    remainder = (remainder * 10 + Number.parseInt(ibanNumeric[i])) % 97;
  }

  // O IBAN é válido se o resto for 1
  return remainder === 1;
}

// Função para validation qualquer tipo de documento
export function validateDocument(document: string): {
  isValid: boolean;
  type: string | null;
} {
  // Remove espaços
  document = document.replace(/\s/g, "");

  if (validateNIF(document)) {
    return { isValid: true, type: "NIF" };
  }

  if (validateCC(document)) {
    return { isValid: true, type: "Cartão de Cidadão" };
  }

  if (validateNSS(document)) {
    return { isValid: true, type: "Número de Segurança Social" };
  }

  if (validateIBAN(document)) {
    return { isValid: true, type: "IBAN" };
  }

  return { isValid: false, type: null };
}
