import swal from 'sweetalert';

const swalPlugin = {}

swalPlugin.install = function(app){
    app.config.globalProperties.$swal = swal
}

export default swalPlugin;
