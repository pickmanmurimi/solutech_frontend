<!--
	Vue Datatable
	Description: Vue Component for datatable with search, sorting, editing and pagination
	Author: Antonio Okoro
	Forked By: Pickman Murimi
	Version: 1.0.0
-->
<template>
  <div class="data-table">

    <!-- ================================================== -->
    <!-- datatable-advanced-filter -->
    <!-- ================================================== -->
    <datatable-advanced-filter v-if="advancedSearch" :FilterFields="FilterFields"
                               @search="ajaxSearch"></datatable-advanced-filter>

    <div v-if="loading || ajaxLoading" class="data-table-loading">
      <div class="data-table-loading-spinner"></div>
      <div class="data-table-loading-text">Loading Data</div>
    </div>
    <div v-else class="data-table-inner">

      <div v-if="header" class="row data-table-control mt-2">
        <div v-if="limitable && !ajaxPaginated" class="col-md-8">
          <div class="form-group">
            <label>
              Show
              <select v-model="itemsPerPage" class="form-control form-control-sm custom-select custom-select-sm">
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
              rows
            </label>
          </div>
        </div>
        <div v-if="searchable" class="col-md-4">
          <div class="form-group">
            <input v-model="query" class="form-control form-control-sm" placeholder="Quick Search" type="text"
                   @keyup="search(query)">
            <small v-if="ajax" class="text-muted">Search all columns currently displayed.</small>
          </div>
        </div>
        <div v-if="showFilters" class="col-auto ml-auto">
          Filters:
          <div class="table-filters d-inline-block">
            <div v-for="option in filters" :key="option.id" class="table-filter" @click="filter(option)">
              <span>{{ option.title }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="table-responsive">
        <table :class="{straight: !breakWords, 'table-hover': !!onClick}"
               class="table table-hover border table-responsive-lg">
          <thead>
          <tr>
            <!-- Display Checkboxes If Requested -->
            <th v-if="selectable">
              <label class="custom-control custom-checkbox">
                <input class="custom-control-input" type="checkbox" @change="selectAll">
                <span class="custom-control-label"></span>
              </label>
            </th>

            <!-- Display Index If Requested -->
            <th
                v-if="index" :class="{sort: sortColumn == '#', 'asc': sortColumn == '#' && asc, 'desc': sortColumn == '#' && !asc}"
                class="sortable"
                @click="sortIndex()"
            ><small>#</small></th>
            <!-- Display All Parsed Headers -->
            <template
                v-for="(th) in headers">
              <th
                  v-if="th.show"
                  :key="th.id"
                  :class="{sort: sortColumn == th.name, 'asc': sortColumn == th.name && asc, 'desc': sortColumn == th.name && !asc}"
                  class="sortable"
                  @click="sort(th.name)"
              ><small> {{ th.th }} </small></th>
            </template>
            <!-- Display Actions If Provided -->
            <th v-if="actions.length"><small>Actions</small></th>
          </tr>
          </thead>
          <tbody v-if="paginatedItems.length">
          <!-- Loop Through All Parsed and Paginated Items -->
          <tr v-for="(item, i) in paginatedItems" v-bind:key="i" :class="{clickable: !!onClick}">

            <!-- Display Checkboxes If Requested -->
            <th v-if="selectable">
              <div class="custom-control custom-checkbox" @click="select(item)">
                <input :checked="item.selected" class="custom-control-input" type="checkbox">
                <span class="custom-control-label"></span>
              </div>
            </th>

            <!-- Display Index If Requested -->
            <td v-if="index">
              {{ (ajaxPaginated) ? ((meta.current_page - 1) * meta.per_page) + (item.index + 1) : item.index + 1 }}
            </td>

            <!-- Display All Parsed Values -->
            <td v-for="(td, j) in item.details" v-show="td.show"
                v-bind:key="j" class="text-capitalize"
                @click="click(item.row, td.value, td.name, i), columnClick(td.click, item.row, td.value, td.name, i)">
              <!-- <component :is="i+'Component'" v-if="value.render"></component> -->
              <span v-html="td.rendered != null ? td.rendered : '----'"></span>
            </td>

            <!-- Display Actions If Provided -->
            <td v-if="item.buttons.length">
              <!-- Loop Through All Provided Actions -->
              <span v-for="(button, j) in item.buttons" v-bind:key="j">
									<button
                      v-if="button.show"
                      :class="`btn-${button.color} btn-${button.size}`"
                      :disabled="button.disabled"
                      :data-target="button.dataTarget"
                      :data-toogle="button.dataToggle"
                      class="btn"
                      type="button"
                      @click="button.action(item.row, item.index)"
                      v-html="button.text"
                  >
									</button>
								</span>
            </td>
          </tr>
          </tbody>
          <tbody v-else>
          <!-- Display Empty Message If No Items Are Rendered -->
          <tr>
            <td :colspan="headers.length + (actions.length ? 1 : 0) + (index ? 1 : 0)" align="center">No results</td>
          </tr>
          </tbody>
        </table>
      </div>
      <div v-if="footer" class="row">
        <div v-if="pageDetails" class="col-md-6">
          <div class="showing">
            Showing
            <!-- Current Page Starting Index -->
            {{ paginatedItems.length ? (itemsPerPage * (currentPage - 1)) + 1 : 0 }}
            to
            <!-- Current Page End Index -->
            {{ (itemsPerPage * (currentPage - 1)) + paginatedItems.length }}
            of
            <!-- All Items Provided -->
            {{ meta.total ? meta.total : renderedItems.length }} items
          </div>
        </div>
        <!-- ajax pagination -->
        <div v-if="ajaxPaginated" class="col-12">
          <ul class="pagination d-flex justify-content-center">
            <li v-if="links.prev" class="page-item">
              <span class="page-link" @click="prev" v-html="prevText"></span>
            </li>
            <li v-for="item in paginateLinks" v-bind:key="item.page" :class="{active: meta.current_page == item.page}"
                class="page-item">
              <span class="page-link" @click="paginate(item.page)">{{ item.page }}</span>
            </li>
            <li v-if="links.next" class="page-item">
              <span class="page-link" @click="next" v-html="nextText"></span>
            </li>
          </ul>
        </div>
        <div v-else-if="paginate" class="col-md-6">
          <ul v-if="paginateLinks.length" class="pagination">
            <li v-if="pages && currentPage != 1" class="page-item">
              <span class="page-link" @click="prev" v-html="prevText"></span>
            </li>
            <li v-for="item in paginateLinks" v-bind:key="item.page" :class="{active: currentPage == item.page}"
                class="page-item">
              <span class="page-link" @click="paginate(item.page)">{{ item.page }}</span>
            </li>
            <li v-if="pages && currentPage < pages" class="page-item">
              <span class="page-link" @click="next" v-html="nextText"></span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import toastr from "toastr";
import AdvancedFilter from "@/App/Common/Helpers/Components/DatatableWidgets/AdvancedFilter";

export default {

  /**
   * components
   */
  components: {
    'datatable-advanced-filter': AdvancedFilter
  },

  /**
   * data
   */
  data() {
    return {
      // Items TO Display For Each Paginated Page
      itemsPerPage: 50,
      // Current Page Number In Pagination
      currentPage: 1,
      // Current Page Items
      paginatedItems: [],
      // Sort Order
      asc: "asc",
      // Column For Sorting
      sortColumn: null,
      // Search Query
      query: '',
      // Table Headers
      headers: [],
      // Mapped Data
      items: [],
      // pagination data {links}
      links: {},
      // postObject
      postObject: {},
      // pagination data {meta}
      meta: {},
      // Mapped Action Buttons
      buttons: [],
      // Loading State For Ajax Requests
      ajaxLoading: false,
      // Items To Be Displayed
      renderedItems: [],
      // Selected Items
      selected: [],
      // url
      url: this.baseUrl,
      // currentUrl
      currentUrl: this.url,

    }
  },
  props: {
    // =================================
    // Ajax
    // Datatables Ajax Uses Axios
    // Make Sure Axios Is Added As An NPM Dependency
    // =================================
    // Ajax URL
    // url: {
    // 	type: String,
    // 	default: () => ''
    // },
    // Ajax Base URL
    baseUrl: {
      type: String,
      default: () => ''
    },
    FilterFields: {
      type: Array,
      default: () => {
      }
    },
    // Whether Or Not To Use Ajax
    ajax: {
      type: Boolean,
      default: () => false
    },
    // advancedSearch
    advancedSearch: {
      type: Boolean,
      default: () => false
    },
    // Ajax Headers
    AjaxHeaders: {
      type: Object,
      default: () => {
      }
    },
    // Table Items
    data: {
      type: Array,
      default: () => []
    },
    // Action Buttons For Each Item
    actions: {
      type: Array,
      default: () => []
    },
    // Columns and Appropriate Data Assigment
    columns: {
      type: Array,
      default: () => []
    },
    filters: {
      type: Array,
      default: () => []
    },
    // Whether or Not Items Should Be Indexed
    index: {
      type: Boolean,
      default: () => true
    },
    // Set Loading Status
    loading: {
      type: Boolean,
      default: () => false
    },
    // Click Events For Each Cell
    onClick: {
      type: Function,
      default: () => {
      }
    },
    // Whether Or Not The Table Should Be Allowed To Break Elements
    breakWords: {
      type: Boolean,
      default: () => false
    },
    // Whether Or Not The Header Should Be Visible
    header: {
      type: Boolean,
      default: () => true
    },
    // Whether Or Not The Footer Should Be Visible
    footer: {
      type: Boolean,
      default: () => true
    },
    // Whether Or Not Searching Should Be Available
    searchable: {
      type: Boolean,
      default: () => true
    },
    // Whether Or Not Page Limitation Should Be Changeable
    limitable: {
      type: Boolean,
      default: () => true
    },
    // Whether Or Not Details Should Be Visible
    pageDetails: {
      type: Boolean,
      default: () => true
    },
    // Whether Or Not The Results Should Be Paginatable
    paginatable: {
      type: Boolean,
      default: () => true
    },
    // Whether Or Not The Results are paginated form the server
    // We strongly assume use of laravel pagination style
    ajaxPaginated: {
      type: Boolean,
      default: () => false,
    },

    // Whether Or Not Items Should Be Selectable
    selectable: {
      type: Boolean,
      default: () => false
    },

    //set previous pagination control text
    prevText: {
      type: String,
      default: () => 'Prev'
    },

    //set next pagination control text
    nextText: {
      type: String,
      default: () => 'Next'
    },
    //items per page to show
    perPage: {
      default: () => null
    }
  },
  methods: {
    // Navigate To Provided Page
    // Arguments
    // 	Page: int
    paginate(page) {
      if (this.ajaxPaginated) {
        if (this.baseUrl.includes("?")) {
          this.getItemsFromAjax(this.url + `&page=${page}`)
        } else {
          this.getItemsFromAjax(this.url + `?page=${page}`)
        }
      } else {
        this.currentPage = page;
      }
    },
    // Navigate To Next Page
    next() {
      if (this.ajaxPaginated) {
        if (this.baseUrl.includes("?")) {
          let url = this.url + `&page=${this.meta.current_page + 1}`
          this.getItemsFromAjax(url)
          this.currentUrl = url
        } else {
          let url = this.url + `?page=${this.meta.current_page + 1}`
          this.getItemsFromAjax(url)
          this.currentUrl = url
        }

      } else {
        this.currentPage = this.currentPage >= this.renderedItems.length ? 0 : this.currentPage + 1;
      }
    },
    // Navigate To Previous Page
    prev() {
      if (this.ajaxPaginated) {
        if (this.baseUrl.includes("?")) {
          let url = this.url + `&page=${this.meta.current_page - 1}`
          this.getItemsFromAjax(url)
          this.currentUrl = url
        } else {
          let url = this.url + `?page=${this.meta.current_page - 1}`
          this.getItemsFromAjax(url)
          this.currentUrl = url
        }
      } else {
        this.currentPage = this.currentPage <= 0 ? this.renderedItems.length : this.currentPage - 1;
      }
    },
    // Navigate To Last Page
    end() {
      this.currentPage = this.renderedItems.length;
    },
    // Navigate To First Page
    start() {
      this.currentPage = 1;
    },

    /**
     * ajaxSearch
     */
    ajaxSearch(value) {

      let searchValues = value.url
      if (this.baseUrl.includes("?")) {
        searchValues = value.url.replace('?','&');
      }
      this.postObject = value.post
      this.url = this.baseUrl + searchValues

      this.getItemsFromAjax(this.url)
    },

    /**
     * reload
     */
    reload() {
      this.getItemsFromAjax(this.currentUrl);
    },

    /**
     * getItemsFromAjax
     */
    getItemsFromAjax(url) {
      this.ajaxLoading = true;
      this.currentUrl = url

      let request = (Object.keys(this.postObject).length == 0) ? this.$axios.get(url) : this.$axios.post(url, this.postObject);

      request.then(response => {
        if (!response.data.data) {
          this.ajaxLoading = false;

          return this.error("Unable To Parse Data");
        }
        this.items = response.data.data;

        if (this.ajaxPaginated) {
          this.links = response.data.links
          this.meta = response.data.meta
          this.itemsPerPage = this.meta.per_page
          this.$emit('loaded', this.meta)
        }

        this.ajaxLoading = false;

        this.success("Data Loaded");
      })
          .catch(error => {
            this.ajaxLoading = false;
            this.error(error || "Unable To Load Data");
          });
    },

    // Search Through Items With Provided Search Query
    // Arguments
    // 	Query: string
    search(query) {
      var items = this.mapItems(this.items);
      let retval = items.filter(item => {

        var found = false;
        // Search In Mapped Data
        item.details.forEach(detail => {
          // Cancel If Original And Processed Value Are NULL
          if (detail.value == null || detail.rendered == null) {
            return;
          }
          // If Found In Original Value
          if (detail.value.toString().match(new RegExp(query, "i"))) {
            found = true;
          }

          // If Found In Processed Value
          if (detail.rendered.toString().match(new RegExp(query, "i"))) {
            found = true;
          }
        });

        // Search In Provided Data
        for (var column in item.row) {
          if (!item.row[column]) {
            continue;
          }

          if (item.row[column].toString().match(new RegExp(query, "i"))) {
            found = true;
          }
        }

        return found;
      });
      this.renderedItems = retval;

      this.sortIndex(false);
    },
    // Sort Items By Specified Column and Order
    // Arguments
    // 	Column: String
    // 	Order: String [asc, desc]
    sort(column) {

      this.renderedItems = this.renderedItems.sort((a, b) => {
        var detailx = a.details.find(detail => detail.name == column);
        var x = detailx.rendered;
        if (!x) {

        }
        x = typeof x == 'string' ? x.toLowerCase() : x;
        var detaily = b.details.find(detail => detail.name == column);
        var y = detaily.rendered;
        if (!x) {

        }
        y = typeof y == 'string' ? y.toLowerCase() : y;
        return x > y ? 1 : -1;
      });
      if (column !== this.sortColumn) {
        this.asc = true;
      } else {
        this.asc = !this.asc;
      }

      if (!this.asc) {
        this.renderedItems = this.renderedItems.reverse();
      }
      this.sortColumn = column;

      this.currentPage = 1;
    },

    sortIndex(asc) {
      this.renderedItems = this.renderedItems.sort((a, b) => {
        var indexA = a.index;
        var indexB = b.index;
        return indexB > indexA ? 1 : -1;
      });
      this.asc = this.sortColumn == '#' ? !this.asc : true;

      if (asc != undefined) {
        if (!asc) {
          // console.log(this.renderedItems);
          this.renderedItems = this.renderedItems.reverse();
        }
      } else {
        if (!this.asc) {
          this.renderedItems = this.renderedItems.reverse();
        }
      }

      this.sortColumn = '#';

      this.currentPage = 1;
    },

    filter(filter) {
      var filterValue = filter.value,
          filterColumn = filter.name;

      var items = this.mapItems(this.items);
      var filtered = items.filter((item, index) => {
        var column = item.details.find((column, i) => column.name == filterColumn);
        if (!column) {
          return false;
        }
        // If Value Type Is A Custom Function
        if (filterValue.constructor.toString().match(/Function/)) {
          if (filterValue(item.row, column.value, index)) {
            return true;
          }
        } else if (column.value == filterValue || column.rendered == filterValue) {
          return true;
        }
        return false;
      });

      this.renderedItems = filtered;
      this.currentPage = 1;

      this.sortIndex(false);
    },

    getHeaders() {
      this.headers = this.columns.map((item) => ({name: item.name, th: item.th, show: item.show !== false}));
    },
    mapItems(items) {
      items = items.map((item, index) => {
        // Row Item
        var row = {
          row: item,
          details: [],
          index,
          buttons: [],
          selected: !!this.selected.find(a => a.index == index)
        };

        // Get Provided Columns
        this.columns.forEach((column, index2) => {

          row.details.push({
            // Item Column Name
            name: column.name,
            // Table Header Title
            th: column.th,
            // Provided Value
            value: item[column.name],
            // Decide Value Depending On Whether Render Method Is Provided
            rendered: column.render ? column.render(item, item[column.name], index) : item[column.name],
            // Origin Item Row
            row: item,
            // Whether Or Not To Display Item
            show: column.show !== false,
            // Click Event For Column
            click: column.click
          });

        });

        // Get Provided Actions
        this.actions.forEach((button, index3) => {

          row.buttons.push({
            // Spread Provided Button Properties
            ...button,
            text: button.render ? button.render(item, index) : button.text,
            color: button.renderColor ? button.renderColor(item, index) : button.color,
            // Decide Visibility Depending On Whether Show Method Is Provided
            // Default: true
            show: button.show ? button.show(item, index) : true,
            disabled: button.disabled ? button.disabled(item, index) : false
          });

        });

        return row;
      });
      return items;
    },
    click(row, cell, name, index) {
      if (this.onClick) {
        this.onClick(...arguments);
      }
    },
    columnClick(action, row, cell, name, index) {
      if (action) {
        action(row, cell, name, index);
      }

    },
    selectAll(event) {
      if (event.target.checked) {
        this.selected = [];
        this.renderedItems.forEach(item => {
          item.selected = true;
          this.selected.push(item);
        });
      } else {
        this.selected = [];
        this.renderedItems.forEach(item => {
          item.selected = false;
        });
      }
    },
    select(item) {
      var index = this.selected.findIndex(a => a.index == item.index);
      if (index > -1) {
        item.selected = false;
        this.selected.splice(index, 1);
      } else {
        item.selected = true;
        this.selected.push(item);
      }
    },


    // Alerts
    success(success = "Success") {
      toastr.success(success);
    },
    error(error = "Error") {
      toastr.error(error);
    }
  },
  computed: {
    // Total Number Of Pages For Pagination
    pages() {
      if (this.ajaxPaginated) {
        return this.meta.last_page
      }

      if (this.renderedItems.length > this.itemsPerPage) {
        return Math.ceil(this.renderedItems.length / this.itemsPerPage);
      } else {
        return 0;
      }
    },
    // Array Of Links With Page Number For Pagination
    paginateLinks() {
      var links = [];
      var approved = [];

      let center = Math.round(this.pages / 2) - 1;

      for (var i = 0; i < this.pages; i++) {
        if (this.pages > 6) {
          let difference = this.ajaxPaginated ? (this.meta.current_page - i) : (this.currentPage - i);
          let centerDifference = center - i;
          // around the current page
          if (!(difference < 0) && !(difference > 2)) {
            // around the center
          } else if (i === center) {
            // at the start or end
          } else if (this.pages - i <= 2 || i <= 1) {
            // everywhere else
          } else {
            continue;
          }
        }
        links.push({page: i + 1});
      }
      return links;
    },
    showFilters() {
      return Object.keys(this.filters).length > 0;
    }
  },
  watch: {
    currentPage(newValue) {
      this.paginatedItems = this.renderedItems.slice(this.itemsPerPage * (newValue - 1), (this.itemsPerPage * newValue));
    },
    itemsPerPage(newValue) {
      this.currentPage = 1;
      if (this.ajaxPaginated) {
        // return this.getItemsFromAjax;
      }
      return this.paginatedItems = this.renderedItems.slice(newValue * (this.currentPage - 1), (newValue * this.currentPage));
    },
    items(newValue) {
      this.getHeaders();

      this.renderedItems = this.mapItems(newValue);

      // Get All Items In Current Page
      this.paginatedItems = this.renderedItems.slice(this.itemsPerPage * (this.currentPage - 1), (this.itemsPerPage * this.currentPage));

      this.asc = true;

      this.sortIndex();
    },
    data(newValue) {
      this.items = newValue;
    },
    renderedItems(newValue) {
      this.paginatedItems = newValue.slice(this.itemsPerPage * (this.currentPage - 1), (this.itemsPerPage * this.currentPage));
    },
  },
  // Lifetime Events
  async mounted() {
    //get items per page
    if (this.perPage !== null) {
      this.itemsPerPage = this.perPage
    }
    // Parse Headers
    this.getHeaders();

    // Set Default Sorting To Index
    // Asc will be converted to false so order will be in reverse
    this.asc = false;
    this.sortIndex();

    // Use Provided Data If Ajax Is Not Specified
    if (!this.ajax) {
      // Map Items From Provided Data
      this.items = this.data;
      // Get All Items In Current Page
      // this.paginatedItems = this.renderedItems.slice(this.itemsPerPage * (this.currentPage - 1), (this.itemsPerPage * this.currentPage));
    } else {
      // Get Data From Server Using Ajax
      this.getItemsFromAjax(this.url)
    }
  }
}
</script>

<style lang="sass">
@keyframes spin
  from
    transform: rotate(0deg)
  to
    transform: rotate(359deg)

.data-table
  // font-size: 14px
  &-loading
    align-items: center
    display: flex
    height: 200px
    flex-flow: column
    justify-content: center
    position: relative
    width: 100%

    &-spinner
      animation: spin 1s linear infinite
      border-radius: 999px
      border: 2px solid #007bff
      border-top-color: transparent
      content: ''
      height: 75px
      margin-bottom: 15px
      width: 75px

    &-text
      font-weight: 300
      text-trnasform: uppercase

  &-control
		.custom-select
    width: initial

  .table
    &-responsive
      margin-bottom: 30px

      &::-webkit-scrollbar
        -webkit-apperance: none
        height: 15px
        width: 15px

        &-track
          background: #eee
          border-radius: 999px

        &-thumb
          background: #ccc
          border-radius: 999px
          border: 3px solid #eee

          &:focus
            background: #ccc

    &.straight
      white-space: nowrap

    thead
      th
        font-size: 12px
        font-weight: 500

        &.sortable
          cursor: pointer
          padding-right: 30px
          position: relative

          &:before,
          &:after
            border: 5px solid transparent
            content: ''
            display: block
            opacity: .3
            position: absolute
            right: 10px

          &:before
            border-bottom-color: currentColor
            top: 10px

          &:after
            bottom: 10px
            border-top-color: currentColor

        &.sort
          font-weight: 700

          &.asc
            &:before
              opacity: 1

          &.desc
            &:after
              opacity: 1

    tbody
      tr
        &.clickable
          cursor: pointer

      td
    // font-size: 12px

    &-filters
      margin-bottom: 15px

    &-filter
      background: #fff
      border-radius: 3px
      cursor: pointer
      color: #777
      display: inline-block
      font-size: 12px
      padding: 5px 15px
      margin: 0 0 3px 3px

      &:hover
        background: #aaa
        color: #fff

      &.active
        background: #337ab7
        color: #fff


</style>
