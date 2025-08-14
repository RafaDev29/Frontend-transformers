<template>
  <v-navigation-drawer
    v-model="model"
    app
    permanent
    :width="rail ? 80 : 320"
    :rail="rail"
    class="sidebar-elegant"
    elevation="0"
  >
    <!-- Header con mejor diseño -->
    <div class="header-section">
      <!-- Modo abierto -->
      <div v-if="!rail" class="header-expanded">
        <div class="logo-container">
          <div class="logo-text">
            <span class="text-color1">S</span>
            <span class="text-accent-success">I</span>
            <span class="text-color2">M</span>
            <span class="text-color3">T</span>
            <span class="text-color4">R</span>
            <span class="text-accent-primary">A</span>
          </div>
          <div class="logo-subtitle">Panel de Parámetros</div>
        </div>

        <!-- Botón toggle mejorado -->
        <div @click="$emit('toggle')" class="toggle-btn toggle-btn-expanded">
          <svg viewBox="0 0 24 24" class="h-4 w-4 text-white">
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" fill="currentColor" />
          </svg>
        </div>
      </div>

      <!-- Modo cerrado -->
      <div v-else class="header-collapsed">
        <div @click="$emit('toggle')" class="toggle-btn toggle-btn-collapsed">
          <div class="logo-mini">
            <span class="text-white font-bold text-lg">S</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Navegación mejorada -->
    <div class="navigation-section">
      <div v-for="(item, i) in items" :key="i" class="nav-item-wrapper">
        <v-tooltip :disabled="!rail" :text="item.title" location="end">
          <template #activator="{ props: tooltipProps }">
            <router-link
              v-bind="rail ? tooltipProps : {}"
              :to="item.to"
              class="nav-item"
              :class="[
                rail ? 'nav-item-rail' : 'nav-item-full',
                $route.path === item.to ? 'nav-item-active' : 'nav-item-inactive'
              ]"
            >
              <!-- Indicador lateral activo -->
              <div 
                v-if="$route.path === item.to" 
                class="active-indicator"
              />

              <!-- Icono mejorado -->
              <div class="icon-container" :class="$route.path === item.to ? 'icon-active' : 'icon-inactive'">
                <svg viewBox="0 0 24 24" class="h-5 w-5">
                  <path :d="$icons[item.icon]" fill="currentColor" />
                </svg>
              </div>

              <!-- Texto con mejor tipografía -->
              <div v-if="!rail" class="text-container">
                <span class="nav-text" :class="$route.path === item.to ? 'text-active' : 'text-inactive'">
                  {{ item.title }}
                </span>
              </div>

              <!-- Efecto hover -->
              <div class="hover-effect" />
            </router-link>
          </template>
        </v-tooltip>
      </div>
    </div>

    <!-- Footer mejorado -->
    <template #append>
      <div class="footer-section">
        <!-- Card de usuario mejorado -->
        <div v-if="!rail" class="user-card">
          <UserActionsCard
            :user="user"
            @profile="goToProfile"
            @settings="$emit('settings')"
            @logout="$emit('logout')"
          />
        </div>

        <!-- Avatar minimalista -->
        <div v-else class="user-avatar-mini">
          <div class="avatar-container" @click="$emit('toggle')">
            <span class="avatar-text">
              {{ user?.username?.charAt(0).toUpperCase() }}
            </span>
          </div>
        </div>

        <!-- Copyright con mejor diseño -->
        <div class="copyright">
          <div class="copyright-text">© 2025 SIMTRA</div>
          <div class="copyright-dots">
            <div class="dot dot-1"></div>
            <div class="dot dot-2"></div>
            <div class="dot dot-3"></div>
          </div>
        </div>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script setup>
import { computed, defineEmits, defineProps } from 'vue'
import { useRouter } from 'vue-router'
import UserActionsCard from './UserMenuComponent.vue'

const router = useRouter()

const props = defineProps({
  modelValue: { type: Boolean, default: true },
  rail: { type: Boolean, default: false },
  items: { type: Array, default: () => [] },
  user: { type: Object, default: null },
})

const emit = defineEmits(['update:modelValue', 'toggle', 'logout', 'settings'])

const model = computed({
  get: () => props.modelValue,
  set: (v) => emit('update:modelValue', v),
})

function goToProfile() {
  router.push({ name: 'profile' })
}
</script>

<style scoped>
/* Sidebar principal */
.sidebar-elegant {
  background: linear-gradient(180deg, #ffffff 0%, #f8fafc 30%, #f1f5f9 100%);
  border-right: 1px solid #e2e8f0;
  box-shadow: 0 4px 20px rgba(30, 127, 20, 0.08);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Header Section */
.header-section {
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  border-bottom: 1px solid #cbd5e1;
  position: relative;
  overflow: hidden;
}

.header-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, rgba(30, 127, 20, 0.02) 0%, transparent 50%);
  pointer-events: none;
}

.header-expanded {
  padding: 24px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 1;
}

.header-collapsed {
  padding: 20px;
  display: flex;
  justify-content: center;
  position: relative;
  z-index: 1;
}

.logo-container {
  flex: 1;
}

.logo-text {
  font-size: 28px;
  font-weight: 800;
  letter-spacing: 2px;
  margin-bottom: 4px;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
}

.logo-subtitle {
  font-size: 11px;
  color: #64748b;
  font-weight: 500;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.toggle-btn {
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.toggle-btn-expanded {
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #1e7f14 0%, #4d9f3f 100%);
  border: 1px solid rgba(30, 127, 20, 0.2);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(30, 127, 20, 0.15);
}

.toggle-btn-expanded:hover {
  background: linear-gradient(135deg, #145214 0%, #4d9f3f 100%);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(30, 127, 20, 0.25);
}

.toggle-btn-collapsed {
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, #1e7f14 0%, #4d9f3f 100%);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 3px 10px rgba(30, 127, 20, 0.2);
}

.toggle-btn-collapsed:hover {
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 6px 16px rgba(30, 127, 20, 0.3);
}

.logo-mini {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Navigation Section */
.navigation-section {
  padding: 10px 12px;
  flex: 1;
  overflow-y: auto;
}

.nav-item-wrapper {
  margin-bottom: 2px;
}

.nav-item {
  display: flex;
  align-items: center;
  text-decoration: none;
  border-radius: 11px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  border: 1px solid transparent;
  backdrop-filter: blur(5px);
}

.nav-item-full {
  padding: 8px 8px;
  gap: 8px;
}

.nav-item-rail {
  padding: 8px;
  justify-content: center;
  margin: 0 8px;
}

.nav-item-active {
  background: linear-gradient(135deg, rgba(30, 127, 20, 0.08) 0%, rgba(77, 159, 63, 0.06) 100%);
  border-color: rgba(30, 127, 20, 0.15);
  box-shadow: 0 2px 8px rgba(30, 127, 20, 0.08);
}

.nav-item-inactive {
  background: linear-gradient(135deg, rgba(248, 250, 252, 0.7) 0%, rgba(241, 245, 249, 0.5) 100%);
  border-color: rgba(10, 112, 68, 0.139);
}

.nav-item-inactive:hover {
  background: linear-gradient(135deg, rgba(30, 127, 20, 0.05) 0%, rgba(77, 159, 63, 0.03) 100%);
  border-color: rgba(125, 191, 107, 0.3);
  transform: translateX(4px);
  box-shadow: 0 4px 12px rgba(30, 127, 20, 0.08);
}

.active-indicator {
  position: absolute;
  left: 0;
  top: 20%;
  bottom: 20%;
  width: 4px;
  background: linear-gradient(180deg, #1e7f14 0%, #4d9f3f 100%);
  border-radius: 0 2px 2px 0;
  box-shadow: 0 0 6px rgba(30, 127, 20, 0.3);
}

.icon-container {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;
}

.icon-active {
  background: linear-gradient(135deg, #1e7f14 0%, #4d9f3f 100%);
  color: white;
  box-shadow: 0 3px 10px rgba(30, 127, 20, 0.25);
}

.icon-inactive {
  background: linear-gradient(135deg, rgba(30, 127, 20, 0.08) 0%, rgba(77, 159, 63, 0.05) 100%);
  color: #1e7f14;
  border: 1px solid rgba(30, 127, 20, 0.1);
}

.nav-item-inactive:hover .icon-inactive {
  background: linear-gradient(135deg, #4d9f3f 0%, #7dbf6b 100%);
  color: white;
  transform: scale(1.05);
  box-shadow: 0 3px 10px rgba(77, 159, 63, 0.3);
  border-color: transparent;
}

.text-container {
  flex: 1;
  min-width: 0;
}

.nav-text {
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.025em;
  transition: color 0.3s ease;
}

.text-active {
  color: #1e7f14;
}

.text-inactive {
  color: #475569;
}

.hover-effect {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent 0%, rgba(125, 191, 107, 0.05) 50%, transparent 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.nav-item:hover .hover-effect {
  opacity: 1;
}

/* Footer Section */
.footer-section {
  border-top: 1px solid #e2e8f0;
  background: linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%);
}

.user-card {
  padding: 10px;
}

.user-avatar-mini {
  display: flex;
  justify-content: center;
}

.avatar-container {
  width: 44px;
  height: 44px;
  background: linear-gradient(135deg, #1e7f14 0%, #4d9f3f 50%, #059669 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(30, 127, 20, 0.2);
  border: 2px solid rgba(255,255,255,0.9);
}

.avatar-container:hover {
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 8px 20px rgba(30, 127, 20, 0.3);
}

.avatar-text {
  color: white;
  font-weight: 700;
  font-size: 16px;
  text-shadow: 0 1px 2px rgba(0,0,0,0.1);
}

.copyright {
  padding: 10px;
  text-align: center;
  position: relative;
}

.copyright-text {
  font-size: 11px;
  color: #94a3b8;
  font-weight: 500;
  letter-spacing: 0.5px;
  margin-bottom: 1px;
}

.copyright-dots {
  display: flex;
  justify-content: center;
  gap: 4px;
}

.dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

.dot-1 {
  background: #1e7f14;
  animation-delay: 0s;
}

.dot-2 {
  background: #4d9f3f;
  animation-delay: 0.3s;
}

.dot-3 {
  background: #059669;
  animation-delay: 0.6s;
}

@keyframes pulse {
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.2); }
}

/* Transiciones globales */
.v-navigation-drawer {
  transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
}

/* Scroll personalizado */
.navigation-section::-webkit-scrollbar {
  width: 4px;
}

.navigation-section::-webkit-scrollbar-track {
  background: transparent;
}

.navigation-section::-webkit-scrollbar-thumb {
  background: rgba(125, 191, 107, 0.3);
  border-radius: 2px;
}

.navigation-section::-webkit-scrollbar-thumb:hover {
  background: rgba(125, 191, 107, 0.5);
}

/* Mejoras de rendimiento */
* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  backface-visibility: hidden;
}

/* Responsive */
@media (max-width: 768px) {
  .sidebar-elegant {
    box-shadow: 0 0 20px rgba(0,0,0,0.1);
  }
}
</style>