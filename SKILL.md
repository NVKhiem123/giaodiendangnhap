---
name: cowcolap-auth-profile
description: Full specification, architecture guide, and operational instructions for the CowColap Authentication and User Profile web application with Firebase integration, Neobrutalism UI, interactive Canvas animations, and strict input validation rules.
---

# CowColap Authentication & Profile Skill Guide

This document defines the skills, operational protocols, architectural design, and input validation requirements for building, maintaining, and testing the **CowColap** user management system.

---

## 🛠️ Core Competencies & Technical Stack

1. **Frontend Architecture:**
   - **HTML5 & Vanilla Javascript (ES6+)**: Zero framework lock-in with clean modular architecture.
   - **Tailwind CSS**: Glassmorphism (`backdrop-blur-xl`, `bg-white/30`), custom font configurations, and responsive container layout.
   - **Neobrutalism Design System**: Heavy borders (`border-2 border-black`), offset drop shadows (`shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`), bold typography, and tactile hover states.
   - **Google Material Symbols & Typography**: `Inter` and `Manrope` Google Fonts, Material Symbols icons.

2. **Database & Cloud Integration:**
   - **Firebase Authentication (Compat API)**: Secure email/password credential management.
   - **Firebase Cloud Firestore**: User profile persistent storage (`users` collection).
   - **Resilient Fallback Layer**: Local persistent storage fallback ensuring 100% offline testing readiness.

3. **Interactive Visual Effects:**
   - **HTML5 Canvas Particle Physics**: Floating cow flock simulation (`cowCanvas`) with real-time mouse repulsion physics (`mouse.radius`, `velocityX`, `velocityY`).

---

## 📐 Validation Protocols & Business Logic

### 1. Registration Rules (`register`)
The registration engine strictly enforces all of the following conditions before dispatching data to Firebase:

| Field | Rule / Constraint | Error Message |
| :--- | :--- | :--- |
| **Email** | Standard email format (`validateEmailFormat`) | `Invalid Email` |
| **Email Uniqueness** | Must not exist in database | `Email already exists` |
| **Password Length** | Minimum 8 characters | `Password is too weak (tối thiểu 8 ký tự)` |
| **Password Uppercase** | At least 1 uppercase letter (`[A-Z]`) | `Password is too weak (cần ít nhất 1 chữ cái viết hoa)` |
| **Password Lowercase** | At least 1 lowercase letter (`[a-z]`) | `Password is too weak (cần ít nhất 1 chữ cái viết thường)` |
| **Password Special Char** | At least 1 special character (`[!@#$%^&*...]`) | `Password is too weak (cần ít nhất 1 ký tự đặc biệt)` |
| **Confirm Password** | Must equal Password | `Passwords do not match` |

**Post-Processing:**
- **Success:** Displays a green/black blocky toast with text `"Successfully"` and automatically redirects to the Login screen.
- **Failure:** Displays floating error toast and keeps inputs intact for corrections.

---

### 2. Login Rules (`login`)
- Enforces email & password formatting checks.
- Validates credentials against Firebase Auth / User Store.
- **Success:** Redirects immediately to Profile screen.
- **Failure:** Displays `"Invalid Email or Password"` or `"Incorrect password"`.

---

### 3. Profile Management (`profile`)
- Renders user metadata (`firstName`, `lastName`, `email`, `phone`, `address`, `isVerified`).
- **Edit Mode Protocol:**
  - Clicking **"Chỉnh sửa"** (Edit) unlocks `readonly` fields (`firstName`, `lastName`, `phone`, `address`) and presents active input focus borders.
  - Button state changes to **"Lưu thay đổi"** (Save) with an optional **"Hủy"** (Cancel) action.
  - Clicking **"Lưu thay đổi"** dispatches payload to `UserService.updateProfile(...)`, updates Firebase Firestore, updates header text, displays toast `"Cập nhật thông tin thành công!"`, and locks fields back to `readonly`.
- **Logout:** Clears active session and returns user to Login view.

---

## 💻 Code Structure & Functions

```text
BT_Buoi5/
├── firebase-config.js      # Firebase SDK initialization & LocalDatabase service fallback
├── app.js                  # Validation logic, toast UI, password toggles & cow canvas
├── index.html              # Main Single Page Application (SPA with Hash Routing)
├── register.html           # Standalone Register Page
├── login.html              # Standalone Login Page
├── profile.html            # Standalone Profile Page
├── SKILL.md                # Agent & Developer Skill Specification
└── README.md               # User & Deployment Guide
```

### Key API Signatures

```javascript
// Validation Engine
validateEmailFormat(email)            // returns boolean
validatePasswordRules(password)       // returns { valid: boolean, message: string }

// Data Service
UserService.register(email, password) // returns Promise<Profile>
UserService.login(email, password)    // returns Promise<Profile>
UserService.updateProfile(email, fields) // returns Promise<Profile>
UserService.logout()                  // clears session
```
