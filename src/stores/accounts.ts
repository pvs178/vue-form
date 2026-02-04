import { defineStore, type StateTree } from 'pinia'
import { ref, computed } from 'vue'
import type { Account, RecordType } from '@/types/account'
import { labelsStringToArray, labelsArrayToString } from '@/utils/labels'

function generateId(): string {
  return `acc_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`
}

export const useAccountsStore = defineStore(
  'accounts',
  () => {
    const accounts = ref<Account[]>([])

    const addAccount = () => {
      const newAccount: Account = {
        id: generateId(),
        labels: [],
        recordType: 'Локальная',
        login: '',
        password: '',
        saved: false,
      }
      accounts.value = [...accounts.value, newAccount]
      return newAccount.id
    }

    const removeAccount = (id: string) => {
      accounts.value = accounts.value.filter((a) => a.id !== id)
    }

    const updateAccount = (
      id: string,
      data: {
        labelsStr: string
        recordType: RecordType
        login: string
        password: string
      }
    ) => {
      const index = accounts.value.findIndex((a) => a.id === id)
      if (index === -1) return
      const labels = labelsStringToArray(data.labelsStr)
      const password =
        data.recordType === 'LDAP' ? null : data.password
      accounts.value = accounts.value.map((a) =>
        a.id === id
          ? {
              ...a,
              labels,
              recordType: data.recordType,
              login: data.login,
              password,
              saved: true,
            }
          : a
      )
    }

    const getAccountById = (id: string) =>
      computed(() => accounts.value.find((a) => a.id === id))

    return {
      accounts,
      addAccount,
      removeAccount,
      updateAccount,
      getAccountById,
      labelsArrayToString,
    }
  },
  {
    persist: {
      serializer: {
        serialize: (state: StateTree) => {
          const accounts = (state as { accounts: Account[] }).accounts ?? []
          return JSON.stringify({
            accounts: accounts.filter((a) => a.saved !== false),
          })
        },
        deserialize: (str: string): StateTree => JSON.parse(str),
      },
    },
  }
)
