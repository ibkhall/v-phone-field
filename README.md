# Vuetify phone field

[![npm](https://img.shields.io/npm/v/@ibkhall/v-phone-field.svg)](http://npm.im/@ibkhall/v-phone-field)
<a href="https://www.npmjs.com/package/@ibkhall/v-phone-field">
    <img src="https://img.shields.io/npm/dt/@ibkhall/v-phone-field.svg" alt="Downloads">
  </a>
  <a href="https://www.npmjs.com/package/@ibkhall/v-phone-field">
    <img src="https://img.shields.io/npm/dm/@ibkhall/v-phone-field.svg" alt="Downloads">
  </a>
![](./demo.gif)

Vuetify telephone field

## Install

```bash
npm install @ibkhall/v-phone-field
```
## Usage

```html
<script setup>
import VPhoneField from '@ibkhall/v-phone-field'
import {ref} from 'vue'

const phone = ref('')
</script>
<template>
<!-- some codes -->

<VPhoneField v-model="phone"/>
<!-- some codes -->
</template>
```



## Props

All VTextField props 

## Events

All VTextField events and @validate

| Name        | Description                                        |
|-------------|----------------------------------------------------|
| @validate   | The phone number is valid                          |


## License

The MIT License.

## Author

<table>
  <tr>
    <td>
      <img src="https://github.com/ibkhall.png?s=100" width="100">
    </td>
    <td>
      Ibrahim Boubacar<br />
      <a href="mailto:ibrahimkhall212@gmail.com">ibrahimkhall212@gmail.com</a><br />
    </td>
  </tr>
</table>