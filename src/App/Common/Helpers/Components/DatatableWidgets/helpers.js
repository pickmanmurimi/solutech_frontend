var helpers = {
    /**
     * data
     */
    data() {
        return {
            refugee_groups: [],
        }
    },
    /**
     * helpers mixin methods
     */
    methods: {

        /**
         * getOptions
         */
        getOptions(getter, field ) {
            switch (getter) {
                case 'groups':
                    this.getGroups(field)
                    break;
                default:
                    break;
            }
        },

        /**
         * getGroups
         */
        getGroups(field) {
            axios.get('/api/v1/reports/groups')
                .then(Response => {
                    this.groups = Response.data.data
                    this.options[field] = this.groups
                })
                .catch(err => {})
        },
    }
}

export default helpers
