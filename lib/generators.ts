/**
 * Gerador de números de identificação portugueses
 */

// Gerador de NIF (Número de Identificação Fiscal)
export function generateNIF(prefix?: number): string {
  // Prefixos válidos para NIF
  // 1 ou 2 ou 3: pessoa singular
  // 5: pessoa coletiva
  // 6: pessoa coletiva pública
  // 8: empresário em nome individual
  // 9: pessoa coletiva irregular ou número temporário
  const validPrefixes = [1, 2, 3, 5, 6, 8, 9]

  // Se não for fornecido um prefixo ou se for inválido, escolhe um aleatoriamente
  if (!prefix || !validPrefixes.includes(prefix)) {
    prefix = validPrefixes[Math.floor(Math.random() * validPrefixes.length)]
  }

  // Gera os 7 dígitos seguintes aleatoriamente
  let nif = prefix.toString()
  for (let i = 0; i < 7; i++) {
    nif += Math.floor(Math.random() * 10).toString()
  }

  // Calcula o dígito de controle
  let sum = 0
  for (let i = 0; i < 8; i++) {
    sum += Number.parseInt(nif[i]) * (9 - i)
  }

  const checkDigit = 11 - (sum % 11)
  // Se o resto for 0 ou 1, o dígito de controle é 0
  const finalCheckDigit = checkDigit >= 10 ? 0 : checkDigit

  return nif + finalCheckDigit.toString()
}

// Gerador de Cartão de Cidadão
export function generateCC(): string {
  // O CC tem 8 dígitos + 1 dígito de controle + 2 caracteres alfanuméricos
  let cc = ""

  // Gera os 8 dígitos aleatoriamente
  for (let i = 0; i < 8; i++) {
    cc += Math.floor(Math.random() * 10).toString()
  }

  // Calcula o dígito de controle (algoritmo simplificado)
  let sum = 0
  for (let i = 0; i < 8; i++) {
    let value = Number.parseInt(cc[i])
    if (i % 2 === 0) {
      value *= 2
      if (value > 9) {
        value -= 9
      }
    }
    sum += value
  }

  const checkDigit = (10 - (sum % 10)) % 10
  cc += checkDigit.toString()

  // Adiciona 2 caracteres alfanuméricos aleatórios
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  for (let i = 0; i < 2; i++) {
    cc += chars.charAt(Math.floor(Math.random() * chars.length))
  }

  return cc
}

// Gerador de Número de Segurança Social
export function generateNSS(): string {
  // O NSS tem 11 dígitos
  let nss = ""

  // Primeiro dígito é geralmente 1 ou 2
  nss += Math.random() > 0.5 ? "1" : "2"

  // Gera os 9 dígitos seguintes aleatoriamente
  for (let i = 0; i < 9; i++) {
    nss += Math.floor(Math.random() * 10).toString()
  }

  // Calcula o dígito de controle
  const weights = [2, 3, 4, 5, 6, 7, 8, 9, 2, 3]
  let sum = 0

  for (let i = 0; i < 10; i++) {
    sum += Number.parseInt(nss[i]) * weights[i]
  }

  const checkDigit = 11 - (sum % 11)
  const finalCheckDigit = checkDigit >= 10 ? 0 : checkDigit

  return nss + finalCheckDigit.toString()
}

// Lista de bancos portugueses
export const portugueseBanks = [
  { code: "0007", name: "Novo Banco" },
  { code: "0010", name: "BPI" },
  { code: "0018", name: "Santander Totta" },
  { code: "0019", name: "BBVA" },
  { code: "0023", name: "Banco Activobank" },
  { code: "0032", name: "Barclays" },
  { code: "0033", name: "Millennium BCP" },
  { code: "0035", name: "Caixa Geral de Depósitos" },
  { code: "0036", name: "Montepio Geral" },
  { code: "0038", name: "Bankinter" },
  { code: "0045", name: "Crédito Agrícola" },
  { code: "0046", name: "Banco Popular" },
  { code: "0079", name: "BIC" },
  { code: "0781", name: "BIG" },
]

// Gerador de IBAN português
export function generateIBAN(bankCode?: string): string {
  // IBAN português: PT50 + 21 dígitos (4 dígitos do banco + 4 dígitos da agência + 11 dígitos da conta + 2 dígitos de controle)

  // Códigos de banco portugueses comuns
  const bankCodes = portugueseBanks.map((bank) => bank.code)

  // Se não for fornecido um código de banco, escolhe um aleatoriamente
  if (!bankCode || !bankCodes.includes(bankCode)) {
    bankCode = bankCodes[Math.floor(Math.random() * bankCodes.length)]
  }

  // Código da agência (4 dígitos aleatórios)
  let branchCode = ""
  for (let i = 0; i < 4; i++) {
    branchCode += Math.floor(Math.random() * 10).toString()
  }

  // Número da conta (11 dígitos aleatórios)
  let accountNumber = ""
  for (let i = 0; i < 11; i++) {
    accountNumber += Math.floor(Math.random() * 10).toString()
  }

  // Calcula os dígitos de controle do NIB (os últimos 2 dígitos)
  const nib = bankCode + branchCode + accountNumber
  let sum = 0
  const weights = [73, 17, 89, 38, 62, 45, 53, 15, 50, 5, 49, 34, 81, 76, 27, 90, 9, 30, 3]

  for (let i = 0; i < 19; i++) {
    sum += Number.parseInt(nib[i]) * weights[i]
  }

  const checkDigits = 98 - (sum % 97)
  const checkDigitsStr = checkDigits < 10 ? `0${checkDigits}` : checkDigits.toString()

  // IBAN português sempre começa com PT50
  const checkDigitIBAN = "50"

  return `PT${checkDigitIBAN}${bankCode}${branchCode}${accountNumber}${checkDigitsStr}`
}

// Função para obter o nome do banco a partir do código
export function getBankName(bankCode: string): string {
  const bank = portugueseBanks.find((bank) => bank.code === bankCode)
  return bank ? bank.name : "Banco desconhecido"
}

// Função para extrair o código do banco de um IBAN
export function getBankCodeFromIBAN(iban: string): string {
  // Remove espaços e verifica se é um IBAN português
  iban = iban.replace(/\s/g, "")
  if (!iban.startsWith("PT")) return ""

  // O código do banco está nas posições 4-7 (depois de PT50)
  return iban.substring(4, 8)
}
