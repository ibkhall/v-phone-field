<script lang="ts" setup>
import codes from '../helpers/coutries'
import { parsePhoneNumber } from 'awesome-phonenumber'
import "flag-icons/css/flag-icons.min.css";
import {ref, reactive, onMounted} from 'vue'

const props = defineProps({
  modelValue: String,
  blur: Event,
  name: {
    type: String,
    requird: true,
  }
});

const emit = defineEmits(['valide'])
const value = ref(props.modelValue)
let errors: string[] = reactive([])
const prefix = ref('+227')
const display_text = ref('')
const country = ref({
    name: 'Niger (Nijar)',
    iso2: 'ne',
    dialCode: '227'
})
const onUpdate = (v: any) => {
  country.value = codes.find(el => el.iso2==v) as any
  prefix.value = '+'+country.value.dialCode

  onInput(value.value as string)
  
}


onMounted(() => {
  if(value.value) {
    const pn = parsePhoneNumber(value.value as string)
    display_text.value = pn.number?.national as string
  }
})
  
const onInput = (val: string) => {
  
  const pn = parsePhoneNumber(val, {regionCode: country.value.iso2});
  if(pn.valid) {
    display_text.value = pn.number?.national
    value.value = pn.number?.e164
    errors = []
    emit('valide')
  }else {
    errors = [...errors, 'Numéro de téléphone invalide']
  }
  
}

</script>

<template>
<div class="d-flex text-center">
<v-autocomplete :readonly="($attrs.readonly as boolean)" style="max-width: 138px;" :model-value="country.iso2" @update:model-value="onUpdate" variant="filled" item-value="iso2" item-title="name" class="flex-grow-0 rounded-s-xl" :items="codes">
  <template v-slot:selection="{item, props}">
  <v-avatar v-bind="props" variant="text" :rounded="0" size="22">
    <span :class="'fi fi-'+item.value"></span>
  </v-avatar>
</template>
<template v-slot:append-inner>{{ prefix }}</template>

<template v-slot:item="{item, props}">
  <v-list-item
  density="compact"
    v-bind="props"
    title=""
  >
  <v-avatar variant="text" :rounded="0" size="22">
    <span :class="'fi fi-'+item.value"></span>
  </v-avatar>
  {{ item.title }}
</v-list-item>
</template>

</v-autocomplete>
  <v-text-field
  variant="outlined"
  class="flex-grow-1"
    v-model="display_text"
    @blur="props.blur"
    :error-messages="errors"
    v-bind="$attrs"
    @update:model-value="onInput"
  >
 
  
  </v-text-field>
</div>
</template>