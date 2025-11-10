<div align="center">

# BOOKIFY

<img src="./booksfinder/assets/images/icon.png" alt="BOOKIFY Logo" width="200" height="200">

### Your Gateway to Book Recommendations

</div>

---

## About

**BOOKIFY** is a full-stack mobile application designed for book lovers to discover, share, and explore book recommendations within a vibrant community. Whether you're looking for your next great read or want to share your favorite books with others, BOOKIFY provides an intuitive platform to connect readers and books.

Built with modern technologies, BOOKIFY offers a seamless experience with features like real-time book ratings, personalized profiles, image-based recommendations, and a beautiful dark/light theme interface. The app combines the power of React Native for a smooth mobile experience with a robust Node.js backend for reliable performance.

---

## Tech Stack

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js v5.0.1
- **Database:** MongoDB with Mongoose v8.9.4
- **Authentication:** JWT (jsonwebtoken v9.0.2)
- **Image Storage:** Cloudinary v2.6.1
- **Password Hashing:** bcryptjs v2.4.3
- **Task Scheduling:** node-cron v4.0.0
- **Environment Management:** dotenv v16.5.0
- **CORS:** cors v2.8.5
- **Development:** nodemon v3.2.0

### Frontend
- **Framework:** React Native 0.81.5
- **Platform:** Expo SDK 54.0.20
- **Navigation:** Expo Router v6.0.27
- **State Management:** Zustand v5.0.3
- **UI Library:** React 19.1.0 + React Native Components
- **Image Handling:**
  - expo-image v2.0.6
  - expo-image-picker v16.0.7
- **Local Storage:** @react-native-async-storage/async-storage v2.1.0
- **Navigation Libraries:**
  - @react-navigation/drawer v7.0.7
  - @react-navigation/bottom-tabs v7.2.10
- **Icons:** @expo/vector-icons v14.0.4 (Ionicons)
- **Animations:** react-native-reanimated v4.1.0
- **TypeScript:** v5.9.4
- **Linting:** ESLint with custom configuration

---

## Features

### User Features
- **Authentication System:** Secure user registration and login with JWT-based authentication
- **Browse Recommendations:** Discover trending book recommendations from the community
- **Create & Share:** Share book recommendations with cover images uploaded to Cloudinary
- **Rating System:** Rate books on a scale of 1-5 stars and view average ratings
- **Book Details:** View comprehensive information about each book including ratings and recommendations
- **User Profiles:** Personalized profiles with custom avatars and user information
- **Pull-to-Refresh:** Seamless content updates with pull-to-refresh functionality
- **Infinite Scroll:** Smooth browsing experience with infinite scroll pagination
- **Theme Support:** Toggle between Dark and Light themes for comfortable reading
- **Logout Functionality:** Secure logout with session management

### Technical Features
- **RESTful API:** Clean and organized API endpoints for all operations
- **Image Upload:** Cloudinary integration for efficient image storage and delivery
- **Secure Authentication:** Password hashing with bcrypt and token-based auth
- **State Management:** Global state management using Zustand stores
- **Responsive UI:** Mobile-optimized interface with Expo Router navigation
- **Drawer & Tab Navigation:** Intuitive navigation with drawer and bottom tabs
- **Persistent Storage:** AsyncStorage for maintaining authentication state
- **Scheduled Tasks:** Background jobs using node-cron for maintenance tasks
- **Error Handling:** Comprehensive error handling and user feedback
- **TypeScript Support:** Type-safe code with TypeScript configuration

---

## Folder Structure

```
books-recommendation-app/
├── backend/                          # Backend server
│   ├── src/
│   │   ├── lib/
│   │   │   ├── cloudinary.js         # Cloudinary image upload config
│   │   │   ├── cron.js               # Scheduled tasks with node-cron
│   │   │   └── db.js                 # MongoDB database connection
│   │   ├── middleware/
│   │   │   └── auth.middleware.js    # JWT authentication middleware
│   │   ├── model/
│   │   │   ├── Book.js               # Book schema and model
│   │   │   └── User.js               # User schema and model
│   │   ├── routes/
│   │   │   ├── authRoutes.js         # Authentication endpoints
│   │   │   └── bookRoutes.js         # Book CRUD endpoints
│   │   └── server.js                 # Express server entry point
│   ├── node_modules/
│   ├── package.json
│   ├── package-lock.json
│   └── .env                          # Environment variables
│
├── booksfinder/                      # Frontend React Native app
│   ├── app/                          # Expo Router pages
│   │   ├── (auth)/
│   │   │   ├── index.jsx             # Login screen
│   │   │   ├── signup.jsx            # Sign up screen
│   │   │   └── _layout.jsx           # Auth layout
│   │   ├── (drawer)/
│   │   │   ├── (tabs)/
│   │   │   │   ├── index.jsx         # Home/Feed screen
│   │   │   │   ├── create.jsx        # Create recommendation screen
│   │   │   │   ├── profile.jsx       # User profile screen
│   │   │   │   └── _layout.jsx       # Tabs layout
│   │   │   ├── about.jsx             # About page
│   │   │   ├── developer-info.jsx    # Developer info page
│   │   │   ├── logout.jsx            # Logout handler
│   │   │   ├── theme.jsx             # Theme settings
│   │   │   └── _layout.jsx           # Drawer layout
│   │   ├── bookdetails.jsx           # Book details screen
│   │   └── _layout.jsx               # Root layout
│   ├── components/                   # Reusable components
│   │   ├── Devloper_Info.jsx
│   │   ├── DrawerToggle.jsx          # Navigation drawer toggle
│   │   ├── Loader.jsx                # Loading indicator
│   │   ├── LogoutButton.jsx          # Logout button
│   │   ├── ProfileHeader.jsx         # Profile header component
│   │   └── SafeScreen.jsx            # Safe area wrapper
│   ├── store/                        # Zustand state management
│   │   ├── authStore.js              # Authentication state
│   │   └── themeStore.js             # Theme/dark mode state
│   ├── constants/
│   │   ├── api.js                    # API endpoints configuration
│   │   └── colors.js                 # Color palette/theme
│   ├── lib/
│   │   └── utils.js                  # Utility functions
│   ├── assets/
│   │   ├── images/                   # App icons and images
│   │   │   ├── icon.png              # Main app icon
│   │   │   ├── splash-icon.png       # Splash screen icon
│   │   │   ├── favicon.png           # Web favicon
│   │   │   └── ...                   # Other image assets
│   │   ├── fonts/                    # Custom fonts
│   │   └── styles/                   # Styling assets
│   ├── node_modules/
│   ├── app.json                      # Expo configuration
│   ├── expo-env.d.ts                 # TypeScript definitions
│   ├── package.json
│   ├── package-lock.json
│   ├── tsconfig.json                 # TypeScript config
│   └── eslint.config.js              # ESLint configuration
│
├── .git/                             # Git repository
└── README.md                         # Project documentation
```

---

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Expo CLI
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory with the following variables:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
PORT=5000
```

4. Start the development server:
```bash
npm run dev
```

The backend server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd booksfinder
```

2. Install dependencies:
```bash
npm install
```

3. Update the API endpoint in `constants/api.js` with your backend URL

4. Start the Expo development server:
```bash
npx expo start
```

5. Run on your preferred platform:
- Press `a` for Android
- Press `i` for iOS
- Press `w` for Web
- Scan QR code with Expo Go app

---

## API Endpoints

### Authentication Routes
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/user` - Get authenticated user details

### Book Routes
- `GET /api/books` - Get all books with pagination
- `GET /api/books/:id` - Get book by ID
- `POST /api/books` - Create new book recommendation (protected)
- `PUT /api/books/:id` - Update book (protected)
- `DELETE /api/books/:id` - Delete book (protected)
- `POST /api/books/:id/rate` - Rate a book (protected)

---

## Screenshots

<div align="center">
<i>Screenshots coming soon...</i>
</div>

---

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## License

This project is open source and available for educational purposes.

---

## Contact & Support

For any queries or support, please reach out through the developer info section in the app.

---

<div align="center">

**Made with ❤️ by the Sumit Kumar**

⭐ Star this repository if you found it helpful!

</div>
