<script lang="ts" setup>
import codes from '../helpers/coutries'
import { parsePhoneNumber } from 'awesome-phonenumber'
import CountryFlag from 'vue-country-flag-next'
import {ref, reactive, onMounted} from 'vue'
import { PropType } from 'vue'
type Density = undefined | 'default' | 'comfortable' | 'compact';
const props = defineProps({
  modelValue: String,
  appendOuterIcon: String,
    autofocus: Boolean,
    clearable: Boolean,
    clearIcon: {
      type: String,
      default: '$clear',
    },
    counter: [Boolean, Number, String],
    counterValue: Function as PropType<(value: any) => number>,
    density: String as PropType<Density>,
    filled: Boolean,
    flat: Boolean,
    fullWidth: Boolean,
    label: String,
    outlined: Boolean,
    placeholder: String,
    prefix: String,
    prependInnerIcon: String,
    persistentPlaceholder: Boolean,
    reverse: Boolean,
    rounded: Boolean,
    shaped: Boolean,
    singleLine: Boolean,
    solo: Boolean,
    soloInverted: Boolean,
    suffix: String,
    type: {
      type: String,
      default: 'text',
    },
  invalidMessage: {
    type: String,
    default: 'Invalid phone number.'
  },
  defaultCountry: {
    type: String,
    default: undefined
  },
  name: {
    type: String,
    requird: true,
  }
});

const emit = defineEmits(['valide', 'update:modelValue'])
const value = ref(props.modelValue)
let errors: string[] = reactive([])
const display_text = ref('')
const country = ref({iso2: '', dialCode: ''} as any)


const fetchCountry =  () => {
  if(props.defaultCountry) {
     country.value = codes.find(el => el.iso2==props.defaultCountry?.toLocaleLowerCase())
  }else {
    fetch('https://ip2c.org/s')
    .then((response) => response.text())
    .then((response) => {
      const result = (response || '').toString();

      if (!result || result[0] !== '1') {
        throw new Error('unable to fetch the country');
      }
      country.value = codes.find(el => el.iso2==result.substr(2, 2).toLowerCase()) as any
      
    }).catch(e => country.value = codes.find(el => el.iso2==codes[0].iso2));
  }
  
}

const onUpdate = (v: any) => {
  country.value = codes.find(el => el.iso2==v) as any
  verifyNumber(display_text.value)
  
}

const verifyNumber = (val: string) => {
  const pn = parsePhoneNumber(val, {regionCode: country.value.iso2});
  
  if(pn.valid) {
    display_text.value = pn.number?.national
    value.value = pn.number?.e164
    errors = []
    emit('update:modelValue', value.value)
    emit('valide', value.value)
  }else {
    display_text.value = pn.number?.national as string
    value.value = pn.number?.e164
    errors = [...errors, props.invalidMessage]
  }
}

onMounted(() => {
  
  if(value.value) {
    const pn = parsePhoneNumber(value.value as string)
    display_text.value = pn.number?.national as string
    country.value = codes.find(el => el.iso2==pn.regionCode?.toLocaleLowerCase())
  }else {
    fetchCountry()
  }
})
  
const onInput = (val: string) => {
  emit('update:modelValue', val)
  if(val !== '') {
    verifyNumber(val)
  }
  
  
}

</script>

<template>
<div class="d-flex">
<v-autocomplete :label="props.label ? country.name: ''" :density="props.density" style="max-width: 138px;" :readonly="($attrs.readonly as boolean)" :model-value="country.iso2" @update:model-value="onUpdate" variant="filled" item-value="iso2" item-title="name" class="flex-grow-0 rounded-s-xl" :items="codes">
  <template v-slot:selection="{item, props}">
  <v-avatar v-bind="props" :rounded="0" size="22">
    <span>
      <CountryFlag :country='item.value' size='small'/>
    </span>
  </v-avatar>
</template>
<template v-slot:append-inner>{{ country.dialCode ? '+'+country.dialCode : '' }}</template>

<template v-slot:item="{item, props}">
  <v-list-item
  density="compact"
    v-bind="props"
    title=""
  >
  <v-avatar variant="text" :rounded="0" size="22">
    <span>
      <CountryFlag :country='item.value' size='small'/>
    </span>
  </v-avatar>
  {{ item.title }}
</v-list-item>
</template>

</v-autocomplete>
  <v-text-field
    class="flex-grow-1"
    :error-messages="errors"
    v-bind="(props as any)"
    v-model="display_text"
    @update:model-value="onInput"
  >
 
  
  </v-text-field>
</div>
</template>