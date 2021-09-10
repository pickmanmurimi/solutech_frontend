<template>

  <div class="col-12">
    <ul class="pagination d-flex justify-content-center">
      <li v-if="data.links.prev" class="page-item">
        <span class="page-link" @click="paginate('prev')"><i class="fas fa-chevron-left"></i></span>
      </li>
      <li v-for="item in paginateLinks" v-bind:key="item.page" :class="{active: data.meta.current_page === item.page}"
          class="page-item">
        <span class="page-link" @click="paginate(item.page)">{{ item.page }}</span>
      </li>
      <li v-if="data.links.next" class="page-item">
        <span class="page-link" @click="paginate('next')"><i class="fas fa-chevron-right"></i></span>
      </li>
    </ul>
  </div>

</template>

<script>
export default {
  /**
   * name
   */
  name: "AjaxPagination",

  /**
   * props
   */
  props: {
    data: {
      required: true,
    },
  },

  /**
   * methods
   */
  methods: {

    /**
     * paginate
     * @param page
     */
    paginate(page) {
      this.$emit('paginate', page)
    },
  },

  /**
   * computed
   */
  computed: {

    /**
     * paginateLinks
     * @return {[]}
     */
    paginateLinks() {
      let links = [];
      let approved = [];

      let center = Math.round(this.data.meta.last_page / 2) - 1;

      for (let i = 0; i < this.data.meta.last_page; i++) {
        if (this.data.meta.last_page > 6) {
          let difference = (this.data.meta.current_page - i);
          let centerDifference = center - i;
          // around the current page
          if (!(difference < 0) && !(difference > 2)) {
            // around the center
          } else if (i === center) {
            // at the start or end
          } else if (this.data.meta.last_page - i <= 2 || i <= 1) {
            // everywhere else
          } else {
            continue;
          }
        }
        links.push({page: i + 1});
      }
      return links;
    },

  }
}
</script>

<style scoped>

</style>