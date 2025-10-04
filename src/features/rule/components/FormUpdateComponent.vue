<template>
  <div v-if="show" class="fixed inset-0 bg-black/40 flex items-center justify-center z-[2000]"
    @click.self="$emit('close')">
    <div
      class="bg-white/100 dark:bg-slate-800/100 rounded-lg shadow-xl w-full max-w-6xl mx-4 max-h-[90vh] overflow-y-auto">
      <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-slate-600">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
          Actualizar Regla de Monitoreo
        </h2>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-1 gap-6 mb-8">

          <div>
            <label for="ruleName" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Nombre de la Regla *
            </label>
            <input id="ruleName" v-model="form.ruleName" type="text" :class="inputClasses('ruleName')"
              placeholder="Ej: Alerta por alta temperatura" required />
            <p v-if="errors.ruleName" class="mt-1 text-sm text-red-600">{{ errors.ruleName }}</p>
          </div>
        </div>

        <!-- Tipo de Regla -->
        <div class="mb-6">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-3">Tipo de Regla</h3>
          <div class="grid grid-cols-2 md:grid-cols-7 gap-2">
            <div v-for="ruleType in ruleTypes" :key="ruleType.value" class="relative">
              <input :id="ruleType.value" v-model="form.ruleType" :value="ruleType.value" type="radio" name="ruleType"
                class="sr-only peer" required />
              <label :for="ruleType.value"
                class="flex flex-col items-center justify-center p-4 text-sm font-medium text-center text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-color1 peer-checked:border-color1 peer-checked:text-color1 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 transition-all">
                <div class="text-xl mb-2">{{ ruleType.icon }}</div>
                {{ ruleType.label }}
                <div class="text-xs text-gray-400 mt-1">{{ ruleType.unit }}</div>
              </label>
            </div>
          </div>
          <p v-if="errors.ruleType" class="mt-2 text-sm text-red-600">{{ errors.ruleType }}</p>
        </div>

        <!-- Configuración TEMPERATURA -->
        <div v-if="form.ruleType === 'TEMPERATURA'" class="mb-1">
          <div class="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <div class="flex items-start space-x-3 mb-4">
              <div class="flex-shrink-0">
                <div class="text-2xl">🌡️</div>
              </div>
              <div>
                <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-2">Monitoreo de Temperatura</h4>
                <p class="text-sm text-gray-600 dark:text-gray-300">
                  Define los niveles de temperatura que activarán las alertas en grados Celsius.
                </p>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div
                class="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg">
                <label class="block text-sm font-medium text-green-700 dark:text-green-300 mb-2">
                  Normal (°C) *
                </label>
                <input v-model.number="form.config.normalValue.value" type="number"
                  class="w-full px-3 py-2 border border-green-300 dark:border-green-700 rounded-md focus:outline-none focus:ring-2 focus:ring-color1 bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
                  placeholder="70" required />
                <label class="block text-sm font-medium text-green-700 dark:text-green-300 mt-2 mb-2">
                  Mensaje Normal (SOBRETEMPERATURA) *
                </label>
                <input v-model="form.config.normalValue.message" type="text"
                  class="w-full px-3 py-2 border border-green-300 dark:border-green-700 rounded-md focus:outline-none focus:ring-2 focus:ring-color1 bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
                  required />
              </div>

              <div
                class="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg">
                <label class="block text-sm font-medium text-yellow-700 dark:text-yellow-300 mb-2">
                  Precaución (°C) *
                </label>
                <input v-model.number="form.config.warningValue.value" type="number"
                  class="w-full px-3 py-2 border border-yellow-300 dark:border-yellow-700 rounded-md focus:outline-none focus:ring-2 focus:ring-color1 bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
                  placeholder="80" required />
                <label class="block text-sm font-medium text-yellow-700 dark:text-yellow-300 mt-2 mb-2">
                  Mensaje Precaución (SOBRETEMPERATURA) *
                </label>
                <input v-model="form.config.warningValue.message" type="text"
                  class="w-full px-3 py-2 border border-yellow-300 dark:border-yellow-700 rounded-md focus:outline-none focus:ring-2 focus:ring-color1 bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
                  required />
              </div>

              <div class="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg">
                <label class="block text-sm font-medium text-red-700 dark:text-red-300 mb-2">
                  Crítico (°C) *
                </label>
                <input v-model.number="form.config.criticalValue.value" type="number"
                  class="w-full px-3 py-2 border border-red-300 dark:border-red-700 rounded-md focus:outline-none focus:ring-2 focus:ring-color1 bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
                  placeholder="90" required />
                <label class="block text-sm font-medium text-red-700 dark:text-red-300 mt-2 mb-2">
                  Mensaje Crítico (SOBRETEMPERATURA)*
                </label>
                <input v-model="form.config.criticalValue.message" type="text"
                  class="w-full px-3 py-2 border border-red-300 dark:border-red-700 rounded-md focus:outline-none focus:ring-2 focus:ring-color1 bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
                  required />
              </div>
            </div>


          </div>
        </div>

        <!-- Configuración POTENCIA -->
        <div v-else-if="form.ruleType === 'POTENCIA'" class="mb-1">
          <div class="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <div class="flex items-start space-x-3 mb-4">
              <div class="flex-shrink-0">
                <div class="text-2xl">💪</div>
              </div>
              <div>
                <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-2">Monitoreo de Potencia</h4>
                <p class="text-sm text-gray-600 dark:text-gray-300">
                  Define los niveles de potencia que activarán las alertas en porcentaje.
                </p>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div
                class="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg">
                <label class="block text-sm font-medium text-green-700 dark:text-green-300 mb-2">
                  Normal (%) *
                </label>
                <input v-model.number="form.config.normalValue.value" type="number"
                  class="w-full px-3 py-2 border border-green-300 dark:border-green-700 rounded-md focus:outline-none focus:ring-2 focus:ring-color1 bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
                  placeholder="70" min="0" max="100" required />
                <label class="block text-sm font-medium text-green-700 dark:text-green-300 mt-2 mb-2">
                  Mensaje Normal (SOBREPOTENCIA) *
                </label>
                <input v-model="form.config.normalValue.message" type="text"
                  class="w-full px-3 py-2 border border-green-300 dark:border-green-700 rounded-md focus:outline-none focus:ring-2 focus:ring-color1 bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
                  required />
              </div>

              <div
                class="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg">
                <label class="block text-sm font-medium text-yellow-700 dark:text-yellow-300 mb-2">
                  Precaución (%) *
                </label>
                <input v-model.number="form.config.warningValue.value" type="number"
                  class="w-full px-3 py-2 border border-yellow-300 dark:border-yellow-700 rounded-md focus:outline-none focus:ring-2 focus:ring-color1 bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
                  placeholder="80" min="0" max="100" required />
                <label class="block text-sm font-medium text-yellow-700 dark:text-yellow-300 mt-2 mb-2">
                  Mensaje Precaución (SOBREPOTENCIA) *
                </label>
                <input v-model="form.config.warningValue.message" type="text"
                  class="w-full px-3 py-2 border border-yellow-300 dark:border-yellow-700 rounded-md focus:outline-none focus:ring-2 focus:ring-color1 bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
                  required />
              </div>

              <div class="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg">
                <label class="block text-sm font-medium text-red-700 dark:text-red-300 mb-2">
                  Crítico (%) *
                </label>
                <input v-model.number="form.config.criticalValue.value" type="number"
                  class="w-full px-3 py-2 border border-red-300 dark:border-red-700 rounded-md focus:outline-none focus:ring-2 focus:ring-color1 bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
                  placeholder="90" min="0" max="100" required />
                <label class="block text-sm font-medium text-red-700 dark:text-red-300 mt-2 mb-2">
                  Mensaje Crítico (SOBREPOTENCIA) *
                </label>
                <input v-model="form.config.criticalValue.message" type="text"
                  class="w-full px-3 py-2 border border-red-300 dark:border-red-700 rounded-md focus:outline-none focus:ring-2 focus:ring-color1 bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
                  required />
              </div>
            </div>
          </div>
        </div>

        <!-- Configuración TENSION -->
        <div v-else-if="form.ruleType === 'TENSION'" class="mb-1">
          <div class="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <div class="flex items-start space-x-3 mb-4">
              <div class="flex-shrink-0">
                <div class="text-2xl">⚡</div>
              </div>
              <div>
                <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-2">Monitoreo de Tensión</h4>
                <div class="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <p><strong class="text-color1 dark:text-color3">URBANO:</strong> ±5% de la tensión nominal/de
                    operación</p>
                  <p><strong class="text-color1 dark:text-color3">RURAL:</strong> ±7.5% de la tensión nominal/de
                    operación</p>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div class="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg">
                <label class="block text-sm font-medium text-red-700 dark:text-red-300 mb-2">
                  🏢 Urbano (V) *
                </label>
                <input v-model.number="form.config.urbanValue.value" type="number"
                  class="w-full px-3 py-2 border border-green-300 dark:border-green-700 rounded-md focus:outline-none focus:ring-2 focus:ring-color1 bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
                  placeholder="5" required />
                <label class="block text-sm font-medium text-red-700 dark:text-red-300 mb-2">
                  Mensaje Urbano (SOBRETENSIÓN)*
                </label>
                <input v-model="form.config.urbanValue.message" type="text"
                  class="w-full px-3 py-2 border border-green-300 dark:border-green-700 rounded-md focus:outline-none focus:ring-2 focus:ring-color1 bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
                  required />
              </div>

              <div class="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg">
                <label class="block text-sm font-medium text-red-700 dark:text-red-300 mb-2">
                  🌾 Rural (V) *
                </label>
                <input v-model.number="form.config.ruralValue.value" type="number"
                  class="w-full px-3 py-2 border border-yellow-300 dark:border-yellow-700 rounded-md focus:outline-none focus:ring-2 focus:ring-color1 bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
                  placeholder="7.5" required step="any" />
                <label class="block text-sm font-medium text-red-700 dark:text-red-300 mb-2">
                  Mensaje Rural (SOBRETENSIÓN) *
                </label>
                <input v-model="form.config.ruralValue.message" type="text"
                  class="w-full px-3 py-2 border border-yellow-300 dark:border-yellow-700 rounded-md focus:outline-none focus:ring-2 focus:ring-color1 bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
                  required />
              </div>
            </div>

            <div class="border-t border-gray-200 dark:border-slate-600 pt-4 mt-4">
              <h5 class="text-sm font-medium text-gray-900 dark:text-white mb-3">Valores Negativos</h5>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg">
                  <label class="block text-sm font-medium text-red-700 dark:text-red-300 mb-2">
                    🏢 Urbano (V) *
                  </label>
                  <input v-model.number="form.config.urbanValueNegative.value" type="number"
                    class="w-full px-3 py-2 border border-green-300 dark:border-green-700 rounded-md focus:outline-none focus:ring-2 focus:ring-color1 bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
                    placeholder="-5" required />
                  <label class="block text-sm font-medium text-red-700 dark:text-red-300 mb-2">
                    Mensaje Urbano (SUBTENSIÓN) *
                  </label>
                  <input v-model="form.config.urbanValueNegative.message" type="text"
                    class="w-full px-3 py-2 border border-green-300 dark:border-green-700 rounded-md focus:outline-none focus:ring-2 focus:ring-color1 bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
                    required />
                </div>

                <div class="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg">
                  <label class="block text-sm font-medium text-red-700 dark:text-red-300 mb-2">
                    🌾 Rural (V) *
                  </label>
                  <input v-model.number="form.config.ruralValueNegative.value" type="number"
                    class="w-full px-3 py-2 border border-yellow-300 dark:border-yellow-700 rounded-md focus:outline-none focus:ring-2 focus:ring-color1 bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
                    placeholder="-7.5" required step="any" />
                  <label class="block text-sm font-medium text-red-700 dark:text-red-300 mb-2">
                    Mensaje Rural (SUBTENSIÓN) *
                  </label>
                  <input v-model="form.config.ruralValueNegative.message" type="text"
                    class="w-full px-3 py-2 border border-yellow-300 dark:border-yellow-700 rounded-md focus:outline-none focus:ring-2 focus:ring-color1 bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
                    required />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Configuración CORRIENTE -->
        <div v-else-if="form.ruleType === 'CORRIENTE'" class="mb-1">
          <div class="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <div class="flex items-start space-x-3 mb-4">
              <div class="flex-shrink-0">
                <div class="text-2xl">🔌</div>
              </div>
              <div>
                <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-2">Monitoreo de Corriente</h4>
                <p class="text-sm text-gray-600 dark:text-gray-300">
                  Porcentaje de la diferencia de corriente entre fases que produce desbalance.
                </p>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div
                class="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg">
                <label class="block text-sm font-medium text-green-700 dark:text-green-300 mb-2">
                  Normal (%) *
                </label>
                <input v-model.number="form.config.normalValue.value" type="number"
                  class="w-full px-3 py-2 border border-green-300 dark:border-green-700 rounded-md focus:outline-none focus:ring-2 focus:ring-color1 bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
                  placeholder="220" required />
                <label class="block text-sm font-medium text-green-700 dark:text-green-300 mt-2 mb-2">
                  Mensaje Normal (DESCALANCE)*
                </label>
                <input v-model="form.config.normalValue.message" type="text"
                  class="w-full px-3 py-2 border border-green-300 dark:border-green-700 rounded-md focus:outline-none focus:ring-2 focus:ring-color1 bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
                  required />
              </div>

              <div
                class="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg">
                <label class="block text-sm font-medium text-yellow-700 dark:text-yellow-300 mb-2">
                  Precaución (%) *
                </label>
                <input v-model.number="form.config.warningValue.value" type="number"
                  class="w-full px-3 py-2 border border-yellow-300 dark:border-yellow-700 rounded-md focus:outline-none focus:ring-2 focus:ring-color1 bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
                  placeholder="240" required />
                <label class="block text-sm font-medium text-yellow-700 dark:text-yellow-300 mt-2 mb-2">
                  Mensaje Precaución (DESCALANCE) *
                </label>
                <input v-model="form.config.warningValue.message" type="text"
                  class="w-full px-3 py-2 border border-yellow-300 dark:border-yellow-700 rounded-md focus:outline-none focus:ring-2 focus:ring-color1 bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
                  required />
              </div>

              <div class="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg">
                <label class="block text-sm font-medium text-red-700 dark:text-red-300 mb-2">
                  Crítico (%) *
                </label>
                <input v-model.number="form.config.criticalValue.value" type="number"
                  class="w-full px-3 py-2 border border-red-300 dark:border-red-700 rounded-md focus:outline-none focus:ring-2 focus:ring-color1 bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
                  placeholder="260" required />
                <label class="block text-sm font-medium text-red-700 dark:text-red-300 mt-2 mb-2">
                  Mensaje Crítico (DESCALANCE)*
                </label>
                <input v-model="form.config.criticalValue.message" type="text"
                  class="w-full px-3 py-2 border border-red-300 dark:border-red-700 rounded-md focus:outline-none focus:ring-2 focus:ring-color1 bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
                  required />
              </div>
            </div>

          </div>
        </div>

        <!-- Configuración FRECUENCIA -->
        <div v-else-if="form.ruleType === 'FRECUENCIA'" class="mb-1">
          <div class="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <div class="flex items-start space-x-3 mb-4">
              <div class="flex-shrink-0">
                <div class="text-2xl">📊</div>
              </div>
              <div>
                <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-2">Monitoreo de Frecuencia</h4>
                <p class="text-sm text-gray-600 dark:text-gray-300">
                  ±0.001% de la frecuencia nominal
                </p>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg">
                <label class="block text-sm font-medium text-red-700 dark:text-red-300 mb-2">
                  Crítico (Hz) *
                </label>
                <input v-model.number="form.config.criticalValue.value" type="number" step="any"
                  class="w-full px-3 py-2 border border-red-300 dark:border-red-700 rounded-md focus:outline-none focus:ring-2 focus:ring-color1 bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
                  placeholder="0.001" required />
                <label class="block text-sm font-medium text-red-700 dark:text-red-300 mt-2 mb-2">
                  Mensaje Crítico (SOBREFRECUENCIA)*
                </label>
                <input v-model="form.config.criticalValue.message" type="text"
                  class="w-full px-3 py-2 border border-red-300 dark:border-red-700 rounded-md focus:outline-none focus:ring-2 focus:ring-color1 bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
                  required />
              </div>

              <div class="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg">
                <label class="block text-sm font-medium text-red-700 dark:text-red-300 mb-2">
                  Crítico (Hz) *
                </label>
                <input v-model.number="form.config.criticalValueNegative.value" type="number" step="any"
                  class="w-full px-3 py-2 border border-red-300 dark:border-red-700 rounded-md focus:outline-none focus:ring-2 focus:ring-color1 bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
                  placeholder="-0.001" required />
                <label class="block text-sm font-medium text-red-700 dark:text-red-300 mt-2 mb-2">
                  Mensaje Crítico (SUBFRECUENCIA) *
                </label>
                <input v-model="form.config.criticalValueNegative.message" type="text"
                  class="w-full px-3 py-2 border border-red-300 dark:border-red-700 rounded-md focus:outline-none focus:ring-2 focus:ring-color1 bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
                  required />
              </div>
            </div>
          </div>
        </div>

        <!-- Configuración THDV -->
        <div v-else-if="form.ruleType === 'THDV'" class="mb-1">
          <div class="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <div class="flex items-start space-x-3 mb-4">
              <div class="flex-shrink-0">
                <div class="text-2xl">📈</div>
              </div>
              <div>
                <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-2">Monitoreo de THDV</h4>
                <p class="text-sm text-gray-600 dark:text-gray-300">
                  5% de la tasa de distorsión armónica en cada fase
                </p>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg">
                <label class="block text-sm font-medium text-red-700 dark:text-red-300 mb-2">
                  Crítico (%) *
                </label>
                <input v-model.number="form.config.criticalValue.value" type="number"
                  class="w-full px-3 py-2 border border-red-300 dark:border-red-700 rounded-md focus:outline-none focus:ring-2 focus:ring-color1 bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
                  placeholder="5" min="0" max="100" required />
                <label class="block text-sm font-medium text-red-700 dark:text-red-300 mt-2 mb-2">
                  Mensaje Crítico *
                </label>
                <input v-model="form.config.criticalValue.message" type="text"
                  class="w-full px-3 py-2 border border-red-300 dark:border-red-700 rounded-md focus:outline-none focus:ring-2 focus:ring-color1 bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
                  required />
              </div>

            </div>
          </div>
        </div>

        <div v-else-if="form.ruleType === 'THDI'" class="mb-1">
          <div class="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <div class="flex items-start space-x-3 mb-4">
              <div class="flex-shrink-0">
                <div class="text-2xl">📉</div>
              </div>
              <div>
                <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-2">Monitoreo de THDI</h4>
                <p class="text-sm text-gray-600 dark:text-gray-300">
                  18% de la tasa de distorsión armónica en cada fase
                </p>
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg">
                <label class="block text-sm font-medium text-red-700 dark:text-red-300 mb-2">
                  Crítico (%) *
                </label>
                <input v-model.number="form.config.criticalValue.value" type="number"
                  class="w-full px-3 py-2 border border-red-300 dark:border-red-700 rounded-md focus:outline-none focus:ring-2 focus:ring-color1 bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
                  placeholder="18" min="0" max="100" required />
                <label class="block text-sm font-medium text-red-700 dark:text-red-300 mt-2 mb-2">
                  Mensaje Crítico *
                </label>
                <input v-model="form.config.criticalValue.message" type="text"
                  class="w-full px-3 py-2 border border-red-300 dark:border-red-700 rounded-md focus:outline-none focus:ring-2 focus:ring-color1 bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
                  required />
              </div>
            </div>
          </div>
        </div>

        <div v-if="form.ruleType"
          class="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <div class="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg">
            <label class="block text-sm font-medium text-red-700 dark:text-red-300 mb-2">
              {{ messageLabels[form.ruleType] || 'Mensaje' }}
            </label>
            <input id="general1Message" v-model="form.config.general1Value.message" type="text"
              class="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-color1 bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
              placeholder="Mensaje general para la regla" required />
            <p v-if="errors.general1Message" class="mt-1 text-sm text-red-600">{{ errors.general1Message }}</p>
          </div>

        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
          v-if="auth.user.role !== 'FACTORY' && auth.user.role !== 'CUSTOMER'">

          <div class="mb-8">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Fábricas</h3>
            <div class="border border-gray-200 dark:border-slate-600 rounded-lg p-4">
              <div class="flex flex-wrap gap-2 mb-4">
                <button type="button" @click="selectAllFactories"
                  class="px-3 py-1 text-xs font-medium text-blue-700 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-800/50 rounded-md transition-colors">
                  Seleccionar Todos
                </button>
                <button type="button" @click="clearAllFactories"
                  class="px-3 py-1 text-xs font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 rounded-md transition-colors">
                  Limpiar Selección
                </button>
              </div>

              <div v-if="dataFactory.length > 0" class="space-y-2 max-h-40 overflow-y-auto">
                <div v-for="factory in dataFactory" :key="factory.uid"
                  class="flex items-center space-x-3 p-2 border border-gray-100 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <input :id="`factory-${factory.uid}`" v-model="form.selectedFactories" :value="factory.uid"
                    type="checkbox" class="h-4 w-4 text-color1 focus:ring-color1 border-gray-300 rounded" />
                  <label :for="`factory-${factory.uid}`" class="flex-1 cursor-pointer">
                    <div class="flex items-center gap-2">
                      <span class="font-medium text-gray-900 dark:text-white text-sm">{{ factory.name }}</span>
                      <span
                        class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                        {{ factory.code || 'Sin código' }} - {{ factory.businessName || 'Razón social' }}
                      </span>
                    </div>
                  </label>
                </div>
              </div>
              <div v-else class="text-center py-4 text-gray-500 dark:text-gray-400">
                <p class="text-sm">No hay fábricas disponibles</p>
              </div>
            </div>
          </div>

          <!-- Selección de Clientes -->
          <div class="mb-8">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Clientes</h3>
            <div class="border border-gray-200 dark:border-slate-600 rounded-lg p-4">
              <div class="flex flex-wrap gap-2 mb-4">
                <button type="button" @click="selectAllCustomers"
                  class="px-3 py-1 text-xs font-medium text-blue-700 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-800/50 rounded-md transition-colors">
                  Seleccionar Todos
                </button>
                <button type="button" @click="clearAllCustomers"
                  class="px-3 py-1 text-xs font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 rounded-md transition-colors">
                  Limpiar Selección
                </button>
              </div>

              <div v-if="dataCustomer.length > 0" class="space-y-2 max-h-40 overflow-y-auto">
                <div v-for="customer in dataCustomer" :key="customer.uid"
                  class="flex items-center space-x-3 p-2 border border-gray-100 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <input :id="`customer-${customer.uid}`" v-model="form.selectedCustomers" :value="customer.uid"
                    type="checkbox" class="h-4 w-4 text-color1 focus:ring-color1 border-gray-300 rounded" />
                  <label :for="`customer-${customer.uid}`" class="flex-1 cursor-pointer">
                    <div class="flex items-center gap-2">
                      <span class="font-medium text-gray-900 dark:text-white text-sm">{{ customer.name }}</span>
                      <span
                        class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                        {{ customer.code || 'Sin código' }} - {{ customer.businessname || 'Razón social' }}
                      </span>
                    </div>
                  </label>
                </div>
              </div>
              <div v-else class="text-center py-4 text-gray-500 dark:text-gray-400">
                <p class="text-sm">No hay clientes disponibles</p>
              </div>
            </div>
          </div>
        </div>

        <div v-if="form.ruleType" class="mb-8">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Alertas Asociadas</h3>
          <div v-if="availableAlerts.length > 0" class="border border-gray-200 dark:border-slate-600 rounded-lg p-4">
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Selecciona las alertas que se activarán cuando esta regla se cumpla.
            </p>

            <!-- Buscador de Alertas -->
            <div class="mb-4">
              <div class="relative">
                <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" fill="none"
                  stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
                <input v-model="alertSearchTerm" type="text"
                  placeholder="Buscar alertas por nombre, código o descripción..."
                  class="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-color1 bg-white dark:bg-slate-700 text-gray-900 dark:text-white" />
                <button v-if="alertSearchTerm" @click="alertSearchTerm = ''" type="button"
                  class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12">
                    </path>
                  </svg>
                </button>
              </div>
            </div>

            <div class="space-y-3 max-h-60 overflow-y-auto">
              <div v-for="alert in filteredAlerts" :key="alert.uid"
                class="flex items-start space-x-3 p-3 border border-gray-100 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <input :id="`alert-${alert.uid}`" v-model="form.selectedAlerts" :value="alert.uid" type="checkbox"
                  class="h-4 w-4 text-color1 focus:ring-color1 border-gray-300 rounded mt-1" />
                <label :for="`alert-${alert.uid}`" class="flex-1 cursor-pointer">
                  <div class="flex items-center gap-2 mb-1">
                    <span class="font-medium text-gray-900 dark:text-white text-sm">{{ alert.name }}</span>
                    <span
                      class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                      {{ alert.code }}
                    </span>
                    <span :class="[
                      'inline-flex items-center px-2 py-0.5 rounded text-xs font-medium',
                      alert.type === 'WHATSAPP'
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                        : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                    ]">
                      {{ alert.type }}
                    </span>
                  </div>
                </label>
              </div>

              <!-- Mensaje cuando no hay resultados de búsqueda -->
              <div v-if="filteredAlerts.length === 0 && alertSearchTerm"
                class="text-center py-4 text-gray-500 dark:text-gray-400">
                <svg class="mx-auto h-8 w-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
                <p class="text-sm">No se encontraron alertas que coincidan con "{{ alertSearchTerm }}"</p>
              </div>
            </div>
            <p v-if="errors.selectedAlerts" class="mt-2 text-sm text-red-600">{{ errors.selectedAlerts }}</p>
          </div>
          <div v-else class="text-center py-8 text-gray-500 dark:text-gray-400">
            <svg class="mx-auto h-12 w-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M15 17h5l-5 5-5-5h5v-12h5v12z" />
            </svg>
            <p class="text-sm">No hay alertas disponibles. Crea alertas primero para asociarlas a esta regla.</p>
          </div>
        </div>

        <div class="flex items-center mb-6">
          <input id="isActive" v-model="form.isActive" type="checkbox"
            class="h-4 w-4 text-color1 focus:ring-color1 border-gray-300 rounded" />
          <label for="isActive" class="ml-2 block text-sm text-gray-700 dark:text-gray-300">
            Regla activa
          </label>
        </div>

        <!-- Botones -->
        <div class="flex justify-end gap-3 pt-6 border-t border-gray-200 dark:border-slate-600">
          <button type="button" @click="$emit('close')"
            class="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-slate-600 dark:text-gray-300 dark:hover:bg-slate-500 rounded-md transition-colors border border-gray-300 dark:border-slate-500">
            Cancelar
          </button>
          <button type="submit" :disabled="isLoading"
            class="px-6 py-2 text-sm font-medium text-white bg-color1 hover:bg-colorDark1 disabled:opacity-50 disabled:cursor-not-allowed rounded-md transition-colors shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-color1 focus:ring-offset-2 dark:focus:ring-offset-slate-800">
            <span class="flex items-center">
              <svg v-if="!isLoading" class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2z">
                </path>
              </svg>
              <svg v-if="isLoading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                </path>
              </svg>
              {{ isLoading ? 'Actualizando...' : 'Actualizar Regla' }}
            </span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch, defineProps, defineEmits, onMounted, computed, nextTick } from 'vue'
import { allCustomer } from '@/features/customer/services/customerService'
import { listFactory } from '@/features/factory/services/factoryService'
import { useAuthStore } from '@/features/auth/stores/authStore'
const dataCustomer = ref([])
const dataFactory = ref([])
const alertSearchTerm = ref('')
const auth = useAuthStore()
const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  alerts: {
    type: Array,
    default: () => []
  },
  ruleData: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['close', 'update'])

const isLoading = ref(false)
const errors = ref({})

const ruleTypes = ref([
  { value: 'TENSION', label: 'Tensión', icon: '⚡', unit: 'Voltios (V)' },
  { value: 'CORRIENTE', label: 'Corriente', icon: '🔌', unit: 'Amperios (A)' },
  { value: 'FRECUENCIA', label: 'Frecuencia', icon: '📊', unit: 'Hertz (Hz)' },
  { value: 'POTENCIA', label: 'Potencia', icon: '💪', unit: 'Porcentaje (%)' },
  { value: 'THDV', label: 'THDV', icon: '📈', unit: 'Porcentaje (%)' },
  { value: 'THDI', label: 'THDI', icon: '📉', unit: 'Porcentaje (%)' },
  { value: 'TEMPERATURA', label: 'Temperatura', icon: '🌡️', unit: 'Celsius (°C)' }
])

const form = reactive({
  ruleType: '',
  ruleName: '',
  config: {
    general1Value: { value: 0, message: '' }
  },
  selectedAlerts: [],
  selectedFactories: [],
  selectedCustomers: [],
  isActive: true
})

const availableAlerts = ref([])

const messageLabels = {
  TEMPERATURA: "MENSAJE EXTRA",
  TENSION: "MENSAJE EXTRA",
  POTENCIA: "ENERGIA REACTIVA CAPACITIVA",
  CORRIENTE: "SOBRECORRIENTE",
  THDV: "MENSAJE EXTRA",
  THDI: "MENSAJE EXTRA"
}

const filteredAlerts = computed(() => {
  if (!alertSearchTerm.value) {
    return availableAlerts.value
  }

  const searchTerm = alertSearchTerm.value.toLowerCase()
  return availableAlerts.value.filter(alert =>
    alert.name.toLowerCase().includes(searchTerm) ||
    alert.code.toLowerCase().includes(searchTerm)
  )
})

// Métodos para seleccionar/limpiar fábricas
const selectAllFactories = () => {
  form.selectedFactories = dataFactory.value.map(factory => factory.uid)
}

const clearAllFactories = () => {
  form.selectedFactories = []
}

// Métodos para seleccionar/limpiar clientes
const selectAllCustomers = () => {
  form.selectedCustomers = dataCustomer.value.map(customer => customer.uid)
}

const clearAllCustomers = () => {
  form.selectedCustomers = []
}

const listCustomer = async () => {
  try {
    const response = await allCustomer()
    if (response) {
      console.log("lista de clientes")
      dataCustomer.value = response.data
    }
  } catch (error) {
    console.error("error al listar clientes", error)
  }
}

const listFactorys = async () => {
  try {
    const response = await listFactory()
    if (response) {
      console.log("lista de fábricas")
      dataFactory.value = response.data
    }
  } catch (error) {
    console.error("error al listar fábricas", error)
  }
}

const inputClasses = (fieldName) => {
  const baseClasses = 'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 bg-white dark:bg-slate-700 text-gray-900 dark:text-white'
  const errorClasses = 'border-red-500 focus:ring-red-500'
  const normalClasses = 'border-gray-300 dark:border-slate-600 focus:ring-accent-primary'

  return `${baseClasses} ${errors.value[fieldName] ? errorClasses : normalClasses}`
}

const fillForm = (data) => {
  if (!data || Object.keys(data).length === 0) return

  console.log('Llenando formulario con:', data)

  form.ruleType = data.type || ''
  form.ruleName = data.name || ''

  // Llenar configuración completa desde data.config
  if (data.config) {
    form.config = JSON.parse(JSON.stringify(data.config))

    // Asegurar que general1Value exista
    if (!form.config.general1Value) {
      form.config.general1Value = { value: 0, message: '' }
    }
  } else {
    form.config = {
      general1Value: { value: 0, message: '' }
    }
  }

  // Llenar alertas seleccionadas
  if (data.alerts && Array.isArray(data.alerts)) {
    form.selectedAlerts = data.alerts.map(alert => alert.uid)
  } else {
    form.selectedAlerts = []
  }

  // Llenar fábricas seleccionadas
  if (data.factoryIds && Array.isArray(data.factoryIds)) {
    form.selectedFactories = data.factoryIds
  } else {
    form.selectedFactories = []
  }

  // Llenar clientes seleccionados
  if (data.customerIds && Array.isArray(data.customerIds)) {
    form.selectedCustomers = data.customerIds
  } else {
    form.selectedCustomers = []
  }

  // Estado activo
  if (typeof data.isActive === 'string') {
    form.isActive = data.isActive === 'Activo'
  } else {
    form.isActive = Boolean(data.isActive)
  }
}

const resetForm = () => {
  form.ruleType = ''
  form.ruleName = ''
  form.config = {
    general1Value: { value: 0, message: '' }
  }
  form.selectedAlerts = []
  form.selectedFactories = []
  form.selectedCustomers = []
  form.isActive = true
  errors.value = {}
  alertSearchTerm.value = ''
}

const validateForm = () => {
  errors.value = {}

  if (!form.ruleType) {
    errors.value.ruleType = 'El tipo de regla es requerido'
  }

  if (!form.ruleName) {
    errors.value.ruleName = 'El nombre de la regla es requerido'
  }

  if (!form.config.general1Value.message) {
    errors.value.general1Message = 'El mensaje general es requerido'
  }

  // Validar según tipo de regla
  if (form.ruleType === 'TEMPERATURA' || form.ruleType === 'POTENCIA' || form.ruleType === 'CORRIENTE') {
    if (!form.config.normalValue?.value && form.config.normalValue?.value !== 0) {
      errors.value.normalValue = 'El valor normal es requerido'
    }
    if (!form.config.normalValue?.message) {
      errors.value.normalValueMessage = 'El mensaje normal es requerido'
    }
    if (!form.config.warningValue?.value && form.config.warningValue?.value !== 0) {
      errors.value.warningValue = 'El valor de precaución es requerido'
    }
    if (!form.config.warningValue?.message) {
      errors.value.warningValueMessage = 'El mensaje de precaución es requerido'
    }
    if (!form.config.criticalValue?.value && form.config.criticalValue?.value !== 0) {
      errors.value.criticalValue = 'El valor crítico es requerido'
    }
    if (!form.config.criticalValue?.message) {
      errors.value.criticalValueMessage = 'El mensaje crítico es requerido'
    }
    if (!form.config.normalValueNegative?.value && form.config.normalValueNegative?.value !== 0) {
      errors.value.normalValueNegative = 'El valor normal negativo es requerido'
    }
    if (!form.config.normalValueNegative?.message) {
      errors.value.normalValueNegativeMessage = 'El mensaje normal negativo es requerido'
    }
    if (!form.config.warningValueNegative?.value && form.config.warningValueNegative?.value !== 0) {
      errors.value.warningValueNegative = 'El valor de precaución negativo es requerido'
    }
    if (!form.config.warningValueNegative?.message) {
      errors.value.warningValueNegativeMessage = 'El mensaje de precaución negativo es requerido'
    }
    if (!form.config.criticalValueNegative?.value && form.config.criticalValueNegative?.value !== 0) {
      errors.value.criticalValueNegative = 'El valor crítico negativo es requerido'
    }
    if (!form.config.criticalValueNegative?.message) {
      errors.value.criticalValueNegativeMessage = 'El mensaje crítico negativo es requerido'
    }
  }

  if (form.ruleType === 'TENSION') {
    if (!form.config.urbanValue?.value && form.config.urbanValue?.value !== 0) {
      errors.value.urbanValue = 'El valor urbano es requerido'
    }
    if (!form.config.urbanValue?.message) {
      errors.value.urbanValueMessage = 'El mensaje urbano es requerido'
    }
    if (!form.config.ruralValue?.value && form.config.ruralValue?.value !== 0) {
      errors.value.ruralValue = 'El valor rural es requerido'
    }
    if (!form.config.ruralValue?.message) {
      errors.value.ruralValueMessage = 'El mensaje rural es requerido'
    }
    if (!form.config.urbanValueNegative?.value && form.config.urbanValueNegative?.value !== 0) {
      errors.value.urbanValueNegative = 'El valor urbano negativo es requerido'
    }
    if (!form.config.urbanValueNegative?.message) {
      errors.value.urbanValueNegativeMessage = 'El mensaje urbano negativo es requerido'
    }
    if (!form.config.ruralValueNegative?.value && form.config.ruralValueNegative?.value !== 0) {
      errors.value.ruralValueNegative = 'El valor rural negativo es requerido'
    }
    if (!form.config.ruralValueNegative?.message) {
      errors.value.ruralValueNegativeMessage = 'El mensaje rural negativo es requerido'
    }
  }

  if (form.ruleType === 'FRECUENCIA' || form.ruleType === 'THDV' || form.ruleType === 'THDI') {
    if (!form.config.criticalValue?.value && form.config.criticalValue?.value !== 0) {
      errors.value.criticalValue = 'El valor crítico es requerido'
    }
    if (!form.config.criticalValue?.message) {
      errors.value.criticalValueMessage = 'El mensaje crítico es requerido'
    }
    if (!form.config.criticalValueNegative?.value && form.config.criticalValueNegative?.value !== 0) {
      errors.value.criticalValueNegative = 'El valor crítico negativo es requerido'
    }
    if (!form.config.criticalValueNegative?.message) {
      errors.value.criticalValueNegativeMessage = 'El mensaje crítico negativo es requerido'
    }
  }

  if (form.selectedAlerts.length === 0) {
    errors.value.selectedAlerts = 'Debe seleccionar al menos una alerta'
  }

  return Object.keys(errors.value).length === 0
}

const handleSubmit = () => {
  if (validateForm()) {
    isLoading.value = true

    const updateData = {
      uid: props.ruleData.uid,
      data: {
        type: form.ruleType,
        name: form.ruleName,
        config: form.config,
        alerts: form.selectedAlerts,
        factoryIds: form.selectedFactories,
        customerIds: form.selectedCustomers,
        isActive: form.isActive
      }
    }

    console.log('Datos a actualizar:', updateData)

    setTimeout(() => {
      emit('update', updateData)
      isLoading.value = false
    }, 1000)
  }
}

watch(() => props.show, async (newVal) => {
  if (newVal) {
    resetForm()
    availableAlerts.value = props.alerts || []

    await nextTick()

    if (props.ruleData && Object.keys(props.ruleData).length > 0) {
      fillForm(props.ruleData)
    }
  } else {
    isLoading.value = false
  }
})

// Watcher para cambios en ruleData
watch(() => props.ruleData, (newData) => {
  if (newData && Object.keys(newData).length > 0 && props.show) {
    fillForm(newData)
  }
}, { deep: true, immediate: true })


watch(() => [...props.alerts], (newAlerts) => {
  availableAlerts.value = newAlerts || []
}, { immediate: true })



onMounted(() => {
  listCustomer()
  listFactorys()
})
</script>
