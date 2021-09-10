<template>
  <div>
    <div class="modal fade" :id="modalId" :ref="modalId" tabindex="-1" role="dialog" aria-labelledby="modalLabel"
         aria-hidden="true">
      <div class="modal-dialog" :class="'modal-' + size" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalLabel">{{ title }}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <!-- body -->
            <slot name="body"></slot>
          </div>
          <div class="modal-footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  /**
   * props
   */
  props: {
    title: {
      required: true
    },
    modalId: {
      required: true
    },
    size: {
      default: () => {
        return 'md'
      }
    }
  },

  /**
   * mounted
   */
  mounted() {
    this.triggerHidden();
    this.triggerShow();
  },

  /**
   * methods
   */
  methods: {
    /**
     * triggerHidden
     */
    triggerHidden() {
      let self = this;
      if ( $( this.$refs[ this.modalId ] ).length ) {
        $( this.$refs[ this.modalId ] ).on('hidden.bs.modal', function () {
          //catch the native bootstrap close event and trigger yours
          self.$emit('modal-close');
        });
      }
    },

    /**
     * triggerShow
     */
    triggerShow() {
      let self = this;
      if ( $( this.$refs[ this.modalId ] ).length ) {
        $( this.$refs[ this.modalId ] ).on('shown.bs.modal', function () {
          //catch the native bootstrap close event and trigger yours
          self.$emit('modal-show');
        });
      }
    },
  }
}

</script>
