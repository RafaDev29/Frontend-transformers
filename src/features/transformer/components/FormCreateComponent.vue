<template>
  <div v-if="show" class="fixed inset-0 bg-black/40 flex items-center justify-center z-[2000]">
    <div
      class="bg-white/100 dark:bg-slate-800/100 rounded-lg shadow-xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
      <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-slate-600">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
          Crear Nuevo Transformador
        </h2>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSubmit" class="p-6">
        <!-- SECCIÓN: DATOS DEL TRANSFORMADOR -->
        <div class="mb-6 p-4 border-2 border-blue-300 dark:border-blue-600 rounded-lg bg-blue-50/30 dark:bg-blue-900/10">
          <h3 class="text-sm font-semibold text-blue-700 dark:text-blue-400 mb-4 uppercase tracking-wide">
            Datos del Transformador
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Tipo -->
            <div>
              <label for="type" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Tipo *
              </label>
              <select id="type" v-model="form.type" :class="[
                'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2',
                errors.type ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-slate-600 focus:ring-color1',
                'bg-white dark:bg-slate-700 text-gray-900 dark:text-white'
              ]" required>
                <option value="">Seleccionar tipo</option>
                <option value="SECO">SECO</option>
                <option value="ACEITE">ACEITE</option>
              </select>
              <p v-if="errors.type" class="mt-1 text-sm text-red-600">{{ errors.type }}</p>
            </div>

            <!-- Zona -->
            <div>
              <label for="zone" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Zona *
              </label>
              <select id="zone" v-model="form.zone" :class="[
                'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2',
                errors.zone ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-slate-600 focus:ring-color1',
                'bg-white dark:bg-slate-700 text-gray-900 dark:text-white'
              ]" required>
                <option value="">Seleccionar zona</option>
                <option value="RURAL">Rural</option>
                <option value="URBANO">Urbano</option>
              </select>
              <p v-if="errors.zone" class="mt-1 text-sm text-red-600">{{ errors.zone }}</p>
            </div>

            <!-- Fases -->
            <div>
              <label for="phases" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Fases *
              </label>
              <select id="phases" v-model.number="form.phases" :class="[
                'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2',
                errors.phases ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-slate-600 focus:ring-color1',
                'bg-white dark:bg-slate-700 text-gray-900 dark:text-white'
              ]" required>
                <option value="">Seleccionar fases</option>
                <option :value="1">1 Fase</option>
                <option :value="2">2 Fases</option>
                <option :value="3">3 Fases</option>
              </select>
              <p v-if="errors.phases" class="mt-1 text-sm text-red-600">{{ errors.phases }}</p>
            </div>

            <!-- Número de Serie -->
            <div>
              <label for="serialNumber" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Número de Serie *
              </label>
              <input id="serialNumber" v-model="form.serialNumber" type="text" :class="[
                'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2',
                errors.serialNumber ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-slate-600 focus:ring-color1',
                'bg-white dark:bg-slate-700 text-gray-900 dark:text-white'
              ]" placeholder="TR-2025-01" required />
              <p v-if="errors.serialNumber" class="mt-1 text-sm text-red-600">{{ errors.serialNumber }}</p>
            </div>

            <!-- Marca -->
            <div>
              <label for="brand" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Marca *
              </label>
              <input id="brand" v-model="form.brand" type="text" :class="[
                'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2',
                errors.brand ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-slate-600 focus:ring-color1',
                'bg-white dark:bg-slate-700 text-gray-900 dark:text-white'
              ]" placeholder="ABB" required />
              <p v-if="errors.brand" class="mt-1 text-sm text-red-600">{{ errors.brand }}</p>
            </div>

            <!-- Año de Fabricación -->
            <div>
              <label for="yearManufacture" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Año de Fabricación *
              </label>
              <input id="yearManufacture" v-model.number="form.yearManufacture" type="number" :min="1900"
                :max="new Date().getFullYear()" :class="[
                  'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2',
                  errors.yearManufacture ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-slate-600 focus:ring-color1',
                  'bg-white dark:bg-slate-700 text-gray-900 dark:text-white'
                ]" placeholder="2024" required />
              <p v-if="errors.yearManufacture" class="mt-1 text-sm text-red-600">{{ errors.yearManufacture }}</p>
            </div>
          </div>
        </div>

        <!-- SECCIÓN: ESPECIFICACIONES TÉCNICAS -->
        <div class="mb-6 p-4 border-2 border-purple-300 dark:border-purple-600 rounded-lg bg-purple-50/30 dark:bg-purple-900/10">
          <h3 class="text-sm font-semibold text-purple-700 dark:text-purple-400 mb-4 uppercase tracking-wide">
            Especificaciones Técnicas
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- SUBSECCIÓN: PRIMARIO -->
            <div class="p-3 border border-green-300 dark:border-green-600 rounded-md bg-green-50/20 dark:bg-green-900/5">
              <h4 class="text-xs font-semibold text-green-700 dark:text-green-400 mb-3 uppercase">Primario</h4>
              
              <!-- Rango Primario -->
              <div class="mb-4">
                <label for="primaryRange" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Rango Primario *
                </label>
                <select id="primaryRange" v-model="form.primaryRangeUid" @change="resetPrimaryVoltage" :class="[
                  'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2',
                  errors.primaryRangeUid ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-slate-600 focus:ring-color1',
                  'bg-white dark:bg-slate-700 text-gray-900 dark:text-white'
                ]" required>
                  <option value="">Seleccionar rango</option>
                  <option v-for="range in dataRange" :key="range.uid" :value="range.uid">
                    {{ range.type }}
                  </option>
                </select>
                <p v-if="errors.primaryRangeUid" class="mt-1 text-sm text-red-600">{{ errors.primaryRangeUid }}</p>
              </div>

              <!-- Tensión Primaria -->
              <div class="mb-4">
                <label for="primaryVoltage" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tensión del Primario (V) *
                </label>
                <select id="primaryVoltage" v-model.number="form.primaryVoltage" @change="calculateRegulatedVoltages"
                  :disabled="!form.primaryRangeUid" :class="[
                    'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2',
                    errors.primaryVoltage ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-slate-600 focus:ring-color1',
                    'bg-white dark:bg-slate-700 text-gray-900 dark:text-white',
                    !form.primaryRangeUid ? 'opacity-50 cursor-not-allowed' : ''
                  ]" required>
                  <option value="">Seleccionar tensión</option>
                  <option v-for="voltage in getPrimaryVoltageValues()" :key="voltage" :value="voltage * 1000">
                    {{ voltage  }} V
                  </option>
                </select>
                <p v-if="errors.primaryVoltage" class="mt-1 text-sm text-red-600">{{ errors.primaryVoltage }}</p>
              </div>

              <!-- Corriente Primaria -->
              <div>
                <label for="primaryCurrent" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Corriente del Primario (A)
                </label>
                <input id="primaryCurrent" v-model.number="form.primaryCurrent" type="number" step="0.01" min="0" :class="[
                  'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2',
                  'border-gray-300 dark:border-slate-600 focus:ring-color1',
                  'bg-white dark:bg-slate-700 text-gray-900 dark:text-white'
                ]" placeholder="43.3" />
              </div>
            </div>

            <!-- SUBSECCIÓN: SECUNDARIO -->
            <div class="p-3 border border-orange-300 dark:border-orange-600 rounded-md bg-orange-50/20 dark:bg-orange-900/5">
              <h4 class="text-xs font-semibold text-orange-700 dark:text-orange-400 mb-3 uppercase">Secundario</h4>
              
              <!-- Rango Secundario -->
              <div class="mb-4">
                <label for="secondaryRange" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Rango del Secundario *
                </label>
                <select id="secondaryRange" v-model="form.secondaryRangeUid" @change="resetSecondaryVoltage" :class="[
                  'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2',
                  errors.secondaryRangeUid ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-slate-600 focus:ring-color1',
                  'bg-white dark:bg-slate-700 text-gray-900 dark:text-white'
                ]" required>
                  <option value="">Seleccionar rango</option>
                  <option v-for="range in dataRange" :key="range.uid" :value="range.uid">
                    {{ range.type }}
                  </option>
                </select>
                <p v-if="errors.secondaryRangeUid" class="mt-1 text-sm text-red-600">{{ errors.secondaryRangeUid }}</p>
              </div>

              <!-- Tensión Secundaria -->
              <div class="mb-4">
                <label for="secondaryVoltage" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tensión del Secundario (V) *
                </label>
                <select id="secondaryVoltage" v-model.number="form.secondaryVoltage" :disabled="!form.secondaryRangeUid"
                  :class="[
                    'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2',
                    errors.secondaryVoltage ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-slate-600 focus:ring-color1',
                    'bg-white dark:bg-slate-700 text-gray-900 dark:text-white',
                    !form.secondaryRangeUid ? 'opacity-50 cursor-not-allowed' : ''
                  ]" required>
                  <option value="">Seleccionar tensión</option>
                  <option v-for="voltage in getSecondaryVoltageValues()" :key="voltage" :value="voltage * 1000">
                    {{ voltage  }} V
                  </option>
                </select>
                <p v-if="errors.secondaryVoltage" class="mt-1 text-sm text-red-600">{{ errors.secondaryVoltage }}</p>
              </div>

              <!-- Corriente Secundaria -->
              <div>
                <label for="secondaryCurrent" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Corriente del Secundario (A)
                </label>
                <input id="secondaryCurrent" v-model.number="form.secondaryCurrent" type="number" step="0.01" min="0"
                  :class="[
                    'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2',
                    'border-gray-300 dark:border-slate-600 focus:ring-color1',
                    'bg-white dark:bg-slate-700 text-gray-900 dark:text-white'
                  ]" placeholder="1968" />
              </div>
            </div>

            <!-- SUBSECCIÓN: REGULACIÓN Y TENSIONES -->
            <div class="p-3 border border-cyan-300 dark:border-cyan-600 rounded-md bg-cyan-50/20 dark:bg-cyan-900/5">
              <h4 class="text-xs font-semibold text-cyan-700 dark:text-cyan-400 mb-3 uppercase">Regulación</h4>
              
              <!-- Porcentaje Regulación -->
              <div class="mb-4">
                <label for="regulationPercentage" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Porcentaje de Regulación
                </label>
                <select id="regulationPercentage" v-model="regulationPercentage" @change="calculateRegulatedVoltages"
                  :disabled="!form.primaryVoltage" :class="[
                    'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2',
                    'border-gray-300 dark:border-slate-600 focus:ring-color1',
                    'bg-white dark:bg-slate-700 text-gray-900 dark:text-white',
                    !form.primaryVoltage ? 'opacity-50 cursor-not-allowed' : ''
                  ]">
                  <option value="">Seleccionar porcentaje</option>
                  <option value="1.5">±1.5%</option>
                  <option value="2.5">±2.5%</option>
                </select>
              </div>

              <!-- Tensión de Operación -->
              <div class="mb-4">
                <label for="regulatedVoltage" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tensión de Operación (V) *
                </label>
                <select id="regulatedVoltage" v-model.number="form.regulatedVoltage"
                  :disabled="regulatedVoltageOptions.length === 0" :class="[
                    'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2',
                    errors.regulatedVoltage ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-slate-600 focus:ring-color1',
                    'bg-white dark:bg-slate-700 text-gray-900 dark:text-white',
                    regulatedVoltageOptions.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
                  ]" required>
                  <option value="">Seleccionar tensión de operación</option>
                  <option v-for="voltage in regulatedVoltageOptions" :key="voltage" :value="voltage">
                    {{ voltage }} V
                  </option>
                </select>
                <p v-if="errors.regulatedVoltage" class="mt-1 text-sm text-red-600">{{ errors.regulatedVoltage }}</p>
              </div>

              <!-- Tensión Nominal -->
              <div>
                <label for="nominalVoltage" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tensión Nominal (V) *
                </label>
                <input id="nominalVoltage" v-model.number="form.nominalVoltage" type="number" min="0" step="1" :class="[
                  'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2',
                  errors.nominalVoltage ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-slate-600 focus:ring-color1',
                  'bg-white dark:bg-slate-700 text-gray-900 dark:text-white'
                ]" placeholder="220" required />
                <p v-if="errors.nominalVoltage" class="mt-1 text-sm text-red-600">{{ errors.nominalVoltage }}</p>
              </div>
            </div>

            <!-- Potencia Aparente -->
            <div>
              <label for="apparentPowerKVA" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Potencia Aparente (KVA) *
              </label>
              <input id="apparentPowerKVA" v-model.number="form.apparentPowerKVA" type="number" min="1" step="0.01"
                :class="[
                  'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2',
                  errors.apparentPowerKVA ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-slate-600 focus:ring-color1',
                  'bg-white dark:bg-slate-700 text-gray-900 dark:text-white'
                ]" placeholder="750" required />
              <p v-if="errors.apparentPowerKVA" class="mt-1 text-sm text-red-600">{{ errors.apparentPowerKVA }}</p>
            </div>

            <!-- Altitud -->
            <div>
              <label for="altitude" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Altitud (m s.n.m) *
              </label>
              <input id="altitude" v-model.number="form.altitude" type="number" min="0" step="1" :class="[
                'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2',
                errors.altitude ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-slate-600 focus:ring-color1',
                'bg-white dark:bg-slate-700 text-gray-900 dark:text-white'
              ]" placeholder="1000" required />
              <p v-if="errors.altitude" class="mt-1 text-sm text-red-600">{{ errors.altitude }}</p>
            </div>

            <!-- Frecuencia -->
            <div>
              <label for="frequency" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Frecuencia (Hz) *
              </label>
              <input id="frequency" v-model.number="form.frequency" type="number" min="0" step="0.1" :class="[
                'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2',
                errors.frequency ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-slate-600 focus:ring-color1',
                'bg-white dark:bg-slate-700 text-gray-900 dark:text-white'
              ]" placeholder="60" required />
              <p v-if="errors.frequency" class="mt-1 text-sm text-red-600">{{ errors.frequency }}</p>
            </div>

            <!-- Temperatura Cobre -->
            <div>
              <label for="copperTemperature" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Temperatura Cobre (°C)
              </label>
              <input id="copperTemperature" v-model.number="form.copperTemperature" :disabled="form.type === 'ACEITE'"
                type="number" step="0.1" :class="[
                  'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2',
                  'border-gray-300 dark:border-slate-600 focus:ring-color1',
                  'bg-white dark:bg-slate-700 text-gray-900 dark:text-white'
                ]" placeholder="65" />
            </div>

            <!-- Temperatura Aceite -->
            <div>
              <label for="oilTemperature" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Temperatura Aceite (°C)
              </label>
              <input id="oilTemperature" v-model.number="form.oilTemperature" :disabled="form.type === 'SECO'"
                type="number" step="0.1" :class="[
                  'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2',
                  'border-gray-300 dark:border-slate-600 focus:ring-color1',
                  'bg-white dark:bg-slate-700 text-gray-900 dark:text-white'
                ]" placeholder="75" />
            </div>

            <!-- Temperatura Ambiente -->
            <div>
              <label for="ambientTemperature" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Temperatura Ambiente (°C)
              </label>
              <input id="ambientTemperature" v-model.number="form.ambientTemperature" type="number" step="0.1" :class="[
                'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2',
                'border-gray-300 dark:border-slate-600 focus:ring-color1',
                'bg-white dark:bg-slate-700 text-gray-900 dark:text-white'
              ]" placeholder="25" />
            </div>
          </div>
        </div>

        <!-- SECCIÓN: INFORMACIÓN COMERCIAL -->
        <div class="mb-6 p-4 border-2 border-amber-300 dark:border-amber-600 rounded-lg bg-amber-50/30 dark:bg-amber-900/10">
          <h3 class="text-sm font-semibold text-amber-700 dark:text-amber-400 mb-4 uppercase tracking-wide">
            Información Comercial
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Fábrica -->
            <div>
              <label for="factoryUid" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Fábrica *
              </label>
              <select id="factoryUid" v-model="form.factoryUid" :class="[
                'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2',
                errors.factoryUid ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-slate-600 focus:ring-color1',
                'bg-white dark:bg-slate-700 text-gray-900 dark:text-white'
              ]" required>
                <option value="">Seleccionar fábrica</option>
                <option v-for="factory in dataFactory" :key="factory.uid" :value="factory.uid">
                  {{ factory.businessName }}
                </option>
              </select>
              <p v-if="errors.factoryUid" class="mt-1 text-sm text-red-600">{{ errors.factoryUid }}</p>
            </div>

            <!-- Cliente -->
            <div>
              <label for="customerUid" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Cliente
              </label>
              <select id="customerUid" v-model="form.customerUid" :class="[
                'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2',
                errors.customerUid ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-slate-600 focus:ring-color1',
                'bg-white dark:bg-slate-700 text-gray-900 dark:text-white'
              ]">
                <option value="">Seleccionar cliente</option>
                <option v-for="customer in dataCustomer" :key="customer.uid" :value="customer.uid">
                  {{ customer.businessname }}
                </option>
              </select>
              <p v-if="errors.customerUid" class="mt-1 text-sm text-red-600">{{ errors.customerUid }}</p>
            </div>

            <!-- Fecha de venta -->
            <div>
              <label for="saleDate" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Fecha de venta
              </label>
              <input id="saleDate" v-model="form.saleDate" type="date" :class="[
                'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2',
                errors.saleDate ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-slate-600 focus:ring-color1',
                'bg-white dark:bg-slate-700 text-gray-900 dark:text-white'
              ]" />
              <p v-if="errors.saleDate" class="mt-1 text-sm text-red-600">{{ errors.saleDate }}</p>
            </div>
          </div>
        </div>

        <!-- Estado Activo -->
        <div class="flex items-center mb-6">
          <input id="isActive" v-model="form.isActive" type="checkbox"
            class="h-4 w-4 text-color1 focus:ring-color1 border-gray-300 rounded" />
          <label for="isActive" class="ml-2 block text-sm text-gray-700 dark:text-gray-300">
            Activo
          </label>
        </div>

        <!-- Buttons -->
        <div class="flex justify-end gap-3 pt-6 border-t border-gray-200 dark:border-slate-600">
          <button type="button" @click="$emit('close')"
            class="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-slate-600 dark:text-gray-300 dark:hover:bg-slate-500 rounded-md transition-colors border border-gray-300 dark:border-slate-500">
            Cancelar
          </button>
          <button type="submit"
            class="px-6 py-2 text-sm font-medium text-white bg-color1 hover:bg-colorDark1 disabled:opacity-50 disabled:cursor-not-allowed rounded-md transition-colors shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-color1 focus:ring-offset-2 dark:focus:ring-offset-slate-800">
            <span class="flex items-center">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
              </svg>
              <span>Crear Transformador</span>
            </span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch, defineProps, defineEmits, onMounted } from 'vue'
import { listFactory } from '@/features/factory/services/factoryService'
import { listRange } from '@/features/range/services/rangeService'
import { allCustomer } from '@/features/customer/services/customerService'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close', 'save'])

const dataFactory = ref([])
const dataCustomer = ref([])
const dataRange = ref([])
const isLoading = ref(false)
const errors = ref({})
const regulationPercentage = ref('')
const regulatedVoltageOptions = ref([])

const form = reactive({
  type: '',
  zone: '',
  apparentPowerKVA: null,
  primaryRangeUid: '',
  primaryVoltage: null,
  secondaryRangeUid: '',
  secondaryVoltage: null,
  regulatedVoltage: null,
  serialNumber: '',
  brand: '',
  phases: null,
  nominalVoltage: null,
  altitude: null,
  frequency: null,
  yearManufacture: new Date().getFullYear(),
  saleDate: '',
  isActive: true,
  factoryUid: '',
  customerUid: '',
  oilTemperature: null,
  copperTemperature: null,
  ambientTemperature: null,
  primaryCurrent: null,
  secondaryCurrent: null
})

const getFactory = async () => {
  try {
    const response = await listFactory()
    if (response) {
      console.log(response.data, "factories")
      dataFactory.value = response.data
    }
  } catch {
    console.error("error al listar fabricas")
  }
}

const getCustomer = async () => {
  try {
    const response = await allCustomer()
    if (response) {
      console.log(response.data, "customer")
      dataCustomer.value = response.data
    }
  } catch {
    console.error("error al listar clientes")
  }
}

const getRange = async () => {
  try {
    const response = await listRange()
    if (response) {
      console.log(response.data, "ranges")
      dataRange.value = response.data
    }
  } catch {
    console.error("error al listar rangos")
  }
}

const getPrimaryVoltageValues = () => {
  if (!form.primaryRangeUid) return []
  const selectedRange = dataRange.value.find(range => range.uid === form.primaryRangeUid)
  return selectedRange ? selectedRange.voltageValue : []
}

const getSecondaryVoltageValues = () => {
  if (!form.secondaryRangeUid) return []
  const selectedRange = dataRange.value.find(range => range.uid === form.secondaryRangeUid)
  return selectedRange ? selectedRange.voltageValue : []
}

const calculateRegulatedVoltages = () => {
  if (!form.secondaryVoltage || !regulationPercentage.value) {
    regulatedVoltageOptions.value = []
    form.regulatedVoltage = null
    return
  }

  const baseVoltage = form.secondaryVoltage
  const percentage = parseFloat(regulationPercentage.value)

  const increment1 = Math.round(baseVoltage * (percentage / 100))
  const increment2 = Math.round(baseVoltage * (percentage / 50)) // 2 * percentage / 100

  regulatedVoltageOptions.value = [
    baseVoltage + increment2, // +2 * percentage
    baseVoltage + increment1, // +percentage
    baseVoltage - increment1, // -percentage
    baseVoltage - increment2  // -2 * percentage
  ].sort((a, b) => b - a) // Ordenar de mayor a menor

  if (form.regulatedVoltage && !regulatedVoltageOptions.value.includes(form.regulatedVoltage)) {
    form.regulatedVoltage = null
  }
}

const resetPrimaryVoltage = () => {
  form.primaryVoltage = null

}

const resetSecondaryVoltage = () => {
  form.secondaryVoltage = null
  form.regulatedVoltage = null
  regulatedVoltageOptions.value = []
  regulationPercentage.value = ''
}

const resetForm = () => {
  form.type = ''
  form.zone = ''
  form.apparentPowerKVA = null
  form.primaryRangeUid = ''
  form.primaryVoltage = null
  form.secondaryRangeUid = ''
  form.secondaryVoltage = null
  form.regulatedVoltage = null
  form.serialNumber = ''
  form.brand = ''
  form.phases = null
  form.nominalVoltage = null
  form.altitude = null
  form.frequency = null
  form.saleDate = ''
  form.yearManufacture = new Date().getFullYear()
  form.isActive = true
  form.factoryUid = ''
  form.customerUid = ''
  form.oilTemperature = null
  form.copperTemperature = null
  form.ambientTemperature = null
  form.primaryCurrent = null
  form.secondaryCurrent = null
  errors.value = {}
  regulationPercentage.value = ''
  regulatedVoltageOptions.value = []
}


const validateForm = () => {
  errors.value = {}

  if (!form.type) {
    errors.value.type = 'El tipo es requerido'
  }

  if (!form.zone) {
    errors.value.zone = 'La zona es requerida'
  }

  if (!form.apparentPowerKVA || form.apparentPowerKVA <= 0) {
    errors.value.apparentPowerKVA = 'La potencia aparente debe ser mayor a 0'
  }

  if (!form.primaryRangeUid) {
    errors.value.primaryRangeUid = 'El rango primario es requerido'
  }

  if (!form.primaryVoltage) {
    errors.value.primaryVoltage = 'La tensión primaria es requerido'
  }

  if (!form.secondaryRangeUid) {
    errors.value.secondaryRangeUid = 'El rango secundario es requerido'
  }

  if (!form.secondaryVoltage) {
    errors.value.secondaryVoltage = 'La tensión secundario es requerido'
  }

  if (!form.regulatedVoltage) {
    errors.value.regulatedVoltage = 'La tensión de operación es requerido'
  }

  if (!form.serialNumber) {
    errors.value.serialNumber = 'El número de serie es requerido'
  }

  if (!form.brand) {
    errors.value.brand = 'La marca es requerida'
  }

  if (!form.phases || form.phases < 1 || form.phases > 3) {
    errors.value.phases = 'Las fases deben ser 1, 2 o 3'
  }



  if (form.altitude === null || form.altitude < 0) {
    errors.value.altitude = 'La altitud debe ser mayor o igual a 0'
  }

  if (!form.frequency || form.frequency <= 0) {
    errors.value.frequency = 'La frecuencia debe ser mayor a 0'
  }

  if (!form.yearManufacture || form.yearManufacture < 1900 || form.yearManufacture > new Date().getFullYear()) {
    errors.value.yearManufacture = 'Año de fabricación inválido'
  }

  if (!form.factoryUid) {
    errors.value.factoryUid = 'La fábrica es requerida'
  }

  return Object.keys(errors.value).length === 0
}

const handleSubmit = () => {
  if (validateForm()) {
    isLoading.value = true

    const dataToSend = {
      type: form.type,
      zone: form.zone,
      apparentPowerKVA: form.apparentPowerKVA,
      primaryVoltage: form.primaryVoltage,
      secondaryVoltage: form.secondaryVoltage,
      regulatedVoltage: form.regulatedVoltage,
      serialNumber: form.serialNumber,
      brand: form.brand,
      phases: form.phases,
      nominalVoltage: form.nominalVoltage,
      altitude: form.altitude,
      frequency: form.frequency,
      yearManufacture: form.yearManufacture,
      factoryUid: form.factoryUid,
      isActive: form.isActive
    }

    if (form.saleDate) {
      dataToSend.saleDate = form.saleDate
    }

    if (form.customerUid) {
      dataToSend.customerUid = form.customerUid
    }

    if (form.oilTemperature !== null && form.oilTemperature !== '') {
      dataToSend.oilTemperature = form.oilTemperature
    }

    if (form.copperTemperature !== null && form.copperTemperature !== '') {
      dataToSend.copperTemperature = form.copperTemperature
    }

    if (form.ambientTemperature !== null && form.ambientTemperature !== '') {
      dataToSend.ambientTemperature = form.ambientTemperature
    }

    if (form.primaryCurrent !== null && form.primaryCurrent !== '') {
      dataToSend.primaryCurrent = form.primaryCurrent
    }

    if (form.secondaryCurrent !== null && form.secondaryCurrent !== '') {
      dataToSend.secondaryCurrent = form.secondaryCurrent
    }

    emit('save', dataToSend)
  }
}


watch(() => form.type, (newType) => {
  if (newType === 'SECO') {
    form.oilTemperature = 0
  } else if (newType === 'ACEITE') {
    form.copperTemperature = 0
  }
})


watch(() => props.show, (newVal) => {
  if (newVal) {
    resetForm()
  } else {
    isLoading.value = false
  }
})

onMounted(() => {
  getFactory();
  getCustomer();
  getRange();
}


)
</script>