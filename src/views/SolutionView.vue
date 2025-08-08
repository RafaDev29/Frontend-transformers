<template>
  <div class="overflow-y-auto h-screen bg-gray-100">
    
    <div class=" pb-24">
      <div
        v-for="(component, index) in componentsList"
        :key="index"
        class="fade-in scale-effect"
        ref="animatedComponents"
      >
        <component :is="component" />
      </div>

      <!-- Pie de página con <p> -->
      <p class="text-center text-xs text-gray-500 pt-10 border-t border-gray-300">
        SAEE Sistema de Administración Eficiente de Energía - D&A Intelligent Solutions © 2025 Todos los derechos reservados.
      </p>
    </div>

  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import headComponent from "@/components/solution/headComponent.vue";
import BodyComponents from "@/components/solution/BodyComponents.vue"
import SubBodyComponent from '@/components/solution/SubBodyComponent.vue'

export default {
  components: {
    headComponent,
    BodyComponents,
    SubBodyComponent

  },
  setup() {
    const animatedComponents = ref([]);

    onMounted(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
            }
          });
        },
        { threshold: 0.1 }
      );

      animatedComponents.value.forEach((el) => {
        observer.observe(el);
      });
    });

    return {
      animatedComponents,
      componentsList: [headComponent, BodyComponents, SubBodyComponent],
    };
  },
};
</script>


<style>

.fade-in {
  opacity: 0;
  filter: blur(10px);
  transform: translateY(50px);
  transition: opacity 0.8s ease-out, transform 0.8s ease-out, filter 1s ease-out;
}

.fade-in.visible {
  opacity: 1;
  transform: translateY(0);
  filter: blur(0);
}

/* Scale efecto gozu */
.scale-effect {
  transition: transform 0.8s ease-out;
}

.scale-effect.visible {
  transform: scale(1.02);
}
</style>