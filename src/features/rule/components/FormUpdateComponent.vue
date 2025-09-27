<template>
  <div v-if="show" class="fixed inset-0 bg-black/40 flex items-center justify-center z-[2000]">
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
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label for="ruleCode" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Código de Regla *
            </label>
            <input id="ruleCode" v-model="form.ruleCode" type="text" :class="inputClasses('ruleCode')"
              placeholder="TEMP_HIGH" required />
            <p v-if="errors.ruleCode" class="mt-1 text-sm text-red-600">{{ errors.ruleCode }}</p>
          </div>

          <div>
            <label for="ruleName" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Nombre de la Regla *
            </label>
            <input id="ruleName" v-model="form.ruleName" type="text" :class="inputClasses('ruleName')"
              placeholder="Ej: Alerta por alta temperatura" required />
            <p v-if="errors.ruleName" class="mt-1 text-sm text-red-600">{{ errors.ruleName }}</p>
          </div>
        </div>

        <div class="mb-2">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">Tipo de Regla</h3>
          <div class="grid grid-cols-2 md:grid-cols-7 gap-2">
            <div v-for="ruleType in ruleTypes" :key="ruleType.value" class="relative">
              <input :id="ruleType.value" v-model="form.ruleType" :value="ruleType.value" type="radio" name="ruleType"
                class="sr-only peer" required />
              <label :for="ruleType.value"
                class="flex flex-col items-center justify-center p-4 text-sm font-medium text-center text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-color1 peer-checked:border-color1 peer-checked:text-color1 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                <div class="text-xl mb-2">{{ ruleType.icon }}</div>
                {{ ruleType.label }}
                <div class="text-xs text-gray-400 mt-1">{{ ruleType.unit }}</div>
              </label>
            </div>
          </div>
          <p v-if="errors.ruleType" class="mt-2 text-sm text-red-600">{{ errors.ruleType }}</p>
        </div>

        <div v-if="form.ruleType" class="mb-8">
          <div v-if="form.ruleType === 'TEMPERATURA'"
            class="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <div class="flex items-start space-x-3 mb-4">
              <div class="flex-shrink-0">
                <div class="text-2xl">🌡️</div>
              </div>
              <div>
                <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-2">Monitoreo de Temperatura</h4>
                <div class="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <p><strong class="text-accent-primary dark:text-accent-primary"></strong> Define los niveles de
                    temperatura que activarán las alertas en grados Celsius.</p>
                  <p class="mt-2 text-xs text-gray-500">Las alertas se activarán automáticamente cuando se excedan estos
                    valores establecidos por normativa.</p>
                </div>
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div
                class="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg">
                <label class="block text-sm font-medium text-green-700 dark:text-green-300 mb-2">
                  Normal (°C) *
                </label>
                <input v-model.number="form.config.warning" type="number" :class="inputClasses('configWarning')"
                  placeholder="80" required />
              </div>
              <div
                class="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg">
                <label class="block text-sm font-medium text-yellow-700 dark:text-yellow-300 mb-2">
                  Precaución (°C) *
                </label>
                <input v-model.number="form.config.urgent" type="number" :class="inputClasses('configUrgent')"
                  placeholder="85" required />
              </div>
              <div class="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg">
                <label class="block text-sm font-medium text-red-700 dark:text-red-300 mb-2">
                  Crítico (°C) *
                </label>
                <input v-model.number="form.config.critical" type="number" :class="inputClasses('configCritical')"
                  placeholder="90" required />
              </div>
            </div>
          </div>

          <div v-else-if="form.ruleType === 'POTENCIA'"
            class="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <div class="flex items-start space-x-3 mb-4">
              <div class="flex-shrink-0">
                <div class="text-2xl">💪</div>
              </div>
              <div>
                <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-2">Monitoreo de Potencia</h4>
                <div class="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <p><strong class="text-accent-primary dark:text-accent-primary"></strong> % de la potencia nominal
                  </p>
                  <p><strong class="text-accent-primary dark:text-accent-primary"></strong> Define los niveles de
                    potencia que
                    activarán las alertas en %.</p>
                  <p class="mt-2 text-xs text-gray-500">Las alertas se activarán automáticamente cuando se excedan estos
                    valores establecidos por normativa.</p>
                </div>
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div
                class="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg">
                <label class="block text-sm font-medium text-green-700 dark:text-green-300 mb-2">
                  Normal (%) *
                </label>
                <input v-model.number="form.config.warning" type="number" :class="inputClasses('configWarning')"
                  placeholder="75" min="0" max="100" required />
              </div>
              <div
                class="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg">
                <label class="block text-sm font-medium text-yellow-700 dark:text-yellow-300 mb-2">
                  Precaución (%) *
                </label>
                <input v-model.number="form.config.urgent" type="number" :class="inputClasses('configUrgent')"
                  placeholder="85" min="0" max="100" required />
              </div>
              <div class="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg">
                <label class="block text-sm font-medium text-red-700 dark:text-red-300 mb-2">
                  Crítico (%) *
                </label>
                <input v-model.number="form.config.critical" type="number" :class="inputClasses('configCritical')"
                  placeholder="95" min="0" max="100" required />
              </div>
            </div>
          </div>

          <div v-else-if="form.ruleType === 'TENSION'"
            class="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <div class="flex items-start space-x-3 mb-4">
              <div class="flex-shrink-0">
                <div class="text-2xl">⚡</div>
              </div>
              <div>
                <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-2">Monitoreo de Tensión</h4>
                <div class="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <p><strong class="text-accent-primary dark:text-accent-primary">URBANO:</strong> 5% de la tensión
                    nominal/de
                    operación</p>
                  <p><strong class="text-accent-primary dark:text-accent-primary">RURAL:</strong> ±7.5% de la tensión
                    nominal/de
                    operación</p>
                  <p class="mt-2 text-xs text-gray-500">Las alertas se activarán automáticamente cuando se excedan estos
                    valores establecidos por normativa.</p>
                </div>
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                class="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg">
                <label class="block text-sm font-medium text-green-700 dark:text-green-300 mb-2">
                  🏢 Urbano (%) *
                </label>
                <input v-model.number="form.config.urbano" type="number" :class="inputClasses('configUrbano')"
                  placeholder="5" min="0" max="100" required />
              </div>
              <div
                class="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg">
                <label class="block text-sm font-medium text-yellow-700 dark:text-yellow-300 mb-2">
                  🌾 Rural (%) *
                </label>
                <input v-model.number="form.config.rural" type="number" :class="inputClasses('configRural')"
                  placeholder="7.5" min="0" max="10" step="0.1" required />
              </div>
            </div>
          </div>

          <div v-else-if="form.ruleType === 'CORRIENTE'"
            class="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <div class="flex items-start space-x-3 mb-4">
              <div class="flex-shrink-0">
                <div class="text-2xl">🔌</div>
              </div>
              <div>
                <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-2">Monitoreo de Corriente</h4>
                <div class="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <p><strong class="text-accent-primary dark:text-accent-primary"></strong> Porcentaje de la diferencia
                    de corriente entre fases que produce desbalance.</p>
                  <p><strong class="text-accent-primary dark:text-accent-primary"></strong>Si la corriente de una fase
                    supera la
                    corriente nominal, se activará la ALERTA</p>
                  <p class="mt-2 text-xs text-gray-500">Las alertas se activarán automáticamente cuando se excedan estos
                    valores establecidos por normativa.
                  </p>
                </div>
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div
                class="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg">
                <label class="block text-sm font-medium text-green-700 dark:text-green-300 mb-2">
                  Normal (%) *
                </label>
                <input v-model.number="form.config.faseR" type="number" :class="inputClasses('configFaseR')"
                  placeholder="5" min="0" max="100" required />
              </div>
              <div
                class="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg">
                <label class="block text-sm font-medium text-yellow-700 dark:text-yellow-300 mb-2">
                  Precaución (%) *
                </label>
                <input v-model.number="form.config.faseS" type="number" :class="inputClasses('configFaseS')"
                  placeholder="5" min="0" max="100" required />
              </div>
              <div class="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg">
                <label class="block text-sm font-medium text-red-700 dark:text-red-300 mb-2">
                  Crítico (%) *
                </label>
                <input v-model.number="form.config.faseT" type="number" :class="inputClasses('configFaseT')"
                  placeholder="5" min="0" max="100" required />
              </div>
            </div>
          </div>

          <div v-else-if="form.ruleType === 'FRECUENCIA'"
            class="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <div class="flex items-start space-x-3 mb-4">
              <div class="flex-shrink-0">
                <div class="text-2xl">📊</div>
              </div>
              <div>
                <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-2">Monitoreo de Frecuencia</h4>
                <div class="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <p><strong class="text-accent-primary dark:text-accent-primary"></strong> ±0,001% de la frecuencia
                    nominal</p>
                  <p class="mt-2 text-xs text-gray-500">Las alertas se activarán automáticamente cuando se excedan estos
                    valores establecidos por normativa.</p>
                </div>
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-1 gap-4">
              <div
                class="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg">
                <label class="block text-sm font-medium text-green-700 dark:text-green-300 mb-2">
                  📊 Porcentaje de Frecuencia (%) *
                </label>
                <input v-model.number="form.config.porcentaje" type="number" :class="inputClasses('configPorcentaje')"
                  placeholder="0.001" step="0.001" min="0" required />
              </div>
            </div>
          </div>

          <div v-else-if="form.ruleType === 'THDV'"
            class="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <div class="flex items-start space-x-3 mb-4">
              <div class="flex-shrink-0">
                <div class="text-2xl">📈</div>
              </div>
              <div>
                <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-2">Monitoreo de THDV</h4>
                <div class="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <p><strong class="text-accent-primary dark:text-accent-primary"></strong> ±5% de la tasa de distorsión
                    armónica en cada fase.
                  </p>
                  <p class="mt-2 text-xs text-gray-500">Las alertas se activarán automáticamente cuando se excedan estos
                    valores establecidos por normativa.</p>
                </div>
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-1 gap-4">
              <div
                class="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg">
                <label class="block text-sm font-medium text-green-700 dark:text-green-300 mb-2">
                  📈 Porcentaje THDV (%) *
                </label>
                <input v-model.number="form.config.porcentaje" type="number" :class="inputClasses('configPorcentaje')"
                  placeholder="5" min="0" max="100" required />
              </div>
            </div>
          </div>

          <div v-else-if="form.ruleType === 'THDI'"
            class="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <div class="flex items-start space-x-3 mb-4">
              <div class="flex-shrink-0">
                <div class="text-2xl">📉</div>
              </div>
              <div>
                <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-2">Monitoreo de THDI</h4>
                <div class="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <p><strong class="text-accent-primary dark:text-accent-primary"></strong> ±18% de la tasa de
                    distorsión armónica en cada fase.
                  </p>
                  <p class="mt-2 text-xs text-gray-500">Las alertas se activarán automáticamente cuando se excedan estos
                    valores establecidos por normativa.</p>
                </div>
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-1 gap-4">
              <div
                class="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg">
                <label class="block text-sm font-medium text-green-700 dark:text-green-300 mb-2">
                  📉 Porcentaje THDI (%) *
                </label>
                <input v-model.number="form.config.porcentaje" type="number" :class="inputClasses('configPorcentaje')"
                  placeholder="18" min="0" max="100" required />
              </div>
            </div>
          </div>
        </div>

        <!-- Selección de Fábricas -->
        <div class="mb-8">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Fábricas</h3>
          <div class="border border-gray-200 dark:border-slate-600 rounded-lg p-4">
            <div class="flex flex-wrap gap-2 mb-4">
              <button
                type="button"
                @click="selectAllFactories"
                class="px-3 py-1 text-xs font-medium text-blue-700 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-800/50 rounded-md transition-colors">
                Seleccionar Todos
              </button>
              <button
                type="button"
                @click="clearAllFactories"
                class="px-3 py-1 text-xs font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 rounded-md transition-colors">
                Limpiar Selección
              </button>
            </div>
            
            <div v-if="dataFactory.length > 0" class="space-y-2 max-h-40 overflow-y-auto">
              <div v-for="factory in dataFactory" :key="factory.uid"
                class="flex items-center space-x-3 p-2 border border-gray-100 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <input 
                  :id="`factory-${factory.uid}`" 
                  v-model="form.selectedFactories" 
                  :value="factory.uid" 
                  type="checkbox"
                  class="h-4 w-4 text-color1 focus:ring-color1 border-gray-300 rounded" />
                <label :for="`factory-${factory.uid}`" class="flex-1 cursor-pointer">
                  <div class="flex items-center gap-2">
                    <span class="font-medium text-gray-900 dark:text-white text-sm">{{ factory.name }}</span>
                    <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                      {{ factory.code || 'Sin código' }}
                    </span>
                  </div>
                  <p class="text-sm text-gray-600 dark:text-gray-400">{{ factory.description || 'Sin descripción' }}</p>
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
              <button
                type="button"
                @click="selectAllCustomers"
                class="px-3 py-1 text-xs font-medium text-blue-700 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-800/50 rounded-md transition-colors">
                Seleccionar Todos
              </button>
              <button
                type="button"
                @click="clearAllCustomers"
                class="px-3 py-1 text-xs font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 rounded-md transition-colors">
                Limpiar Selección
              </button>
            </div>
            
            <div v-if="dataCustomer.length > 0" class="space-y-2 max-h-40 overflow-y-auto">
              <div v-for="customer in dataCustomer" :key="customer.uid"
                class="flex items-center space-x-3 p-2 border border-gray-100 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <input 
                  :id="`customer-${customer.uid}`" 
                  v-model="form.selectedCustomers" 
                  :value="customer.uid" 
                  type="checkbox"
                  class="h-4 w-4 text-color1 focus:ring-color1 border-gray-300 rounded" />
                <label :for="`customer-${customer.uid}`" class="flex-1 cursor-pointer">
                  <div class="flex items-center gap-2">
                    <span class="font-medium text-gray-900 dark:text-white text-sm">{{ customer.name }}</span>
                    <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                      {{ customer.code || 'Sin código' }}
                    </span>
                  </div>
                  <p class="text-sm text-gray-600 dark:text-gray-400">{{ customer.email || 'Sin email' }}</p>
                </label>
              </div>
            </div>
            <div v-else class="text-center py-4 text-gray-500 dark:text-gray-400">
              <p class="text-sm">No hay clientes disponibles</p>
            </div>
          </div>
        </div>

        <!-- Alertas con Buscador -->
        <div v-if="form.ruleType" class="mb-8">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Alertas Asociadas</h3>
          <div v-if="availableAlerts.length > 0" class="border border-gray-200 dark:border-slate-600 rounded-lg p-4">
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Selecciona las alertas que se activarán cuando esta regla se cumpla.
            </p>
            
            <!-- Buscador de Alertas -->
            <div class="mb-4">
              <div class="relative">
                <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
                <input
                  v-model="alertSearchTerm"
                  type="text"
                  placeholder="Buscar alertas por nombre, código o descripción..."
                  class="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-color1 bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                />
                <button
                  v-if="alertSearchTerm"
                  @click="alertSearchTerm = ''"
                  type="button"
                  class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
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
                  <p class="text-sm text-gray-600 dark:text-gray-400">{{ alert.description }}</p>
                </label>
              </div>
              
              <!-- Mensaje cuando no hay resultados de búsqueda -->
              <div v-if="filteredAlerts.length === 0 && alertSearchTerm" class="text-center py-4 text-gray-500 dark:text-gray-400">
                <svg class="mx-auto h-8 w-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
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

        <!-- Estado Activo -->
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

const dataCustomer = ref([])
const dataFactory = ref([])
const alertSearchTerm = ref('')

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
  ruleCode: '',
  config: {
    // Para TEMPERATURA y POTENCIA
    warning: null,
    urgent: null,
    critical: null,
    // Para TENSION
    urbano: null,
    rural: null,
    // Para CORRIENTE
    faseR: null,
    faseS: null,
    faseT: null,
    // Para FRECUENCIA, THDV, THDI
    porcentaje: null
  },
  selectedAlerts: [],
  selectedFactories: [],
  selectedCustomers: [],
  isActive: true
})

const availableAlerts = ref([])

const filteredAlerts = computed(() => {
  if (!alertSearchTerm.value) {
    return availableAlerts.value
  }
  
  const searchTerm = alertSearchTerm.value.toLowerCase()
  return availableAlerts.value.filter(alert => 
    alert.name.toLowerCase().includes(searchTerm) ||
    alert.code.toLowerCase().includes(searchTerm) ||
    (alert.description && alert.description.toLowerCase().includes(searchTerm))
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
  form.ruleCode = data.code || ''

  // Llenar configuración según el tipo de regla
  if (data.config) {
    if (data.config.levels) {
      // Para TEMPERATURA y POTENCIA
      form.config.warning = data.config.levels.warning ?? null
      form.config.urgent = data.config.levels.urgent ?? null
      form.config.critical = data.config.levels.critical ?? null
    }
    
    // Para TENSION
    if (data.config.urbano !== undefined) {
      form.config.urbano = data.config.urbano
    }
    if (data.config.rural !== undefined) {
      form.config.rural = data.config.rural
    }
    
    // Para CORRIENTE
    if (data.config.faseR !== undefined) {
      form.config.faseR = data.config.faseR
    }
    if (data.config.faseS !== undefined) {
      form.config.faseS = data.config.faseS
    }
    if (data.config.faseT !== undefined) {
      form.config.faseT = data.config.faseT
    }
    
    // Para FRECUENCIA, THDV, THDI
    if (data.config.porcentaje !== undefined) {
      form.config.porcentaje = data.config.porcentaje
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
  form.ruleCode = ''
  form.config = {
    warning: null,
    urgent: null,
    critical: null,
    urbano: null,
    rural: null,
    faseR: null,
    faseS: null,
    faseT: null,
    porcentaje: null
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

  if (!form.ruleCode) {
    errors.value.ruleCode = 'El código de regla es requerido'
  }

  // Validar configuración según el tipo de regla
  if (form.ruleType === 'TEMPERATURA' || form.ruleType === 'POTENCIA') {
    if (!form.config.warning) {
      errors.value.configWarning = 'El nivel de advertencia es requerido'
    }
    if (!form.config.urgent) {
      errors.value.configUrgent = 'El nivel urgente es requerido'
    }
    if (!form.config.critical) {
      errors.value.configCritical = 'El nivel crítico es requerido'
    }

    // Validar que los valores estén en orden lógico
    if (form.config.warning && form.config.urgent && form.config.critical) {
      if (form.config.warning >= form.config.urgent ||
        form.config.urgent >= form.config.critical) {
        errors.value.configCritical = 'Los valores deben ser: Advertencia < Urgente < Crítico'
      }
    }

    // Validar rangos para potencia (0-100%)
    if (form.ruleType === 'POTENCIA') {
      if (form.config.warning < 0 || form.config.warning > 100) {
        errors.value.configWarning = 'El valor debe estar entre 0 y 100%'
      }
      if (form.config.urgent < 0 || form.config.urgent > 100) {
        errors.value.configUrgent = 'El valor debe estar entre 0 y 100%'
      }
      if (form.config.critical < 0 || form.config.critical > 100) {
        errors.value.configCritical = 'El valor debe estar entre 0 y 100%'
      }
    }
  }

  // Validar configuración para TENSION
  if (form.ruleType === 'TENSION') {
    if (!form.config.urbano) {
      errors.value.configUrbano = 'El porcentaje urbano es requerido'
    }
    if (!form.config.rural) {
      errors.value.configRural = 'El porcentaje rural es requerido'
    }
  }

  // Validar configuración para CORRIENTE
  if (form.ruleType === 'CORRIENTE') {
    if (!form.config.faseR) {
      errors.value.configFaseR = 'El porcentaje es requerido'
    }
    if (!form.config.faseS) {
      errors.value.configFaseS = 'El porcentaje es requerido'
    }
    if (!form.config.faseT) {
      errors.value.configFaseT = 'El porcentaje es requerido'
    }
  }

  // Validar configuración para FRECUENCIA, THDV, THDI
  if (form.ruleType === 'FRECUENCIA' || form.ruleType === 'THDV' || form.ruleType === 'THDI') {
    if (!form.config.porcentaje) {
      errors.value.configPorcentaje = 'El porcentaje es requerido'
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

    let config = {}
    if (form.ruleType === 'TEMPERATURA' || form.ruleType === 'POTENCIA') {
      config = {
        levels: {
          warning: form.config.warning,
          urgent: form.config.urgent,
          critical: form.config.critical
        }
      }
    } else if (form.ruleType === 'TENSION') {
      config = {
        minValue: 220,
        maxValue: 240,
        threshold: 5,
        unit: "V",
        checkInterval: 30,
        urbano: form.config.urbano,
        rural: form.config.rural
      }
    } else if (form.ruleType === 'CORRIENTE') {
      config = {
        faseR: form.config.faseR,
        faseS: form.config.faseS,
        faseT: form.config.faseT
      }
    } else if (form.ruleType === 'FRECUENCIA' || form.ruleType === 'THDV' || form.ruleType === 'THDI') {
      config = {
        porcentaje: form.config.porcentaje
      }
    }

    const updateData = {
      uid: props.ruleData.uid,
      data: {
        type: form.ruleType,
        name: form.ruleName,
        code: form.ruleCode,
        config: config,
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

// Watcher para cambios en alerts
watch(() => [...props.alerts], (newAlerts) => {
  availableAlerts.value = newAlerts || []
}, { immediate: true })

watch(() => form.ruleType, () => {
  form.config = {
    warning: null,
    urgent: null,
    critical: null,
    urbano: null,
    rural: null,
    faseR: null,
    faseS: null,
    faseT: null,
    porcentaje: null
  }
})

onMounted(() => {
  listCustomer()
  listFactorys()
})
</script>
