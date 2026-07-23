# 🐄 CowColap - Giao diện Đăng ký, Đăng nhập & Profile (Node.js & Firebase)

Dự án ứng dụng Web quản lý Tài khoản & Hồ sơ cá nhân (Authentication & User Profile) giao diện **Neobrutalism + Glassmorphism** hiện đại, kèm hiệu ứng nền động Đàn bò tương tác trên Canvas, tích hợp cơ sở dữ liệu **Firebase** và Server **Node.js Express Backend**.

---

## 🌟 Cấu trúc dự án chuẩn

```text
BT_Buoi5/
├── Design/                    # Chứa thiết kế DESIGN.md và TẤT CẢ file ảnh (baico, cow, logo)
│   ├── DESIGN.md
│   ├── baico.jpg
│   ├── cow.png
│   └── logo.png
├── backend/                   # Chứa server Node.js Express REST API backend
│   ├── package.json
│   └── server.js
├── frontend/                  # Chứa toàn bộ giao diện HTML, JS & Firebase config
│   ├── index.html
│   ├── register.html
│   ├── login.html
│   ├── profile.html
│   ├── app.js                 # 1 file JS duy nhất dùng chung xử lý logic & gọi API
│   └── firebase-config.js     # 1 file cấu hình duy nhất kết nối CSDL
├── README.md                  # Hướng dẫn cài đặt & sử dụng
└── Skill.md                   # Hồ sơ tài liệu kỹ thuật & Agent Skill specification
```

---

## 🚀 Hướng dẫn Cài đặt & Khởi chạy

### 1. Khởi chạy Backend Node.js Express:
1. Di chuyển vào thư mục `backend`:
   ```bash
   cd backend
   ```
2. Cài đặt các gói phụ thuộc (nếu chưa cài):
   ```bash
   npm install
   ```
3. Khởi chạy server Backend:
   ```bash
   npm start
   ```
   *Server Backend sẽ chạy tại: `http://localhost:5000`*

---

### 2. Khởi chạy Frontend:
Mở thư mục `frontend`:
- Mở trực tiếp `frontend/index.html` (hoặc `register.html`, `login.html`, `profile.html`) bằng bất kỳ trình duyệt web nào.
- Hoặc sử dụng extension **Live Server** / `npx serve frontend` để xem giao diện web.

---

## ⚙️ Tính năng & Quy tắc kiểm tra (Validation)

- **Đăng ký (Register):** Kiểm tra email hợp lệ, kiểm tra trùng lặp email, kiểm tra độ mạnh mật khẩu (>= 8 ký tự, 1 chữ hoa, 1 chữ thường, 1 ký tự đặc biệt), và trùng khớp mật khẩu xác nhận. Đăng ký thành công báo `"Successfully"` và tự động chuyển sang trang Login.
- **Đăng nhập (Login):** Xác thực email & password qua Backend REST API / Firebase. Chuyển sang Profile khi đăng nhập thành công.
- **Trang Profile:** Hiển thị thông tin cá nhân và cho phép bấm nút **"Chỉnh sửa"** (Edit) để cập nhật Họ tên, SĐT, Địa chỉ lên CSDL Firebase & Backend API.
