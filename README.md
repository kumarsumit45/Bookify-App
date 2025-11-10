# Books Recommendation App

A full-stack mobile application for discovering and sharing book recommendations with the community. Built with React Native (Expo) and Node.js.

## Features

### User Features
- User authentication (Register/Login with JWT)
- Browse trending book recommendations
- Create and share book recommendations with images
- Rate books (1-5 stars)
- View detailed book information
- User profiles with custom avatars
- Pull-to-refresh and infinite scroll
- Dark/Light theme support
- Logout functionality

### Technical Features
- RESTful API backend
- Image upload and storage via Cloudinary
- Secure password hashing with bcrypt
- Token-based authentication
- State management with Zustand
- Responsive mobile UI with Expo Router
- Drawer and Tab navigation
- AsyncStorage for persistent auth
- Scheduled tasks with cron jobs

## Tech Stack

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js v5
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT (jsonwebtoken)
- **Image Storage:** Cloudinary
- **Password Hashing:** bcryptjs
- **Task Scheduling:** node-cron
- **Environment:** dotenv
- **CORS:** cors middleware

### Frontend
- **Framework:** React Native 0.81.5
- **Navigation:** Expo Router v6
- **State Management:** Zustand v5
- **UI Components:** React Native + Expo components
- **Image Handling:** expo-image, expo-image-picker
- **Local Storage:** @react-native-async-storage/async-storage
- **Navigation Libraries:** @react-navigation (drawer, bottom-tabs)
- **Icons:** @expo/vector-icons (Ionicons)
- **Animations:** react-native-reanimated

## Project Structure

```
books recommendation app/
