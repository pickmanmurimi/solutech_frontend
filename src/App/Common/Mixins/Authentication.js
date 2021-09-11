import {mapGetters} from "vuex";

let Authentication = {

    /**
     * data
     */
    data() {
        return {
            authentication_loader: false
        }
    },

    /**
     * authentication mixin methods
     */
    methods: {

        /**
         * setUserDetails
         */
        setUserDetails(redirect = true) {
            this.authentication_loader = true
            // user/me
            this.$axios.get('user/me')
                .then(response => {
                    let user = response.data.data;

                    //store user
                    if (user) {
                        this.$store.dispatch('set_user', user);
                        this.authentication_loader = false
                        // redirect to home
                        if (redirect)
                            this.$router.push({name: 'Home'});
                    }
                })
                .catch(error => {
                    this.authentication_loader = false
                    this.logout()
                })
        },

        /**
         * logout
         */
        logout: function () {
            this.$loading.show();
            this.$axios.post('/authentication/logout')
                .then(() => {
                    this.$loading.hide();
                    this.$store.dispatch('logout').then();
                })
                .catch(err => {
                    this.$loading.hide();
                    this.$store.dispatch('logout').then();
                    console.log(err)
                })
        },
    },

    /**
     * computed
     */
    computed: {
        ...mapGetters([
            'isAuthenticated',
            'user'
        ])
    }
}

export default Authentication;
