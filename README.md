# Vuetify phone field

[![npm](https://img.shields.io/npm/v/@ibkhall/v-phone-field.svg)](http://npm.im/@ibkhall/v-phone-field)

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

