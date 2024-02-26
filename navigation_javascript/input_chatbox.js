function autoResizeTextarea() {
    const textarea = document.getElementById('myTextarea');
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
}

// Gọi hàm khi người dùng nhập văn bản
document.getElementById('myTextarea').addEventListener('input', autoResizeTextarea);
