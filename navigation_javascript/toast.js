export function toast({
    title = "",
    message = '',
    type = "info",
    duration = 3000
}) {
    const main = document.getElementById('toast');
    if (main) {
        const toast = document.createElement('div');

        // auto remove
        const autoRemove = setTimeout(function () {
            main.removeChild(toast)
        }, duration + 1000)
        // remove when click
        toast.onclick = function (e) {
            if (e.target.closest('.toast__close')) {
                main.removeChild(toast);
                clearTimeout(autoRemove);
            }
        }
        const icons = {
            success: ' fas fa-circle-check',
            info: 'fas fa-info-circle',
            warning: 'fas fa-exclamation-circle',
            error: 'fas fa-exclamation-circle',

        }
        const icon = icons[type]

        const delay = (duration / 1000).toFixed(2)
        toast.classList.add('toast', `toast__${type}`);
        toast.style.animation = `slideInleft ease .3s, fadeOutToast linear 1s ${delay}s forwards`
        toast.innerHTML = `
            <div class="toast__icon">
                <i class="${icon}"></i>
            </div>
            <div class="toast__body">
                <div class="toast__title">${title}</div>
                <div class="toast__msg">${message}</div>
            </div>
            <div class="toast__close">
                <i class="fa-sharp fa-solid fa-xmark"></i>
            </div>
                    `;
        main.appendChild(toast);
        setTimeout(function () {
        }, duration + 1000)
    }
}
export function showSuccessToast(title = "Thành công", message = "Chúc mừng") {
    toast({
        title: title,
        message: message,
        type: "success",
        duration: 5000,
    })
}
export function showErrorToast(title = "Thất bại", message = "Vui lòng thử lại") {
    toast({
        title: title,
        message: message,
        type: "error",
        duration: 5000,
    })
}
