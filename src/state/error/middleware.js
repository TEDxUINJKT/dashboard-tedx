import Swal from 'sweetalert2';

function ShowSuccess(message) {
    Swal.fire({
        icon: 'success',
        title: 'Success',
        confirmButtonColor: '#eb0028',
        text: message,
    });
};

function ShowError(message) {
    Swal.fire({
        icon: 'error',
        title: 'Error',
        confirmButtonColor: '#eb0028',
        text: message,
    });
};

export { ShowSuccess, ShowError }