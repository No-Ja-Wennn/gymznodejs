// Import các module cần thiết
const express = require('express');
const path = require('path');
const app = express();

// Phục vụ các file tĩnh từ thư mục 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Khởi động server
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server đang chạy trên cổng ${port}`);
});
