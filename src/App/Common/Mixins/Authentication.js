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
            this.$axios.get('admin-user/me')
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
                    console.log(error)
                })
        },

        /**
         * logout
         */
        logout: function () {
            this.authentication_loader = true;
            this.$axios({
                baseURL: process.env.VUE_APP_AUTH_API_ROOT,
                url: '/admin/logout',
                method: 'post',
                data: this.loginData
            }).then(() => {
                this.authentication_loader = false;
                this.$store.dispatch('logout').then();
            }).catch(err => {
                this.authentication_loader = false;
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