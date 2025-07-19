# 🩸 BloodBridge - Blood Donation Application

Welcome to **BloodBridge**, a MERN Stack-based platform that bridges the gap between blood donors and recipients with an intuitive, secure, and responsive interface. This app supports role-based access, donation management, blog publishing, and a streamlined donation experience.

## 🔑 Admin Credentials

- **Email:** admin@bloodbridge.com  
- **Password:** Admin@123

## 🌐 Live Website

- [Live Site URL](https://your-live-site-url.com)

## 📂 Repositories

- **Client GitHub Repo:** [GitHub - Client](https://github.com/yourusername/bloodbridge-client)
- **Server GitHub Repo:** [GitHub - Server](https://github.com/yourusername/bloodbridge-server)

---

## 🚀 Features

1. **User Roles & Access**: Donor, Volunteer, Admin — with role-based dashboards and permissions.
2. **JWT Protected Routes**: Uses JWT to guard all private APIs and routes.
3. **Authentication**: Register & login with image upload, district & upazila selector, and blood group.
4. **Donation Request Management**: Create, edit, delete, view donation requests with dynamic status handling.
5. **Search Functionality**: Search donors by blood group, district, upazila or name — without dropdowns.
6. **Blog System**: Admin/Volunteers can publish, draft, and manage blogs with a rich text editor.
7. **Responsive UI**: Fully mobile, tablet, and desktop responsive including dashboard layout.
8. **Stripe Integration**: Users can fund the platform using Stripe; funding records are saved and shown.
9. **Pagination & Filtering**: All tables support pagination and dynamic filtering (status, roles, etc.).
10. **Environment Safety**: Firebase config & MongoDB credentials are hidden using `.env`.

---

## 📊 Technologies Used

- **Frontend**: React.js, Tailwind CSS, React Router DOM, TanStack Query, Axios, Stripe.js, Jodit-react
- **Backend**: Node.js, Express.js, MongoDB, JWT, Cors
- **Authentication**: Firebase Auth (Email & Password)
- **Deployment**: Vercel (Frontend), Render (Backend)
- **Tools**: SweetAlert2, React Toastify, React Hook Form, Framer Motion

---

## 🔒 Private Routes & Persistence

- User stays logged in even after page refresh.
- Protected routes (dashboard, donate, profile) using `PrivateRoute`.

---

## 🧪 CRUD Feedback

- All create, update, and delete operations trigger toast notifications or sweet alerts for better UX.

---

## 🗃️ Project Structure

```bash
📁 client
 ┗ 📁 src
    ┣ 📁 Api             
    ┣ 📁 assets         
    ┣ 📁 Context        
    ┣ 📁 Dashboard   
    ┣ 📁 Form           
    ┣ 📁 Home            
    ┣ 📁 Hooks           
    ┣ 📁 layouts         
    ┣ 📁 pages           
    ┣ 📁 Provider       
    ┣ 📁 routes        
    ┗ 📁 Shared         

   📸 Screenshots
Add screenshots here of:

Home Page

Dashboard

Create Donation Request

Funding Page

Blog Management


cd client
npm install
npm run dev





✅ Requirements Completed
 Role-based dashboards (Admin, Donor, Volunteer)

 Token persistence after refresh

 Responsive layout including dashboard

 CRUD feedback with toasts

 Stripe payment integration

 Pagination and filtering implemented

 Firebase + JWT secured APIs

 District/Upazila sourced from GitHub repo








 📚 Credits
District/Upazila Data: nuhil/bangladesh-geocode

Rich Text Editor: Jodit React

Stripe Docs: https://stripe.com/docs



🧪 Optional Implemented
 Framer Motion animation

 PDF export of search results

 Blog share to social media

 Blog edit functionality
