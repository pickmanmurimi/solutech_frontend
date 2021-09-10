<template>
  <div>
    <div class="form-group">
      <small v-if="text" class="form-control-label d-block mb-2 text-capitalize"> {{ text }} </small>
      <input :id="id" :class=" formError[ name ] ? formClass + ' is-invalid' : formClass"
             :disabled="disabled" :name="name"
             :placeholder="placeholder ? placeholder : text "
             :type="type"
             :value="value" class="form-control font-weight-bold form-control-alternative" @input="handleInput">
      <small v-if="formError[ name ]" class="form-text text-danger"> {{ formError[name][0] }} </small>
      <small v-if="helper" class="form-text text-muted"> {{ helper }} </small>
    </div>
  </div>
</template>

<script>
export default {
  /**
   * props
   */
  props: {
    formClass: {
      type: String,
      default: () => {
        return 'form-control'
      }
    },
    id: {
      type: String,
    },
    placeholder: {
      type: String,
      default: () => {
        return ''
      }
    },
    type: {
      default: () => {
        return 'text'
      }
    },
    name: {
      required: true,
      type: String
    },
    text: {
      type: String
    },
    helper: {
      type: String
    },
    value: {
      required: true
    },
    formError: {
      type: Object,
      default: () => {
        return {}
      }
    },
    disabled: {
      type: Boolean,
      default: () => {
        return false
      }
    },
  },

  /**
   * data
   */
  data() {
    return {
      content: this.value
    }
  },

  /**
   * methods
   */
  methods: {
    /**
     * handleInput
     */
    handleInput(e) {
      this.$emit('input', e.target.value)
    }
  }
}
</script>
