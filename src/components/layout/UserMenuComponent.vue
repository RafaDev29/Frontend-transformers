<template>
  <div class="user-card">
    <!-- Header compacto -->
    <div class="header-section">
      <div class="avatar-container">
        <span class="avatar-text">
          {{ user?.username?.charAt(0).toUpperCase() }}
        </span>
        <div class="avatar-status"></div>
      </div>
      
      <div class="user-info">
        <div class="username">{{ user?.username }}</div>
        <div class="user-role">{{ user?.role }}</div>
      </div>

      <!-- Botón toggle elegante -->
      <button class="toggle-btn" @click="open = !open">
        <svg 
          viewBox="0 0 24 24" 
          class="toggle-icon"
          :class="{ 'rotate-180': open }"
        >
          <path d="M7 14l5-5 5 5z" fill="currentColor" />
        </svg>
      </button>
    </div>

    <!-- Panel de acciones expandible -->
    <v-expand-transition>
      <div v-show="open" class="actions-panel">
        <!-- Perfil -->
        <button @click="$emit('profile')" class="action-btn action-btn-primary">
          <div class="action-icon action-icon-profile">
            <svg viewBox="0 0 24 24" class="h-4 w-4">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="currentColor" />
            </svg>
          </div>
          <span class="action-text">Mi Perfil</span>
        </button>

        <!-- Toggle Modo Oscuro/Claro -->
        <button @click="toggleTheme" class="action-btn action-btn-theme">
          <div class="action-icon action-icon-theme">
            <svg v-if="!isDarkMode" viewBox="0 0 24 24" class="h-4 w-4">
              <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" fill="currentColor" />
            </svg>
            <svg v-else viewBox="0 0 24 24" class="h-4 w-4">
              <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z" fill="currentColor" />
            </svg>
          </div>
          <span class="action-text">{{ isDarkMode ? 'Modo Claro' : 'Modo Oscuro' }}</span>
          <div class="theme-indicator" :class="{ 'theme-dark': isDarkMode }"></div>
        </button>

        <!-- Divisor elegante -->
        <div class="divider">
          <div class="divider-line"></div>
        </div>

        <!-- Cerrar Sesión -->
        <button @click="$emit('logout')" class="action-btn action-btn-logout">
          <div class="action-icon action-icon-logout">
            <svg viewBox="0 0 24 24" class="h-4 w-4">
              <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.59L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" fill="currentColor" />
            </svg>
          </div>
          <span class="action-text">Cerrar Sesión</span>
        </button>
      </div>
    </v-expand-transition>
  </div>
</template>

<script setup>
import { ref , defineEmits, defineProps} from 'vue'

defineProps({
  user: { type: Object, default: null },
})

defineEmits(['profile', 'logout', 'theme-toggle'])

const open = ref(false)
const isDarkMode = ref(false)

function toggleTheme() {
  isDarkMode.value = !isDarkMode.value
  // Emitir evento para manejar el tema a nivel global
  // emit('theme-toggle', isDarkMode.value)
}
</script>

<style scoped>
.user-card {
  background: linear-gradient(135deg, rgba(220, 255, 194, 0.15) 0%, rgba(172, 223, 150, 0.08) 100%);
  border: 1px solid rgba(172, 223, 150, 0.2);
  border-radius: 16px;
  padding: 12px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.user-card:hover {
  border-color: rgba(125, 191, 107, 0.3);
  box-shadow: 0 4px 12px rgba(30, 127, 20, 0.08);
}

/* Header Section */
.header-section {
  display: flex;
  align-items: center;
  gap: 10px;
}

.avatar-container {
  position: relative;
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #7dbf6b 0%, #1e7f14 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 3px 8px rgba(30, 127, 20, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.9);
}

.avatar-text {
  color: white;
  font-weight: 700;
  font-size: 16px;
  text-shadow: 0 1px 2px rgba(0,0,0,0.1);
}

.avatar-status {
  position: absolute;
  bottom: -1px;
  right: -1px;
  width: 12px;
  height: 12px;
  background: linear-gradient(135deg, #16a34a 0%, #22c55e 100%);
  border: 2px solid white;
  border-radius: 50%;
  box-shadow: 0 1px 3px rgba(0,0,0,0.2);
}

.user-info {
  flex: 1;
  min-width: 0;
}

.username {
  font-size: 14px;
  font-weight: 600;
  color: #334155;
  line-height: 1.2;
  margin-bottom: 2px;
}

.user-role {
  font-size: 12px;
  color: #64748b;
  font-weight: 500;
}

.toggle-btn {
  width: 28px;
  height: 28px;
  background: linear-gradient(135deg, rgba(30, 127, 20, 0.1) 0%, rgba(77, 159, 63, 0.05) 100%);
  border: 1px solid rgba(30, 127, 20, 0.15);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.toggle-btn:hover {
  background: linear-gradient(135deg, rgba(30, 127, 20, 0.15) 0%, rgba(77, 159, 63, 0.1) 100%);
  border-color: rgba(30, 127, 20, 0.25);
  transform: scale(1.05);
}

.toggle-icon {
  width: 16px;
  height: 16px;
  color: #1e7f14;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.rotate-180 {
  transform: rotate(180deg);
}

/* Actions Panel */
.actions-panel {
  margin-top: 12px;
  padding-top: 8px;
  space-y: 4px;
}

.action-btn {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.action-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%);
  transition: left 0.5s ease;
}

.action-btn:hover::before {
  left: 100%;
}

.action-btn-primary {
  background: linear-gradient(135deg, rgba(30, 127, 20, 0.08) 0%, rgba(77, 159, 63, 0.05) 100%);
  color: #1e7f14;
  border: 1px solid rgba(30, 127, 20, 0.1);
}

.action-btn-primary:hover {
  background: linear-gradient(135deg, rgba(30, 127, 20, 0.12) 0%, rgba(77, 159, 63, 0.08) 100%);
  border-color: rgba(30, 127, 20, 0.2);
  transform: translateX(2px);
}

.action-btn-theme {
  background: linear-gradient(135deg, rgba(125, 191, 107, 0.08) 0%, rgba(172, 223, 150, 0.05) 100%);
  color: #4d9f3f;
  border: 1px solid rgba(125, 191, 107, 0.15);
}

.action-btn-theme:hover {
  background: linear-gradient(135deg, rgba(125, 191, 107, 0.12) 0%, rgba(172, 223, 150, 0.08) 100%);
  border-color: rgba(125, 191, 107, 0.25);
  transform: translateX(2px);
}

.action-btn-logout {
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.08) 0%, rgba(220, 38, 38, 0.05) 100%);
  color: #dc2626;
  border: 1px solid rgba(239, 68, 68, 0.15);
}

.action-btn-logout:hover {
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.12) 0%, rgba(220, 38, 38, 0.08) 100%);
  border-color: rgba(239, 68, 68, 0.25);
  transform: translateX(2px);
}

.action-icon {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.action-icon-profile {
  background: linear-gradient(135deg, #1e7f14 0%, #4d9f3f 100%);
  color: white;
  box-shadow: 0 2px 6px rgba(30, 127, 20, 0.2);
}

.action-icon-theme {
  background: linear-gradient(135deg, #7dbf6b 0%, #acdf96 100%);
  color: white;
  box-shadow: 0 2px 6px rgba(125, 191, 107, 0.2);
}

.action-icon-logout {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  color: white;
  box-shadow: 0 2px 6px rgba(239, 68, 68, 0.2);
}

.action-text {
  font-size: 13px;
  font-weight: 600;
  flex: 1;
  text-align: left;
}

.theme-indicator {
  width: 20px;
  height: 12px;
  background: #e2e8f0;
  border-radius: 6px;
  position: relative;
  transition: background 0.3s ease;
}

.theme-indicator::after {
  content: '';
  position: absolute;
  top: 1px;
  left: 1px;
  width: 10px;
  height: 10px;
  background: white;
  border-radius: 50%;
  box-shadow: 0 1px 3px rgba(0,0,0,0.3);
  transition: transform 0.3s ease;
}

.theme-dark {
  background: #1e7f14;
}

.theme-dark::after {
  transform: translateX(8px);
}

.divider {
  margin: 8px 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.divider-line {
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, transparent 0%, rgba(226, 232, 240, 0.8) 50%, transparent 100%);
}

/* Animaciones */
@keyframes slideIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

.actions-panel {
  animation: slideIn 0.3s ease-out;
}

/* Mejoras de rendimiento */
* {
  backface-visibility: hidden;
}
</style>