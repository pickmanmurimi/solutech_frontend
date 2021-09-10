import swal from 'sweetalert';

const swalPlugin = {}

swalPlugin.install = function(Vue){
    Vue.prototype.$swal = swal
}

export default swalPlugin;