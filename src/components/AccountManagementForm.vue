<script setup lang="ts">
import { Plus, QuestionFilled } from '@element-plus/icons-vue'
import { useAccountsStore } from '@/stores/accounts'
import AccountRow from './AccountRow.vue'
</script>

<template>
  <div class="form-card">
    <header class="form-header">
      <h1 class="form-title">Учетные записи</h1>
      <el-button type="primary" circle @click="useAccountsStore().addAccount()">
        <el-icon><Plus /></el-icon>
      </el-button>
    </header>

    <div class="hint">
      <el-icon class="hint-icon"><QuestionFilled /></el-icon>
      <span>
        Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;
      </span>
    </div>

    <div class="table-wrap">
      <table class="accounts-table">
        <thead>
          <tr>
            <th>Метки</th>
            <th>Тип записи</th>
            <th>Логин</th>
            <th>Пароль</th>
            <th class="col-actions"></th>
          </tr>
        </thead>
        <tbody>
          <AccountRow
            v-for="account in useAccountsStore().accounts"
            :key="account.id"
            :account="account"
          />
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.form-card {
  max-width: 900px;
  margin: 0 auto;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
  padding: 24px;
}
.form-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
}
.form-title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
}
.hint {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 12px 14px;
  margin-bottom: 20px;
  background: #f8fafc;
  border: 1px solid #409eff;
  border-radius: 6px;
  font-size: 0.875rem;
  color: #606266;
}
.hint-icon {
  color: #409eff;
  font-size: 1.1rem;
  flex-shrink: 0;
}
.table-wrap {
  overflow-x: auto;
}
.accounts-table {
  width: 100%;
  border-collapse: collapse;
}
.accounts-table th {
  text-align: left;
  padding: 10px 12px;
  font-size: 0.8125rem;
  font-weight: 600;
  color: #606266;
  border-bottom: 1px solid #ebeef5;
}
.accounts-table td {
  padding: 8px 12px;
  vertical-align: middle;
  border-bottom: 1px solid #ebeef5;
}
.col-actions {
  width: 56px;
}
</style>
