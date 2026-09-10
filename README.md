# 🚀 Web Folio

<p align="center">

![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?style=for-the-badge&logo=node.js)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![Express.js](https://img.shields.io/badge/Express.js-Backend-000000?style=for-the-badge&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-UI-06B6D4?style=for-the-badge&logo=tailwindcss)
![Cloudinary](https://img.shields.io/badge/Cloudinary-Media%20Storage-3448C5?style=for-the-badge&logo=cloudinary)
![Vercel](https://img.shields.io/badge/Vercel-Deployment-000000?style=for-the-badge&logo=vercel)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

</p>

A full-stack developer portfolio with a built-in blog and a custom
mini-CMS. Browse projects, read Markdown case studies and docs, and
get in touch — all backed by a protected admin panel where the site
owner manages everything without touching a database directly.

🔗 **Live Demo:** https://web-folio-tlrw.vercel.app/

📖 **Full technical write-up:** [`DOCUMENTATION.md`](./DOCUMENTATION.md)
— file-by-file breakdown, complete API reference, architecture
diagrams, and the engineering challenges solved along the way.

---

## ✨ What's inside

- **Projects showcase** — image or autoplaying preview video, tech
  badges, live/GitHub links, and automatic Case Study / Docs links
  pulled from any post tied to that project
- **Blog & mini-CMS** — Markdown posts, syntax-highlighted code,
  search, category/tag filters, reading time, related posts
- **Audience-aware landing** — a one-time popup lets visitors self-sort
  into "recruiter" (case studies) or "developer" (documentation)
- **Admin dashboard** — single-admin JWT auth, full CRUD on posts and
  projects, a contact inbox, and live stats
- **Cloudinary media pipeline** — images stream straight to Cloudinary;
  videos upload **directly from the browser**, so large files never
  touch the backend
- **Light/dark theme, responsive down to small phones, Framer Motion
  polish throughout**

---

## 🛠 Tech Stack

**Frontend:** React 18, Vite, Tailwind CSS, React Router, Axios,
Framer Motion, `react-markdown`

**Backend:** Node.js, Express, MongoDB/Mongoose, JWT, Zod, Multer,
Cloudinary SDK

**Deployed on:** Vercel (frontend + serverless backend), MongoDB
Atlas, Cloudinary

---

## 🚀 Quick Start

```bash
git clone https://github.com/yourusername/web-folio.git
cd web-folio

# backend
cd server && npm install
npm run dev        # http://localhost:5000
npm run seed        # creates the single admin account

# frontend (new terminal)
cd ../client && npm install
npm run dev         # http://localhost:5173
```

You'll need a `.env` in `server/` with your MongoDB URI, a JWT secret,
and Cloudinary credentials — see
[Environment Variables](./DOCUMENTATION.md#-environment-variables) in
the full docs for the complete list.

---

## 📷 Screenshots

Add screenshots to a `screenshots/` folder — see
[`DOCUMENTATION.md`](./DOCUMENTATION.md#-application-screenshots) for
the expected filenames.

---

## 📄 License

MIT — free to use, modify, and learn from.

---

## 👨‍💻 Author

**Muhammed Wahaj Ahmed** — MERN Stack Developer

If this was useful, a ⭐ on GitHub is appreciated.