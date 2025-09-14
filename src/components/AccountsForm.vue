<template>
  <div class="accounts-form">
    <!-- Header Section -->
    <div class="header-section">
      <div class="header-content">
        <h4>Учетные записи</h4>
        <q-btn
          round
          color="primary"
          icon="add"
          size="sm"
          @click="accountsStore.addAccount"
          class="add-button"
        />
      </div>
      
      <div class="hint-section">
        <q-icon name="info" color="blue-grey-6" size="18px" />
        <p>Для указания нескольких меток используйте разделитель ;</p>
      </div>
    </div>
    
    <!-- Column Headers -->
    <div v-if="accountsStore.hasAccounts" class="column-headers">
      <div>Метка</div>
      <div>Тип записи</div>
      <div>Логин</div>
      <div>Пароль</div>
      <div></div>
    </div>
    
    <!-- Accounts List -->
    <div class="accounts-list">
      <div
        v-for="account in accountsStore.accounts"
        :key="account.id"
        class="account-row"
      >
        <!-- Label Field -->
        <q-input
          v-model="account.label"
          dense
          outlined
          placeholder="Метка"
          maxlength="50"
          @blur="updateField(account.id, 'label', account.label)"
          :error="!!account.errors.label"
          :error-message="account.errors.label"
        />
        
        <!-- Type Field -->
        <q-select
          v-model="account.type"
          :options="typeOptions"
          dense
          outlined
          emit-value
          map-options
          @update:model-value="updateField(account.id, 'type', $event)"
        />
        
        <!-- Login Field -->
        <q-input
          v-model="account.login"
          dense
          outlined
          placeholder="Логин"
          maxlength="100"
          @blur="updateField(account.id, 'login', account.login)"
          :error="!!account.errors.login"
          :error-message="account.errors.login"
          :class="{ 'login-expanded': account.type === 'LDAP' }"
          required
        />
        
        <!-- Password Field -->
        <q-input
          v-if="account.type === 'Локальная'"
          v-model="account.password"
          :type="showPassword[account.id] ? 'text' : 'password'"
          dense
          outlined
          placeholder="Пароль"
          maxlength="100"
          @blur="updateField(account.id, 'password', account.password)"
          :error="!!account.errors.password"
          :error-message="account.errors.password"
          required
        >
          <template v-slot:append>
            <q-icon
              :name="showPassword[account.id] ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="togglePassword(account.id)"
            />
          </template>
        </q-input>
        
        <!-- Delete Button -->
        <q-btn
          round
          flat
          icon="delete"
          color="negative"
          size="sm"
          @click="removeAccount(account.id)"
          class="delete-button"
        />
      </div>
    </div>
    
    <!-- Empty State -->
    <div v-if="!accountsStore.hasAccounts" class="empty-state">
      <q-icon name="account_circle" size="48px" color="blue-grey-4" />
      <p>Нет добавленных учетных записей</p>
      <q-btn
        color="primary"
        outline
        @click="accountsStore.addAccount"
        icon="add"
        label="Добавить первую учетную запись"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAccountsStore } from '@/stores/accounts'
import type { AccountField, AccountFieldValue } from '@/types/account'

const accountsStore = useAccountsStore()

// Password visibility state
const showPassword = ref<Record<string, boolean>>({})

// Type options for select
const typeOptions = [
  { label: 'Локальная', value: 'Локальная' as const },
  { label: 'LDAP', value: 'LDAP' as const }
]

// Update field with proper typing
const updateField = (id: string, field: AccountField, value: AccountFieldValue): void => {
  accountsStore.updateField(id, field, value)
}

// Remove account and cleanup
const removeAccount = (id: string): void => {
  accountsStore.removeAccount(id)
  delete showPassword.value[id]
}

// Toggle password visibility
const togglePassword = (id: string): void => {
  showPassword.value[id] = !showPassword.value[id]
}
</script>

<style lang="scss" scoped>
.accounts-form {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
}

.header-section {
  background: linear-gradient(135deg, #ffffff 0%, #fafbfc 100%);
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #3b82f6 0%, #1d4ed8 100%);
    border-radius: 12px 12px 0 0;
  }
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  
  h4 {
    margin: 0;
    font-size: 1.75rem;
    font-weight: 800;
    color: #1f2937;
  }
}

.add-button {
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%) !important;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  }
}

.hint-section {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
  border: 1px solid #bfdbfe;
  border-radius: 8px;
  padding: 16px;
  
  p {
    margin: 0;
    color: #1e40af;
    font-weight: 500;
    line-height: 1.6;
  }
}

.column-headers {
  display: grid;
  grid-template-columns: 1fr 0.8fr 1.5fr 1.5fr 38px;
  gap: 16px;
  padding: 16px 24px;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  margin-bottom: 16px;
  
  div {
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #64748b;
  }
}

.accounts-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.account-row {
  display: grid;
  grid-template-columns: 1fr 0.8fr 1.5fr 1.5fr 38px;
  gap: 16px;
  align-items: start;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    border-color: #d1d5db;
  }
  
  .login-expanded {
    grid-column: 3 / 5;
  }
}

.delete-button {
  background: rgba(220, 38, 38, 0.1) !important;
  color: #dc2626 !important;
  border: 1px solid rgba(220, 38, 38, 0.2) !important;
  height: 38px !important;
  width: 38px !important;
  
  &:hover {
    background: #dc2626 !important;
    color: white !important;
  }
}

.empty-state {
  text-align: center;
  padding: 64px 32px;
  background: linear-gradient(135deg, #fafbfc 0%, #f8fafc 100%);
  border: 2px dashed #d1d5db;
  border-radius: 16px;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #3b82f6;
    background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
  }
  
  .q-icon {
    margin-bottom: 16px;
    transition: all 0.3s ease;
  }
  
  &:hover .q-icon {
    color: #3b82f6 !important;
    transform: scale(1.1);
  }
  
  p {
    color: #6b7280;
    font-weight: 500;
    margin: 16px 0;
  }
}

// Form field improvements
:deep(.q-field) {
  .q-field__control {
    border-radius: 8px;
  }
  
  &.q-field--focused .q-field__control {
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
  
  .q-field__input {
    font-weight: 500;
  }
}

// Error state improvements
:deep(.q-field--error) {
  .q-field__control {
    border-color: #dc2626 !important;
    background-color: rgba(220, 38, 38, 0.05);
  }
  
  .q-field__messages {
    color: #dc2626;
    font-weight: 500;
  }
}

// Responsive design
@media (max-width: 768px) {
  .column-headers {
    display: none;
  }
  
  .account-row {
    grid-template-columns: 1fr 38px;
    grid-template-rows: auto auto auto auto;
    gap: 12px;
    
    .q-input:nth-child(1) { grid-row: 1; grid-column: 1; }
    .q-select:nth-child(2) { grid-row: 2; grid-column: 1; }
    .q-input:nth-child(3) { grid-row: 3; grid-column: 1; }
    .q-input:nth-child(4) { grid-row: 4; grid-column: 1; }
    .delete-button { grid-row: 1; grid-column: 2; align-self: center; }
    
    .login-expanded {
      grid-column: 1 !important;
    }
  }
}
</style>