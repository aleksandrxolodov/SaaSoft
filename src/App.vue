<template>
  <div id="app">
    <q-layout view="hHh lpR fFf">
      <q-page-container>
        <q-page class="q-pa-md">
          <div class="app-container">
            <AccountsForm />
          </div>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script setup lang="ts">
import AccountsForm from '@/components/AccountsForm.vue'
</script>

<style lang="scss">
// CSS Custom Properties for consistent theming
:root {
  --color-primary: #2563EB;
  --color-secondary: #10B981;
  --color-accent: #8B5CF6;
  --color-surface: #FFFFFF;
  --color-background: #F8FAFC;
  --color-on-surface: #1F2937;
  --color-border: #E5E7EB;
  --color-border-light: #F3F4F6;
  --color-text-primary: #111827;
  --color-text-secondary: #6B7280;
  --color-text-muted: #9CA3AF;
  
  // Shadows
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  
  // Border radius
  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  
  // Spacing
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  --spacing-2xl: 48px;
}

#app {
  font-family: 'Inter', 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 100%);
  min-height: 100vh;
  color: var(--color-text-primary);
  line-height: 1.6;
}

.app-container {
  max-width: 1400px;
  margin: 0 auto;
  background-color: var(--color-surface);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-xl);
  overflow: hidden;
  border: 1px solid var(--color-border-light);
  backdrop-filter: blur(10px);
}

// Global styles
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  font-feature-settings: 'kern' 1, 'liga' 1, 'calt' 1;
}

// Enhanced Quasar overrides for professional design
.q-field--outlined {
  .q-field__control {
    border-radius: var(--radius-md);
    border: 1.5px solid var(--color-border);
    background-color: var(--color-surface);
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    
    &:hover {
      border-color: var(--color-primary);
      box-shadow: var(--shadow-sm);
    }
  }
  
  &.q-field--focused .q-field__control {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
}

.q-field__label {
  color: var(--color-text-secondary) !important;
  font-weight: 500 !important;
  font-size: 14px !important;
  font-family: inherit !important;
  line-height: 1.4 !important;
}

.q-field__input {
  color: var(--color-text-primary) !important;
  font-weight: 400 !important;
  font-size: 14px !important;
  font-family: inherit !important;
  line-height: 1.4 !important;
}

.q-field__messages {
  font-size: 12px !important;
  font-family: inherit !important;
  line-height: 1.3 !important;
}

.q-btn {
  border-radius: var(--radius-md);
  text-transform: none;
  font-weight: 600;
  letter-spacing: 0.025em;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: var(--shadow-sm);
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: var(--shadow-md);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &.q-btn--round {
    box-shadow: var(--shadow-md);
    
    &:hover {
      box-shadow: var(--shadow-lg);
    }
  }
}

.q-btn--unelevated {
  box-shadow: none !important;
  
  &:hover {
    box-shadow: var(--shadow-sm) !important;
  }
}

.q-card {
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  border: 1px solid var(--color-border-light);
}

.q-select {
  .q-field__control {
    .q-field__append {
      color: var(--color-text-secondary);
    }
  }
}

// Typography improvements с фиксированными размерами
h1, h2, h3, h4, h5, h6 {
  font-family: inherit !important;
  font-weight: 700 !important;
  line-height: 1.25 !important;
  color: var(--color-text-primary) !important;
  margin: 0 !important;
}

.text-h4 {
  font-size: 30px !important;
  font-weight: 800 !important;
  letter-spacing: -0.025em !important;
  font-family: inherit !important;
}

.text-h5 {
  font-size: 24px !important;
  font-weight: 700 !important;
  letter-spacing: -0.025em !important;
  font-family: inherit !important;
}

.text-body1 {
  font-size: 16px !important;
  line-height: 1.75 !important;
  font-family: inherit !important;
}

.text-body2 {
  font-size: 14px !important;
  line-height: 1.6 !important;
  font-family: inherit !important;
}

.text-caption {
  font-size: 12px !important;
  font-weight: 600 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.1em !important;
  font-family: inherit !important;
}

// Icon improvements
.q-icon {
  transition: all 0.2s ease;
}

// Focus improvements
*:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}

// Scrollbar styling
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: var(--color-border-light);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: var(--color-border);
  border-radius: 4px;
  
  &:hover {
    background: var(--color-text-muted);
  }
}
</style>

