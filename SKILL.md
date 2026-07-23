---
name: cowcolap-auth-profile
description: Full specification, architecture guide, and operational instructions for the CowColap Authentication and User Profile web application with Node.js Express backend, Firebase integration, Neobrutalism UI, and strict input validation rules.
---

# CowColap Authentication & Profile Skill Guide

This document defines the skills, operational protocols, architectural design, and input validation requirements for building, maintaining, and testing the **CowColap** user management system.

---

## 📐 Repository Structure

```text
BT_Buoi5/
├── Design/                    # Contains DESIGN.md and ALL image assets (baico, cow, logo)
│   ├── DESIGN.md
│   ├── baico.jpg
│   ├── cow.png
│   └── logo.png
├── backend/                   # Node.js Express REST API Backend
│   ├── package.json
│   └── server.js
├── frontend/                  # Frontend UI codebase
│   ├── index.html
│   ├── register.html
│   ├── login.html
│   ├── profile.html
│   ├── app.js                 # Unified JS logic & API dispatch engine
│   └── firebase-config.js     # Unified Firebase & API Service configuration
├── README.md                  # Deployment & User Guide
└── Skill.md                   # Skill & Architecture Specification
```

---

## 🛠️ Core Competencies & Technical Stack

1. **Backend Server (Node.js & Express):**
   - **REST APIs**: `POST /api/register`, `POST /api/login`, `GET /api/profile`, `PUT /api/profile/update`.
   - **Data Storage**: JSON persistent data store (`users.json`) & Firebase Cloud Firestore compat.
   - **CORS Enabled**: Cross-origin requests handled cleanly.

2. **Frontend Architecture:**
   - **HTML5 & Vanilla Javascript (ES6+)**: Zero framework lock-in with clean modular architecture.
   - **Tailwind CSS & Glassmorphism**: Glassmorphism (`backdrop-blur-xl`, `bg-white/30`), Neobrutalism offset shadows (`shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`).
   - **Google Material Symbols & Typography**: `Inter` and `Manrope` Google Fonts.

3. **Validation Engine:**
   - Email format regex validation.
   - Password strength validation: >=8 characters, at least 1 uppercase, 1 lowercase, 1 special character.
   - Password confirmation equality validation.

4. **Interactive Visual Effects:**
   - HTML5 Canvas particle physics simulation (`cowCanvas`) with real-time mouse repulsion.
