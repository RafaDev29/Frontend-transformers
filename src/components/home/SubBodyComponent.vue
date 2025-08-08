<template>
    <section class="w-full py-16 bg-gray-100 flex justify-center items-center ">
        <div class="container mx-auto px-6">

            <h2 class="text-3xl md:text-5xl font-bold text-blue-900 text-center mb-10">
                Beneficios Clave ✅
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                <div
                    class="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center animate-fade-in hover:scale-105 transition-all duration-300">
                    <img :src="iconBillingError" alt="Evita errores" class="w-16 h-16 mb-4">
                    <h3 class="text-lg font-semibold text-blue-900">Evita errores en la facturación</h3>
                    <p class="text-sm text-gray-600">Asegura cálculos precisos y reduce inconsistencias en los cobros.
                    </p>
                </div>

                <div
                    class="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center animate-fade-in delay-200 hover:scale-105 transition-all duration-300">
                    <img :src="iconAutomation" alt="Automatiza recibos" class="w-16 h-16 mb-4">
                    <h3 class="text-lg font-semibold text-blue-900">Automatiza la generación de recibos</h3>
                    <p class="text-sm text-gray-600">Emite facturas sin esfuerzo y mejora la eficiencia.</p>
                </div>

                <!-- Beneficio 3 -->
                <div
                    class="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center animate-fade-in delay-400 hover:scale-105 transition-all duration-300">
                    <img :src="iconTimeSaving" alt="Ahorra tiempo" class="w-16 h-16 mb-4">
                    <h3 class="text-lg font-semibold text-blue-900">Ahorra tiempo y costos</h3>
                    <p class="text-sm text-gray-600">Reduce costos operativos y optimiza la gestión del tiempo.</p>
                </div>

                <!-- Beneficio 4 -->
                <div
                    class="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center animate-fade-in delay-600 hover:scale-105 transition-all duration-300">
                    <img :src="iconReports" alt="Reportes en tiempo real" class="w-16 h-16 mb-4">
                    <h3 class="text-lg font-semibold text-blue-900">Reportes en tiempo real</h3>
                    <p class="text-sm text-gray-600">Accede a datos actualizados para una mejor toma de decisiones.</p>
                </div>

            </div>

            <!-- Comparación Antes vs Después -->
            <div class="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">

                <!-- Antes del Software -->
                <div class="bg-red-100 p-6 rounded-lg shadow-md text-center">
                    <h3 class="text-xl font-semibold text-red-600 mb-4">❌ Antes del Software</h3>
                    <ul class="text-sm text-gray-700 space-y-2">
                        <li>📌 Facturación manual y propensa a errores.</li>
                        <li>📌 Recibos generados a mano.</li>
                        <li>📌 Procesos lentos y costosos.</li>
                        <li>📌 Falta de reportes en tiempo real.</li>
                    </ul>
                </div>

                <!-- Después del Software -->
                <div class="bg-green-100 p-6 rounded-lg shadow-md text-center">
                    <h3 class="text-xl font-semibold text-green-600 mb-4">✅ Después del Software</h3>
                    <ul class="text-sm text-gray-700 space-y-2">
                        <li>🚀 Facturación automatizada y precisa.</li>
                        <li>🚀 Recibos generados con un clic.</li>
                        <li>🚀 Optimización del tiempo y reducción de costos.</li>
                        <li>🚀 Reportes detallados en tiempo real.</li>
                    </ul>
                </div>

            </div>

        </div>
    </section>
</template>

<script>
export default {
    props: {
        iconBillingError: {
            type: String,
            required: false,
            default: "/home/billing-error.png"
        },
        iconAutomation: {
            type: String,
            required: false,
            default: "/home/automation.png"
        },
        iconTimeSaving: {
            type: String,
            required: false,
            default: "/home/time-saving.png"
        },
        iconReports: {
            type: String,
            required: false,
            default: "/home/reports.png"
        }
    }
};
</script>

<style>
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(30px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fade-in {
    animation: fadeIn 0.8s ease-out;
}

.delay-200 {
    animation-delay: 0.2s;
}

.delay-400 {
    animation-delay: 0.4s;
}

.delay-600 {
    animation-delay: 0.6s;
}
</style>