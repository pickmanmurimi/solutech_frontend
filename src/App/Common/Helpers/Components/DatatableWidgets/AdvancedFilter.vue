<template>
    <div>

        <div class="card border border-secondary ">
            <div class="card-header p-3">
                <div class="row">
                    <div class="col-8">
                        <h6 class="mb-0 text-muted" @click="showAdvancedFilter = !showAdvancedFilter"><a href="#"
                                class="text-muted"><i class="fas fa-filter"></i> Do an advanced search. ( click here )</a></h6>
                    </div>
                    <div class="col-4 text-muted text-right">
                        <!-- <i class="fas fa-sync-alt text-right mr-3"></i> -->
                        <i @click="showAdvancedFilter = true" v-if="!showAdvancedFilter"
                            class="fas fa-window-maximize text-right mr-3"></i>
                        <i @click="showAdvancedFilter = false" v-if="showAdvancedFilter"
                            class="fas fa-window-minimize text-right"></i>
                    </div>
                </div>
            </div>
            <!-- body -->
            <div class="card-body" v-if="showAdvancedFilter">

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
                            :formError="formError" :text="FilterField.text" />

                        <!-- =================================================================================== -->
                        <!-- Phone field -->
                        <!-- =================================================================================== -->
                        <PhoneInput v-if="FilterField.type == 'phone'" :name="FilterField.name" :text="FilterField.text"
                            :formError="formError" @input="addValue( FilterField.name, filter[FilterField.name])"
                            v-model="filter[FilterField.name]"></PhoneInput>

                        <!-- =================================================================================== -->
                        <!-- select -->
                        <!-- =================================================================================== -->
                        <small v-if=" FilterField.type == 'select'" class="text-muted"> {{ FilterField.text }}
                            <br></small>
                        <select v-if=" FilterField.type == 'select'" v-model="filter[FilterField.name]"
                            @change="addValue( FilterField.name, filter[FilterField.name])" :name="FilterField.name"
                            class=" form-control form-control-sm">
                            <option value=""></option>
                            <option v-for=" option in FilterField.options " :key="option" :value="option"> {{ option }}
                            </option>
                        </select>
                        <small v-if=" (FilterField.type == 'select') && formError[ FilterField.name ]"
                            class="text-danger"> {{ formError[ FilterField.name ][0] }} <br> </small>

                        <!-- =================================================================================== -->
                        <!-- Multile select -->
                        <!-- =================================================================================== -->
                        <SelectInput v-if=" FilterField.type == 'multiselect'" :name="FilterField.name" :formError="formError" :options="options[FilterField.name]"
                            :multiple="true" :taggable="true" v-model="filter[FilterField.name]" @input="addValue( FilterField.name, filter[FilterField.name])" :searchable="true"
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
    import { default as helper } from './helpers'
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
        mixins: [ helper ],

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
            }
        },
        /**
         * data
         */
        data() {
            return {
                showAdvancedFilter: false,
                filter: {
                    paginate: 10
                },
                formError: {},
                searchValues: {},
                urlValue: '',
                options: [],
                searchObject:{
                    url:'',
                    post:{}
                },
                daterange:{},
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
                if( Array.isArray(value) )
                {
                    this.searchObject.post[ field ] = value
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
                    if (value != '' && value != undefined ) {
                        this.urlValue = (this.urlValue == '') ?
                            '?' + key + '=' + value : this.urlValue + '&' + key + '=' + value
                    }
                }
                this.searchObject.url = this.urlValue
                return this.$emit('search', this.searchObject )
            },
        },

        /**
         * watch
         */
        watch: {
            FilterFields : {
                immediate: true,
                deep: true,
                handler( value ) {
                    value.forEach(element => {
                        if( element.type == 'multiselect')
                        {
                            this.getOptions( element.options, element.name )
                        }
                    });
                }
            }
        }
    }

</script>
