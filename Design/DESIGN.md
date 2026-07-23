# Design Specification - CowColap App

Dài liệu đặc tả thiết kế giao diện ứng dụng Đăng ký, Đăng nhập và Trang cá nhân (Profile) theo chuẩn yêu cầu BTC.

## 1. Bảng màu & Typography System
- **Theme:** Glassmorphism + Neobrutalism UI
- **Chủ đề màu:** Black & White Minimalist với Accent Green (`#10B981`) cho status tag
- **Fonts:** 
  - Main Body: `Inter` (sans-serif)
  - Heading: `Manrope` (sans-serif)
- **Icons:** Google Material Symbols Outlined

## 2. Các trang giao diện
- **Trang Đăng ký (Register):** Glassmorphic Form Card, Input Email & Password (có mắt nhắm/mở), Nút Đăng ký Neobrutalist Blocky với shadow `shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`.
- **Trang Đăng nhập (Login):** Form Đăng nhập đồng bộ phong cách, liên kết chuyển đổi giữa Đăng ký/Đăng nhập.
- **Trang Profile:** Header Navbar sticky mờ kính, Avatar bo tròn, Khung hiển thị thông tin cá nhân (Họ tên, Email, SĐT, Địa chỉ), Nút Chỉnh sửa (Edit mode) và Nút Đăng xuất.

## 3. Assets
- `baico.jpg`: Ảnh nền đồng cỏ
- `cow.png`: Sprite con bò chạy tự do trên canvas nền
- `logo.png`: Logo thương hiệu CowColap
