# 🐄 CowColap - Giao diện Đăng ký, Đăng nhập & Profile với Firebase

Dự án ứng dụng Web quản lý Tài khoản & Hồ sơ cá nhân (Authentication & User Profile) giao diện **Neobrutalism + Glassmorphism** hiện đại, kèm hiệu ứng đàn bò động tương tác trên Canvas và tích hợp cơ sở dữ liệu **Firebase**.

---

## 🌟 Tính năng chính

### 1. 🎨 Giao diện chuẩn mẫu BTC Design
- **Phong cách thiết kế:** Glassmorphic UI kết hợp Neobrutalist Blocky buttons, Google Material Symbols và phông chữ Inter / Manrope.
- **Nền động độc đáo:** Khung Canvas tương tác chuột theo thời gian thực với hiệu ứng đàn bò chuyển động linh hoạt.
- **Tương thích cao:** Hỗ trợ cả giao diện SPA (Single Page Application trong `index.html`) lẫn các trang đơn lẻ (`register.html`, `login.html`, `profile.html`).

---

### 2. 🔐 Chức năng Đăng ký (Register)
Ràng buộc kiểm tra dữ liệu nghiêm ngặt trước khi lưu tài khoản:
- **Email đúng định dạng:** Ràng buộc theo chuẩn Regex Email.
- **Email chưa tồn tại:** Kiểm tra email đã được đăng ký trước đó trên Firebase / Database hay chưa (`Email already exists`).
- **Độ mạnh mật khẩu:**
  - Tối thiểu 8 ký tự.
  - Chứa ít nhất **01 chữ cái viết hoa** (`A-Z`).
  - Chứa ít nhất **01 chữ cái viết thường** (`a-z`).
  - Chứa ít nhất **01 ký tự đặc biệt** (`!@#$%^&*...`).
- **Xác nhận mật khẩu:** Ô *Confirm Password* bắt buộc phải trùng khớp 100% với mật khẩu đã nhập.
- **Xử lý:** Thông báo toast **"Successfully"** khi thành công và tự động chuyển sang trang Đăng nhập. Hiển thị chi tiết lỗi khi thất bại.

---

### 3. 🔑 Chức năng Đăng nhập (Login)
- Kiểm tra email và mật khẩu theo cùng quy tắc hợp lệ.
- Xác thực tài khoản với Firebase Auth & CSDL.
- Chuyển hướng trực tiếp tới trang Hồ sơ cá nhân (Profile) khi thành công.

---

### 4. 👤 Trang Profile & Chỉnh sửa thông tin
- Hiển thị thông tin cá nhân bao gồm: *Họ và tên đệm*, *Tên*, *Email*, *Số điện thoại*, *Địa chỉ*, *Avatar* và *Badge trạng thái đã xác minh*.
- **Chế độ Chỉnh sửa (Edit Mode):** Nút **"Chỉnh sửa"** kích hoạt chế độ chỉnh sửa thông tin, cho phép nhập lại các trường dữ liệu và lưu lại thông qua nút **"Lưu thay đổi"**.
- **Đồng bộ Firebase:** Mọi thay đổi dữ liệu cá nhân lập tức được cập nhật thành công lên **Firebase Firestore / Database**.
- **Đăng xuất:** Nút **"Đăng xuất"** giúp kết thúc phiên làm việc an toàn.

---

## 📁 Cấu trúc thư mục dự án

```text
BT_Buoi5/
├── index.html                 # Trang SPA tổng hợp 3 view (Register, Login, Profile)
├── register.html              # Trang Đăng ký độc lập
├── login.html                 # Trang Đăng nhập độc lập
├── profile.html               # Trang Profile độc lập
├── firebase-config.js         # Cấu hình Firebase SDK & Database Service
├── app.js                     # Logic kiểm tra điều kiện, Canvas đàn bò & Toast UI
├── baico.jpg                  # Ảnh nền đồng cỏ
├── cow.png                    # Asset con bò động cho Canvas
├── logo.png                        # Logo CowColap
├── Trang_Dang_Ki/             # Thư mục trang Đăng ký chi tiết
├── Trang_Dang_Nhap/           # Thư mục trang Đăng nhập chi tiết
├── Profile/                   # Thư mục trang Profile chi tiết
└── README.md                  # Hướng dẫn cài đặt & sử dụng
```

---

## 🚀 Hướng dẫn Cài đặt & Khởi chạy

### Cách 1: Chạy trực tiếp qua Trình duyệt Web (Đơn giản nhất)
1. Tải repository hoặc clone về máy:
   ```bash
   git clone https://github.com/NVKhiem123/giaodiendangnhap.git
   ```
2. Mở trực tiếp file `index.html` (hoặc `register.html`, `login.html`, `profile.html`) bằng bất kỳ trình duyệt web nào (Chrome, Edge, Firefox, Safari).

---

### Cách 2: Khởi chạy bằng Local Server (Nên dùng cho Development)

#### Sử dụng Extension Live Server trên VS Code:
1. Mở thư mục dự án trong **VS Code**.
2. Click chuột phải vào file `index.html` chọn **Open with Live Server**.

#### Sử dụng Node.js `serve`:
```bash
npx serve .
```
Truy cập địa chỉ local được hiển thị (ví dụ: `http://localhost:3000`).

---

## ⚙️ Cấu hình Firebase (Tùy chọn)

Dự án đã chuẩn bị sẵn dịch vụ đồng bộ Firebase trong file `firebase-config.js`.

Để kết nối với dự án Firebase của riêng bạn:
1. Truy cập [Firebase Console](https://console.firebase.google.com/) và tạo một Project mới.
2. Bật dịch vụ **Authentication** (Email/Password) và **Cloud Firestore** (hoặc Realtime Database).
3. Mở file `firebase-config.js` và thay thế đoạn mã cấu hình `firebaseConfig` bằng API key của bạn:

```javascript
const firebaseConfig = {
    apiKey: "YOUR_ACTUAL_FIREBASE_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```

> **Lưu ý:** Nếu chưa điền Firebase API Key, ứng dụng vẫn hoạt động 100% đầy đủ nhờ bộ lưu trữ persistent database dự phòng được tích hợp sẵn.

---

## 📖 Hướng dẫn Sử dụng

1. **Đăng ký tài khoản:**
   - Mở màn hình Đăng ký (`#register` hoặc `register.html`).
   - Nhập thông tin Email và Mật khẩu thỏa mãn các quy tắc (>= 8 ký tự, có chữ hoa, chữ thường & ký tự đặc biệt).
   - Nhập lại mật khẩu khớp với mật khẩu đã tạo rồi bấm **Đăng ký**.
   - Sau khi hiện thông báo **"Successfully"**, hệ thống tự động đưa bạn tới trang Đăng nhập.

2. **Đăng nhập:**
   - Nhập Email và Mật khẩu vừa đăng ký rồi bấm **Đăng nhập**.
   - Đăng nhập thành công sẽ chuyển hướng trực tiếp vào trang **Profile**.

3. **Chỉnh sửa Hồ sơ cá nhân:**
   - Tại trang Profile, bấm nút **"Chỉnh sửa"**.
   - Cập nhật Họ & Tên đệm, Tên, Số điện thoại hoặc Địa chỉ.
   - Bấm **"Lưu thay đổi"** để lưu dữ liệu lên Firebase.

---

## 🛠️ Công nghệ sử dụng
- **HTML5 & CSS3**
- **JavaScript (ES6+)**
- **Tailwind CSS (via CDN)**
- **Firebase SDK (v9/v10 Compat API)**
- **Google Material Symbols & Google Fonts**
- **HTML5 Canvas Animation API**
