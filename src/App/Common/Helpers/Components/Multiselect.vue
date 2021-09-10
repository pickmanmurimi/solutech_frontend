<template>
  <div>
    <div class="form-group">
      <small v-if="text" class="text-muted"> {{ text }} </small>
      <multiselect :close-on-select="closeOnSelect" :disabled="disabled" :hide-selected="hideSelected"
                   :label="label" :limit="limit" :multiple="multiple" :options="selectOptions" :placeholder="placeholder"
                   :searchable="searchable" :tag-placeholder="tagPlaceholder" :taggable="taggable" :track-by="trackBy"
                   :value="selectedItems" @input="handleInput" @tag="addTag">
      </multiselect>
      <small v-if="formError[ name ]" class="form-text text-danger"> {{ formError[name][0] }} </small>
      <small v-if="showSelectAll" class="text-primary"><a href="javascript.void(0)" @click.prevent="removeAll()">Remove
        all</a></small>
    </div>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'

export default {
  /**
   * components
   */
  components: {
    Multiselect
  },

  /**
   * data
   */
  data() {
    return {
      selectedItems: this.value
    }
  },

  /**
   * computed
   */
  computed: {
    /**
     * modelValue
     * @deprecated
     */
    modelValue() {
      return this.value
    },

    /**
     * selectOptions
     */
    selectOptions() {
      let options = this.options;
      // show select all
      if (this.showSelectAll) {
        options.unshift({
          name: "Select all",
          value: 0
        })
      }
      return options
    }
  },

  /**
   * props
   */
  props: {
    value: {
      required: true,
      default: () => {
        return []
      }
    },
    options: {
      required: true,
      type: Array,
      default: () => {
        return []
      }
    },
    showSelectAll: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    hideSelected: {
      default: () => {
        return false
      }
    },
    limit: {
      default: () => {
        return 5
      }
    },
    tagPlaceholder: {
      default: () => {
        return 'Select Role'
      }
    },
    placeholder: {
      default: () => {
        return 'Search or Select'
      }
    },
    label: {
      default: () => {
        return 'name'
      }
    },
    name: {
      required: true,
    },
    trackBy: {
      default: () => {
        return 'id'
      }
    },
    closeOnSelect: {
      default: () => {
        return true
      }
    },
    multiple: {
      default: () => {
        return true
      }
    },
    taggable: {
      default: () => {
        return true
      }
    },
    searchable: {
      default: () => {
        return false
      }
    },
    disabled: {
      default: () => {
        return false
      }
    },
    formError: {
      default: () => {
        return []
      }
    },
    text: {
      default: () => {
        return ''
      }
    },
  },

  /**
   * methods
   */
  methods: {

    /**
     * setInitValue
     */
    setInitValue(value) {
      this.selectedItems = value
    },

    /**
     * addTag
     */
    addTag(newTag) {
      this.$emit('tag', newTag)
    },

    /**
     * handleInput
     */
    handleInput(e) {
      // check if we have a select all
      if (this.showSelectAll) {
        // if select all is clicked
        for (let item of e) {
          if (item.value === 0) {
            e.pop(item)
            this.selectAll()
            this.$emit('input', this.selectedItems)
            return
          }
        }
      }

      this.selectedItems = e
      this.$emit('input', e)
    },

    /**
     * selectAll
     */
    selectAll() {
      let select_all = [];
      // select all
      for (let item of this.options) {

        if (item.value !== 0) {
          select_all.push(item);
        }
      }

      this.selectedItems = select_all
    },

    /**
     * removeAll
     */
    removeAll() {
      this.selectedItems = []
      this.$emit('input', this.selectedItems)

    }
  },
}

</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
