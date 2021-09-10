var permissions = {

    /**
     * data
     */
    data() {
        return {
            user_permissions: []
        }
    },
    
    /**
    * permissions mixin methods
    */
    methods: {
        /**
         * can
         * checks if the user has a specified permission
         * pass the object id if you need to allow users action if the object belongs to the user
         * @param permission
         * @param object_id (optional)
         * 
         * @return boolean
         */
        can: function (permission, object_id = null) {
            // 
            this.user_permissions = this.$store.getters.user.permissions
            // return true if resource can be accessed by all users
            if ( permission === '*') { return true }
            // if object_id is passed
            if( object_id !== null ){ return this.objectBelongsToUser( object_id ) }
            //if index of is less than 1
            return this?.user_permissions.indexOf( permission ) >= 0;
        },

        /**
         * objectBelongsToUser
         * checks if the user has a specified permission on the defined object
         * Do not call this method directly from the vue components
         * This method can be accessed from the can method by passing an id to the can method
         * @param permission
         * @param object_id
         * 
         * @return boolean
         */
        objectBelongsToUser: function ( object_id ) {
            //
            return object_id === this.$store.getters.user.id
        }
    }
}

export default permissions
