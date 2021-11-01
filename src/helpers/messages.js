import Swal from 'sweetalert2';

export const toastMessage = (icon, title, text) => Swal.fire(({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
    icon,
    title,
    text,
}));

export const deleteMessage = (callback) => Swal.fire({
    title: '¿Estas seguro?',
    // text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Eliminar',
    cancelButtonText: 'Cancelar'
}).then((result) => {
    if (result.isConfirmed) {
        callback();
    }
});