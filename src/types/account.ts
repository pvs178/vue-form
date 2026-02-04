export type RecordType = 'LDAP' | 'Локальная'

export interface LabelItem {
  text: string
}

export interface Account {
  id: string
  labels: LabelItem[]
  recordType: RecordType
  login: string
  password: string | null
  saved?: boolean
}

export interface AccountFormData {
  id: string
  labelsStr: string
  recordType: RecordType
  login: string
  password: string
}

export const RECORD_TYPES: RecordType[] = ['Локальная', 'LDAP']

export const LABELS_MAX_LENGTH = 50
export const LOGIN_MAX_LENGTH = 100
export const PASSWORD_MAX_LENGTH = 100
