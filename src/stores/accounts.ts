import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Account, AccountFormData, AccountLabel, AccountType, AccountField, AccountFieldValue } from '@/types/account'

export const useAccountsStore = defineStore('accounts', () => {
  const accounts = ref<AccountFormData[]>([])

  const generateId = (): string => {
    return Date.now().toString(36) + Math.random().toString(36).substring(2)
  }

  // Преобразование строки меток в массив объектов
  const transformLabels = (labelString: string): AccountLabel[] => {
    if (!labelString.trim()) return []
    return labelString
      .split(';')
      .map(text => text.trim())
      .filter(text => text.length > 0)
      .map(text => ({ text }))
  }

  // Валидация аккаунта
  const validateAccount = (account: AccountFormData): boolean => {
    const errors: Record<string, string> = {}

    if (!account.login.trim()) {
      errors.login = 'Логин обязателен'
    } else if (account.login.length > 100) {
      errors.login = 'Максимум 100 символов'
    }

    if (account.type === 'Локальная' && !account.password?.trim()) {
      errors.password = 'Пароль обязателен'
    }

    if (account.password && account.password.length > 100) {
      errors.password = 'Максимум 100 символов'
    }

    if (account.label.length > 50) {
      errors.label = 'Максимум 50 символов'
    }

    account.errors = errors
    account.isValid = Object.keys(errors).length === 0
    
    return account.isValid
  }

  const createAccount = (): AccountFormData => ({
    id: generateId(),
    label: '', // Временное поле для ввода
    labels: [],
    type: 'Локальная',
    login: '',
    password: '',
    isValid: false,
    errors: {}
  })

  const loadFromStorage = (): void => {
    try {
      const stored = localStorage.getItem('accounts')
      if (!stored) return

      const parsedData = JSON.parse(stored) as Account[]
      accounts.value = parsedData.map(acc => ({
        ...createAccount(),
        ...acc,
        // Восстанавливаем label из labels для отображения в форме
        label: acc.labels?.map(l => l.text).join('; ') || ''
      }))
    } catch (error) {
      console.error('Ошибка загрузки аккаунтов:', error)
      accounts.value = []
    }
  }

  // Сохранение в localStorage (только нужные поля)
  const saveToStorage = (): void => {
    try {
      const dataToSave: Account[] = accounts.value.map(acc => ({
        id: acc.id,
        labels: acc.labels,
        type: acc.type,
        login: acc.login,
        password: acc.password,
        isValid: acc.isValid,
        errors: acc.errors
      }))
      localStorage.setItem('accounts', JSON.stringify(dataToSave))
    } catch (error) {
      console.error('Ошибка сохранения аккаунтов:', error)
    }
  }

  const addAccount = (): void => {
    accounts.value.push(createAccount())
  }

  const removeAccount = (id: string): void => {
    const index = accounts.value.findIndex(account => account.id === id)
    if (index > -1) {
      accounts.value.splice(index, 1)
      saveToStorage()
    }
  }

  const updateField = (id: string, field: AccountField, value: AccountFieldValue): void => {
    const account = accounts.value.find(acc => acc.id === id)
    if (!account) return

    switch (field) {
      case 'label':
        // Обновляем временное поле для отображения и преобразуем в labels
        account.label = value as string
        account.labels = transformLabels(value as string)
        break
      case 'labels':
        account.labels = value as AccountLabel[]
        // Синхронизируем с полем для отображения
        account.label = (value as AccountLabel[]).map(l => l.text).join('; ')
        break
      case 'type':
        account.type = value as AccountType
        // Очищаем пароль при переключении на LDAP
        if (value === 'LDAP') {
          account.password = null
        }
        break
      case 'login':
        account.login = value as string
        break
      case 'password':
        account.password = value as string | null
        break
    }

    if (validateAccount(account)) {
      saveToStorage()
    }
  }

  const hasAccounts = computed(() => accounts.value.length > 0)

  loadFromStorage()

  return {
    accounts,
    hasAccounts,
    addAccount,
    removeAccount,
    updateField
  }
})