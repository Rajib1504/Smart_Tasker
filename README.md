
# Smart Tasker

**Live Site URL:** [Smart Tasker Live](https://smarttasker-ba631.web.app)

## 📂 Repositories 

- **Client Repository:** [GitHub](https://github.com/Rajib1504/Smart_Tasker)
- **Server Repository:** [GitHub](https://github.com/Rajib1504/Smart_Tasker_server)
- **Backend API:** [Live Server](https://todo-server-three-pi.vercel.app)

---

## 🚀 Project Overview

**Smart Tasker** is a modern task management application that helps users efficiently organize their tasks with real-time updates, drag-and-drop functionality, and seamless CRUD operations. With features like user authentication, task categorization, and live task syncing, it ensures a smooth and interactive user experience.

---

## ✨ Features

- **User Authentication:** Google Sign-In via Firebase.
- **Task Management:** Create, Edit, Delete, and Categorize tasks.
- **Drag & Drop Reordering:** Easy task organization within categories.
- **Real-time Updates:** Syncs changes instantly across devices using WebSockets / MongoDB Change Streams.
- **Responsive UI:** Optimized for mobile and desktop views.
- **Dark Mode Toggle:** Optional feature for better accessibility.
- **Task Due Dates & Overdue Indicators:** Upcoming feature to enhance productivity.

---

## 🛠 Technologies Used

### Frontend:

- React.js
- Tailwind CSS
- React Router DOM
- Firebase Authentication
- React DnD (Drag & Drop)
- Axios (API Requests)
- TanStack Query (State Management)

### Backend:

- Node.js
- Express.js
- MongoDB (No Mongoose)
- WebSockets (Real-time Sync)
- MongoDB Change Streams
- CORS, dotenv

---

## 📦 Dependencies

Ensure you have **Node.js** and **npm** installed.

### Client Dependencies:

```bash
npm install react-router-dom tailwindcss axios react-dnd @tanstack/react-query firebase react-toastify
```

### Server Dependencies:

```bash
npm install express cors dotenv mongodb ws
```

---

## 🔧 Installation Steps

1. **Clone the Repositories**
   ```bash
   git clone https://github.com/Rajib1504/Smart_Tasker.git
   git clone https://github.com/Rajib1504/Smart_Tasker_server.git
   ```
2. **Setup the Client**
   ```bash
   cd Smart_Tasker
   npm install
   npm run dev
   ```
3. **Setup the Server**
   ```bash
   cd Smart_Tasker_server
   npm install
   node index.js
   ```
4. **Configure Environment Variables**
   - Set up Firebase Authentication.
   - Connect MongoDB (No Mongoose).
   - Enable CORS for API access.

---

## 📌 Future Improvements

-

---

## 🛠 Contributing

Feel free to contribute! Fork the repo, make your changes, and submit a pull request.

---



---

🚀 **Developed by Rajib Sardar **

