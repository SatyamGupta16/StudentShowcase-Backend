# ⚙️ Student Project Showcase — Backend API

> A powerful, secure, and scalable backend API for managing students, projects, creations, authentication, image uploads, and role-based access.

![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-API-black?style=for-the-badge&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Authentication-purple?style=for-the-badge&logo=jsonwebtokens)
![Multer](https://img.shields.io/badge/Multer-File%20Upload-orange?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Production%20Ready-success?style=for-the-badge)

---

## 🚀 Overview

**Student Project Showcase Backend** is a RESTful API built using **Node.js**, **Express.js**, **MongoDB**, and **JWT Authentication**.

It powers the frontend of the Student Project Showcase platform by handling:

- User authentication
- Admin and student roles
- User/student management
- Project management
- Product/creation management
- Image uploads
- Protected routes
- MongoDB data storage
- Public showcase APIs

This backend is designed to support a real-world full-stack student portfolio showcase platform.

---

## 🧠 Project Purpose

Most student work stays hidden inside classroom submissions, folders, or laptops.

This backend helps power a platform where student work becomes visible, searchable, and presentable.

It provides APIs for:

- 👨‍🎓 Student profiles
- 💻 Student projects
- 🎨 Student creations
- 🔐 Secure login/register
- 🛡️ Admin control
- 🖼️ Local image uploads
- 🌍 Public showcase data

In simple words:

> This backend is the engine behind a digital stage for student achievements.

---

## ✨ Key Features

### 🔐 Authentication

Secure authentication using JWT.

Supported features:

- Register user
- Login user
- Password hashing using bcrypt
- JWT token generation
- Protected routes
- Role-based access

Supported roles:

```txt
admin
student
```

---

### 🛡️ Authorization

The backend includes middleware for protected routes.

Only authenticated users can access private APIs.

Admin-only actions can be restricted using role checks.

---

### 👨‍🎓 User / Student Management

Admin can manage users/students.

Features:

- Create user
- Get all users
- Get single user by ID
- Update user
- Delete user
- Upload profile photo
- Store skills, GitHub, LinkedIn, batch, bio, and featured status

---

### 💻 Project Management

Admin can manage student projects.

Features:

- Create project
- Get all projects
- Get single project by ID
- Update project
- Delete project
- Upload project screenshot
- Link project to user
- Store tech stack
- Store GitHub URL
- Store live demo URL
- Mark project as featured

Project relation:

```txt
Project → User
```

Project model uses:

```js
user: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true,
}
```

---

### 🎨 Product / Creation Management

The backend also supports student creations or products.

Features:

- Create product/creation
- Get all products
- Get single product by ID
- Update product
- Delete product
- Upload image
- Store category
- Store description
- Store featured status

This is useful for showing:

- Creative work
- Tools
- Mini projects
- Designs
- Portfolio items
- Non-code creations

---

### 🖼️ Image Upload Support

Image upload is handled using **Multer**.

Uploaded files are stored locally inside:

```txt
uploads/
```

Static file serving is enabled so images can be accessed publicly.

Example image URL:

```txt
http://localhost:27017/uploads/image-name.png
```

---

## 🧱 Tech Stack

| Technology | Purpose |
|---|---|
| **Node.js** | JavaScript runtime |
| **Express.js** | Backend framework |
| **MongoDB** | NoSQL database |
| **Mongoose** | MongoDB object modeling |
| **JWT** | Authentication |
| **bcryptjs** | Password hashing |
| **Multer** | Image upload handling |
| **CORS** | Frontend-backend connection |
| **dotenv** | Environment variables |
| **Nodemon** | Development server |

---

## 📁 Backend Folder Structure

```txt
backend-student-project-showcase/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── authController.js
│   ├── userController.js
│   ├── projectController.js
│   └── productController.js
│
├── middleware/
│   ├── authMiddleware.js
│   ├── adminMiddleware.js
│   └── uploadMiddleware.js
│
├── models/
│   ├── User.js
│   ├── Project.js
│   └── Product.js
│
├── routes/
│   ├── authRoutes.js
│   ├── userRoutes.js
│   ├── projectRoutes.js
│   └── productRoutes.js
│
├── uploads/
│
├── .env
├── .gitignore
├── package.json
├── server.js
└── README.md
```

---

## ⚙️ Environment Variables

Create a `.env` file in the backend root folder.

```env
PORT=27017
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
```

Example local setup:

```env
PORT=27017
MONGO_URI=mongodb://127.0.0.1:27017/student_project_showcase
JWT_SECRET=student_project_showcase_secret_key
```

For production, use MongoDB Atlas:

```env
PORT=27017
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/student_project_showcase
JWT_SECRET=your_production_secret_key
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/backend-student-project-showcase.git
```

---

### 2. Go to Backend Folder

```bash
cd backend-student-project-showcase
```

---

### 3. Install Dependencies

```bash
npm install
```

---

### 4. Create Environment File

Create `.env` in the root folder and add:

```env
PORT=27017
MONGO_URI=mongodb://127.0.0.1:27017/student_project_showcase
JWT_SECRET=student_project_showcase_secret_key
```

---

### 5. Start Development Server

```bash
npm run dev
```

Or:

```bash
node server.js
```

---

### 6. Server Running

Your backend will run on:

```txt
http://localhost:27017
```

Health check route:

```txt
GET http://localhost:27017/
```

Expected response:

```json
{
  "success": true,
  "message": "Student Project Showcase API is running"
}
```

---

## 🧪 Available Scripts

```bash
npm run dev
```

Runs backend using nodemon.

```bash
npm start
```

Runs backend using Node.js.

---

## 🔗 API Base URL

Local API base URL:

```txt
http://localhost:27017/api
```

Production API base URL:

```txt
https://your-backend-url.com/api
```

---

# 📌 API Endpoints

---

## 🔐 Auth Routes

Base route:

```txt
/api/auth
```

### Register User

```http
POST /api/auth/register
```

Request body:

```json
{
  "name": "Satyam Gupta",
  "email": "satyam@example.com",
  "password": "123456",
  "role": "student"
}
```

Response:

```json
{
  "success": true,
  "message": "User registered successfully"
}
```

---

### Login User

```http
POST /api/auth/login
```

Request body:

```json
{
  "email": "satyam@example.com",
  "password": "123456"
}
```

Response:

```json
{
  "success": true,
  "message": "Login successful",
  "token": "jwt_token_here",
  "user": {
    "_id": "user_id_here",
    "name": "Satyam Gupta",
    "email": "satyam@example.com",
    "role": "student"
  }
}
```

---

## 👨‍🎓 User Routes

Base route:

```txt
/api/users
```

### Get All Users

```http
GET /api/users
```

Response:

```json
[
  {
    "_id": "user_id_here",
    "name": "Satyam Gupta",
    "email": "satyam@example.com",
    "role": "student",
    "bio": "Full-stack developer",
    "skills": ["React", "Node.js", "MongoDB"],
    "batch": "2024-2028",
    "isFeatured": true
  }
]
```

---

### Get User By ID

```http
GET /api/users/:id
```

Example:

```txt
GET /api/users/64abc123
```

---

### Create User

```http
POST /api/users
```

Protected route.

Headers:

```http
Authorization: Bearer your_token_here
```

Form-data:

```txt
name
email
password
role
bio
skills
github
linkedin
batch
isFeatured
profilePhoto
```

---

### Update User

```http
PUT /api/users/:id
```

Protected route.

Headers:

```http
Authorization: Bearer your_token_here
```

---

### Delete User

```http
DELETE /api/users/:id
```

Protected route.

Headers:

```http
Authorization: Bearer your_token_here
```

---

## 💻 Project Routes

Base route:

```txt
/api/projects
```

### Get All Projects

```http
GET /api/projects
```

Response:

```json
{
  "success": true,
  "projects": [
    {
      "_id": "project_id_here",
      "title": "Student Project Showcase",
      "description": "A full-stack portfolio showcase platform",
      "screenshot": "screenshot.png",
      "techStack": ["Next.js", "Node.js", "MongoDB"],
      "githubUrl": "https://github.com/example/project",
      "liveDemoUrl": "https://example.vercel.app",
      "user": {
        "_id": "user_id_here",
        "name": "Satyam Gupta",
        "email": "satyam@example.com"
      },
      "isFeatured": true
    }
  ]
}
```

---

### Get Project By ID

```http
GET /api/projects/:id
```

Response:

```json
{
  "success": true,
  "project": {
    "_id": "project_id_here",
    "title": "Student Project Showcase",
    "description": "A full-stack portfolio showcase platform"
  }
}
```

---

### Create Project

```http
POST /api/projects
```

Protected route.

Headers:

```http
Authorization: Bearer your_token_here
```

Form-data:

```txt
title
description
techStack
githubUrl
liveDemoUrl
user
isFeatured
screenshot
```

---

### Update Project

```http
PUT /api/projects/:id
```

Protected route.

Headers:

```http
Authorization: Bearer your_token_here
```

---

### Delete Project

```http
DELETE /api/projects/:id
```

Protected route.

Headers:

```http
Authorization: Bearer your_token_here
```

---

## 🎨 Product / Creation Routes

Base route:

```txt
/api/products
```

### Get All Products

```http
GET /api/products
```

Response:

```json
[
  {
    "_id": "product_id_here",
    "name": "Portfolio Design",
    "description": "Creative student design work",
    "category": "Design",
    "image": "image.png",
    "isFeatured": true
  }
]
```

---

### Get Product By ID

```http
GET /api/products/:id
```

---

### Create Product / Creation

```http
POST /api/products
```

Protected route.

Headers:

```http
Authorization: Bearer your_token_here
```

Form-data:

```txt
name
description
category
price
isFeatured
image
```

---

### Update Product / Creation

```http
PUT /api/products/:id
```

Protected route.

Headers:

```http
Authorization: Bearer your_token_here
```

---

### Delete Product / Creation

```http
DELETE /api/products/:id
```

Protected route.

Headers:

```http
Authorization: Bearer your_token_here
```

---

## 🛡️ Protected Route Format

For protected APIs, send token in headers:

```http
Authorization: Bearer your_jwt_token_here
```

Example using Axios:

```js
const res = await axios.post(
  "http://localhost:27017/api/projects",
  formData,
  {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data"
    }
  }
);
```

---

## 🧑‍💻 Data Models

---

### User Model

```js
{
  name: String,
  email: String,
  password: String,
  role: "admin" | "student",
  bio: String,
  profilePhoto: String,
  skills: [String],
  github: String,
  linkedin: String,
  batch: String,
  isFeatured: Boolean,
  timestamps: true
}
```

---

### Project Model

```js
{
  title: String,
  description: String,
  screenshot: String,
  techStack: [String],
  githubUrl: String,
  liveDemoUrl: String,
  user: ObjectId,
  isFeatured: Boolean,
  timestamps: true
}
```

---

### Product Model

```js
{
  name: String,
  description: String,
  category: String,
  price: Number,
  image: String,
  isFeatured: Boolean,
  timestamps: true
}
```

---

## 🌍 CORS

CORS is enabled so the frontend can communicate with backend.

Example frontend URL:

```txt
http://localhost:3000
```

Backend URL:

```txt
http://localhost:27017
```

---

## 🖼️ Static Uploads

Uploaded images are served from:

```txt
/uploads
```

Example:

```txt
http://localhost:27017/uploads/profile-photo.png
```

---

## 🧪 Testing With Postman

Recommended Postman testing order:

```txt
1. Register user
2. Login user
3. Copy JWT token
4. Add token in Authorization tab
5. Test create user
6. Test create project
7. Test create product
8. Test get all APIs
9. Test update APIs
10. Test delete APIs
```

Authorization type:

```txt
Bearer Token
```

---

## ✅ Backend Completion Checklist

```txt
MongoDB connected
Auth routes working
JWT token generated
Password hashing working
User CRUD working
Project CRUD working
Product CRUD working
Image upload working
Static uploads working
Protected routes working
Frontend connected successfully
```

---

## 🚀 Deployment

This backend can be deployed on:

- Render
- Railway
- Cyclic
- Fly.io
- VPS

Recommended platform:

```txt
Render
```

---

### Render Deployment Steps

1. Push backend code to GitHub
2. Create new Web Service on Render
3. Connect GitHub repository
4. Add build command:

```bash
npm install
```

5. Add start command:

```bash
npm start
```

6. Add environment variables:

```env
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_production_jwt_secret
PORT=27017
```

7. Deploy

---

## 🔐 Security Notes

Before production:

- Use strong `JWT_SECRET`
- Never push `.env` to GitHub
- Add `.env` to `.gitignore`
- Use MongoDB Atlas for production
- Restrict CORS to frontend domain
- Validate file upload types
- Limit upload file size
- Avoid exposing sensitive error messages

---

## 🧠 Future Improvements

Planned upgrades:

- Admin analytics APIs
- Search and filter APIs
- Pagination
- Cloudinary image storage
- Better role-based permissions
- Student self-project upload
- Email verification
- Password reset
- Refresh tokens
- Rate limiting
- API documentation with Swagger
- Activity logs
- Certificate module

---

## 🧑‍💻 Author

Built with passion by:

```txt
Satyam Gupta
B.Tech CSE Student
Full-Stack Developer
```

---

## 📜 License

This project is open-source and available under the MIT License.

---

## ⭐ Final Note

This backend is not just a CRUD API.

It is the engine behind a platform that gives student work a public stage.

Because projects deserve more than folders.

They deserve visibility.
