<script>
import { maxLength, minLength, numeric, required } from 'vuelidate/lib/validators'
import PrototypeAction from '@/components/prototype/ActionCreate'

const isPhone = value => value.match('^[0-9 +]*$') !== null

export default {
  extends: PrototypeAction,
  data () {
    return {
      moduleName: 'authors',
      form: {
        name: '',
        age: '',
        phone: ''
      },
      rules: {
        phone: [
          () => this.$v.form.phone.required || 'This field is required',
          () => this.$v.form.phone.minLength || 'Min length 11 characters',
          () => this.$v.form.phone.maxLength || 'Max length 11 characters'
        ],
        age: [
          () => this.$v.form.age.required || 'This field is required',
          () => this.$v.form.age.minLength || 'Min length 1 characters',
          () => this.$v.form.age.numeric || 'Only number'
        ],
        name: [
          () => this.$v.form.name.required || 'This field is required',
          () => this.$v.form.name.minLength || 'Min length 3 characters'
        ]
      }
    }
  },
  validations: {
    form: {
      name: {
        required,
        minLength: minLength(3)
      },
      age: {
        required,
        minLength: minLength(1),
        numeric
      },
      phone: {
        required,
        minLength: minLength(12),
        maxLength: maxLength(12),
        isPhone
      }
    }
  },
  methods: {
    AddPlus () {
      if (!this.form.phone.length) {
        this.form.phone = '+'
      }
    }
  }
}
</script>

<template>
  <v-layout justify-center>
    <v-flex v-if="showForm" xs3>
      <v-text-field
        label="Enter Name"
        type="text"
        @blur="$v.form.name.$touch()"
        v-model.trim="$v.form.name.$model"
        :rules="rules.name"
      ></v-text-field>
      <v-text-field
        label="Enter age"
        type="text"
        @blur="$v.form.age.$touch()"
        v-model.trim="$v.form.age.$model"
        :rules="rules.age"
      ></v-text-field>
      <v-text-field
        label="Enter phone"
        type="text"
        @click="AddPlus"
        @blur="$v.form.phone.$touch()"
        v-model.trim="$v.form.phone.$model"
        :rules="rules.phone"
      ></v-text-field>
      <v-btn
        v-if="!$v.form.name.$invalid && !$v.form.age.$invalid && !$v.form.phone.$invalid "
        color="success"
        @click="onSubmit"
      >
        Submit
      </v-btn>
      <v-btn
        v-else
        color="success"
        disabled
      >
        Submit
      </v-btn>
    </v-flex>
    <div class="col-12" v-if="!showForm">
      <v-btn
        color="success"
        @click="resetForm"
      >
        Add more
      </v-btn>
      <v-btn
        color="warning"
        :to = "'list'"
      >
        List
      </v-btn>
    </div>
  </v-layout>
</template>

<style>
  .success {
    font-size: 15px;
  }
</style>
