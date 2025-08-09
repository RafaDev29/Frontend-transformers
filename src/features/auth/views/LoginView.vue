<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-petroleum px-4 sm:px-6 lg:px-8 relative overflow-hidden">
  
    <div class="w-full max-w-5xl flex items-center justify-center lg:justify-between relative z-10">
     
      <div class="hidden lg:flex lg:w-1/2 justify-center items-center pr-8">
        <div class="relative">
          <div class="absolute inset-0 bg-gradient-to-r from-color2/20 via-color3/30 to-color1/20 rounded-3xl transform rotate-3 blur-2xl scale-110"></div>
          <img 
            src="@/assets/auth/login2.png" 
            alt="SEMT - Hombre con casco verde" 
            class="relative w-96 h-96 object-contain drop-shadow-2xl transform hover:scale-105 transition-transform duration-700 ease-out"
          />
        </div>
      </div>

      <div class="w-full lg:w-1/2 max-w-md relative">
        <div class="text-center mb-8">
          
          <div class="flex items-center justify-center space-x-1 text-3xl font-bold tracking-wider mb-3">
            <span class="text-color5 drop-shadow-sm">S</span>
            <span class="text-color4 drop-shadow-sm">E</span>
            <span class="text-color3 drop-shadow-sm">M</span>
            <span class="text-color2 drop-shadow-sm">T</span>
          </div>
          
          <p class="text-slate-300 text-sm">Ingresa a tu cuenta del Sistema de Monitoreo</p>
        </div>

        <div class="bg-white/5 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/10 p-8 hover:bg-white/10 transition-all duration-300">
          <FormLogin @submit="handleLogin" :loading="isLoading" />
          
          <div class="mt-6 mb-6">
            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-color3/20"></div>
              </div>
            </div>
          </div>


          <div class="mt-6 text-center space-y-2">
            <a href="#" class="text-color4/80 hover:text-color3 text-sm transition-colors duration-200 font-medium">
              ¿Olvidaste tu contraseña?
            </a>
            <div class="text-slate-400 text-xs">
              ¿No tienes cuenta? 
              <a href="#" class="text-color3 hover:text-color2 font-medium transition-colors duration-200">
                Solicitar acceso
              </a>
            </div>
          </div>
        </div>


        <div class="mt-8 text-center">

          <div class="flex items-center justify-center space-x-1 text-sm font-bold tracking-wider mb-2 opacity-60">
            <span class="text-color5">S</span>
            <span class="text-color4">E</span>
            <span class="text-color3">M</span>
            <span class="text-color2">T</span>
          </div>
          <p class="text-slate-400 text-xs mb-2">
            Sistema Eficiente de Monitoreo de Transformadores
          </p>
          <p class="text-slate-500 text-xs">© 2025 Todos los derechos reservados</p>
          <div class="flex justify-center items-center mt-3 space-x-4 text-slate-500">
            <a href="#" class="hover:text-color4 transition-colors text-xs">Política de Privacidad</a>
            <span class="w-1 h-1 bg-color3/50 rounded-full"></span>
            <a href="#" class="hover:text-color4 transition-colors text-xs">Términos de Uso</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import FormLogin from '../components/FormLogin.vue'

const isLoading = ref(false)

const handleLogin = async (credentials) => {
  isLoading.value = true
  
  try {

    console.log('Login attempt:', credentials)


    await new Promise(resolve => setTimeout(resolve, 1500))

    
  } catch (error) {
    console.error('Login error:', error)
  } finally {
    isLoading.value = false
  }
}
</script>