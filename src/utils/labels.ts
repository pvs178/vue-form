import type { LabelItem } from '@/types/account'

export function labelsStringToArray(str: string): LabelItem[] {
  if (!str.trim()) return []
  return str
    .split(';')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((text) => ({ text }))
}

export function labelsArrayToString(labels: LabelItem[]): string {
  return labels.map((item) => item.text).join('; ')
}
