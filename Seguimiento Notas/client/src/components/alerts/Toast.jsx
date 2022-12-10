import Swal from 'sweetalert2';

export const ShowToast = (icon, title, text) => {
    Swal.fire({
        toast: true,
        position: 'bottom-end',
        showCloseButton: true,
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
        icon: icon,
        title: title,
        text: text,
        didOpen: toast => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
    })
}