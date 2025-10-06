# Simple Social Media App

## Overview
This is a basic social media application designed for up to 5 users. It allows users to sign up, log in, create and publish posts with captions and up to 5 images, view all posts, like others' posts (but not their own), and manage downloaded images in an in-app gallery. The app is built with a Flutter mobile frontend, an Express.js backend, MongoDB for the database, and Cloudinary for image storage. It's intended as a simple project, with the backend hosted on a free service (e.g., Render.com) and the mobile app running on physical devices connected via a global network.

## Features
- **User Authentication**:
  - Sign up with first name, last name, email, and password.
  - Log in with email and password.
  - Option to switch between sign up and log in screens.

- **Post Management**:
  - Create posts with a caption and up to 5 images.
  - Publish posts, which include the publisher's name, date, and time.
  - View all published posts in a feed.
  - Delete your own posts.

- **Interactions**:
  - Like other users' posts (cannot like your own).
  - Display like count on each post.

- **Image Handling**:
  - Posts with multiple images displayed in a grid.
  - Click an image to preview it.
  - Download previewed images (option in preview mode).
  - Downloaded images are stored locally and viewable/deletable only in the app's gallery view (not accessible outside the app).

- **Limitations**:
  - Designed for 5 users on separate mobile devices.
  - No advanced features like comments, shares, or scaling.

## Technologies
- **Frontend**: Flutter (Mobile App)
- **Backend**: Express.js (Node.js server)
- **Database**: MongoDB (via MongoDB Atlas)
- **File Storage**: Cloudinary (for image uploads)
- **Authentication**: JWT (JSON Web Tokens) for sessions, bcrypt for password hashing
- **Other**: Multer for file uploads (backend), Dio and Image Picker (Flutter)

## Prerequisites
- Node.js and npm (for backend)
- Flutter SDK (for mobile app)
- MongoDB Atlas account (free tier)
- Cloudinary account (free tier)
- Git (for cloning the repo)
- A free hosting service like Render.com for the backend
- Physical mobile devices (Android/iOS) for running the app

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/your-repo.git  # Replace with your repo URL
cd your-repo
```

The project has two main directories:
- `backend`: Express server
- `mobile_app`: Flutter app

### 2. Backend Setup
1. Navigate to the `backend` directory:
   ```bash:disable-run
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `backend` root with the following:
   ```
   MONGODB_URI=your_mongodb_connection_string  # From MongoDB Atlas
   JWT_SECRET=your_jwt_secret_key  # Any strong secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

4. Run locally (for testing):
   ```bash
   node server.js
   ```
   The server runs on port 5000 by default.

5. Deploy to a free host (e.g., Render.com):
   - Create a new Web Service on Render.com.
   - Link your GitHub repo (push the backend code to GitHub first).
   - Set environment variables in Render's dashboard.
   - Deploy and note the URL (e.g., `https://your-app.onrender.com`).

### 3. Flutter Mobile App Setup
1. Navigate to the `mobile_app` directory:
   ```bash
   cd ../mobile_app
   ```

2. Install dependencies:
   ```bash
   flutter pub get
   ```

3. Update API URLs:
   - In files like `lib/screens/login.dart`, `lib/screens/signup.dart`, `lib/screens/home.dart`, and `lib/screens/create_post.dart`, replace `https://your-app.onrender.com` with your deployed backend URL.

4. Add permissions:
   - For Android: In `android/app/src/main/AndroidManifest.xml`, add:
     ```xml
     <uses-permission android:name="android.permission.INTERNET" />
     <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
     <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
     ```
   - For iOS: In `ios/Runner/Info.plist`, add keys for photo library and storage access.

5. Run on a physical device:
   - Connect your device via USB.
   - Enable developer mode and USB debugging (Android) or trust the computer (iOS).
   - Run:
     ```bash
     flutter run
     ```

### 4. Usage
1. On each of the 5 mobile devices, install and run the Flutter app.
2. Sign up or log in.
3. Create and publish posts from the home screen.
4. View the feed, like posts, preview/download images.
5. Access the gallery to view or delete downloaded images.

Note: All users connect to the same backend via the internet. Ensure the backend is deployed and accessible.

## API Endpoints (Backend)
- **Auth**:
  - POST `/api/auth/signup`: Create a new user.
  - POST `/api/auth/login`: Log in and get JWT.

- **Posts**:
  - POST `/api/posts`: Create a new post (multipart form with images).
  - GET `/api/posts`: Get all posts.
  - DELETE `/api/posts/:id`: Delete a post (owner only).
  - POST `/api/posts/:id/like`: Like a post.

## Potential Improvements
- Add error handling and validation.
- Implement refresh tokens for JWT.
- Add user profiles or comments for expansion.
- Use HTTPS for production.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. (Add a LICENSE file if needed.)

For questions or contributions, feel free to open an issue or pull request!