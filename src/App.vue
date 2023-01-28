<script setup lang="ts">
import { ref } from 'vue';
import VPhoneField from './components/VPhoneField.vue';
const phone = ref('+22792714229')

</script>

<template>
  <v-app>
    <v-container fluid>
        <v-row justify="center" align="center">
          <v-col md="5">
            <VPhoneField invalid-message="Le numéro est invalide" v-model="phone" density="compact"/>
          </v-col>
        </v-row>
    </v-container>
  </v-app>
  
</template>

<style scoped>

</style>
