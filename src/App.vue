<template>
  <router-view />
  <SuccessAlert />
  <ErrorAlert />
  <WarningAlert />
  <LoadingAlert />
</template>


<script setup>
import SuccessAlert from '@/components/ui/alert/SuccessAlert.vue';
import ErrorAlert from '@/components/ui/alert/ErrorAlert.vue';
import WarningAlert from '@/components/ui/alert/WarningAlert.vue';
import LoadingAlert from '@/components/ui/alert/LoadingAlert.vue';
</script>

<style></style>
