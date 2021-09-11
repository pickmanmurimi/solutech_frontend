<template>
  <div>

    <div class="card border border-secondary ">
      <!-- body -->
      <div class="card-body" v-if="ShowAdvancedFilter">

        <h3 class="text-primary border-bottom pb-2 mb-4">
          Advanced Filter
          <a class="close-button" href="#" @click.prevent="$emit('close')">
            <i class="fas fa-times-circle text-warning"></i>
          </a>
        </h3>


        <div class="row">

          <!--filter fields -->
          <div v-for=" FilterField in FilterFields" :key="FilterField.id" :class="FilterField.class">
            <!-- =================================================================================== -->
            <!-- text field -->
            <!-- =================================================================================== -->
            <BaseInput v-if=" FilterField.type == 'text'"
                       @input="addValue( FilterField.name, filter[FilterField.name])"
                       v-model="filter[FilterField.name]" formClass="form-control-sm" :name="FilterField.name"
                       :placeholder="FilterField.placeholder ? FilterField.placeholder : FilterField.text"
                       :formError="formError" :text="FilterField.text"/>

            <!-- =================================================================================== -->
            <!-- Phone field -->
            <!-- =================================================================================== -->
            <!--                        <PhoneInput v-if="FilterField.type == 'phone'" :name="FilterField.name" :text="FilterField.text"-->
            <!--                            :formError="formError" @input="addValue( FilterField.name, filter[FilterField.name])"-->
            <!--                            v-model="filter[FilterField.name]"></PhoneInput>-->

            <!-- =================================================================================== -->
            <!-- select -->
            <!-- =================================================================================== -->
            <div class="form-group" v-if=" FilterField.type == 'select'">
              <small class="form-control-label d-block mb-2 text-capitalize">
                {{ FilterField.text }}
                <br></small>
              <select v-if=" FilterField.type == 'select'" v-model="filter[FilterField.name]"
                      @change="addValue( FilterField.name, filter[FilterField.name])" :name="FilterField.name"
                      class=" form-control form-control-sm font-weight-bold form-control-alternative">
                <option value=""></option>
                <option v-for=" option in FilterField.options " :key="option" :value="option"> {{ option }}
                </option>
              </select>
              <small v-if=" (FilterField.type == 'select') && formError[ FilterField.name ]"
                     class="text-danger"> {{ formError[FilterField.name][0] }} <br> </small>
            </div>

            <!-- =================================================================================== -->
            <!-- Multile select -->
            <!-- =================================================================================== -->
            <SelectInput v-if=" FilterField.type == 'multiselect'" :name="FilterField.name" :formError="formError"
                         :options="options[FilterField.name]"
                         :multiple="true" :taggable="true" v-model="filter[FilterField.name]"
                         @input="addValue( FilterField.name, filter[FilterField.name])" :searchable="true"
                         :text="FilterField.text">
            </SelectInput>

            <!-- =================================================================================== -->
            <!-- date range -->
            <!-- =================================================================================== -->
            <!-- <date-range-picker v-if=" FilterField.type == 'daterange'" :auto-apply="true" minDate="" maxDate="" ref="dateRange" v-model="daterange" class="w-100"></date-range-picker> -->

          </div>
          <div class="col-12"></div>
          <div class="text-muted col-4" v-if="limitable">
            <div class="form-group">
              <label>
                <small> Results Per page </small>
                <select v-model="filter['paginate']" @change="addValue( 'paginate', filter['paginate'])"
                        class="form-control form-control-sm custom-select mt-1 custom-select-sm">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="20">20</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="75">75</option>
                  <option value="100">100</option>
                </select>
              </label>
            </div>
          </div>

          <div class="col-8 text-right">
            <small>Filter by the given values.<br></small>
            <button @click="search()" class="btn btn-sm btn-success">Search</button>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import {default as helper} from './helpers'
import DateRangePicker from 'vue2-daterange-picker'
//you need to import the CSS manually (in case you want to override it)
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'

export default {
  /**
   * components
   */
  components: {
    DateRangePicker
  },

  /**
   * mixins
   */
  mixins: [helper],

  /**
   * props
   */
  props: {
    // FilterFields
    FilterFields: {
      type: Array,
      default: () => {
        return []
      }
    },
    // limitable
    limitable: {
      type: Boolean,
      default: () => {
        return true
      }
    },
    // ShowAdvancedFilter
    ShowAdvancedFilter: {
      type: Boolean,
      required: true
    }
  },
  /**
   * data
   */
  data() {
    return {
      filter: {
        paginate: 10
      },
      formError: {},
      searchValues: {},
      urlValue: '',
      options: [],
      searchObject: {
        url: '',
        post: {}
      },
      daterange: {},
    }
  },

  /**
   * methods
   */
  methods: {
    /**
     * addValue
     */
    addValue(field, value) {
      if (Array.isArray(value)) {
        this.searchObject.post[field] = value
      } else {
        this.searchValues[field] = value;
      }
    },

    /**
     * search
     */
    search() {
      this.urlValue = ''
      for (const [key, value] of Object.entries(this.searchValues)) {
        if (value != '' && value != undefined) {
          this.urlValue = (this.urlValue == '') ?
              '?' + key + '=' + value : this.urlValue + '&' + key + '=' + value
        }
      }
      this.searchObject.url = this.urlValue
      return this.$emit('search', this.searchObject)
    },
  },

  /**
   * watch
   */
  watch: {
    FilterFields: {
      immediate: true,
      deep: true,
      handler(value) {
        value.forEach(element => {
          if (element.type == 'multiselect') {
            this.getOptions(element.options, element.name)
          }
        });
      }
    }
  }
}

</script>

<style scoped>
.card-body {
  position: absolute;
  z-index: 999;
  width: 100%;
  background: white;
  box-shadow: 0 0 18px #888888;
  border-radius: 10px;
}

.close-button {
  position: absolute;
  left: auto;
  right: 30px;
}
</style>
