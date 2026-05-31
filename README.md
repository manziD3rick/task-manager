# Task Manager

A full-stack web application for managing tasks efficiently. Built with a modern tech stack featuring Node.js/Express on the backend and JavaScript on the frontend.

## 📋 Features

- Create, read, update, and delete (CRUD) tasks
- User authentication with secure password hashing
- Session management with MongoDB
- RESTful API backend
- Responsive frontend interface
- CORS-enabled for cross-origin requests

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js v4.22.1
- **Database**: MongoDB with Mongoose v9.6.2
- **Authentication**: bcryptjs for password hashing
- **Session Management**: express-session with connect-mongo
- **Middleware**: body-parser, CORS

### Frontend
- **Languages**: HTML, CSS, JavaScript
- **Architecture**: Vanilla JavaScript (no framework dependencies)

## 📁 Project Structure

```
task-manager/
├── backend/              # Express.js server
│   ├── server.js         # Main server entry point
│   ├── package.json      # Backend dependencies
│   └── node_modules/     # Dependencies (excluded from git)
├── frontend/             # Frontend application
│   ├── index.html
│   ├── styles.css
│   └── script.js
└── README.md             # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas connection string)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/manziD3rick/task-manager.git
   cd task-manager
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Configure environment variables** (if needed)
   - Create a `.env` file in the backend directory
   - Add MongoDB connection string and other config variables
   ```env
   MONGODB_URI=mongodb://localhost:27017/task-manager
   PORT=5000
   SESSION_SECRET=your-secret-key
   ```

4. **Start the backend server**
   ```bash
   npm start
   ```
   The server will run on `http://localhost:5000`

5. **Open the frontend**
   - Navigate to the `frontend/` directory
   - Open `index.html` in your browser or serve it with a local server

## 📝 API Endpoints

### Tasks
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create a new task
- `GET /api/tasks/:id` - Get a specific task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

### Authentication (if implemented)
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

## 🔒 Security

- Passwords are hashed using bcryptjs
- CORS is enabled for secure cross-origin requests
- Session-based authentication with MongoDB store
- Environment variables for sensitive data

## 🧪 Testing

Tests are not yet configured. You can add them with:
```bash
npm install --save-dev jest mocha chai
```

## 📦 Dependencies

For a complete list of dependencies, see `backend/package.json`

## 🤝 Contributing

Contributions are welcome! Feel free to open issues and submit pull requests.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**manziD3rick**

## 📞 Support

If you encounter any issues, please open an issue on the GitHub repository.

---

**Happy task managing! 🎯**
