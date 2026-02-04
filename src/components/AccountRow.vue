<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { Delete } from '@element-plus/icons-vue'
import type { Account, RecordType } from '@/types/account'
import {
  RECORD_TYPES,
  LABELS_MAX_LENGTH,
  LOGIN_MAX_LENGTH,
  PASSWORD_MAX_LENGTH,
} from '@/types/account'
import { useAccountsStore } from '@/stores/accounts'

const props = defineProps<{ account: Account }>()

const store = useAccountsStore()

const labelsStr = ref(store.labelsArrayToString(props.account.labels))
const recordType = ref<RecordType>(props.account.recordType)
const login = ref(props.account.login)
const password = ref(props.account.password ?? '')

const errors = ref({
  labels: false,
  login: false,
  password: false,
})

const isLocal = computed(() => recordType.value === 'Локальная')

watch(
  () => props.account,
  (a) => {
    labelsStr.value = store.labelsArrayToString(a.labels)
    recordType.value = a.recordType
    login.value = a.login
    password.value = a.password ?? ''
  },
  { deep: true }
)

function validate(): boolean {
  const e = {
    labels: labelsStr.value.length > LABELS_MAX_LENGTH,
    login: !login.value.trim() || login.value.length > LOGIN_MAX_LENGTH,
    password:
      isLocal.value &&
      (password.value.length > PASSWORD_MAX_LENGTH || !password.value.trim()),
  }
  errors.value = e
  return !e.labels && !e.login && !e.password
}

function save() {
  if (!validate()) return
  store.updateAccount(props.account.id, {
    labelsStr: labelsStr.value,
    recordType: recordType.value,
    login: login.value.trim(),
    password: password.value,
  })
}

function onLabelsBlur() {
  if (labelsStr.value.length > LABELS_MAX_LENGTH) {
    errors.value.labels = true
    return
  }
  errors.value.labels = false
  save()
}

function onLoginBlur() {
  if (!login.value.trim() || login.value.length > LOGIN_MAX_LENGTH) {
    errors.value.login = true
    return
  }
  errors.value.login = false
  save()
}

function onPasswordBlur() {
  if (!isLocal.value) return
  if (!password.value.trim() || password.value.length > PASSWORD_MAX_LENGTH) {
    errors.value.password = true
    return
  }
  errors.value.password = false
  save()
}

function onRecordTypeChange() {
  if (!isLocal.value) password.value = ''
  validate()
  save()
}

function remove() {
  store.removeAccount(props.account.id)
}
</script>

<template>
  <tr>
    <td>
      <el-input
        v-model="labelsStr"
        :maxlength="LABELS_MAX_LENGTH"
        show-word-limit
        placeholder="Метки через ;"
        :class="{ 'is-error': errors.labels }"
        @blur="onLabelsBlur"
      />
    </td>
    <td>
      <el-select
        v-model="recordType"
        placeholder="Тип записи"
        :class="{ 'is-error': false }"
        @change="onRecordTypeChange"
      >
        <el-option
          v-for="t in RECORD_TYPES"
          :key="t"
          :label="t"
          :value="t"
        />
      </el-select>
    </td>
    <td>
      <el-input
        v-model="login"
        :maxlength="LOGIN_MAX_LENGTH"
        show-word-limit
        placeholder="Логин"
        :class="{ 'is-error': errors.login }"
        @blur="onLoginBlur"
      />
    </td>
    <td>
      <el-input
        v-if="isLocal"
        v-model="password"
        type="password"
        :maxlength="PASSWORD_MAX_LENGTH"
        show-word-limit
        placeholder="Пароль"
        show-password
        :class="{ 'is-error': errors.password }"
        @blur="onPasswordBlur"
      />
      <span v-else class="password-hidden">—</span>
    </td>
    <td class="col-actions">
      <el-button type="danger" link circle @click="remove">
        <el-icon><Delete /></el-icon>
      </el-button>
    </td>
  </tr>
</template>

<style scoped>
.is-error :deep(.el-input__wrapper) {
  box-shadow: 0 0 0 1px var(--el-color-danger) inset;
}
.password-hidden {
  color: #909399;
  font-size: 0.875rem;
}
.col-actions {
  width: 56px;
}
</style>
