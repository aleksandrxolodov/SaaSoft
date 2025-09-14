export interface AccountLabel {
  text: string
}

export type AccountType = 'Локальная' | 'LDAP'

export interface Account {
  id: string
  labels: AccountLabel[]  // Сохраняется в localStorage
  type: AccountType       // Сохраняется в localStorage  
  login: string          // Сохраняется в localStorage
  password: string | null // Сохраняется в localStorage
  isValid: boolean       // Служебное поле
  errors: Record<string, string> // Служебное поле
}

// Интерфейс для работы с формой (включает временное поле label)
export interface AccountFormData extends Account {
  label: string // Временное поле для ввода, не сохраняется
}

// Union type для полей аккаунта
export type AccountFieldValue = string | AccountType | AccountLabel[] | null

// Типы для обновления полей (только сохраняемые поля)
export interface AccountFieldUpdate {
  labels: AccountLabel[]
  type: AccountType  
  login: string
  password: string | null
}

export type AccountField = keyof AccountFieldUpdate | 'label' // label только для обработки ввода