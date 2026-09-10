# 🚀 Web Folio — Full Technical Documentation

> This is the in-depth, file-by-file technical reference. For a quick
> overview, screenshots, and a 5-minute setup, see
> [`README.md`](./README.md) instead.

<p align="center">

![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?style=for-the-badge&logo=node.js)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![Express.js](https://img.shields.io/badge/Express.js-Backend-000000?style=for-the-badge&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-UI-06B6D4?style=for-the-badge&logo=tailwindcss)
![Cloudinary](https://img.shields.io/badge/Cloudinary-Media%20Storage-3448C5?style=for-the-badge&logo=cloudinary)
![JWT](https://img.shields.io/badge/JWT-Authentication-000000?style=for-the-badge&logo=jsonwebtoken)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

</p>

A full-stack developer portfolio with a built-in blog and a custom
mini-CMS. Visitors can browse projects, read Markdown-authored blog
posts (including in-depth case studies tied to specific projects), and
get in touch through a contact form. Behind a protected admin panel,
the site owner can create and manage projects and posts, upload cover
images and preview videos, and keep an eye on incoming messages — all
without touching a database directly.

---

# 📑 Table of Contents

- [Project Overview](#-project-overview)
- [Live Demo](#-live-demo)
- [Getting Started](#-getting-started)
- [Why This Project?](#-why-this-project)
- [Key Features](#-key-features)
- [System Architecture](#-system-architecture)
- [Application Workflow](#-application-workflow)
- [Project Structure](#-project-structure)
- [Technologies Used](#-technologies-used)
- [API Documentation](#-api-documentation)
- [Installation & Setup](#-installation--setup)
- [Environment Variables](#-environment-variables)
- [Application Screenshots](#-application-screenshots)
- [Project Documentation](#-project-documentation)
- [Styling](#-styling)
- [Public Folder](#-public-folder)
- [Design Principles](#-design-principles)
- [Overall Project Flow](#-overall-project-flow)
- [Challenges Faced](#-challenges-faced)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Performance Considerations](#-performance-considerations)
- [Future Improvements](#-future-improvements)
- [Learning Outcomes](#-learning-outcomes)
- [Project Highlights](#-project-highlights)
- [Contributing](#-contributing)
- [License](#-license)
- [Author](#-author)
- [Support](#-support)

---

# 📖 Project Overview

Web Folio is a full-stack MERN application built around a single idea:
a portfolio shouldn't just list projects — it should let visitors read
the story behind them.

The application has two audiences:

- **Visitors** who browse projects, read blog posts and case studies,
  and reach out through the contact form. No account is required.
- **The Site Owner (Admin)** who logs into a protected dashboard to
  create, edit, and publish projects and blog posts, and to review
  contact messages.

Projects and blog posts are connected: a post can be flagged as a
**case study** or as **documentation** for a specific project, and the
project card will automatically surface a "Case Study" or "Docs" link
to that post — no manual linking required beyond selecting the related
project while writing.

The project demonstrates practical full-stack development using
React, Node.js, Express, MongoDB, JWT authentication, Cloudinary media
storage, REST APIs, Markdown content pipelines, responsive UI design,
light/dark theming, and reusable React components.

---

# 🌐 Live Demo

You can explore the application using the live demo below.

🔗 **Live Demo:** https://your-demo-url.com

> **Note:** When the API is hosted on a free-tier backend service, it
> may go into sleep mode after a period of inactivity. If the first
> request after a while feels slow, that's the backend waking up —
> not an application failure.

---

## 🚀 Getting Started

### Browsing the Site (No Account Needed)

The public site is open to everyone:

1. Land on the **Home** page for a quick intro and featured projects.
2. Visit **Projects** to browse the full list, or **About** to read
   the fuller story.
3. Open **Blog** to read posts — filter by search, category, or tag.
4. Some projects link out to a **Case Study** or **Docs** post that
   walks through how that project was built.
5. Use **Contact** to send a message directly to the site owner.

---

### Admin Access

The admin panel is for the site owner only — there is no public
registration flow.

1. Open `/admin/login`.
2. Sign in with the seeded admin email and password.
3. The app authenticates the session using a JWT stored in an
   httpOnly cookie.
4. You're redirected to the **Dashboard**, where you can manage posts,
   projects, and incoming messages.

> **Note:** Only one admin account exists per deployment, created via
> the `npm run seed` script (see [Installation & Setup](#-installation--setup)).

---

# 💡 Why This Project?

Most portfolio sites are static — a list of project cards and a
"contact me" form. Web Folio explores a content-first approach by
combining:

- Project showcases with live demos, source links, and media previews
- A Markdown-powered blog for write-ups, case studies, and documentation
- A direct relationship between projects and the posts that explain them
- A lightweight, single-admin CMS instead of a heavyweight headless CMS
- Cloud-hosted media instead of bloating the database with binary files
- Light/dark theming and motion-driven UI polish
- REST APIs, MongoDB data storage, and a responsive React front end

The goal is a portfolio that can grow into a technical blog without
switching platforms, while staying simple enough for one person to
maintain.

---

# ⭐ Key Features

## 🔐 Authentication & Access Control

- Single-admin login (email + password)
- JWT-based authentication
- httpOnly, cookie-based session (with an `Authorization: Bearer`
  fallback for non-browser clients)
- Password hashing with bcrypt
- Rate-limited login endpoint (5 attempts / 15 minutes)
- `protect` middleware guarding every admin route
- Client-side `ProtectedRoute` that redirects unauthenticated visitors
  to `/admin/login`

---

## 🏠 Public Site

- Hero section with a call to action
- Featured projects preview on Home and About
- Full "About" story section
- Responsive navbar with active-link highlighting and a mobile menu
- Footer with social links
- Per-page SEO (title, description, Open Graph, Twitter Card) via
  `react-helmet-async`
- Framer Motion page transitions and scroll-triggered animations

---

## 💼 Projects Showcase

- Project cards with an image or an autoplaying muted preview video
- Tech-stack badges per project
- Live demo and GitHub source links
- "Featured" flag to highlight top projects on Home/About
- Automatic **Case Study** and **Docs** buttons, resolved from any
  published post linked to that project
- Loading skeletons, empty state, and error state with retry
- Preview videos upload **directly from the browser to Cloudinary**
  via a signed-upload flow, so large files never pass through the
  backend and never hit a serverless function's request-body limit

---

## 📝 Blog & Mini-CMS

- Markdown-authored posts rendered with syntax-highlighted code blocks
- Category and tag filtering
- Case-study and documentation flags for posts that explain a specific
  project from two different angles
- Full-text search across title, description, and content
- Pagination
- Automatic reading-time estimate
- Related posts (by category or overlapping tags)
- Previous / next post navigation
- Auto-generated "On This Page" table of contents from post headings
- Auto-generated, collision-safe slugs

---

## 🎯 Audience-Aware Landing

- A dismissible popup on the Home page lets a first-time visitor
  self-select as a **recruiter** or a **developer**
- Each choice deep-links into a pre-filtered Blog view — case studies
  for recruiters, documentation for developers
- The choice is remembered via `localStorage`, so returning visitors
  never see the prompt again
- The Blog page shows a clearable "Showing: Case Studies" /
  "Showing: Documentation" filter badge whenever a type filter is
  active

---

## 🛠 Admin Dashboard

- At-a-glance stats: total/published/draft posts, total/featured
  projects, total contact messages
- Recent posts and recent messages widgets
- Quick links into every management area

---

## 🗂 Content Management

- Create, edit, publish/unpublish, and delete blog posts
- Create, edit, and delete projects
- Markdown editor (`@uiw/react-md-editor`) for writing posts
- Tag and tech-stack chip inputs
- Cover image uploads (posts) and image/video uploads (projects) to
  Cloudinary
- Link a post to a project and mark it as a case study or
  documentation

---

## 📬 Contact

- Public contact form with client-side validation
- Rate-limited submissions (5 / hour) to curb spam
- Messages persisted to MongoDB regardless of email delivery
- Optional email notification via Nodemailer/SMTP
- Admin inbox: paginated list, delete, and unread/total count

---

## 🎨 Theming & UX

- Light/dark mode toggle, persisted to `localStorage`
- Tailwind `class`-strategy dark mode
- Custom brand color palette with light/dark variants
- Loading skeletons for posts and projects
- Reusable empty and error states across every data-driven page
- Fully responsive layout down to a custom `480px` breakpoint

---

## 🔒 Security

- Helmet HTTP security headers
- CORS restricted to the configured client origin, with credentials
- Zod schema validation on every mutating request
- Centralized error handling for Mongoose, Multer, and JWT errors
- Rate limiting on the login and contact endpoints

---

# 🏗️ System Architecture

```text
                         +--------------------------+
                         |      React Frontend      |
                         |     Vite + Tailwind      |
                         +------------+-------------+
                                      |
                                  Axios API
                                      |
                                      ▼
                         +--------------------------+
                         |      Express Backend     |
                         |   REST APIs + JWT Auth   |
                         +------------+-------------+
                                      |
                   +------------------+------------------+
                   |                                     |
                   ▼                                     ▼
        +----------------------+              +----------------------+
        |        MongoDB       |              |       Cloudinary     |
        | Admin, Posts,        |              | Images & Project     |
        | Projects, Messages   |              | Preview Videos       |
        +----------------------+              +----------------------+
                   |
                   ▼
        +----------------------+
        |  JWT + Cookie Auth   |
        |     Admin Only       |
        +----------------------+
                   |
                   ▼
        +----------------------+
        |  Nodemailer / SMTP   |
        | Contact Notifications|
        |      (optional)      |
        +----------------------+
```

---

# 🔄 Application Workflow

```text
        Visitor                                 Site Owner
           │                                         │
           ▼                                         ▼
   Browse Public Pages                        Open /admin/login
 (Home / About / Projects /                          │
     Blog / Contact)                                 ▼
           │                                  Enter Credentials
     ┌─────┴─────┐                                   │
     ▼           ▼                                   ▼
 Read Blog    Submit Contact                  JWT Cookie Issued
  Posts           Form                                │
     │              │                                 ▼
     ▼              ▼                          Admin Dashboard
View Linked    Message Saved                          │
 Project      + Optional Email          ┌──────────────┼──────────────┐
  Card         Notification             ▼              ▼              ▼
                                     Manage          Manage          View
                                      Posts          Projects       Messages
```

---

# 📁 Project Structure

```text
Web-Folio

├── client
│   ├── public
│   │   └── w.png
│   ├── src
│   │   ├── components
│   │   │   ├── ui
│   │   │   │   ├── EmptyState.jsx
│   │   │   │   ├── ErrorState.jsx
│   │   │   │   ├── PostSkeleton.jsx
│   │   │   │   └── ProjectSkeleton.jsx
│   │   │   ├── AudienceRecommendation.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── OnThisPage.jsx
│   │   │   ├── PageWrapper.jsx
│   │   │   ├── Pagination.jsx
│   │   │   ├── PostCard.jsx
│   │   │   ├── ProjectCard.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── SEO.jsx
│   │   │   ├── SkillsSection.jsx
│   │   │   └── ThemeToggle.jsx
│   │   ├── lib
│   │   │   ├── ThemeContext.jsx
│   │   │   ├── api.js
│   │   │   └── auth.js
│   │   ├── pages
│   │   │   ├── admin
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   ├── EditPost.jsx
│   │   │   │   ├── EditProject.jsx
│   │   │   │   ├── Login.jsx
│   │   │   │   ├── NewPost.jsx
│   │   │   │   ├── NewProject.jsx
│   │   │   │   ├── Posts.jsx
│   │   │   │   └── Projects.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Blog.jsx
│   │   │   ├── BlogPost.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Home.jsx
│   │   │   └── Projects.jsx
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── server
│   ├── scripts
│   │   └── seedAdmin.js
│   ├── src
│   │   ├── config
│   │   │   ├── cloudinary.js
│   │   │   └── db.js
│   │   ├── controllers
│   │   │   ├── auth.controller.js
│   │   │   ├── contact.controller.js
│   │   │   ├── post.controller.js
│   │   │   └── project.controller.js
│   │   ├── middlewares
│   │   │   ├── auth.middleware.js
│   │   │   ├── error.middleware.js
│   │   │   ├── upload.middleware.js
│   │   │   └── validation.middleware.js
│   │   ├── models
│   │   │   ├── Admin.js
│   │   │   ├── ContactMessage.js
│   │   │   ├── Post.js
│   │   │   └── Project.js
│   │   ├── routes
│   │   │   ├── auth.routes.js
│   │   │   ├── contact.routes.js
│   │   │   ├── post.routes.js
│   │   │   └── project.routes.js
│   │   ├── utils
│   │   │   ├── apiResponse.js
│   │   │   └── slugify.js
│   │   ├── app.js
│   │   └── server.js
│   ├── .env
│   └── package.json
│
└── README.md
```

> `node_modules`, `.env`, and `dist` are intentionally excluded from
> version control (see each package's `.gitignore`).

---

# 🛠 Technologies Used

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (jsonwebtoken)
- bcrypt
- cookie-parser
- Helmet
- CORS
- express-rate-limit
- Multer
- Cloudinary SDK
- Nodemailer
- Zod
- dotenv

## Frontend

- React 18
- Vite
- React Router DOM
- Axios
- Tailwind CSS
- Framer Motion
- Lucide React (icons)
- react-helmet-async (SEO)
- react-markdown + remark-gfm (blog rendering)
- react-syntax-highlighter (code blocks)
- @uiw/react-md-editor (admin Markdown editor)

## Development Tools

- VS Code
- Postman
- MongoDB Compass
- Git
- GitHub
- npm
- nodemon

## Architecture Pattern

The application follows a separated frontend/backend architecture.

```text
Frontend (React + Vite)
   │
   │ Axios (withCredentials)
   ▼
REST API Routes (Express Router)
   │
   ▼
Middleware
   │
   ├── Helmet / CORS
   ├── Rate Limiting
   ├── Zod Validation
   └── JWT Auth (protect)
   │
   ▼
Controllers
   │
   ├── Auth
   ├── Posts
   ├── Projects
   └── Contact
   │
   ▼
Models / Services
   │
   ├── MongoDB (Mongoose)
   └── Cloudinary (media)
```

This separation keeps authentication, validation, business logic,
database models, media storage, and UI responsibilities organized
independently.

---

# 📡 API Documentation

Base URL (development): `http://localhost:5000/api`

Every response follows a consistent shape:

```json
{
  "success": true,
  "data": {},
  "message": "Operation successful"
}
```

List endpoints add a `pagination` object: `{ "page", "limit", "total", "pages" }`.

---

## ❤️‍🩹 Health Check

| Method | Endpoint      | Description        | Auth |
| ------ | ------------- | ------------------- | ---- |
| GET    | `/api/health` | Returns API status  | ❌   |

---

# 🔐 Authentication APIs

| Method | Endpoint             | Description                                | Auth |
| ------ | --------------------- | ------------------------------------------- | ---- |
| POST   | `/api/auth/login`     | Admin login (rate-limited: 5 / 15 min)      | ❌   |
| GET    | `/api/auth/me`        | Get the currently authenticated admin       | ✅   |
| POST   | `/api/auth/logout`    | Clear the authentication cookie             | ✅   |

---

## Login

### Endpoint

```http
POST /api/auth/login
```

### Request Body

```json
{
    "email": "admin@example.com",
    "password": "yourpassword"
}
```

Sets an httpOnly `token` cookie (7-day expiry) and returns the admin's
id, email, and role.

---

## Get Current Admin

### Endpoint

```http
GET /api/auth/me
```

Returns the authenticated admin's id, email, and role.

---

## Logout

### Endpoint

```http
POST /api/auth/logout
```

Clears the authentication cookie.

---

# 📝 Post APIs

| Method | Endpoint                  | Description                                              | Auth |
| ------ | -------------------------- | ---------------------------------------------------------- | ---- |
| GET    | `/api/posts`               | Get published posts (search, category, tag, isCaseStudy, isDocumentation) | ❌   |
| GET    | `/api/posts/slug/:slug`    | Get a single published post by slug                      | ❌   |
| GET    | `/api/posts/admin`         | Get all posts, including drafts (paginated, search)       | ✅   |
| GET    | `/api/posts/admin/:id`     | Get a single post by id, including drafts                | ✅   |
| POST   | `/api/posts`                | Create a post                                             | ✅   |
| PATCH  | `/api/posts/:id`            | Update a post (partial fields accepted)                   | ✅   |
| DELETE | `/api/posts/:id`            | Delete a post                                              | ✅   |
| POST   | `/api/posts/upload-image`   | Upload a cover image to Cloudinary                        | ✅   |

---

## Get Posts

### Endpoint

```http
GET /api/posts?page=1&limit=10&search=react&category=guides&tag=mern&isCaseStudy=true
GET /api/posts?isDocumentation=true
```

Returns published posts ordered by `publishedAt`, each with a computed
`readingTime` and a populated `relatedProject` (title, slug).
`isCaseStudy` and `isDocumentation` are independent boolean filters —
this is what powers the Blog page's `?type=case-study` /
`?type=documentation` shortcut links from the audience-recommendation
popup.

---

## Get Post By Slug

### Endpoint

```http
GET /api/posts/slug/:slug
```

Returns the full post plus `readingTime`, up to three `relatedPosts`
(same category or overlapping tags), and `prevPost` / `nextPost` for
chronological navigation.

---

## Create Post

### Endpoint

```http
POST /api/posts
```

### Request Body

```json
{
    "title": "Building a MERN Blog",
    "description": "How the blog and mini-CMS behind this portfolio came together.",
    "content": "## Introduction\n\n...markdown content...",
    "author": "Wahaj Ahmed",
    "image": "https://res.cloudinary.com/demo/image/upload/cover.jpg",
    "category": "guides",
    "tags": ["mern", "mongodb", "react"],
    "isCaseStudy": true,
    "isDocumentation": false,
    "relatedProject": "PROJECT_OBJECT_ID",
    "published": true
}
```

A URL-safe, unique `slug` is generated automatically from the title.
Setting `published: true` stamps `publishedAt` with the current date;
unpublishing clears it.

---

## Update Post

### Endpoint

```http
PATCH /api/posts/:id
```

Accepts any subset of the Create Post fields — useful for quick
actions like toggling `published` without resending the whole post.
The slug only regenerates if `title` changes.

---

## Delete Post

### Endpoint

```http
DELETE /api/posts/:id
```

---

## Upload Post Image

### Endpoint

```http
POST /api/posts/upload-image
```

### Form Data

| Key   | Type              |
| ----- | ----------------- |
| image | Image File (≤50MB) |

Uploaded to Cloudinary under `portfolio/posts`; returns `{ url, publicId }`.

---

# 💼 Project APIs

| Method | Endpoint                    | Description                                     | Auth |
| ------ | ----------------------------- | -------------------------------------------------- | ---- |
| GET    | `/api/projects`               | Get all projects (optional `featured=true`)       | ❌   |
| GET    | `/api/projects/:id`           | Get a single project                               | ❌   |
| GET    | `/api/projects/admin/all`     | Get all projects (admin)                           | ✅   |
| POST   | `/api/projects`                | Create a project                                   | ✅   |
| PATCH  | `/api/projects/:id`            | Update a project                                   | ✅   |
| DELETE | `/api/projects/:id`            | Delete a project                                   | ✅   |
| POST   | `/api/projects/upload-image`   | Upload a project image to Cloudinary               | ✅   |
| POST   | `/api/projects/upload-video`   | Upload a project preview video to Cloudinary (small files / local dev) | ✅   |
| GET    | `/api/projects/video-upload-signature` | Get a signed payload for a direct browser → Cloudinary video upload | ✅   |

---

## Get Projects

### Endpoint

```http
GET /api/projects?featured=true
```

Each project is enriched with `hasCaseStudy` / `hasDocs` flags and the
matching `caseStudySlug` / `docsSlug`, resolved by looking up
published posts whose `relatedProject` points at this project and
whose `isCaseStudy` / `isDocumentation` flag is set.

---

## Create Project

### Endpoint

```http
POST /api/projects
```

### Request Body

```json
{
    "title": "Web Folio",
    "description": "A MERN portfolio with a built-in blog and mini-CMS.",
    "techStack": ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    "image": "https://res.cloudinary.com/demo/image/upload/project.jpg",
    "videoUrl": "https://res.cloudinary.com/demo/video/upload/preview.mp4",
    "liveUrl": "https://your-demo-url.com",
    "githubUrl": "https://github.com/yourusername/web-folio",
    "featured": true
}
```

> Unlike posts, project updates expect the full payload — `title`,
> `description`, and at least one `techStack` entry are required on
> every `PATCH`.

---

## Upload Project Image / Video

### Endpoints

```http
POST /api/projects/upload-image
POST /api/projects/upload-video
```

### Form Data

| Key   | Type                          |
| ----- | ------------------------------ |
| image | Image File (≤50MB) — image endpoint |
| video | Video File (≤50MB) — video endpoint |

Images upload to `portfolio/projects`; videos upload to
`portfolio/videos`.

---

# 📬 Contact APIs

| Method | Endpoint            | Description                                | Auth |
| ------ | --------------------- | --------------------------------------------- | ---- |
| POST   | `/api/contact`        | Send a contact message (rate-limited: 5 / hr) | ❌   |
| GET    | `/api/contact`        | List messages (paginated)                     | ✅   |
| DELETE | `/api/contact/:id`     | Delete a message                              | ✅   |
| GET    | `/api/contact/count`   | Get the total message count                   | ✅   |

---

## Send Contact Message

### Endpoint

```http
POST /api/contact
```

### Request Body

```json
{
    "name": "Jane Doe",
    "subject": "Let's work together",
    "email": "jane@example.com",
    "message": "Hi, I'd love to discuss a project with you."
}
```

The message is always saved to MongoDB. If SMTP variables are
configured, an email notification is also sent to `CONTACT_EMAIL`
(falling back to `SMTP_USER`); a failed email never fails the request.

---

## Get Contact Messages

### Endpoint

```http
GET /api/contact?page=1&limit=20
```

Returns messages newest-first, paginated.

---

## Delete Contact Message

### Endpoint

```http
DELETE /api/contact/:id
```

---

## Get Contact Message Count

### Endpoint

```http
GET /api/contact/count
```

---

# 🛠️ Installation & Setup

## Prerequisites

Before running the project, ensure the following are available.

- Node.js
- npm
- MongoDB Atlas or local MongoDB
- Git
- A Cloudinary account (cloud name, API key & secret)
- (Optional) SMTP credentials, for contact-form email notifications

---

## Clone Repository

```bash
git clone https://github.com/yourusername/web-folio.git
```

---

## Navigate to Project

```bash
cd web-folio
```

---

# ⚙ Backend Setup

Move into the server directory.

```bash
cd server
```

Install dependencies.

```bash
npm install
```

Start the development server.

```bash
npm run dev
```

Backend runs on:

```text
http://localhost:5000
```

### Seed the Admin Account

```bash
npm run seed
```

Reads `ADMIN_EMAIL` and `ADMIN_PASSWORD` from `.env` and creates the
single Admin account. If an admin with that email already exists, the
script exits without making changes.

---

# 💻 Frontend Setup

Open a second terminal and move into the client directory.

```bash
cd client
```

Install dependencies.

```bash
npm install
```

Run the development server.

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

The Vite dev server proxies `/api` requests to `http://localhost:5000`,
so no CORS configuration is needed locally.

---

# 🔑 Environment Variables

Create a `.env` file inside the **server** directory.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

CLIENT_URL=http://localhost:5173

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=choose_a_strong_password

SMTP_HOST=your_smtp_host
SMTP_PORT=587
SMTP_USER=your_smtp_user
SMTP_PASSWORD=your_smtp_password
CONTACT_EMAIL=where_contact_messages_should_be_emailed
```

> `SMTP_*` and `CONTACT_EMAIL` are optional. Without them, contact
> messages are still saved to the database — they just won't trigger
> an email notification.

> Never commit real credentials or private keys to GitHub.

> `CLOUDINARY_CLOUD_NAME` and `CLOUDINARY_API_KEY` are returned to the
> browser by the video-upload-signature endpoint and are safe to
> expose — only `CLOUDINARY_API_SECRET` stays server-side and is used
> to compute the signature.

(Optional) create a `.env` inside the **client** directory if the API
is deployed separately from the frontend:

```env
VITE_API_URL=https://your-backend-url.com/api
```

---

# 📦 Backend Dependencies

The backend uses the following main packages:

```bash
npm install express mongoose cors dotenv bcrypt jsonwebtoken cookie-parser helmet express-rate-limit multer cloudinary nodemailer zod
```

---

# 📦 Frontend Dependencies

The frontend uses the following main packages:

```bash
npm install react react-dom react-router-dom axios framer-motion lucide-react react-helmet-async react-markdown remark-gfm react-syntax-highlighter @uiw/react-md-editor
```

Tailwind CSS is installed as a dev dependency:

```bash
npm install -D tailwindcss postcss autoprefixer
```

---

# ▶ Running the Project

Open two terminals.

### Terminal 1

```bash
cd server
npm run dev
```

### Terminal 2

```bash
cd client
npm run dev
```

Open your browser.

```text
http://localhost:5173
```

---

# 📷 Application Screenshots

Add screenshots of the finished application inside a `screenshots`
folder when publishing the repository.

## Home Page

![Home Page](../screenshots/Home.png)

---

## About Page

![About Page](../screenshots/About.png)

---

## Projects Page

![Projects Page](../screenshots/Projects.png)

---

## Blog Page

![Blog Page](../screenshots/Blog.png)

---

## Blog Post

![Blog Post](../screenshots/BlogPost.png)

---

## Contact Page

![Contact Page](../screenshots/Contact.png)

---

## Admin Login

![Admin Login](../screenshots/AdminLogin.png)

---

## Admin Dashboard

![Admin Dashboard](../screenshots/AdminDashboard.png)

---

## Post & Project Editor

![Editor](../screenshots/Editor.png)

---

# 📂 Project Documentation

The following section provides a detailed explanation of every
important file and directory used throughout the project.

Each file has been documented to make it easier for developers to
understand the overall architecture, responsibilities, and
implementation details.

This documentation is intended for:

- Developers exploring the project.
- Recruiters reviewing project quality.
- Interviewers evaluating architecture decisions.
- Contributors interested in extending the application.

---

# 📁 Backend Documentation

## `.env`

Stores private environment variables used by the backend.

Variables include:

- MongoDB connection URI
- JWT secret
- Client origin (for CORS)
- Cloudinary cloud name, API key, and API secret
- Admin seed email and password
- SMTP host, port, user, password, and notification address
- Server port

> This file should never be committed to source control.

---

## `package.json`

Contains backend project information including:

- Project metadata
- Installed dependencies
- Development dependencies
- npm scripts

Main scripts:

```bash
npm run dev
npm start
npm run seed
```

---

## `src/server.js`

The entry point of the backend application.

Responsibilities:

- Loads environment variables using dotenv.
- Imports the configured Express application.
- Starts the Express server.
- Uses port `5000` by default.
- Logs the running URL and API base path on startup.

---

## `src/app.js`

Configures the Express application.

Includes:

- MongoDB connection (via `connectDB`)
- Helmet security headers (with a cross-origin resource policy for
  serving media)
- CORS configuration scoped to `CLIENT_URL`, with credentials enabled
- JSON and URL-encoded body parsing (50MB limit, to accommodate
  Markdown content)
- Cookie parsing
- Static file serving for `/assets`
- A public `/api/health` check
- Authentication, Post, Project, and Contact routes
- The centralized error-handling middleware

---

# 📂 Config Folder

## `config/db.js`

Establishes the MongoDB connection using Mongoose.

Features:

- Reads `MONGO_URI` from environment variables.
- Connects to MongoDB.
- Logs a successful connection.
- Exits the process on a connection error.

---

## `config/cloudinary.js`

Configures the Cloudinary SDK using environment variables
(`CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`,
`CLOUDINARY_API_SECRET`) and exports a ready-to-use client for the
controllers to stream uploads through.

---

# 📂 Models

## `models/Admin.js`

Defines the Admin schema — the single account type with access to the
management panel.

Stores:

- Email (unique, lowercase)
- Hashed password
- Role (`admin`)
- Created and updated timestamps

Behavior:

- Hashes the password with bcrypt automatically before saving (only
  when the password field changes).
- Exposes a `comparePassword` instance method used during login.

---

## `models/Post.js`

Defines the Post schema.

Stores:

- Title, unique slug, short description, Markdown content
- Author, cover image, category, tags
- `isCaseStudy` / `isDocumentation` flags
- `relatedProject` reference (optional)
- `published` flag and `publishedAt` timestamp
- Created and updated timestamps

Behavior:

- A pre-save hook stamps `publishedAt` the moment `published` becomes
  `true`, and clears it when unpublished.
- A text index across `title`, `description`, and `content` powers
  search.

---

## `models/Project.js`

Defines the Project schema.

Stores:

- Title, description, tech-stack list
- Cover image and optional preview video URL
- Live demo URL and GitHub URL
- `featured` flag
- Created and updated timestamps

---

## `models/ContactMessage.js`

Stores messages submitted through the public contact form.

Fields:

- Name, optional subject, email, message
- Created and updated timestamps

---

# 📂 Controllers

## `controllers/auth.controller.js`

Handles admin authentication.

Responsibilities:

- Verify email/password against the `Admin` collection.
- Issue a signed JWT (7-day expiry) on successful login.
- Set the JWT as an httpOnly cookie.
- Return the current admin's profile (`getMe`).
- Clear the auth cookie on logout.

---

## `controllers/post.controller.js`

Handles blog post operations.

Responsibilities:

- List published posts with search, category, tag, and case-study
  filters, plus pagination and a computed reading time.
- Fetch a single published post by slug, along with related posts and
  previous/next navigation.
- List every post for the admin view, including drafts.
- Fetch a single post by id for editing (including drafts).
- Create and update posts, generating a unique slug from the title.
- Delete posts.
- Upload a post's cover image to Cloudinary.

---

## `controllers/project.controller.js`

Handles project operations.

Responsibilities:

- List projects, optionally filtered to `featured` only.
- Fetch a single project by id.
- For every project returned (public or admin), look up linked,
  published posts to compute `hasCaseStudy` / `hasDocs` and their
  slugs.
- Create, update, and delete projects.
- Upload a project's image and preview video to Cloudinary.
- Issue a signed Cloudinary upload signature (`timestamp`, `signature`,
  `folder`, `apiKey`, `cloudName`) so the client can upload large
  videos directly to Cloudinary, bypassing the backend entirely.

---

## `controllers/contact.controller.js`

Handles the contact form and the admin message inbox.

Responsibilities:

- Save incoming messages to MongoDB.
- Optionally email a notification via Nodemailer when SMTP is
  configured — failures here never fail the request.
- List messages for the admin inbox, paginated and newest-first.
- Delete a message.
- Return the total message count.

---

# 📂 Middleware

## `middlewares/auth.middleware.js`

Protects private backend routes with a single `protect` middleware.

Functions:

- Reads the JWT from the `token` cookie, falling back to an
  `Authorization: Bearer` header.
- Verifies the JWT.
- Attaches the decoded admin payload to the request.
- Rejects missing or invalid tokens with a 401.

---

## `middlewares/validation.middleware.js`

Validates request bodies against Zod schemas before they reach a
controller.

Provides:

- A generic `validate(schema)` wrapper that parses `req.body` and
  returns a readable 400 error on failure.
- `loginSchema`, `postSchema` (and a partial `postUpdateSchema` for
  PATCH requests), `projectSchema`, and `contactSchema`.

---

## `middlewares/upload.middleware.js`

Configures Multer for in-memory file uploads (so files can be
streamed straight to Cloudinary without touching disk).

Features:

- Restricts uploads to common image and video formats.
- Caps file size at 50MB.
- Exposes `uploadSingle(fieldName)` and `uploadMultiple(fieldName, maxCount)`
  helpers.
- `handleMulterError` normalizes Multer errors into the standard API
  error response.

---

## `middlewares/error.middleware.js`

Centralized Express error handler.

Normalizes:

- Mongoose validation errors
- Mongoose duplicate-key errors
- Multer file-size errors
- JWT errors
- Any other error, defaulting to a 500 response

All errors are returned in the same `{ success, data, message }` shape
as every other API response.

---

# 📂 Routes

## `routes/auth.routes.js`

Defines authentication endpoints: login (rate-limited), `me`, and
logout.

## `routes/post.routes.js`

Defines public post endpoints (list, get by slug) and admin post
endpoints (list including drafts, get by id, create, update, delete,
upload cover image).

## `routes/project.routes.js`

Defines public project endpoints (list, get by id) and admin project
endpoints (list, create, update, delete, upload image, upload video,
get video-upload signature).

> Fixed-path GET routes (like `/video-upload-signature`) are
> registered **before** the parameterized `GET /:id` route — Express
> matches routes top-to-bottom, so a catch-all `/:id` defined first
> would otherwise swallow every other GET path.

## `routes/contact.routes.js`

Defines the public, rate-limited submission endpoint and the admin
endpoints for listing, deleting, and counting messages.

---

# 📂 Utils

## `utils/apiResponse.js`

Builds the consistent `{ success, data, message, pagination? }`
response shape used across every controller, via `successResponse`
and `errorResponse` helpers.

## `utils/slugify.js`

Converts a title into a URL-safe slug and, via
`generateUniqueSlug`, appends an incrementing suffix until the slug is
guaranteed unique — while excluding the current document on updates.

---

# 📂 Scripts

## `scripts/seedAdmin.js`

A standalone script (`npm run seed`) that creates the single Admin
account from `ADMIN_EMAIL` / `ADMIN_PASSWORD` in `.env`, skipping
creation if an admin with that email already exists.

---

# 🎨 Frontend Documentation

## `package.json`

Contains frontend dependencies and npm scripts.

Main scripts:

```bash
npm run dev
npm run build
npm run preview
```

---

## `index.html`

The Vite entry HTML file. Preconnects to Google Fonts and loads the
Inter typeface used across the UI.

---

## `src/main.jsx`

Frontend entry point.

Responsibilities:

- Create the React root.
- Wrap the app in `HelmetProvider` for per-page SEO.
- Load global styles (`index.css`).
- Render `App`.

---

## `src/App.jsx`

Root React component.

Responsibilities:

- Wrap the app in `ThemeProvider` for light/dark theming.
- Render the shared `Navbar` and `Footer` around every route.
- Define all public and admin routes via React Router, wrapping page
  content in `PageWrapper` for transitions and admin routes in
  `ProtectedRoute`.

---

## `src/index.css`

Application-level styling: Tailwind base/components/utilities layers,
smooth scrolling, custom scrollbar styling, text-selection color, and
reusable component classes (`.container`, `.heading-1`–`.heading-4`,
`.text-body`, `.card`, `.card-hover`, `.btn-primary`, `.btn-secondary`,
`.btn-outline`).

---

# 📂 Lib

## `lib/api.js`

Centralized Axios instance and API helpers.

Responsibilities:

- Configures a base Axios client (`withCredentials: true`) pointed at
  `VITE_API_URL` or `/api`.
- Normalizes error responses through a response interceptor.
- Exposes grouped helpers: `authAPI`, `postsAPI`, `projectsAPI`, and
  `contactAPI`, including `FormData`-based image/video upload helpers.
- `projectsAPI.uploadVideoDirect` fetches a signed payload from the
  backend, then uploads the video straight to Cloudinary's API from
  the browser — used by the admin project editor for anything but
  very small clips.

---

## `lib/auth.js`

Thin authentication helpers built on top of `authAPI`.

Responsibilities:

- `isAuthenticated` / `getAuthStatus` — check the current session.
- `login` / `logout` — wrap the corresponding API calls.
- `setAuthToken` — optionally attach a bearer token to the Axios
  instance.

---

## `lib/ThemeContext.jsx`

React Context powering light/dark mode.

Responsibilities:

- Reads the stored theme from `localStorage` on first load.
- Toggles the `dark` class on `<html>` and persists the choice.
- Exposes `useTheme()` for any component to read or toggle the theme.

---

# 📂 React Components

## `components/AudienceRecommendation.jsx`

Dismissible popup shown once on the Home page, a few seconds after
load. Lets a first-time visitor self-select as a recruiter or a
developer and deep-links into a pre-filtered Blog view accordingly.
The dismissed/seen state is persisted to `localStorage` so it never
reappears for that browser.

## `components/Navbar.jsx`

Responsive site navigation.

Responsibilities:

- Highlights the active route.
- Collapses into a mobile menu that closes on route change.
- Shows a theme toggle and, when an admin session is detected, admin
  navigation and a logout action.

---

## `components/Footer.jsx`

Site footer with the copyright line and social links.

---

## `components/PageWrapper.jsx`

Wraps page content in a Framer Motion fade/slide transition for
consistent page-to-page animation.

---

## `components/ProtectedRoute.jsx`

Guards admin routes on the client. Checks the current auth status
while showing a spinner, then either renders its children or redirects
to `/admin/login`.

---

## `components/SEO.jsx`

Reusable `react-helmet-async` wrapper that sets the page title,
description, keywords, canonical URL, and Open Graph / Twitter Card
metadata per page.

---

## `components/SkillsSection.jsx`

Renders categorized skill chips (frontend, backend, tools, currently
learning) with staggered scroll-in animation.

---

## `components/ThemeToggle.jsx`

Small icon button that flips between the sun and moon icon and calls
`toggleTheme` from `ThemeContext`.

---

## `components/OnThisPage.jsx`

Parses `##`–`####` headings out of a post's Markdown content to build
a sticky, clickable "On This Page" table of contents with smooth
scrolling.

---

## `components/Pagination.jsx`

Reusable numbered pagination control with ellipsis truncation for
longer page ranges, used by the Blog page.

---

## `components/PostCard.jsx`

Blog post preview card: cover image, category, formatted date,
reading time, title, description, and tags.

---

## `components/ProjectCard.jsx`

Project preview card: autoplaying preview video (falling back to a
static image), tech-stack badges, and live demo / GitHub / case-study
/ docs links — the last two only appear when a linked post exists.
`.muted` is set imperatively via a ref and `.play()` is called in a
`useEffect`, rather than relying solely on the `muted` JSX attribute,
so autoplay isn't silently blocked by the browser.

---

# 📂 UI Components

## `components/ui/PostSkeleton.jsx`

Loading placeholder matching `PostCard`'s layout.

## `components/ui/ProjectSkeleton.jsx`

Loading placeholder matching `ProjectCard`'s layout.

## `components/ui/EmptyState.jsx`

Generic "nothing here yet" state with a customizable title and
description.

## `components/ui/ErrorState.jsx`

Generic error state with a customizable message and an optional
"Try Again" retry action.

---

# 📂 Public Pages

## `pages/Home.jsx`

Landing page: hero, featured projects (fetched with `featured=true`),
skills section, a closing call to action, and the
`AudienceRecommendation` popup.

## `pages/About.jsx`

Full story page: intro, "my story" narrative, featured projects, and a
closing section linking into Projects and Contact.

## `pages/Projects.jsx`

Full projects grid with loading skeletons, an empty state, and an
error state with retry.

## `pages/Blog.jsx`

Blog index with search and a `type` filter (`case-study` /
`documentation`), both synced to the URL via `useSearchParams`, plus
pagination, loading skeletons, empty state, and error state. Shows a
clearable "Showing: X" badge whenever a type filter is active.

## `pages/BlogPost.jsx`

Single post view: Markdown rendering (`react-markdown` + `remark-gfm`)
with syntax-highlighted code blocks, auto-linked headings, the
"On This Page" sidebar, related posts, and previous/next navigation.

## `pages/Contact.jsx`

Contact form with client-side validation, a message-length counter,
and submit/success/error states.

---

# 📂 Admin Pages

## `pages/admin/Login.jsx`

Admin sign-in form. Redirects to the dashboard immediately if a
session is already active.

## `pages/admin/Dashboard.jsx`

Landing page for the admin panel: post/project/message stats, recent
posts, and recent messages.

## `pages/admin/Posts.jsx`

Admin post list with publish/unpublish, edit, and delete actions.

## `pages/admin/NewPost.jsx` / `pages/admin/EditPost.jsx`

Post editor: title, description, Markdown content (via `MDEditor`),
author, cover image upload, category, tag chips, case-study /
documentation flags, related-project picker, and a publish toggle.

## `pages/admin/Projects.jsx`

Admin project list with featured toggle, edit, and delete actions.

## `pages/admin/NewProject.jsx` / `pages/admin/EditProject.jsx`

Project editor: title, description, tech-stack chips, image upload,
direct-to-Cloudinary video upload, live/GitHub URLs, and a featured
toggle.

---

# 🎨 Styling

The project uses Tailwind CSS with a `class`-based dark mode strategy
and a small set of shared component classes layered on top.

## `tailwind.config.js`

Defines:

- Custom breakpoints, including an extra `xs: 480px` step below
  Tailwind's default `sm`.
- A brand color palette with light/dark pairs (`primary`,
  `primary-hover`, `primary-dark`, `primary-dark-hover`,
  `primary-tint`), plus semantic surface/text/border colors for both
  light and dark mode (`card`, `border`, `text-main`, `text-muted`,
  `dark-bg`, `dark-card`, `dark-border`, `text-main-dark`,
  `text-muted-dark`).
- The `Inter` font family.
- Custom `fade-in` and `slide-up` keyframe animations.

## `index.css`

Provides:

- Global base styles (smooth scrolling, font family, text-selection
  color, custom scrollbar).
- Reusable component classes: `.container`, heading scale
  (`.heading-1`–`.heading-4`), `.text-body`, `.card` / `.card-hover`,
  and button variants (`.btn-primary`, `.btn-secondary`,
  `.btn-outline`).

## Theming

Light/dark mode is driven by `ThemeContext`, which toggles the `dark`
class on `<html>` and persists the choice to `localStorage`, so the
theme survives a page reload.

---

# 📂 Public Folder

Stores static frontend assets served directly by Vite.

Current project assets include:

- `w.png` — site logo/brand mark used across the UI.

Additional public assets (favicons, Open Graph images, etc.) can be
added here when required.

---

# 📌 Design Principles

This project follows several software engineering principles:

- Separation of Concerns
- Component-Based Architecture
- Reusable React Components
- RESTful API Design
- Schema-Based Request Validation (Zod)
- Middleware-Based Authentication
- Cloud Media Storage Abstraction
- Rate Limiting on Abuse-Prone Endpoints
- Responsive, Mobile-First UI
- Reusable Loading, Empty, and Error States
- Consistent Design Tokens via Tailwind Configuration
- Centralized, Defensive Error Handling
- SEO-First Page Structure

---

# 📈 Overall Project Flow

```text
Frontend
   │
   │ Axios Requests
   ▼
Express Routes
   │
   ▼
Validation / Authentication / Controllers
   │
   ├── Post Operations
   ├── Project Operations
   └── Contact Operations
   │
   ├───────────────┐
   ▼               ▼
MongoDB         Cloudinary
   │               │
   └───────┬───────┘
           ▼
       API Response
           │
           ▼
       React UI
```

---

# ⚠ Challenges Faced

Developing this project involved solving several practical frontend
and backend engineering challenges.

## Authentication

- Implemented a single-admin authentication flow instead of a
  multi-user system.
- Used JWT tokens stored in an httpOnly cookie, with a bearer-token
  fallback for non-browser clients.
- Rate-limited the login endpoint to blunt brute-force attempts.
- Added a client-side `ProtectedRoute` so admin pages never flash
  before redirecting unauthenticated visitors.

---

## Content Relationships

- Linked blog posts to projects through an optional `relatedProject`
  reference rather than duplicating project data into posts.
- Used `isCaseStudy` / `isDocumentation` flags on posts so a single
  post type can serve two different purposes.
- Computed `hasCaseStudy` / `hasDocs` on the fly for each project by
  looking up its linked, published posts — keeping the project
  document itself free of derived state.

---

## Markdown Pipeline

- Rendered post content with `react-markdown` + `remark-gfm` for
  GitHub-flavored Markdown (tables, task lists, strikethrough).
- Added `rehype-slug` and `rehype-autolink-headings` so headings are
  linkable.
- Used `react-syntax-highlighter` with the One Dark theme for code
  blocks.
- Matched the admin writing experience with `@uiw/react-md-editor` so
  what's written maps closely to what's rendered.
- Parsed heading text directly out of the raw Markdown (via regex) to
  build the "On This Page" navigation without a second content pass.

---

## Media Uploads

- Accepted uploaded images and videos through Multer's in-memory
  storage.
- Streamed uploads directly to Cloudinary instead of writing temporary
  files to disk.
- Organized uploads into purpose-specific Cloudinary folders
  (`portfolio/posts`, `portfolio/projects`, `portfolio/videos`).
- Applied a shared 50MB file-size limit and a shared image/video type
  filter across both upload endpoints.

---

## Search, Filtering & Pagination

- Added a MongoDB text index across `title`, `description`, and
  `content` for blog search.
- Supported category, tag, and case-study filters via query
  parameters.
- Reused the same `page` / `limit` / `skip` pagination pattern across
  posts, projects (admin), and the contact inbox.

---

## API Security & Abuse Prevention

- Applied Helmet for baseline HTTP security headers.
- Scoped CORS to the configured client origin, with credentials
  enabled for cookie-based auth.
- Validated every mutating request body with Zod before it reaches a
  controller.
- Rate-limited the login and contact endpoints separately, with
  different windows suited to each.

---

## Serverless Deployment Constraints

- Discovered that Vercel serverless functions enforce a **hard 4.5MB
  request-body limit** at the platform level — larger video uploads
  routed through the API failed with a `413`, before Express (and its
  CORS headers) ever ran, which surfaced in the browser as a
  misleading CORS error rather than a clear size error.
- Solved it by adding a signed-upload endpoint and having the client
  upload video **directly to Cloudinary**, so the file itself never
  passes through the serverless function.
- Hit and fixed an Express route-ordering bug where a catch-all
  `GET /:id` defined before a fixed-path route swallowed it, causing
  Mongoose to try (and fail) to cast a route name as an `ObjectId`.

---

## Video Playback

- Preview videos would silently freeze on their first frame in some
  browsers instead of autoplaying, with no visible error.
- Root cause: React's `muted` JSX attribute doesn't reliably set the
  DOM's `.muted` *property* before the browser evaluates whether
  autoplay is allowed, so autoplay was being silently blocked.
- Fixed by setting `.muted` imperatively via a ref and calling
  `.play()` manually inside a `useEffect`, instead of relying solely
  on the JSX attribute.

---

## Frontend Challenges

- Managing multiple concurrent async requests (e.g., featured
  projects + posts) without race conditions.
- Building skeleton loaders and empty/error states for every
  data-driven list instead of leaving blank screens.
- Keeping Framer Motion's `whileInView` animations from re-triggering
  on every scroll by pairing them with `viewport={{ once: true }}`.
- Supporting light and dark mode consistently across every component,
  including third-party ones like the Markdown editor and syntax
  highlighter.
- Staying responsive down to small phone widths with a custom `480px`
  breakpoint.

---

## Backend Challenges

- Designing REST APIs that serve both public, read-only traffic and
  authenticated, write-heavy admin traffic from the same resources.
- Centralizing error handling so Mongoose validation errors, duplicate
  keys, Multer errors, and JWT errors all resolve to the same response
  shape.
- Generating unique, URL-safe slugs while handling title collisions
  and slug regeneration on edit.
- Making email notifications genuinely optional — the contact flow
  has to succeed even when SMTP isn't configured or is temporarily
  unreachable.

---

# 🧪 Testing

The application has been manually tested across multiple workflows.

## Authentication

- Admin Login
- Admin Logout
- Invalid Credentials
- Rate-Limit Enforcement on Repeated Failed Logins
- Session Persistence Across Reloads
- Protected Route Redirects

---

## Public Content

- Home Featured Projects Loading
- About Page Content & Featured Projects
- Projects Grid Loading, Empty, and Error States
- Blog Search, Filtering, and Pagination
- Blog Post Rendering, Syntax Highlighting, and "On This Page" Links
- Related Posts and Prev/Next Navigation
- Case Study / Docs Links Resolving to the Correct Post

---

## Admin CMS Module

- Dashboard Stats Accuracy
- Create / Edit / Delete Post
- Publish / Unpublish Toggle
- Create / Edit / Delete Project
- Featured Toggle
- Image Upload and Direct-to-Cloudinary Video Upload
- Tag and Tech-Stack Chip Input
- Contact Message List, Delete, and Count

---

## Public Content (continued)

- Preview Video Autoplay Across Browsers
- Audience-Recommendation Popup Timing, Dismissal, and Persistence
- Blog `type` Filter (Case Study / Documentation) and Clear Action

---

## Backend

- JWT Verification and Expiry
- Zod Validation Errors
- MongoDB CRUD Operations
- Slug Generation and Uniqueness
- Cloudinary Upload and Error Handling
- Rate Limiter Thresholds
- Centralized Error Responses

---

## Frontend

- Form Validation
- API Integration
- Navigation
- Loading States
- Error Messages
- Empty States
- Responsive Layout
- Light/Dark Theme Persistence

---

## Tools Used

- Postman
- Browser Developer Tools
- MongoDB Compass
- npm
- Git
- GitHub

---

### Troubleshooting

**MongoDB Connection Fails**

- Verify `MONGO_URI` is correct.
- Make sure MongoDB is running when using a local database.
- Check MongoDB Atlas network access when using Atlas.
- Confirm the database server is reachable.

**Cloudinary Upload Fails**

- Verify `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and
  `CLOUDINARY_API_SECRET`.
- Confirm the file is an accepted image/video type and under 50MB.
- Check backend logs for the upload error.

**Authentication Fails**

- Verify `JWT_SECRET` is configured.
- Make sure the browser allows the authentication cookie (matching
  origins in development, `secure`/`sameSite` settings in production).
- Confirm `CLIENT_URL` matches the origin the frontend is actually
  served from.

**Contact Emails Aren't Sending**

- Confirm `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, and `SMTP_PASSWORD`
  are all set — the notification is skipped entirely if `SMTP_HOST`
  is missing.
- Check backend logs; a failed email is logged but never blocks the
  message from being saved.

**Hosted Demo Takes Time to Respond**

- The backend may be sleeping on a free hosting tier.
- Wait for the backend to wake up and try the request again.

---

# ☁ Deployment

The project is designed to be deployed as separate frontend and
backend applications.

## Frontend

Possible platforms:

- Vercel
- Netlify

## Backend

Possible platforms:

- Vercel (serverless functions — the platform this project targets;
  see note below)
- Render
- Railway
- Other Node.js-compatible hosting services

> **Vercel-specific note:** serverless functions enforce a hard 4.5MB
> request-body limit. This is why project preview videos upload
> directly from the browser to Cloudinary (via `/api/projects/video-upload-signature`)
> instead of through the backend — a platform limitation that a
> traditional long-running Node server (Render, Railway) wouldn't
> have, but the direct-upload approach is worth keeping regardless,
> since it also means large files never eat into function bandwidth
> or execution time.

## Database

- MongoDB Atlas

## Media Storage

- Cloudinary

## Email

- Any SMTP provider (e.g. Gmail with an app password, SendGrid,
  Mailgun)

## Environment

```text
Frontend → React + Vite

Backend → Express.js + Node.js

Database → MongoDB

Media Storage → Cloudinary

Email → Nodemailer / SMTP

Authentication → JWT + Cookies
```

---

# 📈 Performance Considerations

Several practices were followed to improve usability, maintainability,
and performance.

- Modular folder structure.
- Reusable React components.
- Page-level data loading through targeted API requests.
- Skeleton loaders instead of blank screens while data is in flight.
- Cloud media storage instead of storing binary files in MongoDB.
- In-memory Multer uploads streamed directly to Cloudinary, avoiding
  temporary disk writes.
- Signed direct-to-Cloudinary uploads for videos, keeping large files
  off the backend entirely and out of serverless function
  bandwidth/execution-time budgets.
- A MongoDB text index for fast, indexed blog search.
- Skip/limit pagination on every list endpoint instead of returning
  entire collections.
- Framer Motion animations scoped with `viewport={{ once: true }}` to
  avoid re-triggering on scroll.
- Lazy-loaded images (`loading="lazy"`) on post and project cards.
- Helmet security headers with minimal overhead.
- Rate limiting to keep abuse-prone endpoints cheap to operate.

---

# 🚀 Future Improvements

Future versions of the project may include:

## Content

- RSS feed and `sitemap.xml` generation.
- Related-content recommendations beyond category/tag overlap.
- Comments on blog posts.
- View counts per post.

---

## Admin / CMS

- Support for multiple admin accounts with roles/permissions.
- A reusable media library instead of uploading per-post/per-project.
- Scheduled/queued publishing.
- An activity or audit log for content changes.
- An analytics dashboard (views, referrers, popular posts).

---

## User Experience

- Newsletter signup.
- Social sharing buttons on blog posts.
- Full-text match highlighting in search results.

---

## Technical Improvements

- Automated unit and integration tests.
- Responsive image variants via Cloudinary transformations.
- Refresh-token rotation alongside the existing JWT.
- Request logging and structured monitoring.
- API documentation via Swagger/OpenAPI.
- Route-level code splitting on the frontend.
- Content Security Policy tuning in Helmet.
- A visible progress bar for direct-to-Cloudinary video uploads (the
  upload helper already reports progress; the admin UI doesn't
  surface it yet).

---

# 📚 Learning Outcomes

This project significantly improved my understanding of modern
full-stack web development.

## Backend

- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Cookie-Based Authentication
- Zod Schema Validation
- REST API Development
- Middleware Design
- File Upload Handling with Multer
- Cloud Media Storage Integration (Cloudinary)
- MongoDB Relationships and Text Search
- Centralized Error Handling
- Rate Limiting

---

## Frontend

- React 18
- React Router
- Axios
- Component Architecture
- State Management with React Hooks
- Context API (theming)
- Tailwind CSS Design Systems
- Framer Motion
- Markdown Rendering Pipelines
- SEO with `react-helmet-async`
- Loading, Empty, and Error States
- Reusable Components

---

## Cloud & Media

- Cloudinary integration
- Streamed uploads from memory storage
- Environment variable management across two apps

---

## Software Engineering

- Project Architecture
- Folder Organization
- Error Handling
- Clean Code
- REST API Design
- Authentication Design
- Responsive UI Development
- Git Workflow
- Documentation
- Scalability
- Maintainability

---

# 📖 Project Highlights

✔ Full Stack MERN Application

✔ Developer Portfolio with an Integrated Blog

✔ Custom Mini-CMS (No Third-Party Headless CMS)

✔ Single-Admin JWT Authentication

✔ Cookie-Based Authentication with Bearer Fallback

✔ Markdown-Authored Blog Posts

✔ Automatic Post ⇄ Project Linking (Case Study / Docs)

✔ Cloudinary Image & Video Uploads

✔ Signed Direct-to-Cloudinary Video Uploads (Serverless-Friendly)

✔ Audience-Aware Landing Popup (Recruiter / Developer Self-Select)

✔ Full-Text Blog Search

✔ Category, Tag, and Case-Study Filtering

✔ Pagination Across Posts, Projects, and Messages

✔ Admin Dashboard with Live Stats

✔ Rate-Limited Login and Contact Endpoints

✔ Light/Dark Theme with Persisted Preference

✔ Framer Motion Page Transitions & Animations

✔ Responsive, Mobile-First Interface

✔ Loading, Empty, and Error States Throughout

✔ RESTful APIs with a Consistent Response Shape

✔ MongoDB Database with Mongoose

✔ Reusable React Components

---

# 🤝 Contributing

Contributions are welcome.

If you'd like to improve the project:

1. Fork the repository.

2. Create a new feature branch.

```bash
git checkout -b feature/new-feature
```

3. Commit your changes.

```bash
git commit -m "Add new feature"
```

4. Push to GitHub.

```bash
git push origin feature/new-feature
```

5. Open a Pull Request.

Every contribution that improves the project, fixes bugs, enhances
documentation, or adds features is appreciated.

---

# 📄 License

This project is licensed under the **MIT License**.

You are free to use, modify, and distribute this project for
educational and personal purposes.

---

# 👨‍💻 Author

**Muhammed Wahaj Ahmed**

MERN Stack Developer

If you found this project helpful, consider giving it a ⭐ on GitHub.

---

# ⭐ Support

If you like this project:

⭐ Star the repository

🍴 Fork the repository

📢 Share it with others

💡 Suggest improvements

Thank you for checking out this project!

---

Made with ❤️ using **React, Node.js, Express, MongoDB, and Cloudinary**